// Components
import Button from 'components/Buttons';

// Utils
import { cn } from 'utils/helper';

// External Imports
import { TbClockQuestion } from 'react-icons/tb';
import { BsPatchQuestion } from 'react-icons/bs';

interface AssessmentsCardProps {
    data?: any;
    icon: React.ReactNode;
    iconClassName?: string;
    startTestAction?: () => void;
    viewReportAction?: () => void;
}

const AssessmentsCard: React.FC<AssessmentsCardProps> = ({
    data,
    icon,
    iconClassName,
    startTestAction = () => {},
    viewReportAction = () => {},
}) => {
    return (
        <div className="w-[300px] shadow-light p-4 rounded-md flex flex-col justify-between">
            <div>
                <div className="flex flex-col gap-3">
                    <p className="flex-1 font-semibold">{data?.title}</p>
                    <div className=" ">
                        <p className="text-sm text-justify">{data?.description}</p>
                    </div>
                    <div className="">
                        <p className="text-sm text-justify">Status: {data?.status}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex gap-2 items-center mt-4 justify-end">
                    {data?.status === 'COMPLETED' && (
                        <Button
                            label="View Report"
                            className="bg-[#DCA11D] flex-1"
                            onClick={viewReportAction}
                        />
                    )}
                    <Button label="Start Test" className={`flex-1`} onClick={startTestAction} />
                </div>
            </div>
        </div>
    );
};

export default AssessmentsCard;
