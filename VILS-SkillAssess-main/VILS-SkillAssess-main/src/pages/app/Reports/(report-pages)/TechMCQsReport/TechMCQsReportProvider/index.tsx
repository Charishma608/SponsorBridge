import { createContext, ReactNode, useContext } from 'react';
import { useLocation } from 'react-router-dom';

interface TechMCQsReportsContextType {}

const TechMCQsReportContext = createContext<TechMCQsReportsContextType | undefined>(undefined);

export const useTechMCQsContext = () => {
    const context = useContext(TechMCQsReportContext);
    if (!context) {
        throw new Error('useHRContext must be used within a TechMCQsReportProvider');
    }
    return context;
};

const TechMCQsReportProvider = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const value: TechMCQsReportsContextType = {};
    return (
        <TechMCQsReportContext.Provider value={value}>{children}</TechMCQsReportContext.Provider>
    );
};

export default TechMCQsReportProvider;
