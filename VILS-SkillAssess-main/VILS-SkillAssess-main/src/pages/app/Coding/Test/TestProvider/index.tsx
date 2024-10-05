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
import axios from 'configs/coding.config';

// Components
import LoadingScreen from '../LoadingScreen';

interface TestContextType {
    data?: any;
    exitButtonPressed: boolean;
    setExitButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
    testId: string | null;
    testTitle: string | null;
    solutions: any;
    setSolutions: any;
    questionSelected: null | any;
    setQuestionSelected: null | any;
    globalTimer: number;
    startTimer: () => void;
    stopTimer: () => void;
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

    const TIME_PER_QUESTION = 45 * 60; // Seconds
    const TOTAL_QUESTIONS = 1;
    const TOTAL_TIME_PER_TEST = TIME_PER_QUESTION * TOTAL_QUESTIONS; // In seconds

    const id = searchParams.get('id');
    const title = searchParams.get('title');

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>();
    const [exitButtonPressed, setExitButtonPressed] = useState<boolean>(false);
    const [solutions, setSolutions] = useState<{ [key: string]: boolean }>();
    const [questionSelected, setQuestionSelected] = useState<any>(null);

    // Global Timer Configurations
    const [globalTimer, setGlobalTimer] = useState<number>(TOTAL_TIME_PER_TEST);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const startTimer = () => {
        setIsTimerActive(true);
    };
    const stopTimer = () => {
        setIsTimerActive(false);
    };

    const fetchTest = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios(`/student/assessment/${id}/question/all`);
            if (res.status === 200) {
                // setData(res.data);
                setData([res.data?.[0]]); // Set only one question
                for (let i = 0; i < res.data.length; i++) {
                    setSolutions((prev) => {
                        return { ...prev, [res.data[i].id]: false };
                    });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        let interval: NodeJS.Timer;
        if (isTimerActive) {
            interval = setInterval(() => {
                setGlobalTimer((prev) => prev - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
        return () => {
            clearInterval(interval);
        };
    }, [isTimerActive, setGlobalTimer]);

    useEffect(() => {
        if (globalTimer === 0) stopTimer();
    }, [globalTimer]);

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

    const value: TestContextType = {
        exitButtonPressed,
        setExitButtonPressed,
        data,
        testId: id,
        testTitle: title,
        solutions,
        setSolutions,
        questionSelected,
        setQuestionSelected,
        globalTimer,
        startTimer,
        stopTimer,
    };

    if (isLoading) return <LoadingScreen />;
    return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestProvider;
