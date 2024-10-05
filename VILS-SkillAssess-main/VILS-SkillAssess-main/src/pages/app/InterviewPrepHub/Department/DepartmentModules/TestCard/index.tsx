// Components
import Button from 'components/Buttons';

// Utils
import { cn } from 'utils/helper';

// External Imports
import { TbClockQuestion } from 'react-icons/tb';
import { BsPatchQuestion } from 'react-icons/bs';

interface TestCardProps {
    data?: any;
    icon: React.ReactNode;
    iconClassName?: string;
    startTestAction?: () => void;
    viewReportAction?: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
    data,
    icon,
    iconClassName,
    startTestAction = () => {},
    viewReportAction = () => {},
}) => {
    return (
        <div className="w-[300px] shadow-light p-4 rounded-md flex flex-col justify-between">
            <div>
                <div className="flex gap-3">
                    <div
                        className={cn(
                            `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl`,
                            iconClassName,
                        )}
                    >
                        {icon}
                    </div>
                    <p className="flex-1 font-semibold">{data?.name}</p>
                </div>
                <div className="mt-4 h-[150px]">
                    <p className="text-sm text-justify">{data?.outcome}</p>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-4 h-[40px]">
                    <div className="flex items-center gap-2 text-sm">
                        <TbClockQuestion className="text-gray-600" />
                        <p>{data?.duration_in_minutes} Mins</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <BsPatchQuestion className="text-gray-600" />
                        <p>{data?.number_of_questions} Questions</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center mt-4 justify-end">
                    {data?.status === 'COMPLETED' && (
                        <Button
                            label="View Report"
                            className="bg-[#DCA11D] flex-1"
                            onClick={viewReportAction}
                        />
                    )}
                    <Button label="Start Test" className="flex-1" onClick={startTestAction} />
                </div>
            </div>
        </div>
    );
};

export default TestCard;
