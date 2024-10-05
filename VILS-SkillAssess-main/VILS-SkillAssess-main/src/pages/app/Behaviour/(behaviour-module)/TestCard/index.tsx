// Components
import Button from 'components/Buttons';

// Utils
import { cn } from 'utils/helper';

interface TestCardProps {
    data?: any;
    icon: React.ReactNode;
    iconClassName?: string;
    showReport?: boolean;
    startTestAction?: () => void;
    viewReportAction?: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
    data,
    icon,
    iconClassName,
    startTestAction = () => {},
    viewReportAction = () => {},
    showReport = true,
}) => {
    return (
        <div className="w-[300px] shadow-light p-4 rounded-md">
            <div className="flex gap-3">
                <div
                    className={cn(
                        `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl`,
                        iconClassName,
                    )}
                >
                    {icon}
                </div>
                <p className="flex-1 font-semibold">{data?.title}</p>
            </div>
            <div className="mt-4 h-[150px]">
                <p className="text-sm text-justify">{data?.description}</p>
            </div>
            <div className="flex gap-2 items-center mt-4 justify-end">
                {data?.status === 'COMPLETED' && showReport && (
                    <Button
                        label="View Report"
                        className="bg-[#DCA11D] flex-1"
                        onClick={viewReportAction}
                    />
                )}
                <Button label="Start Test" className="flex-1" onClick={startTestAction} />
            </div>
        </div>
    );
};

export default TestCard;
