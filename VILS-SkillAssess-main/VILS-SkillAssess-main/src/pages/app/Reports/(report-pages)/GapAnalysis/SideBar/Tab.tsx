import React from 'react';
import { useGapAnalysisContext } from '../GapAnalysisProvider';

interface TabsProps {
    label?: string;
    icon?: any;
}

const Tab: React.FC<TabsProps> = ({ icon, label }) => {
    const Icon = icon;
    const { currentWindow, handleCurrentWindow } = useGapAnalysisContext();
    return (
        <div>
            <div
                onClick={() => handleCurrentWindow(label as string)}
                className={`${
                    currentWindow === label ? 'bg-primary text-white' : 'bg-white text-black'
                } rounded-3xl py-2 px-4 flex items-center cursor-pointer w-full`}
            >
                {icon && (
                    <div className="min-w-[28px] text-[18px]">
                        <Icon />
                    </div>
                )}
                <p className="text-sm">{label}</p>
            </div>
        </div>
    );
};

export default Tab;
