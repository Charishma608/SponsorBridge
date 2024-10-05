// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import Tooltip from 'components/Tooltip';
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';

// Constants
import { APTITUDE_DETAILED_REPORT } from 'constants/index';

interface DetailedReportsProps {
    data?: any;
}

const DetailedReports: React.FC<DetailedReportsProps> = ({ data }) => {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedDuration =
            (minutes > 0 ? `${minutes} min` : '') +
            (minutes > 0 && remainingSeconds > 0 ? ' ' : '') +
            (remainingSeconds > 0 ? `${remainingSeconds} sec` : '');

        return formattedDuration.trim() || '0 sec';
    };

    return (
        <div>
            <TextSubHeading>Detailed Reports</TextSubHeading>
            <div className="flex flex-col gap-3 mt-4">
                <IndividualReportTab
                    name="Quantitative Aptitude"
                    time={formatDuration(data?.quantitative_aptitude?.time_taken)}
                    percentage={
                        (data?.quantitative_aptitude?.score /
                            data?.quantitative_aptitude?.total_question) *
                        100
                    }
                    label={
                        data?.quantitative_aptitude?.score +
                        '/' +
                        data?.quantitative_aptitude?.total_question
                    }
                />
                <IndividualReportTab
                    name="Verbal Ability"
                    time={formatDuration(data?.verbal_ability?.time_taken)}
                    percentage={
                        (data?.verbal_ability?.score / data?.verbal_ability?.total_question) * 100
                    }
                    label={data?.verbal_ability?.score + '/' + data?.verbal_ability?.total_question}
                />
                <IndividualReportTab
                    name="Logical Reasoning"
                    time={formatDuration(data?.logical_reasoning?.time_taken)}
                    percentage={
                        (data?.logical_reasoning?.score / data?.logical_reasoning?.total_question) *
                        100
                    }
                    label={
                        data?.logical_reasoning?.score +
                        '/' +
                        data?.logical_reasoning?.total_question
                    }
                />
                <IndividualReportTab
                    name="Verbal Reasoning"
                    time={formatDuration(data?.verbal_reasoning?.time_taken)}
                    percentage={
                        (data?.verbal_reasoning?.score / data?.verbal_reasoning?.total_question) *
                        100
                    }
                    label={
                        data?.verbal_reasoning?.score + '/' + data?.verbal_reasoning?.total_question
                    }
                />
                <IndividualReportTab
                    name="Critical Thinking"
                    time={formatDuration(data?.critical_thinking?.time_taken)}
                    percentage={
                        (data?.critical_thinking?.score / data?.critical_thinking?.total_question) *
                        100
                    }
                    label={
                        data?.critical_thinking?.score +
                        '/' +
                        data?.critical_thinking?.total_question
                    }
                />
            </div>
        </div>
    );
};

interface IndividualReportTabProps {
    name: string;
    time: string;
    percentage?: number;
    label?: string;
}

const IndividualReportTab: React.FC<IndividualReportTabProps> = ({
    name,
    time,
    percentage = 80,
    label = '8/10',
}) => {
    return (
        <div className="shadow-light p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h2 className="font-semibold">{name}</h2>
                <Tooltip label={APTITUDE_DETAILED_REPORT[name]} position="rightBottom" />
            </div>
            <div className="flex items-center gap-6">
                <p className="text-sm">Time Taken:&nbsp; {time}/10 Min</p>
                <div className="h-[100px] w-[100px] grid place-content-center">
                    <CircularProgressBarGraph
                        value={percentage}
                        label={label}
                        size={100}
                        radius={35}
                        strokeWidth={13}
                        arrowShow={false}
                        labelClassName="text-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailedReports;
