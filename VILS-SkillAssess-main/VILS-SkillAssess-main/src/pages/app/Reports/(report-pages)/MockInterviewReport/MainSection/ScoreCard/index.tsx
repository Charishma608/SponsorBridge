// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';

interface ScoreCardProps {
    label: string;
    description: string;
    value: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, description, value }) => {
    return (
        <div className="rounded-md flex-1 flex flex-col items-center min-w-[150px] overflow-hidden border-[1px] border-gray-300">
            <h2 className="py-2 font-semibold bg-gray-50 text-center text-sm w-full">{label}</h2>
            <div className="grid place-content-center h-[200px] w-full border-y-[1px]">
                <CircularProgressBarGraph value={value} size={150} radius={60} />
            </div>
            <div className="py-2 px-4">
                <p className="text-xs text-center">{description}</p>
            </div>
        </div>
    );
};

export default ScoreCard;
