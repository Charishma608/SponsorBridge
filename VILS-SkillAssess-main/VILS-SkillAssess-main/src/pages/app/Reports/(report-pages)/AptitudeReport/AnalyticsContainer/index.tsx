// Utils
import { cn } from 'utils/helper';

// External Imports
import { BsSkipForwardCircle } from 'react-icons/bs';
import { TbClockQuestion } from 'react-icons/tb';
import { LuAlarmClock } from 'react-icons/lu';
import { PiClockCountdownBold } from 'react-icons/pi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

interface AnalyticsContainerProps {
    data?: any;
}

const AnalyticsContainer: React.FC<AnalyticsContainerProps> = ({ data }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedDuration =
            (minutes > 0 ? `${minutes} min` : '') +
            (minutes > 0 && remainingSeconds > 0 ? ' ' : '') +
            (remainingSeconds > 0 ? `${remainingSeconds} sec` : '');

        return formattedDuration.trim() || '0 sec';
    };

    return (
        <div className="shadow-light rounded-md p-4 h-full">
            <h3 className="font-semibold text-primary">Analytics</h3>
            <div className="flex flex-col gap-3 mt-4">
                <div className="flex gap-3">
                    <AnalyticsCard
                        label="Skipped"
                        value={data?.skipped_questions}
                        valueClassName="text-[#FF7D7D]"
                        icon={<BsSkipForwardCircle className="text-3xl" />}
                    />
                    <AnalyticsCard
                        label="Time per Question"
                        value={data?.average_time_per_question + ' Sec'}
                        valueClassName="text-[#3EB96F]"
                        icon={<TbClockQuestion className="text-3xl" />}
                    />
                </div>
                <div className="flex gap-3">
                    <AnalyticsCard
                        label="Time used"
                        value={formatTime(data?.total_time_used)}
                        valueClassName="text-[#0280D4]"
                        icon={<LuAlarmClock className="text-3xl" />}
                    />
                    <AnalyticsCard
                        label="Time Left"
                        value={formatTime(data?.time_left)}
                        valueClassName="text-[#0280D4]"
                        icon={<PiClockCountdownBold className="text-3xl" />}
                    />
                </div>
                <div className="flex gap-3">
                    <AnalyticsCard
                        label="Correct Answers"
                        value={data?.correct_answers}
                        valueClassName="text-[#20A063]"
                        icon={<FaRegCheckCircle className="text-3xl" />}
                    />
                    <AnalyticsCard
                        label="Incorrect Answers"
                        value={data?.incorrect_answers}
                        valueClassName="text-[#FF0606]"
                        icon={<RxCrossCircled className="text-3xl" />}
                    />
                </div>
            </div>
        </div>
    );
};

interface AnalyticsCardProps {
    label: string;
    value: string;
    valueClassName?: string;
    icon: React.ReactNode;
}
const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ label, value, icon, valueClassName }) => {
    return (
        <div className="shadow-light rounded-md p-4 flex gap-4 items-start flex-1">
            <div className="grid place-content-center h-full">{icon}</div>
            <div className="flex flex-col">
                <p className={cn('font-semibold text-xl', valueClassName)}>{value}</p>
                <p className="text-sm">{label}</p>
            </div>
        </div>
    );
};

export default AnalyticsContainer;
