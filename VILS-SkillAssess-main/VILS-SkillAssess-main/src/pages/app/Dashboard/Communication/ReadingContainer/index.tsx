// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';
import TooltipComp from 'components/Tooltip';
import NoDataScreen from '../../NoDataScreen';

// Utils
import { cn } from 'utils/helper';

interface ReadingContainerProps {
    data?: any;
}

const ReadingContainer: React.FC<ReadingContainerProps> = ({ data }) => {
    const isDataAvailable = data ? Object.keys(data).length !== 0 : false;

    return (
        <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-3">
                <p className="font-semibold text-lg">Reading</p>
                <TooltipComp
                    label="The Reading test evaluates various reading skills with diverse question types, offering a comprehensive assessment to improve your comprehension, critical thinking, and overall academic performance"
                    position="rightBottom"
                />
            </div>
            {isDataAvailable ? (
                <div className="p-4 border-[1.5px] rounded-md border-primary min-h-[40vh]">
                    <div className="flex">
                        <DataBox
                            label="Focus Score"
                            description="The focus score assesses your ability to concentrate and stay engaged while reading. It measures your attention span, comprehension, and ability to ignore distractions"
                            value={data.focus_score}
                            className="border-l-0"
                        />
                        <DataBox
                            label="Time Management"
                            description="Time management evaluates your efficiency in completing reading tasks within the given timeframe. It assesses your ability to allocate appropriate time to different sections of the text"
                            value={data.time_management}
                        />
                        <DataBox
                            label="Critical Thinking"
                            description="Critical thinking evaluates your ability to analyze, evaluate, and interpret information while reading. It assesses your capacity to draw connections, make inferences, and think critically about the text's content"
                            value={data.critical_thinking}
                            className="border-r-0"
                        />
                    </div>
                    <div className="mt-10 flex justify-end">
                        <Labels />
                    </div>
                </div>
            ) : (
                <NoDataScreen
                    description="Engage in our Reading test to elevate critical reading and comprehension skills crucial for processing complex information in professional documents, reports, and industry-specific literature. Effective reading is a foundational skill that nurtures lifelong learning"
                    path="/communication/reading-module"
                />
            )}
        </div>
    );
};

interface DataBoxProps {
    label: string;
    value: number;
    description: string;
    className?: string;
}

const DataBox: React.FC<DataBoxProps> = ({ label, value, description, className }) => {
    return (
        <div
            className={cn(
                `flex-1 border-r-[0.75px] border-l-[0.75px] border-gray-300 py-4`,
                className,
            )}
        >
            <p className="text-center h-10 font-semibold">{label}</p>
            <div className="h-[200px] grid place-content-center">
                <CircularProgressBarGraph value={Math.round(parseFloat(value.toString()))} />
            </div>
            <p className="text-xs px-6 text-center">{description}</p>
        </div>
    );
};

export default ReadingContainer;
