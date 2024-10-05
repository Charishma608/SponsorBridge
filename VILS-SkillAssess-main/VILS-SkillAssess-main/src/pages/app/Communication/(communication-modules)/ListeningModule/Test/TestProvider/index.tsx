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
    startTimer: () => void;
    stopTimer: () => void;
    timer: number;
    testId: string | null;
    solutions: any;
    setSolutions: any;
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
    const [timer, setTimer] = useState<number>(30 * 60);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [solutions, setSolutions] = useState<any>([]);

    const fetchTest = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios(`/listening/assessment/${id}/questions`);
            if (res.status === 200) {
                console.log(res.data);

                setData(res.data);
                setTimer(res.data?.duration_in_minutes * 60); // In Seconds
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const startTimer = useCallback(() => {
        setIsTimerActive(true);
    }, []);

    const stopTimer = useCallback(() => {
        setIsTimerActive(false);
    }, []);

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
    }, [isTimerActive, setTimer, timer]);

    const value: TestContextType = {
        exitButtonPressed,
        setExitButtonPressed,
        data,
        timer,
        startTimer,
        stopTimer,
        testId: id,
        solutions,
        setSolutions,
    };

    if (isLoading) return <p className="font-inter">Loading ....</p>;
    return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestProvider;
