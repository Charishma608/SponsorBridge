// Internal Imports
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import LoadingScreen from '../LoadingScreen';

// Configs
import axios from 'configs/axios.config';

interface SpeakingReportsContextType {
    data: any;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    handleGoToNextQuestion: () => void;
    handleGoToPrevQuestion: () => void;
    currentQuestionData: any;
    getWPMLabel: (score: number) => { label: string; color: string };
    getConfidenceLabel: (score: number) => { label: string; color: string };
    getPausesLabel: (score: number) => { label: string; color: string };
    getPitchLevelLabel: (score: number) => { label: string; color: string };
}

const SpeakingReportsContext = createContext<SpeakingReportsContextType | undefined>(undefined);

export const useSpeakingReportsContext = (): SpeakingReportsContextType => {
    const context = useContext(SpeakingReportsContext);
    if (!context) {
        throw new Error('useSpeakingContext must be used within a SpeakingProvider');
    }
    return context;
};

interface SpeakingProviderProps {
    children: ReactNode;
}

const SpeakingReportsProvider = ({ children }: SpeakingProviderProps): JSX.Element => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [data, setData] = useState<any>();
    const currentQuestionData = data?.individual_reports?.[currentQuestionIndex];

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);

            const url =
                latest === '1'
                    ? `/speaking/assessment/${id}/report/latest`
                    : `/speaking/report/${id}`;

            const response = await axios.get(url);

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

    const getConfidenceLabel = (score: number) => {
        if (score <= 45)
            return {
                label: 'Low',
                color: '#FC6736',
            };
        else if (score <= 70)
            return {
                label: 'Moderate',
                color: '#0280D4',
            };
        return {
            label: 'High',
            color: '#9BCF53',
        };
    };

    const getPausesLabel = (numberOfPauses: number) => {
        if (numberOfPauses <= 3)
            return {
                label: 'Low',
                color: '#387ADF',
            };
        else if (numberOfPauses <= 5)
            return {
                label: 'Moderate',
                color: '#0280D4',
            };
        return {
            label: 'High',
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

    const value: SpeakingReportsContextType = {
        data,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
        currentQuestionData,
        getWPMLabel,
        getConfidenceLabel,
        getPausesLabel,
        getPitchLevelLabel,
    };

    if (isLoading) return <LoadingScreen />;
    return (
        <SpeakingReportsContext.Provider value={value}>{children}</SpeakingReportsContext.Provider>
    );
};

export default SpeakingReportsProvider;
