// Internal Imports
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

// Components
import LoadingScreen from '../LoadingScreen';

// Configs
import axios from 'configs/axios.config';

interface ReportsContextType {
    data: any;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const useReportsContext = (): ReportsContextType => {
    const context = useContext(ReportsContext);
    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
};

interface ReportProviderProps {
    children: ReactNode;
}

const cache = {
    data: null,
};

const ReportsProvider = ({ children }: ReportProviderProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/report/load-all-completed-tests`);
            if (response.status === 200) {
                setData(response.data);
                cache.data = response.data;
                console.log(cache);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cache.data) {
            setData(cache.data);
        } else {
            loadAllReports();
        }
    }, [loadAllReports]);

    const value: ReportsContextType = {
        data,
    };

    if (isLoading) return <LoadingScreen />;
    return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>;
};

export default ReportsProvider;
