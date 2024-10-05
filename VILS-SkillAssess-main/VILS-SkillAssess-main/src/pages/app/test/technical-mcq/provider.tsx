import axiosInstance from 'configs/axios.config';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const TestContext = createContext<any>(null);

export default function TestProvider({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const resp = await axiosInstance(`/technical-mcq/assessment/${id}/questions/all`);
            if (resp.status === 200) {
                setData(resp.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <TestContext.Provider
            value={{
                data,
                loading,
                id
            }}
        >
            {children}
        </TestContext.Provider>
    );
}

export const useTestContext = () => {
    const context = useContext(TestContext);
    if (!context) {
        throw new Error('useTestContext must be used within a TestProvider');
    }
    return context;
};
