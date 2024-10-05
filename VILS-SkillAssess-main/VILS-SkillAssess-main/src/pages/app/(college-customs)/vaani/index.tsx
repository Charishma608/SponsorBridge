import FullScreen from 'components/FullScreen';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ReadingLinks,
    VocabLinks,
    GrammarLinks,
    WritingLinks,
    DassLinks,
} from './links';
import { cn } from 'utils/helper';
import BackButton from 'components/Buttons/BackButton';
import Logo from 'assets/svgs/Logo.svg';
import axiosInstance from 'configs/axios.config';

const KLUniversity = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const navigate = useNavigate();
    const url = window.location.href;
    const test_id = url.split('/').pop();

    if (ref) {
        window.localStorage.setItem(ref, 'true');
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    const generateLinks = (type: string, idList: any) => {
        const links: string[] = [];
        // Generate links based on the assessment type
        if (type === 'READING') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(
                    `/communication/reading-module/test?id=${e}&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'SPEAKING') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(
                    `/communication/speaking-module/test?id=${e}&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'WRITING') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(
                    `/communication/writing-module/test?id=${e}&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'LISTENING') {
            idList.map((e: string) =>
                links.push(
                    `/communication/listening-module/test?id=${e}&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'GRAMMAR') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(
                    `/communication/grammar-module/level/assessment/test?id=${e}&instructions=true&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'DASS') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(`/behaviour/dass-module/test?id=${e}&iId=${idList.instruction_id}`),
            );
        } else if (type === 'VOCABULARY') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(
                    `/communication/vocabulary-module/level/assessment/test?id=${e}&instructions=true&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'APTITUDE') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(`/aptitude/test?id=${e}&iId=${idList.instruction_id}`),
            );
        } else if (type === 'CODING') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(
                    `/coding/test?id=${e}&title=Adobe+Online+Assessment-1&iId=${idList.instruction_id}`,
                ),
            );
        } else if (type === 'MOCK_INTERVIEW') {
            idList?.departments.map((e: any) =>
                e.job_roles?.map((job: any) =>
                    job?.list_of_assessment_ids.map((e: string) =>
                        links.push(`/mock-interview/test?id=${e}&iId=${idList.instruction_id}`),
                    ),
                ),
            );
        } else if (type === 'HR_INTERVIEW') {
            idList.list_of_assessment_ids.map((e: string) =>
                links.push(`/hr/test?id=${e}&iId=${idList.instruction_id}`),
            );
        }

        return links;
    };

    const generateReference = (name: any, type: string): string => {
        let ref: string = '';
        if (type === 'READING') {
            ref = `${name} reading`;
        } else if (type === 'SPEAKING') {
            ref = `${name} speaking`;
        } else if (type === 'WRITING') {
            ref = `${name} writing`;
        } else if (type === 'LISTENING') {
            ref = `${name} listening`;
        } else if (type === 'GRAMMAR') {
            ref = `${name} grammar`;
        } else if (type === 'DASS') {
            ref = `${name} dass`;
        } else if (type === 'VOCABULARY') {
            ref = `${name} vocab`;
        } else if (type === 'APTITUDE') {
            ref = `${name} aptitude`;
        } else if (type === 'CODING') {
            ref = `${name} coding`;
        } else if (type === 'MOCK_INTERVIEW') {
            ref = `${name} mock`;
        } else if (type === 'HR_INTERVIEW') {
            ref = `${name} hr`;
        }

        return ref;
    };

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

    const [instructions, setInstructions] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [sections, setSections] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axiosInstance.get(`/gap-analysis/assessment/${test_id}/details`);
            setName(res?.data?.name);
            setInstructions(res?.data?.instructions);
            setSections(res?.data?.sections);
        }
        fetchData();
    }, [test_id]);

    return (
        <FullScreen>
            <div className="h-screen w-screen overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-scroll p-4 md:p-0 md:w-[60%] m-auto md:border-t-8 border-t-primary">
                    <div className="flex items-center justify-end">
                        <img src={Logo} alt="logo" className="h-10" />
                    </div>
                    <div
                        ref={textRef}
                        className={cn(
                            'transition-all duration-300',
                            isExpanded ? 'h-auto' : 'h-[160px] overflow-hidden',
                            'md:h-auto',
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <BackButton
                                onClick={() => {
                                    navigate(-1);
                                }}
                            />
                            <h1 className="text-xl md:text-3xl font-bold my-6">{name}</h1>
                        </div>
                        <p className="my-4 inter font-semibold">Instructions:</p>
                        <div className="inter">
                            {instructions?.map((instruction, index) => (
                                <p key={index} className="mb-2">
                                    {index + 1}. {instruction}
                                </p>
                            ))}
                            <p className="my-3 font-medium text-primary">
                                Wishing you the best of luck!
                            </p>
                        </div>
                    </div>
                    {/* Show "see more" button only on larger screens */}
                    {showSeeMore && !isExpanded && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="text-sm w-full text-[#9C9C9C] text-right mb-6 md:mb-0"
                        >
                            ...see more
                        </button>
                    )}
                    {isExpanded && (
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="text-sm w-full text-[#9C9C9C] text-right mb-6 md:mb-0"
                        >
                            ...show less
                        </button>
                    )}

                    <div className="inter flex flex-col gap-6 mt-8 mb-8">
                        {sections &&
                            sections?.map((e, index) => (
                                <div key={index}>
                                    <p className="text-lg font-semibold">{e.name}</p>
                                    <div className="mt-4 rounded-lg md:rounded md:border-2 border-primary flex flex-col md:divide-y-2 md:divide-primary overflow-hidden">
                                        {e.assessments.map((assessment: any, index: any) => {
                                            const links = generateLinks(assessment.type, assessment);
                                            const ref = generateReference(test_id, assessment.type);

                                            return (
                                                <TestCard
                                                    key={index}
                                                    title={assessment.name}
                                                    time={`${assessment.duration_in_minutes} minutes`}
                                                    marks={30}
                                                    totalQuestions={assessment.number_of_questions}
                                                    negativeMarking={0}
                                                    description={assessment.description}
                                                    links={links}
                                                    referenceId={ref}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
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

const TestCard: React.FC<TestCardProps> = (props) => {
    const {
        title,
        time,
        marks,
        totalQuestions,
        description,
        links,
        referenceId,
        onClick,
    } = props;

    const [randomLink, setRandomLink] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (links.length > 0) {
            const randomIndex = Math.floor(Math.random() * links.length);
            if (referenceId) setRandomLink(links[randomIndex] + `&referenceBackId=${referenceId}`);
            else setRandomLink(links[randomIndex]);
        }
    }, [links, referenceId]);

    const isActive = window.localStorage.getItem(referenceId);
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

    return (
        <div className="p-4 shadow-lg rounded-lg border-l-4 md:border-l-0 border-l-primary md:rounded-none mb-3 md:mb-0 md:shadow-md bg-slate-50">
            <p className="text-xl font-semibold">{title}</p>
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
                        else {
                            window.localStorage.setItem(referenceId, referenceId);
                            navigate(randomLink);
                        }
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
