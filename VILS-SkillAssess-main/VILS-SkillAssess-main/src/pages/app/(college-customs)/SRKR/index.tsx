import FullScreen from 'components/FullScreen';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CodingLinks } from './links';
import { cn } from 'utils/helper';
import BackButton from 'components/Buttons/BackButton';
import Logo from 'assets/svgs/Logo.svg';

const SRKRUniversity = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const navigate = useNavigate();

    if (ref) {
        window.localStorage.setItem(ref, 'true');
    }
    const [uniqueLinks, setUniqueLinks] = useState<string[]>([]);

    useEffect(() => {
        const generateUniqueLinks = () => {
            const usedIndices: number[] = [];
            const generatedLinks: string[] = [];

            while (generatedLinks.length < 2 && generatedLinks.length < CodingLinks.length) {
                const randomIndex = Math.floor(Math.random() * CodingLinks.length);
                if (!usedIndices.includes(randomIndex)) {
                    usedIndices.push(randomIndex);
                    generatedLinks.push(CodingLinks[randomIndex]);
                }
            }

            setUniqueLinks(generatedLinks);
        };

        generateUniqueLinks();
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

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
    }, [isExpanded]);
    return (
        <FullScreen>
            <>
                <div className="h-screen w-screen overflow-hidden flex flex-col pb-8">
                    <div className="flex-1 overflow-y-scroll w-[60%] m-auto border-t-8 border-t-primary">
                        <div className="flex md:hidden items-center justify-end">
                            <img src={Logo} alt="logo" className="h-10" />
                        </div>
                        <div
                            ref={textRef}
                            className={cn(
                                'transition-all duration-300',
                                isExpanded ? 'h-auto' : 'h-[160px] overflow-hidden',
                                'md:h-auto ',
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <BackButton
                                    onClick={() => {
                                        navigate('/gap-analysis');
                                    }}
                                />
                                <h1 className="text-3xl font-bold my-6">
                                    Assetsense Mock Test 2024
                                </h1>
                            </div>
                            <p className="my-4 inter">
                                This assessment includes three problem statements. We suggest that
                                you complete the entire test in one go to ensure continuity.
                            </p>
                            <div className="inter">
                                <p>
                                    1. Once started, the test must be completed without
                                    interruption.
                                </p>
                                <p>
                                    2. A total test duration of 1 hours and 30 minutes along with 15
                                    mins grace period in total you will have 1hrs 45mins to complete
                                    this test.
                                </p>
                                <p>
                                    3. Ensure your code compiles and executes correctly for each
                                    task.
                                </p>
                                <p>4. Select your programming language carefully.</p>
                                <p>
                                    5. Maintain a stable environment and a reliable internet
                                    connection.
                                </p>
                                <p>
                                    6. Your test is being proctored any indication of third party
                                    applications your test will be disqualified.
                                </p>
                                <p>7. Plagiarism will lead to immediate disqualification.</p>
                                <p>
                                    8. There will be hidden test cases. Make sure to review and
                                    refine your solutions before submitting.
                                </p>
                                <p>
                                    9. You can compile and test your code as many times you want but
                                    once you have submitted or exited a test you won't be able to
                                    come back to the test.
                                </p>
                                <p className="my-3 font-medium text-primary">
                                    Wishing you the best of luck!
                                </p>
                            </div>
                        </div>
                        {showSeeMore && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={cn(
                                    'text-sm w-full text-[#9C9C9C] text-right ',
                                    'md:hidden mb-6 md:mb-0',
                                )}
                            >
                                {isExpanded ? '...show less' : '...see more'}
                            </button>
                        )}

                        <div className="inter flex flex-col gap-6 mt-8">
                            <div>
                                <p className="text-lg font-semibold">SECTION 1</p>
                                <div className="mt-4 rounded border-2 border-primary flex flex-col divide-y-2 divide-primary overflow-hidden">
                                    {uniqueLinks.map((link, index) => (
                                        <TestCard
                                            title={`Coding Test-${index + 1}`}
                                            time="45 Minutes"
                                            marks={50}
                                            totalQuestions={1}
                                            negativeMarking={0}
                                            description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                            link={link}
                                            referenceId={`coding-${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </FullScreen>
    );
};

interface TestCardProps {
    title: string;
    time: string;
    marks: number;
    totalQuestions: number;
    negativeMarking: number;
    description: string;
    link: string;
    referenceId: string;
    onClick?: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
    title,
    time,
    marks,
    totalQuestions,
    description,
    link,
    referenceId,
    onClick,
}) => {
    const [randomLink, setRandomLink] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        setRandomLink(link + `&referenceBackId=${referenceId}`);
    }, [link, referenceId]);

    const isActive = window.localStorage.getItem(referenceId);

    return (
        <div className="p-4 shadow-md bg-slate-50">
            <p className="text-xl font-semibold">{title}</p>
            <div className="flex items-center gap-6 my-2">
                <p className="text-sm">Time: {time}</p>
                <p className="text-sm">Total Questions: {totalQuestions}</p>
            </div>
            <div className="mt-4 mb-8">
                <p className="text-sm text-gray-700">{description}</p>
            </div>
            <button
                onClick={() => {
                    if (!isActive) {
                        if (onClick) onClick();
                        else navigate(randomLink);
                    }
                }}
                className={cn(
                    'py-2 px-8 rounded-full',
                    isActive
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-primary text-white',
                )}
            >
                {isActive ? 'Completed' : 'Start Test'}
            </button>
        </div>
    );
};

export default SRKRUniversity;
