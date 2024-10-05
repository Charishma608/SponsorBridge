// Internal Imports
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import LoadingScreen from '../LoadingScreen';

// Configs
import axios from 'configs/axios.config';

interface BehaviourReportsContextType {
    data: any;
    submittedAt: string;
}

const BehaviourReportsContext = createContext<BehaviourReportsContextType | undefined>(undefined);

export const useBehaviourReportsContext = (): BehaviourReportsContextType => {
    const context = useContext(BehaviourReportsContext);
    if (!context) {
        throw new Error('useBehaviourContext must be used within a BehaviourProvider');
    }
    return context;
};

interface SpeakingProviderProps {
    children: ReactNode;
}

const BehaviourReportsProvider = ({ children }: SpeakingProviderProps): JSX.Element => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [submittedAt, setSubmittedAt] = useState<any>();

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/behaviour/${id}/load-report`);
            if (res.status === 200) {
                setData(res.data?.scores);
                setSubmittedAt(res.data?.submitted_at);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const value: BehaviourReportsContextType = {
        data,
        submittedAt,
    };

    if (isLoading) return <LoadingScreen />;
    return (
        <BehaviourReportsContext.Provider value={value}>
            {children}
        </BehaviourReportsContext.Provider>
    );
};

export default BehaviourReportsProvider;
