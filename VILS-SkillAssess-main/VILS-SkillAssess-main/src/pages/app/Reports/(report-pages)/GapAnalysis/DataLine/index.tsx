import React from 'react';

interface DataLineProps {
    label: string;
    percentage: number;
    lineColorCode: string;
}

const DataLine: React.FC<DataLineProps> = ({ label, lineColorCode, percentage }) => {
    return (
        <div className="flex gap-3 px-4 py-2">
            <div className="w-44 text-xs">{label}</div>
            <div className="w-full flex items-center bg-slate-200 rounded-full overflow-hidden h-3">
                <div
                    className="rounded-full  h-full"
                    style={{ width: `${percentage}%`, backgroundColor: lineColorCode }}
                ></div>
                <div
                    className="rounded-r-full bg-slate-200 h-full"
                    style={{ width: `${100 - percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default DataLine;
