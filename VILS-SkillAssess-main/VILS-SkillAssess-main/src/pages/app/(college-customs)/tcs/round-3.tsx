import { cn } from 'utils/helper';
import { useEffect, useRef, useState } from 'react';
import FullScreen from 'components/FullScreen';
import BackButton from 'components/Buttons/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import DepartmentsSelcetorModal from './DepartmentsSelcetorModal';
import { CodingLinks, HRLinks, MockLinks } from './links';
import Logo from 'assets/svgs/Logo.svg';

const TCS = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    if (ref) {
        window.localStorage.setItem(ref, 'true');
    }
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
                {modal && (
                    <DepartmentsSelcetorModal
                        onClose={() => {
                            setModal(false);
                        }}
                    />
                )}
                <div className="h-screen w-screen overflow-hidden flex flex-col pb-8">
                    <div className="flex-1 overflow-y-scroll p-4 md:p-0 md:w-[60%] m-auto md:border-t-8 border-t-primary">
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
                                <h1 className=" text-xl md:text-3xl font-bold my-6">
                                    TCS CodeVita (Round 3)
                                </h1>
                            </div>
                            <p className="my-4 inter">TCS CodeVita is an annual global coding competition organized by Tata Consultancy Services (TCS). It aims to promote programming as a sport and encourage students to showcase their coding skills. Participants are challenged to solve a set of complex algorithmic problems within a stipulated time frame.</p>
                            <div className="inter">
                                <p>1. The test consists of 10 questions, each with a 45-minute time limit.</p>
                                <p>2. Ensure your code compiles and executes correctly for each problem.</p>
                                <p>3. Select your programming language carefully at the start of each problem.</p>
                                <p>4. Maintain a stable testing environment and ensure a reliable internet connection throughout.</p>
                                <p>5. The test is proctored—any use of third-party applications will result in immediate disqualification.</p>
                                <p>6. Plagiarism will lead to instant disqualification.</p>
                                <p>7. Review and optimize your solutions before clicking submit.</p>
                                <p>8. After submitting your code in the compiler, exit the test, then click the Submit button on the start test page to complete the submission.</p>
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

                        <div className="inter flex flex-col gap-6 mt-8 mb-28">
                            <div>
                                <p className="text-lg font-semibold">SECTION 1</p>
                                <div className="mt-4 rounded-lg  md:rounded  md:border-2 border-primary flex flex-col md:divide-y-2 md:divide-primary overflow-hidden">
                                    <TestCard
                                        title="Coding Test 1"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[0]]}
                                        referenceId="coding-1"
                                    />
                                    <TestCard
                                        title="Coding Test 2"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[1]]}
                                        referenceId="coding-2"
                                    />
                                    <TestCard
                                        title="Coding Test 3"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[2]]}
                                        referenceId="coding-3"
                                    />
                                    <TestCard
                                        title="Coding Test 4"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[3]]}
                                        referenceId="coding-4"
                                    />
                                    <TestCard
                                        title="Coding Test 5"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[4]]}
                                        referenceId="coding-5"
                                    />
                                    <TestCard
                                        title="Coding Test 6"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[5]]}
                                        referenceId="coding-6"
                                    />
                                    <TestCard
                                        title="Coding Test 7"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[6]]}
                                        referenceId="coding-7"
                                    />
                                    <TestCard
                                        title="Coding Test 8"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[7]]}
                                        referenceId="coding-8"
                                    />
                                    <TestCard
                                        title="Coding Test 9"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[8]]}
                                        referenceId="coding-9"
                                    />
                                    <TestCard
                                        title="Coding Test 10"
                                        time="45 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This coding test is designed to evaluate your programming skills and problem-solving abilities. It consists of 1 coding problem that needs to be completed within 45 minutes.\n\nMake sure to write clean, efficient code and manage your time effectively. Good luck!`}
                                        links={[CodingLinks[0]]}
                                        referenceId="coding-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">SECTION 2</p>
                                <div className="mt-4 rounded-lg  md:rounded  md:border-2 border-primary flex flex-col md:divide-y-2 md:divide-primary overflow-hidden">
                                    <TestCard
                                        title="Mock Interview"
                                        time="11 Minutes"
                                        marks={0}
                                        totalQuestions={10}
                                        negativeMarking={0}
                                        description={`This test is designed to simulate a real interview environment and assess your technical expertise in specific skills or knowledge related to a particular subject or field. This section consists of 10 questions, with a total of 11 minutes allocated, giving you approximately 1 minute and 5 seconds per question. Be prepared to explain your thought process and provide detailed answers. Good luck!`}
                                        links={MockLinks}
                                        referenceId="mock"
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                    />
                                    <TestCard
                                        title="HR Interview"
                                        time="11 Minutes"
                                        marks={0}
                                        totalQuestions={10}
                                        negativeMarking={0}
                                        description={`This test is designed to evaluate your adaptability and alignment with organizational values and includes questions about your background, experiences, and career aspirations. The section comprises 10 questions, with a total time allotment of 11 minutes, giving you 1 minute and 5 seconds per question. Be honest and articulate your answers clearly. Good luck!`}
                                        links={HRLinks}
                                        referenceId="hr"
                                    />
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
    links: string[];
    referenceId: string;
    onClick?: () => void;
}

const TestCard: React.FC<TestCardProps> = ({
    title,
    time,
    marks,
    totalQuestions,
    description,
    links,
    referenceId,
    onClick,
}) => {
    const [randomLink, setRandomLink] = useState<string>('');
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
    }, [isExpanded]);

    useEffect(() => {
        if (links?.length > 0) {
            const randomIndex = Math.floor(Math.random() * links.length);
            setRandomLink(links[randomIndex] + `&referenceBackId=${referenceId}`);
        }
    }, [links, referenceId]);

    const isActive = window.localStorage.getItem(referenceId);

    return (
        <div className="p-4 shadow-lg rounded-lg border-l-4 md:border-l-0 border-l-primary md:rounded-none mb-3 md:mb-0  md:shadow-md bg-slate-50">
            <p className="text-xl font-semibold">{title}</p>
            <div className="flex items-center gap-6 my-2">
                <p className="text-sm">Time: {time}</p>
                <p className="text-sm">Total Questions: {totalQuestions}</p>
            </div>
            <div className="mt-4 mb-8">
                <p
                    ref={textRef}
                    className={cn(
                        'transition-all duration-300',
                        isExpanded ? 'h-auto' : 'h-[75px] overflow-hidden',
                        'md:h-auto ',
                        'text-sm text-gray-700',
                    )}
                >
                    {description}
                </p>
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

export default TCS;
