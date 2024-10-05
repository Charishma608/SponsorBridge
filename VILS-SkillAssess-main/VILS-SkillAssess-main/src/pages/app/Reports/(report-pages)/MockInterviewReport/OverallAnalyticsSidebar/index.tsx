// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import DropDown from 'components/DropDown';
import LineChart from './LineChart';
import TooltipComp from 'components/Tooltip';
import PitchLevelLineChart from './PitchLevelLineChart';
import ToneLevelLineChart from './ToneLevelLineChart';

// Hooks
import { useMockInterviewReportsContext } from '../MockInterviewReportProvider';

interface OverallAnalyticsSidebarProps {
    isSidebarOpened: boolean;
}

const OverallAnalyticsSidebar: React.FC<OverallAnalyticsSidebarProps> = ({ isSidebarOpened }) => {
    const { data, getWPMLabel, getPitchLevelLabel } = useMockInterviewReportsContext();

    const wpmScore = parseInt(
        data?.overall_result?.communication_analysis?.['words_per_minute']['value'],
    );
    const wpmLabel = getWPMLabel(
        data?.overall_result?.communication_analysis?.['words_per_minute']['value'],
    );
    const pitchLevel = parseInt(
        data?.overall_result?.communication_analysis?.average_pitch['value'],
    );
    const pitchLevelLabel = getPitchLevelLabel(pitchLevel);

    return (
        <div
            className={`${
                isSidebarOpened ? 'w-[30%]' : 'w-0'
            } h-full overflow-y-scroll transition-all duration-100 border-l-[1.5px] border-gray-300 flex flex-col`}
        >
            <div className="py-2 text-center bg-[#BAE2FD] shadow-light">
                <p className="font-semibold text-dark">Overall Analytics</p>
            </div>

            <div className="flex flex-col gap-4 p-2 lg:p-4 flex-1 overflow-y-scroll">
                {/* ==================== Domain Knowledge  ==================== */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Domain Knowledge</p>
                        <TooltipComp
                            label="Evaluates your technical expertise by examining your proficiency in specific skills or knowledge related to a particular subject or field"
                            position="bottom"
                        />
                    </div>
                    <DropDown
                        label="Overall Technical Score"
                        tooltip="Assesses and evaluates your proficiency in technical aspects related to this interview"
                        tooltipPosition="leftTop"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.overall_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.overall_score['insight']}
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Technical Term Match Score"
                        tooltip="Assesses your technical knowledge by alignment with predefined industry terms for a comprehensive understanding"
                        tooltipPosition="leftTop"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.keyword_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.keyword_score['insight']}
                            </p>
                        </div>
                    </DropDown>
                    {/* <DropDown
                        label="Phrase Similarity Score"
                        tooltip="Evaluates how closely your answers align with our Phrase Similarity Score, evaluating how closely your answers align with predefined text phrases"
                        tooltipPosition="leftTop"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.phrase_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.phrase_score['insight']}
                            </p>
                        </div>
                    </DropDown> */}
                    <DropDown
                        label="Content Relevance Score"
                        tooltip="Evaluates and checks if your answers are matching or giving similar meaning with the predefined technical answers"
                        tooltipPosition="leftTop"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.semantic_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.technical_analysis?.semantic_score[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                    </DropDown>
                </div>

                {/* ====================== Communication  ===================== */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Communication</p>
                        <TooltipComp
                            label="Assesses your communication skills like how well you are able to  pronounce the words and the ability to convey your thoughts and learning"
                            position="bottom"
                        />
                    </div>
                    <DropDown
                        label="Fluency Score"
                        tooltip="Evaluates how smoothly and effortlessly you can speak, with minimal hesitation"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.communication_analysis?.fluency_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.communication_analysis?.fluency_score[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Grammar Score"
                        tooltip="Analyzes your sentence structure and verb usage for accuracy and appropriateness"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.communication_analysis?.grammar_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.communication_analysis?.grammar_score[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Pronunciation Score"
                        tooltip="Assesses clarity, accuracy, and naturalness of your answer"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.communication_analysis
                                            ?.pronunciation_score['value']
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.communication_analysis
                                        ?.pronunciation_score['insight']
                                }
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Vocabulary Score"
                        tooltip="Examines your range and complexity of words you use to express yourself"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.communication_analysis
                                            ?.vocabulary_score['value']
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                Evaluates and assesses the depth and complexity of your language
                                usage, categorizing vocabulary complexity on a SIMPLE, AVERAGE,
                                COMPLEX scale
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Words Per Minute"
                        tooltip="Measures your speaking rate per minute to assess clarity and efficiency"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col items-center justify-center py-10">
                                <p className="text-7xl font-bold" style={{ color: wpmLabel.color }}>
                                    {wpmScore}
                                </p>
                                <p className="font-medium text-lg">{wpmLabel.label}</p>
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.communication_analysis?.words_per_minute[
                                        'insight'
                                    ]
                                }
                            </p>
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
                            <p className="text-center">
                                {
                                    data?.overall_result?.communication_analysis?.average_pitch[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                        <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                            <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                                <p className="font-semibold text-sm text-center">
                                    Question Wise Fluctuation 📈
                                </p>
                            </div>
                            <div className="py-2 h-[200px]">
                                <PitchLevelLineChart />
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
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="flex flex-col gap-1 py-4 pb-2">
                                    <p className="text-center text-lg">
                                        Your average Tone Level is
                                    </p>
                                    <p className="font-semibold text-center text-7xl text-primary">
                                        {
                                            data?.overall_result?.communication_analysis
                                                ?.average_tone['value']
                                        }{' '}
                                        Hz
                                    </p>
                                </div>
                            </div>
                            <p className="text-center">
                                {/* {
                                    data?.overall_result?.communication_analysis?.average_tone[
                                        'insight'
                                    ]
                                } */}
                                Dive into the graph below to observe the spectrum of tone
                                fluctuations – including low, medium, and high – for each question
                            </p>
                        </div>
                        <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
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
                    </DropDown>
                </div>

                {/* ====================== Personality Analysis  ===================== */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Personality Analysis</p>
                        <TooltipComp
                            label="Assesses and provides your nature amplifies your strengths and passions, identifies areas for improvement that interviewers focus on to ensure a favorable outcome for you in interviews"
                            position="bottom"
                        />
                    </div>
                    <DropDown
                        label="Attention to detail"
                        tooltip="Assesses your attentiveness throughout the test by providing insights into your focus and concentration"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.personality_analysis
                                            ?.attention_to_detail['value']
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.personality_analysis?.attention_to_detail[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Adaptability"
                        tooltip="Evaluates your capacity to adjust and excel in evolving situations, showcasing flexibility and resourcefulness in achieving effective outcomes"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.personality_analysis?.adaptability[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.personality_analysis?.adaptability[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Learning ability"
                        tooltip="Measures your capacity in understanding and articulating the responses effectively, enhancing your communication and problem-solving skills"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.personality_analysis
                                            ?.learning_ability['value']
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.personality_analysis?.learning_ability[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                    </DropDown>
                </div>

                {/* ====================== Interview  ===================== */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Interview</p>
                        <TooltipComp
                            label="Assesses how confidently you respond to questions"
                            position="bottom"
                        />
                    </div>

                    <DropDown
                        label="Overall Confidence Score"
                        tooltip="Evaluates your level of self-assurance and comfort during the speaking test"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.interview_analysis?.confidence_score[
                                            'value'
                                        ]
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.interview_analysis?.confidence_score[
                                        'insight'
                                    ]
                                }
                            </p>
                        </div>
                        <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                            <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                                <p className="font-semibold text-sm text-center">
                                    Question Wise Fluctuation 📈
                                </p>
                            </div>
                            <div className="py-2 h-[200px]">
                                <LineChart type="confidence_score" />
                            </div>
                            <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                                Q: Question
                            </p>
                        </div>
                    </DropDown>
                </div>
            </div>
        </div>
    );
};

export default OverallAnalyticsSidebar;
