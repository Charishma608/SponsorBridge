// Components
import Button from 'components/Buttons';
import { useEffect, useRef, useState } from 'react';

// Utils
import { cn } from 'utils/helper';

interface AptitudeTestCardProps {
    data?: any;
    icon: React.ReactNode;
    iconClassName?: string;
    startTestAction?: () => void;
    viewReportAction?: () => void;
}

const AptitudeTestCard: React.FC<AptitudeTestCardProps> = ({
    data,
    icon,
    iconClassName,
    startTestAction = () => {},
    viewReportAction = () => {},
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const checkTextOverflow = () => {
            if (textRef.current) {
                const { scrollHeight, clientHeight } = textRef.current;
                setShowSeeMore(scrollHeight > clientHeight);
            }
        };

        checkTextOverflow();
        window.addEventListener('resize', checkTextOverflow);
        return () => window.removeEventListener('resize', checkTextOverflow);
    }, [data?.description, isExpanded]);
    return (
        <div className="w-[350px] border-l-4 border-primary md:border-l-0 shadow-light p-4 rounded-md">
            <div className="flex gap-3 items-center">
                <div
                    className={cn(
                        `h-[50px] w-[50px] rounded-full grid place-content-center border text-2xl`,
                        iconClassName,
                    )}
                >
                    {icon}
                </div>
                <p className="flex-1 font-semibold">{data?.title}</p>
            </div>
            <div className="mt-4 md:h-[150px]">
                <p
                    ref={textRef}
                    className={cn(
                        'text-base md:text-sm mt-3 md:mb-6 text-gray-500 text-justify',
                        'transition-all duration-300',
                        isExpanded ? 'h-auto' : 'h-[72px] overflow-hidden',
                        'md:h-[150px] md:overflow-hidden overflow-y-scroll',
                    )}
                >
                    {data?.description}
                </p>
            </div>
            {showSeeMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn('text-sm text-[#9C9C9C] text-right', 'md:hidden mb-6 md:mb-0')}
                >
                    {isExpanded ? '...show less' : '...see more'}
                </button>
            )}
            <div className="flex gap-2 items-center mt-4 justify-end">
                {data?.status?.toUpperCase() === 'COMPLETED' && (
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

export default AptitudeTestCard;
