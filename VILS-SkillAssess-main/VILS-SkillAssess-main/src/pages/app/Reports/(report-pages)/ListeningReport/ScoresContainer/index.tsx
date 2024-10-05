// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';

interface ScoresContainerProps {
    data: any;
}

const ScoresContainer: React.FC<ScoresContainerProps> = ({ data }) => {
    console.log(data);

    return (
        <div className="border-[1.5px] border-gray-300 rounded-md flex flex-col">
            <div className="flex flex-1 border-b-[0.75px] border-gray-300">
                <div className="flex-1 border-r-[0.75px] border-gray-300">
                    <ScoreCard
                        label="Listening Comprehension"
                        description="Listening comprehension measures linguistic aptitude,evaluates your ability to comprehend and how well you can interpret information in real-time"
                        value={data?.listening_comprehension}
                    />
                </div>
                <div className="flex-1 border-l-[0.75px] border-gray-300">
                    <ScoreCard
                        label="Critical Thinking"
                        description="Critical thinking is the process of analyzing, evaluating, and interpreting information or situations in a logical and systematic manner. It involves questioning assumptions, considering different perspectives, and making well-informed judgments or decisions based on evidence and reasoning"
                        value={data?.critical_thinking}
                    />
                </div>
            </div>
            {/* <div className="flex flex-1 border-t-[0.75px] border-gray-300">
                <div className="flex-1 border-r-[0.75px] border-gray-300">
                    <ScoreCard
                        label="Time Management"
                        description="Time management is the practice of planning, organizing, and allocating time to tasks and activities in a way that maximizes productivity and efficiency. It involves setting priorities, allocating appropriate time for tasks, and maintaining a balance between various responsibilities"
                        value={data?.time_management}
                    />
                </div>
                <div className="flex-1 border-l-[0.75px] border-gray-300">
                    <ScoreCard
                        label="Note Taking"
                        description="Note taking is the practice of recording key points, ideas, or important details while listening to spoken information. Effective note taking involves identifying and capturing the most relevant information, organizing it in a structured manner, and creating a useful reference for later use. It plays a crucial role in retaining and recalling important content from conversations, lectures, or presentations"
                        value={data?.note_taking}
                    />
                </div>
                
            </div> */}
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
