import { cn } from 'utils/helper';
import Button from 'components/Buttons';
import { useNavigate } from 'react-router-dom';
import FullScreen from 'components/FullScreen';
import { useEffect, useRef, useState } from 'react';
import BackButton from 'components/Buttons/BackButton';
import AudioVideoCheckModal from './AudioVideoCheckModal';

const readingLinks: string[] = [];
const mockLinks: string[] = [];

export default function CCC() {
    const [instructionsRead, setInstructionsRead] = useState<boolean>(false);

    return (
        <>
            {instructionsRead ? (
                <TestCardsScreen />
            ) : (
                <InstructionsScreen setInstructionsRead={setInstructionsRead} />
            )}
        </>
    );
}

export function InstructionsScreen({
    setInstructionsRead,
}: {
    setInstructionsRead: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const signature = {
        key: 'vils-ccc-instructions-read-10-09-2024',
        value: 'signed',
    };
    const [showSystemCheckModal, setShowSystemCheckModal] = useState<boolean>(false);

    useEffect(() => {
        const val = window.localStorage.getItem(signature.key);
        if (val === signature.value) {
            setInstructionsRead(true);
        }
    }, [setInstructionsRead, signature.key, signature.value]);

    const openModal = () => {
        setShowSystemCheckModal(true);
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-white p-4 py-8 flex flex-col gap-4">
            {showSystemCheckModal ? (
                <AudioVideoCheckModal
                    onSuccess={() => {
                        setShowSystemCheckModal(false);
                        setInstructionsRead(true);
                        window.localStorage.setItem(signature.key, signature.value);
                    }}
                    onCancel={() => {
                        setShowSystemCheckModal(false);
                    }}
                />
            ) : null}
            {/* <div className="w-full">
                <h1 className="text-primary font-bold text-xl">निर्देश</h1>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-3">
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">स्वागत है ए.आई मॉक टू टॉक आकलन में!</h2>
                    <p className="mt-1">इस परीक्षा में दो मुख्य खंड हैं: 'भाषा अध्ययन' और 'मॉक इंटरव्यू'। दोनों खंड अनिवार्य हैं।</p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">कुल 17-19 मिनट</h2>
                    <p className="mt-1">भाषा अध्ययन: 2 मिनट</p>
                    <p className="mt-1">मॉक इंटरव्यू: 15 मिनट</p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">तकनीकी आवश्यकताएँ:</h2>
                    <p className="mt-1">इस आकलन के दौरान वीडियो और ऑडियो रिकॉर्डिंग आवश्यक है। सुनिश्चित करें कि कैमरा आपकी सीधी ओर है और आप स्पष्ट रूप से दिखाई दे रहे हैं। सर्वोत्तम अनुभव के लिए, मोबाइल कैमरा को आंखों के स्तर पर रखें। स्पष्ट और जोर से बोलें ताकि माइक्रोफोन आपकी आवाज को अच्छी तरह से कैच कर सके।</p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">मूल्यांकन मानदंड:</h2>
                    <p className="mt-1">यह परीक्षा आपकी भाषा पढ़ने की क्षमता और आपके करियर के लिए जरूरी कौशलों जैसे समस्या सुलझाना, स्थिति के अनुसार ढलना, निर्णय लेना, सोचने की क्षमता, प्राथमिकता तय करना, और रचनात्मकता का मूल्यांकन करती है।</p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">परीक्षण समाप्ति:</h2>
                    <p className="mt-1">आपको सभी खंडों को  पूरा करना होगा और अंत में पूर्ण आकलन के लिए सबमिट बटन दबाना होगा।</p>
                </div>
            </div> */}
            <div className="w-full">
                <h1 className="text-primary font-bold text-xl">Instructions</h1>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-3">
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">Welcome to the Ai Mock to Talk Assessment</h2>
                    <p className="mt-1">
                        This test has 2 sections: Language Reading & Mock Interview. Both sections
                        are mandatory!
                    </p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">Total Test duration is 17-19 mins</h2>
                    <p className="mt-1">Reading Section: 2 mins</p>
                    <p className="mt-1">Mock Interview: 15 mins</p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">System Requirements:</h2>
                    <p className="mt-1">
                        This assessment requires video and audio recording throughout the test.
                        Ensure that you are clearly visible in the camera, with the camera
                        positioned directly in front of you, not angled to either side. For the best
                        experience, place the mobile front camera at eye level. Speak loudly and
                        clearly so the microphone can capture your voice, as you would in a
                        professional setting.
                    </p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">Metrics Evaluated:</h2>
                    <p className="mt-1">
                        This test evaluates your language reading ability and the foundational
                        Skills required for your career - such as problem solving, adaptability to
                        situations, Decision making, Motivation, Critical Thinking, Prioritisation,
                        Creativity.
                    </p>
                </div>
                <div className="pb-3 border-b-2">
                    <h2 className="text-xl font-bold">Test Completion:</h2>
                    <p className="mt-1">
                        You have to complete all the sections in order and submit at the end to
                        complete the full assessment.
                    </p>
                </div>
            </div>
            <div>
                <Button
                    label="Proceed to System Check"
                    className="bg-[#377ECE] w-fit px-8 m-auto"
                    onClick={openModal}
                />
            </div>
        </div>
    );
}

export function TestCardsScreen() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore] = useState(false);
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const readingSignature = {
        key: 'vils-reading-ccc-10-09-24',
        value: 'signed',
    };
    const mockSignature = {
        key: 'vils-mock-ccc-10-09-24',
        value: 'signed',
    };

    useEffect(() => {
        if (
            window.localStorage.getItem(readingSignature.key) === readingSignature.value &&
            window.localStorage.getItem(mockSignature.key) === mockSignature.value
        ) {
            setSubmitButtonEnabled(true);
        }
    }, [mockSignature.key, mockSignature.value, readingSignature.key, readingSignature.value]);

    if (assessmentCompleted) {
        return (
            <div className="h-screen w-screen grid place-content-center inter bg-gradient-to-b from-slate-50 to-primary/50">
                {/* <h1 className="px-8 text-center">
                    आकलन पूरा करने के लिए धन्यवाद। आपकी रिपोर्ट जल्दी ही आपके ईमेल पर भेजी जाएगी। हम
                    आपके प्रयास की सराहना करते हैं।
                </h1> */}
                <h1 className="px-8 text-center">
                    Thank you for submitting your test! Your report will be generated shortly, and
                    we appreciate your patience in awaiting the results
                </h1>

                {/* <h1 className="px-8 text-center mt-4">You can now close the window peacefully.</h1> */}
            </div>
        );
    }
    return (
        <FullScreen>
            <div className="h-screen w-screen overflow-hidden flex flex-col pb-8">
                <div className="flex-1 overflow-y-scroll p-4 md:p-0 md:w-[60%] m-auto md:border-t-8 border-t-primary">
                    <div
                        ref={textRef}
                        className={cn(
                            'transition-all duration-300',
                            isExpanded ? 'h-auto' : 'h-[160px] overflow-hidden',
                            'md:h-auto ',
                        )}
                    >
                        {/* <div className="flex items-center gap-4">
                            <BackButton
                                onClick={() => {
                                    navigate('/gap-analysis');
                                }}
                            />
                            <h1 className=" text-xl md:text-3xl font-bold my-6">लेवल - 1 आकलन</h1>
                        </div>
                        <p className="my-4 inter">
                            इस परीक्षा में दो खंड हैं: 'भाषा अध्ययन' और 'मॉक इंटरव्यू'। दोनों खंडों
                            को पूरा करना अनिवार्य है। पूरे परीक्षण को पूरा करने के बाद, रिपोर्ट
                            प्राप्त करने के लिए 'सबमिट' बटन पर क्लिक करें।
                        </p> */}
                        <div className="flex items-center gap-4">
                            <BackButton
                                onClick={() => {
                                    navigate('/gap-analysis');
                                }}
                            />
                            <h1 className=" text-xl md:text-3xl font-bold my-6">
                                Level 1 - Assessment
                            </h1>
                        </div>
                        <p className="my-4 inter">
                            This assessment includes two sections - Reading & Mock Interview. You
                            will have to complete both these sections in sequence to complete the
                            entire test and then click submit to get the reports.
                        </p>
                        {/* <div className="inter">
                                <p>
                                    1. Once you start a test, you must complete it before exiting.
                                </p>
                                <p>
                                    2. For the Mock Interview and HR Interview tests, ensure you
                                    have a microphone and camera enabled.
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
                            </div> */}
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
                            <div className="mt-4 rounded-lg md:rounded  md:border-2 border-primary flex flex-col md:divide-y-2 md:divide-primary overflow-hidden">
                                {/* <TestCard
                                    title="भाषा अध्ययन"
                                    time="2 मिनट"
                                    marks={30}
                                    totalQuestions={' 1 (गद्यांश)'}
                                    negativeMarking={0}
                                    description={`ये परिक्षण यह देखने के लिए है कि आप कितनी जल्दी और सही तरीके से हिंदी पाठ पढ़ सकते हैं। आपका वीडियो और ऑडियो रिकॉर्ड किया जाएगा। पाठ को देखने के लिए स्क्रीन पर ऊपर की ओर स्वाइप करें। पढ़ाई पूरी करने के बाद, "stop answering" बटन पर क्लिक करें और फिर "submit" बटन पर क्लिक करें। शुभकामनाएं!`}
                                    links={readingLinks}
                                    referenceId="reading-ccc"
                                    onClick={() => {
                                        navigate(
                                            `/ccc/reading/test?key=${readingSignature.key}&value=${readingSignature.value}`,
                                        );
                                    }}
                                    signature={readingSignature}
                                />
                                <TestCard
                                    title="मॉक इंटरव्यू"
                                    time="15 मिनट"
                                    marks={50}
                                    totalQuestions={14}
                                    negativeMarking={0}
                                    description={`यह खंड आपके नौकरी के लिए जरूरी कौशल की जांच करेगा। आपका वीडियो और ऑडियो रिकॉर्ड किया जाएगा। आपको सामान्य सवालों के जवाब देने होंगे। कोई जवाब  सही या गलत नहीं हैं। हर सवाल का जवाब साफ-साफ दें और कम से कम 40 सेकंड तक बात करें।`}
                                    links={mockLinks}
                                    referenceId="mock-ccc"
                                    onClick={() => {
                                        navigate(
                                            `/ccc/mock/test?key=${mockSignature.key}&value=${mockSignature.value}`,
                                        );
                                    }}
                                    signature={mockSignature}
                                /> */}
                                <TestCard
                                    title="Reading Section"
                                    time="2 mins"
                                    marks={30}
                                    totalQuestions={' 1 Passage'}
                                    negativeMarking={0}
                                    description={`This reading test is designed to assess how well you can read an English passage out loud within a set time.  We will record both your video and audio. You can scroll through the passage by swiping up on your screen. When you're done reading, click the "stop answering" button, then click "submit" to finish. Good luck!`}
                                    links={readingLinks}
                                    referenceId="reading-ccc"
                                    onClick={() => {
                                        navigate(
                                            `/ccc/reading/test?key=${readingSignature.key}&value=${readingSignature.value}`,
                                        );
                                    }}
                                    signature={readingSignature}
                                />
                                <TestCard
                                    title="Mock Interview "
                                    time="15 mins"
                                    marks={50}
                                    totalQuestions={14}
                                    negativeMarking={0}
                                    description={`This Mock Interview Section is meant to check your Foundational Skills for your job. We will record both your video and audio. You'll answer everyday questions, and there are no right or wrong answers. Just respond based on your own thoughts after reading each question. Make sure your answers are related to the question and talk for at least 40 seconds for each question.`}
                                    links={mockLinks}
                                    referenceId="mock-ccc"
                                    onClick={() => {
                                        navigate(
                                            `/ccc/mock/test?key=${mockSignature.key}&value=${mockSignature.value}`,
                                        );
                                    }}
                                    signature={mockSignature}
                                />
                            </div>
                        </div>
                        <Button
                            label="Submit Assessment"
                            className={cn(
                                'px-8 m-auto w-fit',
                                submitButtonEnabled
                                    ? 'bg-primary-green'
                                    : 'bg-gray-400 cursor-not-allowed',
                            )}
                            disabled={!submitButtonEnabled}
                            onClick={() => {
                                setAssessmentCompleted(true);
                            }}
                        />
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
    totalQuestions: number | string;
    negativeMarking: number;
    description: string;
    links: string[];
    referenceId: string;
    onClick?: () => void;
    signature: {
        key: string;
        value: string;
    };
}

const TestCard: React.FC<TestCardProps> = ({
    title,
    time,
    signature,
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

    const isActive = window.localStorage.getItem(signature.key) === signature.value;

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
                {/* {isActive ? 'Completed' : 'टेस्ट शुरू करें'} */}
                {isActive ? 'Completed' : 'Start Test'}
            </button>
        </div>
    );
};
