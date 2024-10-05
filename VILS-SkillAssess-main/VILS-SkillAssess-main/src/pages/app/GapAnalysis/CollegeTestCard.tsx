import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from 'utils/helper';

interface Props {
    id: string;
    name: string;
    description: string;
    path: string;
    buttonColor?: string;
    themeColor?: string;
    disabled?: boolean;
}

const CollegeTestCard = ({
    id,
    name,
    description,
    path,
    buttonColor,
    themeColor,
    disabled = false,
}: Props) => {
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
        <div
            className={cn(
                'bg-slate-50 border-2 rounded-2xl p-4 pt-5 w-[350px] overflow-hidden border-s-8 border-l-orange-500',
                themeColor,
                disabled && 'border-l-gray-500',
                'md:rounded-md',
            )}
        >
            <div className="flex flex-col">
                <h3 className="font-semibold">{name}</h3>

                <p
                    ref={textRef}
                    className={cn(
                        'text-base mt-3 md:mb-6 text-gray-500 text-justify',
                        'transition-all duration-300',
                        isExpanded ? 'h-auto mb-6' : 'h-[72px] overflow-hidden',
                        'md:h-[190px] md:overflow-hidden overflow-y-scroll',
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

                <button
                    onClick={() => {
                        navigate(`/gap-analysis/tests/${id}`);
                    }}
                    disabled={disabled}
                    className={cn(
                        'text-sm py-2 text-center bg-orange-500 rounded-full text-white',
                        buttonColor,
                        disabled && 'bg-gray-500 cursor-not-allowed',
                    )}
                >
                    Start Assessment
                </button>
            </div>
        </div>
    );
};

export default CollegeTestCard;
