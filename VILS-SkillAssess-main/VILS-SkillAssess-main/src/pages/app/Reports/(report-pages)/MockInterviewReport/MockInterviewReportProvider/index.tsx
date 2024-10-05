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

// Components
import LoadingScreen from '../LoadingScreen';

// Configs
import { axiosV2 } from 'configs/axios.config';

interface MockInterviewReportsContextType {
    data: any;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    handleGoToNextQuestion: () => void;
    handleGoToPrevQuestion: () => void;
    currentQuestionData: any;
    getWPMLabel: (score: number) => { label: string; color: string };
    getPitchLevelLabel: (score: number) => { label: string; color: string };
}

const MockInterviewReportsContext = createContext<MockInterviewReportsContextType | undefined>(
    undefined,
);

export const useMockInterviewReportsContext = (): MockInterviewReportsContextType => {
    const context = useContext(MockInterviewReportsContext);
    if (!context) {
        throw new Error('useMockInterviewContext must be used within a MockInterviewProvider');
    }
    return context;
};

interface MockInterviewProviderProps {
    children: ReactNode;
}

const MockInterviewReportProvider = ({ children }: MockInterviewProviderProps): JSX.Element => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [data, setData] = useState<any>();
    const currentQuestionData = data?.question_wise_result?.[currentQuestionIndex];

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const url =
                latest === '1'
                    ? `/mock-interview/assessment/${id}/report`
                    : `/mock-interview/report/${id}`;

            const response = await axiosV2.get(url);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id, latest]);

    const handleGoToNextQuestion = () => {
        if (data?.individual_reports?.length === currentQuestionIndex + 1) return;
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleGoToPrevQuestion = () => {
        if (currentQuestionIndex === 0) return;
        setCurrentQuestionIndex((prev) => prev - 1);
    };

    const getWPMLabel = (score: number) => {
        if (score < 70)
            return {
                label: 'Too Slow',
                color: '#FC6736',
            };
        else if (score < 120)
            return {
                label: 'Slow',
                color: '#FC6736',
            };
        else if (score < 160)
            return {
                label: 'Conversational',
                color: '#0280D4',
            };
        else if (score < 210)
            return {
                label: 'Fast',
                color: '#FC6736',
            };
        return {
            label: 'Too Fast',
            color: '#FC6736',
        };
    };

    const getPitchLevelLabel = (score: number) => {
        if (score <= 70)
            return {
                label: 'Low',
                color: '#FAA300',
            };
        else if (score <= 200)
            return {
                label: 'Ideal',
                color: '#387ADF',
            };
        return {
            label: 'High',
            color: '#9BCF53',
        };
    };

    useEffect(() => {
        loadAllReports();
    }, [loadAllReports]);

    const value: MockInterviewReportsContextType = {
        data,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
        currentQuestionData,
        getWPMLabel,
        getPitchLevelLabel,
    };

    if (isLoading) return <LoadingScreen />;
    return (
        <MockInterviewReportsContext.Provider value={value}>
            {children}
        </MockInterviewReportsContext.Provider>
    );
};

export default MockInterviewReportProvider;
