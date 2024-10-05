// Components
import Button from 'components/Buttons';
import { useEffect, useRef, useState, useCallback } from 'react';
import SystemCheckModal from './SystemCheckModal';
// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import axiosInstance from 'configs/axios.config';

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
    instructionId: string;
    instructionType: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
    icon,
    iconClassName,
    label,
    companyId,
    description,
    instructionId,
    instructionType,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [systemcheckOpen, setSystemCheckOpen] = useState(false);
    const [instructionOpen, setInstructionOpen] = useState(false);
    const navigate = useNavigate();
    const [ok, setOk] = useState<boolean>(false);
    const [data, setData] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(false);
    const fetchTest = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance(
                `/instruction/${instructionType}/${instructionId}/details`,
            );

            setData(res?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [instructionId]);

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

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
        <>
            {instructionOpen && (
                <>
                    {isLoading ? (
                        <p className="font-inter">Loading ....</p>
                    ) : (
                        <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full h-full overflow-y-hidden z-50 grid place-content-center">
                            <div className="w-screen h-[100vh] px-[10%] m-auto pt-4 bg-white">
                                <div className="flex items-center justify-between py-4">
                                    <TextSubHeading className="text-primary">
                                        {label}
                                    </TextSubHeading>
                                    <img src={icon} alt="logo" className="h-10" />
                                </div>
                                <div className="flex flex-col gap-4 my-4 h-[70vh] overflow-y-scroll scroll">
                                    {data?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-2 py-4 border-b-[1.5px] border-gray-300"
                                        >
                                            <p className="font-semibold">{item.heading}</p>
                                            <p className="text-sm">{item.description}</p>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2">
                                        <input
                                            className="h-4 w-4"
                                            checked={ok}
                                            type="checkbox"
                                            onChange={() => setOk((prev) => !prev)}
                                        />
                                        <p className="font-semibold">I Understand</p>
                                    </div>

                                    <p className="font-semibold">
                                        Note: If you encounter any technical issues, please reach
                                        out to our support team.
                                    </p>
                                </div>
                                <div className="my-4 flex justify-end">
                                <Button
    label="Proceed for System Check"
    onClick={() => {
        if (!ok) return;
        setInstructionOpen(false);
        setSystemCheckOpen(true);
    }}
    className={`px-8 py-2 w-fit rounded-full transition-transform duration-300 ${
        ok
            ? 'bg-primary hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl cursor-pointer'
            : 'bg-slate-500 cursor-not-allowed'
    } text-white`}
/>

                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {systemcheckOpen && (
                <SystemCheckModal
                    onSuccess={() => {
                        setSystemCheckOpen(false);
                        navigate({
                            pathname: '/gap-analysis/tests/',
                            search: new URLSearchParams({
                                companyId,
                                companyName: label,
                            }).toString(),
                        });
                    }}
                    onCancel={() => {
                        setSystemCheckOpen(false);
                    }}
                />
            )}
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
    className="py-2 mt-6 bg-blue-500 text-white rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl"
    onClick={() => {
        setInstructionOpen(true);
    }}
/>

            </div>
        </>
    );
};

export default CompanyCard;
