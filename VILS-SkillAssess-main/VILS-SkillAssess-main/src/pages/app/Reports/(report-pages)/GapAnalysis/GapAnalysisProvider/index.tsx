// Internal Imports
import { createContext, useState, useContext, ReactNode } from 'react';

interface GapAnalysisContextType {
    currentWindow: string;
    handleCurrentWindow: (e: string) => void;
}

const GapAnalysisContext = createContext<GapAnalysisContextType | undefined>(undefined);

export const useGapAnalysisContext = (): GapAnalysisContextType => {
    const context = useContext(GapAnalysisContext);
    if (!context) {
        throw new Error('useDashBoardContext must be used within a DashBoardProvider');
    }
    return context;
};

interface GapAnalysisProps {
    children: ReactNode;
}

const GapAnalysisProvider = ({ children }: GapAnalysisProps): JSX.Element => {
    const [currentWindow, setCurrentWindow] = useState<string>('Overall');

    const handleCurrentWindow = (name: string) => {
        setCurrentWindow(name);
    };

    const value: GapAnalysisContextType = {
        currentWindow,
        handleCurrentWindow,
    };

    return <GapAnalysisContext.Provider value={value}>{children}</GapAnalysisContext.Provider>;
};

export default GapAnalysisProvider;
