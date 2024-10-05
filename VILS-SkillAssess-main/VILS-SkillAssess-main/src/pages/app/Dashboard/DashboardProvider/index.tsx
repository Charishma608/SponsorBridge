import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface DashboardContextType {
    timelineOptions: string[];
    timeLineSelected: string;
    setTimeLineSelected: React.Dispatch<React.SetStateAction<string>>;
    timeLine: {
        days: number;
        weeks: number;
        months: number;
        years: number;
    };
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboardContext = (): DashboardContextType => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
};

interface DashboardProviderProps {
    children: ReactNode;
}

const DashboardProvider = ({ children }: DashboardProviderProps): JSX.Element => {
    const timelineOptions = ['7 Days', '15 Days', '1 Month', '3 Months', '6 Months', '1 Year'];
    const [timeLineSelected, setTimeLineSelected] = useState<string>('3 Months');
    const [timeLine, setTimeLine] = useState({
        days: 15,
        weeks: 0,
        months: 0,
        years: 0,
    });

    useEffect(() => {
        switch (timeLineSelected) {
            case '7 Days':
                setTimeLine({ days: 7, weeks: 0, months: 0, years: 0 });
                break;
            case '15 Days':
                setTimeLine({ days: 15, weeks: 0, months: 0, years: 0 });
                break;
            case '1 Month':
                setTimeLine({ days: 0, weeks: 0, months: 1, years: 0 });
                break;
            case '3 Months':
                setTimeLine({ days: 0, weeks: 0, months: 3, years: 0 });
                break;
            case '6 Months':
                setTimeLine({ days: 0, weeks: 0, months: 6, years: 0 });
                break;
            case '1 Year':
                setTimeLine({ days: 0, weeks: 0, months: 0, years: 1 });
                break;
            default:
                setTimeLine({ days: 0, weeks: 0, months: 0, years: 0 });
        }
    }, [timeLineSelected]);

    const value: DashboardContextType = {
        timelineOptions,
        timeLineSelected,
        setTimeLineSelected,
        timeLine,
    };

    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export default DashboardProvider;
