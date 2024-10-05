// External Imports 
import moment from "moment";

interface SubmissionDetailsContainerProps {
    backspaceCount: number;
    deleteCount: number;
    timestamp: Date;
}

const SubmissionDetailsContainer: React.FC<SubmissionDetailsContainerProps> = ({backspaceCount, deleteCount, timestamp}) => {
    return (
        <div className="rounded-md shadow-light overflow-hidden w-full">
            <div className="bg-primary px-4 py-3 shadow flex items-center justify-between">
                <p className="text-white">Submission Details</p>
                {/* <p className="text-white">Submitted at: 6:00 pm</p> */}
            </div>
            <div className="p-4 flex divide-x-2">
                <div className="flex-1">
                    <h1 className="text-primary text-2xl font-semibold">{backspaceCount}</h1>
                    <div className="mt-4 text-sm">
                        <p>Backspace Count</p>
                    </div>
                </div>
                <div className="flex-1 px-2">
                    <h1 className="text-primary text-2xl font-semibold">{deleteCount}</h1>
                    <div className="mt-4 text-sm">
                        <p>Delete Count</p>
                    </div>
                </div>
                <div className="flex-1 px-2">
                    <h1 className="text-primary text-2xl font-semibold">{moment(timestamp).format("h:mm a")}</h1>
                    <div className="mt-4 text-sm">
                        <p>Time Stamp</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetailsContainer;
