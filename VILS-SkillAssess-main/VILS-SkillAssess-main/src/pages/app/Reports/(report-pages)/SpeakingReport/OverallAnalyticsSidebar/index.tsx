// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import DropDown from 'components/DropDown';
import LineChart from './LineChart';
import ToneLevelLineChart from './ToneLevelLineChart';

// Hooks
import { useSpeakingReportsContext } from '../SpeakingReportProvider';

interface OverallAnalyticsSidebarProps {
    isSidebarOpened: boolean;
}

const OverallAnalyticsSidebar: React.FC<OverallAnalyticsSidebarProps> = ({ isSidebarOpened }) => {
    const { data, getWPMLabel, getConfidenceLabel, getPitchLevelLabel } =
        useSpeakingReportsContext();
    const fillerWords = data?.scores?.filler_words ? Object.keys(data?.scores?.filler_words) : [];

    const wpmScore = parseInt(data?.scores?.word_per_min);
    const wpmScoreLabel = getWPMLabel(wpmScore);
    const pitchLevel = parseInt(data?.scores?.pitch);
    const pitchLevelLabel = getPitchLevelLabel(pitchLevel);
    const confidenceScoreLabel = getConfidenceLabel(parseInt(data?.scores?.confidence));

    const IELTSValue = data?.scores?.ielts_band * 10;
    const IELTSColor = IELTSValue >= 80 ? '#39D389' : IELTSValue >= 60 ? '#40A2D8' : '#FC6736';

    return (
        <div
            className={`${
                isSidebarOpened ? 'w-[30%]' : 'w-0'
            } h-full overflow-y-scroll transition-all duration-100 border-l-[1.5px] border-gray-300 flex flex-col`}
        >
            <div className="py-2 text-center bg-[#BAE2FD] shadow-light">
                <p className="font-semibold text-dark">Overall Analytics</p>
            </div>
            <div className="flex-1 overflow-y-scroll flex flex-col gap-4 p-2">
                <DropDown
                    label="Pronunciation"
                    tooltip="Assesses clarity, accuracy, and naturalness of your answer"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.scores?.pronunciation}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.pronunciation_content}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="Fluency"
                    tooltip="Evaluates how smoothly and effortlessly you can speak, with minimal hesitation"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.scores?.fluency}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.fluency_content}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="Vocabulary"
                    tooltip="Examines your range and complexity of words you use to express yourself"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.scores?.vocabulary}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.vocabulary_content}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="Grammar"
                    tooltip="Analyzes your sentence structure and verb usage for accuracy and appropriateness"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.scores?.grammar}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.grammar_content}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="Words Per Minute"
                    tooltip="Measures your speaking rate per minute to assess clarity and efficiency"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="flex flex-col gap-1 p-8">
                                <p
                                    className={`text-7xl font-bold text-center`}
                                    style={{
                                        color: wpmScoreLabel.color,
                                    }}
                                >
                                    {wpmScore}
                                </p>
                                <p className="font-semibold text-center text-lg">
                                    {wpmScoreLabel.label}
                                </p>
                            </div>
                        </div>
                        <p className="text-center">{data?.scores?.word_per_min_content}</p>
                    </div>
                    <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                        <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                            <p className="font-semibold text-sm text-center">
                                Question Wise Fluctuation 📈
                            </p>
                        </div>
                        <div className="py-2 h-[200px]">
                            <LineChart type="wpm" />
                        </div>
                        <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                            Q: Question
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Pitch Level"
                    tooltip="Assesses your answers like how high or low your voice goes, by evaluating how you use it for emphasis and variety"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="flex flex-col gap-1 py-4 pb-2">
                                <p className="text-center text-lg">
                                    Your average Pitch is {pitchLevel} Hz
                                </p>
                                <p
                                    className="font-semibold text-center text-2xl"
                                    style={{ color: pitchLevelLabel.color }}
                                >
                                    {pitchLevelLabel.label}
                                </p>
                            </div>
                        </div>
                        <p className="text-center">{data?.scores?.pitch_content}</p>
                    </div>
                    <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                        <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                            <p className="font-semibold text-sm text-center">
                                Question Wise Fluctuation 📈
                            </p>
                        </div>
                        <div className="py-2 h-[200px]">
                            <LineChart type="pitchLevel" />
                        </div>
                        <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                            Q: Question
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Confidence Level"
                    tooltip="Evaluates your level of self-assurance and comfort during the speaking test"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2 py-4">
                            <p className="text-center text-sm">Your average confidence is</p>
                            <p
                                style={{
                                    color: confidenceScoreLabel.color,
                                }}
                                className="text-4xl font-semibold text-center"
                            >
                                {confidenceScoreLabel.label}
                            </p>
                        </div>
                        <p className="text-center">{data?.scores?.confidence_content}</p>
                    </div>
                    <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                        <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                            <p className="font-semibold text-sm text-center">
                                Question Wise Fluctuation 📈
                            </p>
                        </div>
                        <div className="py-2 h-[200px]">
                            <LineChart type="confidenceLevel" />
                        </div>
                        <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                            Q: Question
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Tone Levels"
                    tooltip="Evaluates how you use tone to convey emotions and meaning, like sounding excited, serious, or questioning"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-5">
                        <p className="text-center">
                            Dive into the graph below to observe the spectrum of tone fluctuations –
                            including low, medium, and high – for each question
                        </p>

                        <div className="border-[1px] border-gray-300 rounded-md overflow-hidden">
                            <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                                <p className="font-semibold text-sm text-center">
                                    Question Wise Fluctuation 📈
                                </p>
                            </div>
                            <div className="py-2 h-[200px]">
                                <ToneLevelLineChart />
                            </div>
                            <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                                Q: Question
                            </p>
                        </div>
                    </div>
                </DropDown>

                <DropDown
                    label="Repeated words used"
                    tooltip='Observes and quantifies your use of filler words, such as "um" or "uh per minute'
                    tooltipPosition="top"
                >
                    <div className="flex gap-3 flex-wrap">
                        {fillerWords?.length === 0 ? (
                            <p className="text-center m-auto">😎🔥 Yoop, no filler words found!</p>
                        ) : null}
                        {fillerWords?.map((fillerWord: string, index: number) => {
                            return (
                                <div key={index} className="py-1 px-3 bg-[#F5F5F5] rounded-lg">
                                    "{fillerWord}"
                                </div>
                            );
                        })}
                    </div>
                </DropDown>

                <DropDown
                    label="IELTS Score"
                    tooltip="Your score reflects fluency, vocabulary, grammar, pronunciation, and coherence, aligning with the IELTS testing criteria"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.scores?.ielts_band * 10}
                                label={data?.scores?.ielts_band}
                                size={150}
                                radius={60}
                                color={IELTSColor}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.ielts_band_content}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="PTE Score"
                    tooltip="Assesses your speaking through fluency, pronunciation, oral fluency, vocabulary, grammar, and pronunciation based on Pearson Test scoring criteria"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.scores?.pte_score}
                                size={150}
                                radius={60}
                                color={IELTSColor}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.pte_score_content}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="CEFR Score (TOEFL)"
                    tooltip="Your speaking ability is evaluated based on descriptors for fluency, vocabulary, grammar, pronunciation, and interaction based on TOEFL scoring with CEFR framework"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={100}
                                label={data?.scores?.cefr_bands?.toUpperCase()}
                                size={150}
                                radius={60}
                                color={IELTSColor}
                            />
                        </div>
                        <p className="text-center">{data?.scores?.cefr_bands_content}</p>
                    </div>
                </DropDown>
            </div>
        </div>
    );
};

export default OverallAnalyticsSidebar;
