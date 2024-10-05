import { cn } from 'utils/helper';
import { useEffect, useRef, useState } from 'react';
import FullScreen from 'components/FullScreen';
import BackButton from 'components/Buttons/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import DepartmentsSelcetorModal from './DepartmentsSelcetorModal';
import { AptiLinks, CodingLinks, HRLinks, MockLinks } from './links';
import Logo from 'assets/svgs/Logo.svg';
import { useAuth } from 'providers/AuthProvider';
import axiosInstance from 'configs/axios.config';

const KLUniversity = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const { user } = useAuth();
    const domain = user?.email?.split('@')?.[1] || '';

    if (ref) {
        window.localStorage.setItem(ref, 'true');
    }
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    const generateLinks = (type: string, idList: any) => {
        const links: string[] = [];
        if (type === 'APTITUDE') {
            idList.map((e: string) => links.push(`/aptitude/test?id=${e}&ref=klu`));
        } else if (type === 'CODING') {
            idList.map((e: string) =>
                links.push(`/coding/test?id=${e}&title=Adobe+Online+Assessment-1&ref=klu`),
            );
        } else if (type === 'MOCK_INTERVIEW') {
            console.log('1', idList);

            idList?.map((e: any) =>
                e.job_roles?.map((job: any) =>
                    job?.list_of_assessment_ids.map((e: string) =>
                        // https://localhost:3000/mock-interview/test?id=mock-interview-assessment-07e6ccce-9d9c-474b-a7a9-a0c9677da920
                        links.push(`/mock-interview/test?id=${e}`),
                    ),
                ),
            );

            //idList?.map((e: string) => links.push(`/mock-interview/departments?id=${e}`));
        } else if (type === 'HR_INTERVIEW') {
            idList.map((e: string) => links.push(`/hr/test?id=${e}&ref=klu`));
        }

        return links;
    };

    const generateReference = (type: string) => {
        let ref: string = '';
        if (type === 'APTITUDE') {
            ref = 'aptitude';
        } else if (type === 'CODING') {
            ref = 'coding';
        } else if (type === 'MOCK_INTERVIEW') {
            ref = 'mock';
        } else if (type === 'HR_INTERVIEW') {
            ref = 'hr';
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
    const [instructions, setIntructions] = useState<any[]>();
    const [sections, setSections] = useState<any[]>();
    useEffect(() => {
        async function f() {
            const res = await axiosInstance.get(
                '/gap-analysis/assessment/gap-analysis-assessment-16be2631-2454-445f-abca-39e08b42d19b/details',
            );
            console.log(res.data);
            setIntructions(res?.data?.instructions);
            setSections(res?.data?.sections);
        }
        f();
    }, []);
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
                                    Technical Assessment
                                </h1>
                            </div>
                            <p className="my-4 inter">{instructions && instructions[0]}</p>
                            <div className="inter">
                                <p>1. {instructions && instructions[1]}</p>
                                {/* <p>
                                    2. For the Speaking tests, ensure you have a microphone and
                                    camera enabled.
                                </p> */}
                                <p>2. {instructions && instructions[2]}</p>
                                <p>3. {instructions && instructions[3]}</p>
                                <p>4. {instructions && instructions[4]}</p>
                                <p>5. {instructions && instructions[5]}</p>
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
                            <div className="inter flex flex-col gap-6 mt-8 mb-28">
                                {sections &&
                                    sections?.map((e, index) => (
                                        <div key={index}>
                                            <p className="text-lg font-semibold">{e.name}</p>
                                            <div className="mt-4 rounded-lg  md:rounded  md:border-2 border-primary flex flex-col md:divide-y-2 md:divide-primary overflow-hidden">
                                                {e.assessments.map((e: any, index: any) => {
                                                    let links;
                                                    if (e.type === 'MOCK_INTERVIEW') {
                                                        links = generateLinks(
                                                            e.type,
                                                            e.departments,
                                                        );
                                                    } else {
                                                        links = generateLinks(
                                                            e.type,
                                                            e.list_of_assessment_ids,
                                                        );
                                                    }

                                                    const ref = generateReference(e.type);
                                                    console.log('links', links);

                                                    return (
                                                        <TestCard
                                                            key={index}
                                                            title={e.name}
                                                            time={`${e.duration_in_minutes} minutes`}
                                                            marks={30}
                                                            totalQuestions={e.number_of_questions}
                                                            negativeMarking={0}
                                                            description={e.description}
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
        if (links.length > 0) {
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

export default KLUniversity;
