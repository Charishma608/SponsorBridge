import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';

interface ScoreCardProps {
    label: string;
    score: number;
    questions: number;
    answered: number;
    skipped: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ answered, label, questions, score, skipped }) => {
    return (
        <div className="border-2 shadow-md rounded-md p-3">
            <div className="text-primary">{label}</div>
            <CircularProgressBarGraph
                value={score}
                size={130}
                radius={42}
                strokeWidth={16}
                labelClassName="text-xl"
            />
            <div className="text-xs pl-6">Your Score: {score}</div>
            <div className="text-sm my-3">
                <div className="">No. of Question: {questions}</div>
                <div className="">No. of Question Answered: {answered}</div>
                <div className="">No. of Question Skipped: {skipped}</div>
            </div>
        </div>
    );
};

export default ScoreCard;
