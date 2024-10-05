// Internal Imports
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import LoadingScreen from '../LoadingScreen';

// Configs
import { axiosV2 } from 'configs/axios.config';

interface InterviewPrepHubReportsContextType {
    data: any;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    handleGoToNextQuestion: () => void;
    handleGoToPrevQuestion: () => void;
    currentQuestionData: any;
}

const InterviewPrepHubReportsContext = createContext<
    InterviewPrepHubReportsContextType | undefined
>(undefined);

export const useInterviewPrepHubReportsContext = (): InterviewPrepHubReportsContextType => {
    const context = useContext(InterviewPrepHubReportsContext);
    if (!context) {
        throw new Error(
            'useInterviewPrepHubContext must be used within a InterviewPrepHubProvider',
        );
    }
    return context;
};

interface InterviewPrepHubProviderProps {
    children: ReactNode;
}

const InterviewPrepHubReportProvider = ({
    children,
}: InterviewPrepHubProviderProps): JSX.Element => {
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
                    ? `/practice-test/assessment/${id}/report`
                    : `/practice-test/report/${id}`;

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
        if (data?.question_wise_result?.length === currentQuestionIndex + 1) return;
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleGoToPrevQuestion = () => {
        if (currentQuestionIndex === 0) return;
        setCurrentQuestionIndex((prev) => prev - 1);
    };

    useEffect(() => {
        loadAllReports();
    }, [loadAllReports]);

    const value: InterviewPrepHubReportsContextType = {
        data,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
        currentQuestionData,
    };

    if (isLoading) return <LoadingScreen />;
    return (
        <InterviewPrepHubReportsContext.Provider value={value}>
            {children}
        </InterviewPrepHubReportsContext.Provider>
    );
};

export default InterviewPrepHubReportProvider;
