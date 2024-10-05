// Components
import Button from 'components/Buttons';
import { useEffect, useRef, useState } from 'react';

// Internal Imports
import { useNavigate } from 'react-router-dom';

// Utils
import { cn } from 'utils/helper';

interface CompanyCardProps {
    icon: string;
    iconClassName?: string;
    label: string;
    companyId: string;
    description: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
    icon,
    iconClassName,
    label,
    companyId,
    description,
}) => {
    const navigate = useNavigate();

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
    }, [description, isExpanded]);

    return (
        <div className="shadow-light border-l-4 border-primary md:border-l-0 rounded-md p-4 w-full md:w-[300px] flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl overflow-hidden`,
                            iconClassName,
                        )}
                    >
                        <img
                            src={icon}
                            alt="company-icon"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <p className="flex-1 font-semibold">{label}</p>
                </div>
                <p
                    ref={textRef}
                    className={cn(
                        'text-base md:text-sm mt-4 md:mb-6 text-gray-500 md:text-black md:line-clamp-6 text-justify',
                        'transition-all duration-300',
                        isExpanded ? 'h-auto mb-6' : 'h-[72px] overflow-hidden',
                        'md:h-auto ',
                    )}
                >
                    {description}
                </p>
                {showSeeMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={cn(
                            'text-sm text-[#9C9C9C] text-right ',
                            'md:hidden mb-6 md:mb-0',
                        )}
                    >
                        {isExpanded ? '...show less' : '...see more'}
                    </button>
                )}
            </div>

            <Button
                label="Get Started"
                className="py-2 mt-6"
                onClick={() => {
                    navigate({
                        pathname: '/mock-interview/departments/company/job-roles',
                        search: new URLSearchParams({
                            companyId,
                            companyName: label,
                        }).toString(),
                    });
                }}
            />
        </div>
    );
};

export default CompanyCard;
