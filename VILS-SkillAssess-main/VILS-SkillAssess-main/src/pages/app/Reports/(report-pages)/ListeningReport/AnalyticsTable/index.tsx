interface AnalyticsTableProps {
    correctAnswers: string;
    wrongAnswers: string;
    skippedAnswers: string;
    timeUsed: string;
}

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
    correctAnswers,
    wrongAnswers,
    skippedAnswers,
    timeUsed,
}) => {
    return (
        <div className="rounded-md border-[1.5px] overflow-hidden border-gray-300">
            <div className="py-3 border-b-[1.5px] border-gray-300 bg-gray-200">
                <p className="text-center font-semibold">Analytics</p>
            </div>
            <Row label="Correct Answers" value={correctAnswers} />
            <Row label="Wrong Answers" value={wrongAnswers} />
            <Row label="Skipped Answers" value={skippedAnswers} />
            <Row label="Time Taken" value={timeUsed} isLast={true} />
        </div>
    );
};

interface RowProps {
    label: string;
    value: string;
    isLast?: boolean;
}

const Row: React.FC<RowProps> = ({ label = 'Label', value = '0', isLast = false }) => {
    return (
        <div className={`flex text-sm ${!isLast ? 'border-b-[1.5px]' : ''}`}>
            <div className="border-r-[0.75px] w-3/5 lg:w-4/5 p-2 py-5">{label}</div>
            <div className="border-l-[0.75px] w-2/5 lg:w-1/5 p-2 py-5">{value}</div>
        </div>
    );
};

export default AnalyticsTable;
