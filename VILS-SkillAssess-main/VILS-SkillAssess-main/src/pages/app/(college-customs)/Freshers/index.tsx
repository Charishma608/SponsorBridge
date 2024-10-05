import FullScreen from 'components/FullScreen';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ReadingLinks,
    VocabLinks,
    GrammarLinks,
    WritingLinks,
    SpeakingLinks,
    AptiLinks,
} from './links';
import { cn } from 'utils/helper';
import BackButton from 'components/Buttons/BackButton';
import Logo from 'assets/svgs/Logo.svg';

const KLUniversity = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
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
                                <h1 className="text-3xl font-bold my-6">Freshers Assessment</h1>
                            </div>
                            <p className="my-4 inter">
                                This assessment includes two different sections. The first section
                                comprises a Reading test followed by a Writing and Speaking test.
                                The second section involves a Grammar and Vocabulary test. You have
                                a total of 60 minutes to complete all sections. We suggest that you
                                finish the entire test in one go to ensure continuity.
                            </p>
                            <div className="inter">
                                <p>
                                    1. Once you start a test, you must complete it before exiting.
                                </p>
                                <p>
                                    2. For the Speaking tests, ensure you have a microphone and
                                    camera enabled.
                                </p>
                                <p>3. Using an ear/headphone is advisable for best results.</p>
                                <p>
                                    4. If an ear/headphone microphone is not available, make sure to
                                    sit within 30 centimetres of the microphone of your system to
                                    maintain test accuracy, as failure to do so may affect the
                                    reliability of your results.
                                </p>
                                <p>5. Ensure the background noise is at a minimum.</p>
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
                                    <TestCard
                                        title="Reading Test"
                                        time="14 Minutes"
                                        marks={30}
                                        totalQuestions={10}
                                        negativeMarking={0}
                                        description={`This Reading test is designed to evaluate your comprehension and critical thinking skills. It consists of 10 questions that need to be completed within 14 minutes. Make sure to read each question thoroughly before attempting the questions and manage your time effectively. Good luck!`}
                                        links={ReadingLinks}
                                        referenceId="reading"
                                    />
                                    <TestCard
                                        title="Writing Test"
                                        time="15 Minutes"
                                        marks={50}
                                        totalQuestions={1}
                                        negativeMarking={0}
                                        description={`This Writing test is designed to evaluate your articulate ideas, thoughts, and knowledge on a given topic using words and sentences. It consists of one essay question that needs to be completed within 15 minutes. Be prepared to write your thought process and provide detailed answers. Good luck!`}
                                        links={WritingLinks}
                                        referenceId="writing"
                                    />
                                    <TestCard
                                        title="Speaking Test"
                                        time="11 Minutes"
                                        marks={50}
                                        totalQuestions={10}
                                        negativeMarking={0}
                                        description={`This Speaking test is designed to evaluate your fluency, pronunciation and language proficiency. It consists of 10 questions that need to be completed within 11 minutes. Be honest and articulate your answers clearly. Good luck!`}
                                        links={SpeakingLinks}
                                        referenceId="speaking"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">SECTION 2</p>
                                <div className="mt-4 rounded border-2 border-primary flex flex-col divide-y-2 divide-primary overflow-hidden">
                                    <TestCard
                                        title="Grammar Test"
                                        time="15 Minutes"
                                        marks={0}
                                        totalQuestions={25}
                                        negativeMarking={0}
                                        description={`This Grammar section is designed to evaluate your, sentence structure, verb tenses, subject-verb agreement. It consists of 15 questions that need to be completed within 15 minutes. Ensure effective time management to attempt all questions. Good luck!
`}
                                        links={GrammarLinks}
                                        referenceId="grammar"
                                    />
                                    <TestCard
                                        title="Vocabulary Test"
                                        time="15 Minutes"
                                        marks={0}
                                        totalQuestions={10}
                                        negativeMarking={0}
                                        description={`This Vocabulary test is designed to evaluate your word knowledge, contextual usage and word formation. It consists of 15 questions that need to be completed within 15 minutes. Ensure effective time management to attempt all questions. Good luck!`}
                                        links={VocabLinks}
                                        referenceId="vocab"
                                    />
                                    <TestCard
                                        title="Aptitude Test"
                                        time="25 Minutes"
                                        marks={30}
                                        totalQuestions={30}
                                        negativeMarking={0}
                                        description={`This aptitude test is designed to assess your Logical Reasoning, Quantitative Aptitude and Critical Thinking. This test consists of 30 multiple-choice questions and you have a total of 30 minutes to complete it. Once the allotted time is over, the test will be automatically concluded, and you will be directed to the Gap analysis test home page.You can navigate back and forth between questions to review and correct your answers. Make sure to read each question thoroughly before attempting the questions and manage your time effectively. Good luck!`}
                                        links={AptiLinks}
                                        referenceId="faptitude"
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

    useEffect(() => {
        if (links.length > 0) {
            const randomIndex = Math.floor(Math.random() * links.length);
            setRandomLink(links[randomIndex] + `&referenceBackId=${referenceId}`);
        }
    }, [links, referenceId]);

    const isActive = window.localStorage.getItem(referenceId);

    return (
        <div className="p-4 shadow-md bg-slate-50">
            <p className="text-xl font-semibold">{title}</p>
            {/* <div className="flex items-center gap-6 my-2">
                <p className="text-sm">Time: {time}</p>
                <p className="text-sm">Total Questions: {totalQuestions}</p>
            </div> */}
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

export default KLUniversity;
