import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import TextSubHeading from 'components/Texts/TextSubHeading';

interface OverallContainerProps {
    overall: any;
}

const OverallContainer: React.FC<OverallContainerProps> = ({ overall }) => {
    if (!overall) {
        return null;
    }

    return (
        <div className="p-4 rounded-md shadow-light flex ">
            <div className="w-1/4 border-r-[1.5px] border-gray-300 flex flex-col gap-3">
                <TextSubHeading>Overall</TextSubHeading>
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-sm font-semibold text-gray-700">Total Score</p>
                    <CircularProgressBarGraph
                        value={(overall?.obtained_score / overall?.total_score) * 100}
                        label={overall?.obtained_score + '/' + overall?.total_score}
                        labelClassName={'text-2xl'}
                        // color="#0280D4"
                    />
                </div>
            </div>
            <div className="flex-1 ps-4">
                <div className="shadow-light w-full h-full rounded-md flex flex-col divide-y-[1.5px] px-4">
                    <OverallTab label="Total Questions" value={overall?.total_questions} />
                    <OverallTab label="Total Submission" value={overall?.total_submissions} />
                    <OverallTab label="Accepted Submission" value={overall?.accepted_submissions} />
                    <OverallTab
                        label="Percentage of submission accepted"
                        value={overall?.percentage_of_submissions_accepted}
                    />
                </div>
            </div>
        </div>
    );
};

interface OverallTabProps {
    label: string;
    value: string;
}

const OverallTab: React.FC<OverallTabProps> = ({ label, value }) => {
    return (
        <div className="flex-1 py-2 flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-700">{label}</p>
            <p className="text-2xl font-semibold text-primary">{value}</p>
        </div>
    );
};

export default OverallContainer;
