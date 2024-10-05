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
    startTimer: () => void;
    stopTimer: () => void;
    currentQuestionData?: any;
    currentQuestionIndex: number;
    totalQuestion: number;
    timePerQuestion: number;
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
    testId: string | null;
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
    const [timer, setTimer] = useState<number>(1);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

    const fetchTest = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios(`/behaviour/${id}/load-questions`);
            if (res.status === 200) {
                setData(res.data);
                setTimer(res.data?.duration_in_minutes * 60); // In Seconds
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const handleGoToNextQuestion = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const startTimer = () => {
        setIsTimerActive(true);
    };

    const stopTimer = () => {
        setIsTimerActive(false);
    };

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

    useEffect(() => {
        const disableBackAndForward = () => {
            window.history.pushState(null, null!, window.location.href);
            window.onpopstate = () => {
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

        if (isTimerActive && timer >= 1) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds - 1);
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
        currentQuestionData: data ? data?.questions?.[currentQuestionIndex] : null,
        currentQuestionIndex,
        totalQuestion: data ? data?.questions?.length : 0,
        timePerQuestion: data?.duration_in_minutes * 60,
        timer,
        setTimer,
        startTimer,
        stopTimer,
        testId: id,
    };

    if (isLoading) return <p className="font-inter">Loading ....</p>;
    return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestProvider;
