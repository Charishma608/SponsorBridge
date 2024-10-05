// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';

interface ScoresContainerProps {
    data: any;
}

const ScoresContainer: React.FC<ScoresContainerProps> = ({ data }) => {
    return (
        <div className="border-[1.5px] border-gray-300 rounded-md flex">
            <div className="flex-1 border-r-[0.75px] border-gray-300">
                <ScoreCard
                    label="Focus Score"
                    description="Focus score assesses your ability to concentrate and direct attention towards a specific task or information, measuring how effectively you can maintain focus without becoming distracted or losing track of your engagement"
                    value={data?.focus_score}
                />
            </div>
            {/* <div className="flex-1 border-r-[0.75px] border-l-[0.75px] border-gray-300">
                <ScoreCard
                    label="Time Management"
                    description="Evaluates your efficiency in completing reading tasks within the given timeframe. It assesses your ability to allocate appropriate time to different sections of the text"
                    value={data?.time_management}
                />
            </div> */}
            <div className="flex-1 border-l-[0.75px] border-gray-300">
                <ScoreCard
                    label="Critical Thinking"
                    description="Evaluates your capacity by analyzing information thoughtfully, synthesize knowledge, and how you are constructing well-reasoned arguments, by showcasing your intellectual agility"
                    value={data?.critical_thinking}
                />
            </div>
        </div>
    );
};

interface ScoreCardProps {
    label: string;
    value: number;
    description: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, value, description }) => {
    return (
        <div className="w-full h-full flex flex-col gap-4 items-center">
            <div className="h-[10] pt-3">
                <p className="font-semibold">{label}</p>
            </div>
            <div className="mt-4">
                <CircularProgressBarGraph value={value} />
            </div>
            <div>
                <p className="text-xs p-4 text-center">{description}</p>
            </div>
        </div>
    );
};

export default ScoresContainer;
