// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';
import NoDataScreen from '../../NoDataScreen';
import TooltipComp from 'components/Tooltip';

// Utils
import { cn } from 'utils/helper';

interface ListeningContainerProps {
    data?: any;
}

const ListeningContainer: React.FC<ListeningContainerProps> = ({ data }) => {
    const isDataAvailable = data ? Object.keys(data).length !== 0 : false;

    return (
        <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-3">
                <p className="font-semibold text-lg">Listening</p>
                <TooltipComp
                    label="The Listening test exposes you to various audio materials, such as conversations and speeches, allowing you to develop essential listening skills for effective communication and academic success"
                    position="rightBottom"
                />
            </div>
            {isDataAvailable ? (
                <div className="p-4 border-[1.5px] rounded-md border-primary min-h-[40vh]">
                    <div className="flex border-b-[0.75px] border-gray-300">
                        <DataBox
                            label="Listening Comprehension"
                            description="Listening comprehension evaluates your capacity to absorb and
                            understand spoken information. It gauges your ability to actively
                            listen, grasp key details, and interpret messages accurately while
                            disregarding external distractions"
                            value={data.listening_comprehension}
                            className="border-l-0"
                        />
                        <DataBox
                            label="Time Management"
                            description="Time management evaluates your efficiency in completing listening
                            tasks within the given timeframe. It assesses your ability to
                            allocate appropriate time to different sections of the text"
                            value={data.time_management}
                        />
                        <DataBox
                            label="Critical Thinking"
                            description="Critical thinking evaluates your ability to analyze, evaluate, and
                            interpret information while listening. It assesses your capacity to
                            draw connections, make inferences, and think critically about the
                            text's content"
                            value={data.critical_thinking}
                            className="border-r-0"
                        />
                    </div>
                    <div className="flex border-t-[0.75px] border-gray-300">
                        <div className="flex-1 border-r-[0.75px] border-gray-300" />
                        <DataBox
                            label="Note Taking"
                            description="Note taking is the practice of recording key points, ideas, or
                            important details while listening to spoken information.It plays a
                            crucial role in retaining and recalling important content from
                            conversations, lectures, or presentations"
                            value={data.note_taking}
                        />
                        <div className="flex-1 border-l-[0.75px] border-gray-300" />
                    </div>
                    <div className="mt-10 flex justify-end">
                        <Labels />
                    </div>
                </div>
            ) : (
                <NoDataScreen
                    description="Engage in our Listening test to refine your profile with elevated listening skills and a nuanced understanding, cultivating a strategic depth of comprehension"
                    path="/communication/listening-module"
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

export default ListeningContainer;
