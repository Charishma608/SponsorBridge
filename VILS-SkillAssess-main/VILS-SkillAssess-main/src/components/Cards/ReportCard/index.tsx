// External Imports
import { TbClockQuestion } from 'react-icons/tb';
import { BsPatchQuestion } from 'react-icons/bs';

// Components
import Button from '../../Buttons';

// Hooks
import { useLayout } from 'providers/LayoutProvider';

interface ReportCardProps {
    title: string;
    description: string;
    duration: string;
    questionCount: number;
    onClick?: () => void;
    buttonLabel?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
    title,
    description,
    duration,
    questionCount,
    onClick = () => {},
    buttonLabel = 'View Report',
}) => {
    const { setIsSidebarOpened } = useLayout();

    return (
        <div className="rounded-md shadow-light p-4 w-[300px]">
            <div className="flex gap-2 h-[70px]">
                <div>
                    <div className="h-[50px] w-[50px] rounded-full grid place-content-center bg-[#EBFEFF] text-[#66B5B6] border">
                        <i className="icon-reports text-2xl" />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold line-clamp-2">{title}</h3>
                </div>
            </div>
            <div className="h-[150px]">
                <p className="text-sm text-justify line-clamp-6">{description}</p>
            </div>

            {questionCount ? (
                <div className="flex gap-6 h-[40px]">
                    {duration ? (
                        <div className="flex items-center gap-2 text-sm">
                            <TbClockQuestion className="text-gray-600" />
                            <p>{duration}</p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                        <BsPatchQuestion className="text-gray-600" />
                        <p>{questionCount} Questions</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div>
                <Button
                    label={buttonLabel}
                    onClick={() => {
                        setIsSidebarOpened(false);
                        onClick();
                    }}
                />
            </div>
        </div>
    );
};

export default ReportCard;
