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
import axiosInstance from 'configs/axios.config';

interface HRReportsContextType {
    data: any;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    handleGoToNextQuestion: () => void;
    handleGoToPrevQuestion: () => void;
    currentQuestionData: any;
    getWPMLabel: (score: number) => { label: string; color: string };
    getPitchLevelLabel: (score: number) => { label: string; color: string };
    getToneLevelLabel: (score: number) => { label: string; color: string };
    spiderWebOpen: boolean;
    handleToggleSpiderWebAnalysis: () => void;
}

const HRReportsContext = createContext<HRReportsContextType | undefined>(undefined);

export const useHRReportsContext = (): HRReportsContextType => {
    const context = useContext(HRReportsContext);
    if (!context) {
        throw new Error('useHRContext must be used within a HRProvider');
    }
    return context;
};

interface HRProviderProps {
    children: ReactNode;
}

const HRReportProvider = ({ children }: HRProviderProps): JSX.Element => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [spiderWebOpen, setSpiderWebOpen] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [data, setData] = useState<any>();
    const currentQuestionData = data?.question_wise_result?.[currentQuestionIndex];

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const url =
                latest === '1'
                    ? `/hr-interview/assessment/${id}/report/latest`
                    : `/hr-interview/report/${id}`;

            const response = await axiosInstance.get(url);
            if (response.status === 200) {
                setData(response.data);
                console.log(response.data);
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

    const handleToggleSpiderWebAnalysis = () => {
        setSpiderWebOpen(!spiderWebOpen);
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

    const getToneLevelLabel = (score: number) => {
        if (score <= 90)
            return {
                label: 'Low',
                color: '#FAA300',
            };
        else if (score <= 175)
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

    const value: HRReportsContextType = {
        data,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
        currentQuestionData,
        getWPMLabel,
        getPitchLevelLabel,
        getToneLevelLabel,
        spiderWebOpen,
        handleToggleSpiderWebAnalysis,
    };

    if (isLoading) return <LoadingScreen />;
    return <HRReportsContext.Provider value={value}>{children}</HRReportsContext.Provider>;
};

export default HRReportProvider;
