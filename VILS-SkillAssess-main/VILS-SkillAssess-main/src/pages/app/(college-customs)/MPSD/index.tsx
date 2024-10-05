import BackButton from 'components/Buttons/BackButton';
import FullScreen from 'components/FullScreen';
import { useNavigate } from 'react-router-dom';
import {
    ReadingLinks,
    VocabLinks,
    GrammarLinks,
    WritingLinks,
    SpeakingLinks,
    AptiLinks,
} from './links';
import { cn } from 'utils/helper';
import { useState, useEffect, useRef } from 'react';
import DepartmentsSelcetorModal from './DepartmentsSelcetorModal';
import TechDepartmentsSelcetorModal from './TechnicalTestModal';
import Logo from 'assets/svgs/Logo.svg';
/*
    // Speaking
        - speaking-assessment-deeb69f9-4417-487b-9a74-acc6384f171b
*/
export default function Mpsd() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [techModal, setTechModal] = useState(false);

    const behaviouralTestLink = 'https://forms.gle/Myy5Wsq7ebyeADYA8';
    // const electrianTechnicalTestID = "technical-mcq-assessment-1c43ba45-8183-4a0e-bed1-6edbdfa74a6e";
    // const computerOperatorTechnicalTestID = "technical-mcq-assessment-295e13ea-9d18-4ca2-bfa1-d8f910f7b1c8";
    // const computerOperatorMockTestID = "mock-interview-assessment-jgh48g-5e0b-4440-912d-fe56ef3e36aa-aj-fjghg-sidhfj";
    // const electrianMockTestID = "mock-interview-assessment-sfwytfkrg-dufgyg-e36aa-aj-fjghg-sidhfj";
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
            {modal && (
                <DepartmentsSelcetorModal
                    onClose={() => {
                        setModal(false);
                    }}
                />
            )}
            {techModal && (
                <TechDepartmentsSelcetorModal
                    onClose={() => {
                        setTechModal(false);
                    }}
                />
            )}

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
                            <h1 className="text-3xl font-bold my-6">MPSD Assessment</h1>
                        </div>
                        <p className="my-4 inter">
                            This assessment includes three different sections. The first section
                            evaluates communication, the second section evaluates technical skills,
                            and the final section evaluates behavior.(यह मूल्यांकन तीन अलग-अलग
                            अनुभागों में विभाजित है। पहला अनुभाग communication का मूल्यांकन करता है,
                            दूसरा अनुभाग तकनीकी कौशल का मूल्यांकन करता है, और अंतिम अनुभाग व्यवहार
                            का मूल्यांकन करता है।)
                        </p>
                        <div className="inter flex flex-col gap-3">
                            <p>
                                1. Once you start a test, you must complete it before exiting.(एक
                                बार जब आप परीक्षा शुरू करते हैं, तो उसे पूरा किए बिना बाहर नहीं निकल
                                सकते।)
                            </p>
                            <p>
                                2. For the Mock Interview and speaking tests, ensure you have a
                                microphone and camera enabled.(मॉक इंटरव्यू और बोलने की परीक्षाओं के
                                लिए, सुनिश्चित करें कि आपके पास माइक्रोफोन और कैमरा सक्षम हैं।)
                            </p>
                            <p>
                                3. Using an ear/headphone is advisable for best results.(सर्वोत्तम
                                परिणामों के लिए ईयरफोन/हेडफोन का उपयोग करना सलाहसहित है।)
                            </p>
                            <p>
                                4. If an ear/headphone microphone is not available, make sure to sit
                                within 30 centimetres of the microphone of your system to maintain
                                test accuracy, as failure to do so may affect the reliability of
                                your results.(यदि ईयरफोन/हेडफोन माइक्रोफोन उपलब्ध नहीं है, तो अपने
                                सिस्टम के माइक्रोफोन से 30 सेंटीमीटर के भीतर बैठना सुनिश्चित करें
                                ताकि परीक्षण की सटीकता बनाए रखी जा सके, क्योंकि ऐसा न करने से आपके
                                परिणामों की विश्वसनीयता प्रभावित हो सकती है।)
                            </p>
                            <p>
                                5. Ensure the background noise is at a minimum.(पृष्ठभूमि शोर को
                                न्यूनतम रखने का सुनिश्चित करें।)
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
                                <TestCard
                                    title="Grammar Test"
                                    time="15 Minutes"
                                    marks={0}
                                    totalQuestions={25}
                                    negativeMarking={0}
                                    description={`This Grammar section is designed to evaluate your, sentence structure, verb tenses, subject-verb agreement. It consists of 15 questions that need to be completed within 15 minutes. Ensure effective time management to attempt all questions. Good luck!`}
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
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">SECTION 2</p>
                            <div className="mt-4 rounded border-2 border-primary flex flex-col divide-y-2 divide-primary overflow-hidden">
                                <TestCard
                                    title="Technical Test"
                                    time="25 Minutes"
                                    marks={30}
                                    totalQuestions={30}
                                    negativeMarking={0}
                                    description={`This technical test is designed to assess the technical skills in your domain. This test consists of 30 MCQs and you have 30 minutes to complete the test.(यह तकनीकी परीक्षा आपके क्षेत्र में तकनीकी कौशल का आकलन करने के लिए डिज़ाइन की गई है। इस परीक्षा में 30 बहुविकल्पीय प्रश्न होते हैं और आपको परीक्षा पूरी करने के लिए 30 मिनट का समय दिया जाता है।)`}
                                    links={[]}
                                    referenceId="faptitude"
                                    onClick={() => {
                                        setModal(false);
                                        setTechModal(true);
                                    }}
                                />
                                <TestCard
                                    title="Mock Interview"
                                    time="25 Minutes"
                                    marks={30}
                                    totalQuestions={30}
                                    negativeMarking={0}
                                    description={`This technical mock interview test is designed to assess the technical confidence in your domain. This test consists of 6-7 questions and you have 7 minutes to complete the test.(यह तकनीकी मॉक इंटरव्यू परीक्षा आपके क्षेत्र में तकनीकी आत्मविश्वास का आकलन करने के लिए डिज़ाइन की गई है। इस परीक्षा में 6-7 प्रश्न होते हैं और आपको परीक्षा पूरी करने के लिए 7 मिनट का समय दिया जाता है।)`}
                                    links={AptiLinks}
                                    referenceId="faptitude"
                                    onClick={() => {
                                        setModal(true);
                                        setTechModal(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">SECTION 3</p>
                            <div className="mt-4 rounded border-2 border-primary flex flex-col divide-y-2 divide-primary overflow-hidden">
                                <TestCard
                                    title="Behavioural Test"
                                    time="25 Minutes"
                                    marks={30}
                                    totalQuestions={30}
                                    negativeMarking={0}
                                    description={`This behavior test is designed to assess your behavior with respect to your personal and professional life.(यह व्यवहार परीक्षण आपके व्यक्तिगत और पेशेवर जीवन के संदर्भ में आपके व्यवहार का आकलन करने के लिए डिज़ाइन किया गया है`}
                                    links={[
                                        'https://docs.google.com/forms/d/e/1FAIpQLScciHGXxK6HZAeYnSgtpjcwyu_CdCb_GaH6qXM-UjFbzUM7pA/viewform',
                                    ]}
                                    referenceId="faptitude"
                                    onClick={() => {
                                        window.location.replace(behaviouralTestLink);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullScreen>
    );
}

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
