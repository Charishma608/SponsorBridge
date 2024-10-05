// Internal Imports
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

interface TestContextType {
    data?: any;
    exitButtonPressed: boolean;
    setExitButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
    handleGoToNextQuestion: () => void;
    handleGoToPrevQuestion: () => void;
    startTimer: () => void;
    stopTimer: () => void;
    currentQuestionData?: any;
    currentQuestionIndex: number;
    totalQuestion: number;
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    testId: string | null;
    solutions: any;
    setSolutions: any;
    formatTime: (seconds: number, format: string) => string;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTestContext = (): TestContextType => {
    const context = useContext(TestContext);
    if (!context) {
        throw new Error('useTestContext must be used within a TestProvider');
    }
    return context;
};

interface TestProviderProps {
    children: ReactNode;
}

const TestProvider = ({ children }: TestProviderProps): JSX.Element => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>();
    const [exitButtonPressed, setExitButtonPressed] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [timer, setTimer] = useState<number>(14 * 60);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [solutions, setSolutions] = useState<any[]>([]);

    const startTimer = () => {
        setIsTimerActive(true);
    };

    const stopTimer = () => {
        setIsTimerActive(false);
    };

    const formatTime = (seconds: number, format: string = 'Mins-Secs') => {
        if (format === 'Mins-Secs') {
            const mins = Math.floor(seconds / 60);
            const remainingSecs = seconds % 60;

            const minsString = mins > 0 ? `${mins} Min${mins !== 1 ? 's' : ''}` : '';
            const secsString =
                remainingSecs > 0 ? `${remainingSecs} Sec${remainingSecs !== 1 ? 's' : ''}` : '';

            return `${minsString}${mins > 0 && remainingSecs > 0 ? ' ' : ''}${secsString}`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const sec = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                sec,
            ).padStart(2, '0')}`;
        }
    };

    const fetchTest = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios(`/reading/assessment/${id}/questions`);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const handleGoToNextQuestion = () => {
        if (currentQuestionIndex === data?.length - 1) return;
        else setCurrentQuestionIndex((prev) => prev + 1);
    };
    const handleGoToPrevQuestion = () => {
        if (currentQuestionIndex === 0) return;
        else setCurrentQuestionIndex((prev) => prev - 1);
    };

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

    useEffect(() => {
        const disableBackAndForward = () => {
            window.history.pushState(null, null!, window.location.href);
            window.onpopstate = () => {
                setExitButtonPressed(true);
                window.history.go(1);
            };
        };

        disableBackAndForward();

        return () => {
            window.onpopstate = null;
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => {
                    if (prevSeconds) return prevSeconds - 1;
                    else return 0;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isTimerActive, timer]);

    const value: TestContextType = {
        exitButtonPressed,
        setExitButtonPressed,
        data,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
        currentQuestionData: data ? data?.[currentQuestionIndex] : null,
        currentQuestionIndex,
        totalQuestion: data ? data?.length : 0,
        timer,
        setTimer,
        startTimer,
        stopTimer,
        testId: id,
        solutions,
        setSolutions,
        formatTime,
        setCurrentQuestionIndex,
    };

    if (isLoading) return <p className="font-inter">Loading ....</p>;
    return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestProvider;
