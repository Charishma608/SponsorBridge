// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import DropDown from 'components/DropDown';
import LineChart from './LineChart';
import TooltipComp from 'components/Tooltip';
import PitchLevelLineChart from './PitchLevelLineChart';
import ToneLevelLineChart from './ToneLevelLineChart';

// Hooks
import { useHRReportsContext } from '../HRReportProvider';
import GraphContainer from './GraphContainer';
import RelevancyLineChart from './RelevancyChart';

interface OverallAnalyticsSidebarProps {
    isSidebarOpened: boolean;
}

const OverallAnalyticsSidebar: React.FC<OverallAnalyticsSidebarProps> = ({ isSidebarOpened }) => {
    const {
        data,
        getWPMLabel,
        getPitchLevelLabel,
        getToneLevelLabel,
        handleToggleSpiderWebAnalysis,
    } = useHRReportsContext();

    const wpmScore = parseInt(data?.overall_result?.communication_analysis?.word_per_min);
    const wpmLabel = getWPMLabel(wpmScore);
    const pitchLevel = parseInt(data?.overall_result?.communication_analysis?.pitch);
    const pitchLevelLabel = getPitchLevelLabel(pitchLevel);
    const toneLevel = parseInt(data?.overall_result?.communication_analysis?.average_tone);
    const toneLevelLabel = getToneLevelLabel(toneLevel);

    return (
        <div
            className={`${
                isSidebarOpened ? 'w-[30%]' : 'w-0'
            } h-full overflow-y-scroll transition-all duration-100 border-l-[1.5px] border-gray-300 flex flex-col relative`}
        >
            <div className="py-2 text-center bg-[#BAE2FD] shadow-light">
                <p className="font-semibold text-dark">Overall Analytics</p>
            </div>

            <div className="flex flex-col gap-4 p-2 lg:p-4 flex-1 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Overall Competency</p>
                        <TooltipComp
                            label="Assesses your communication skills like how well you are able to  pronounce the words and the ability to convey your thoughts and learning"
                            position="bottom"
                        />
                    </div>
                    <DropDown
                        label="Competency Chart"
                        tooltip="Evaluates your level of self-assurance and comfort during the speaking test"
                        tooltipPosition="top"
                    >
                        {/* <div className="flex flex-col gap-3">
                            {/* <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={data?.overall_result?.communication_analysis?.confidence}
                                    size={150}
                                    radius={60}
                                />
                            </div> 
                            <p className="text-center">
                                {
                                    // data?.overall_result?.interview_analysis?.confidence_score[
                                    //     'insight'
                                    // ]
                                }
                            </p>
                        </div> */}
                        <div className="rounded-md overflow-hidden">
                            <div className="pb-2 h-[250px]">
                                <GraphContainer />
                            </div>
                            {/* <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                                Q: Question
                            </p> */}

                            <div className="flex flex-col items-center">
                                <button
                                    className="py-2 text-center text-white rounded-full w-full bg-primary/90 mt-6"
                                    onClick={handleToggleSpiderWebAnalysis}
                                >
                                    Expand Graph
                                </button>
                            </div>
                        </div>
                    </DropDown>
                    <DropDown
                        label="Relevancy Chart"
                        tooltip="Measures your speaking rate per minute to assess clarity and efficiency"
                        tooltipPosition="top"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col items-center justify-center py-10">
                                <p className="text-7xl font-bold" style={{ color: wpmLabel.color }}>
                                    {78}
                                </p>
                                <p className="font-medium text-sm">{'Overall Average Relevency'}</p>
                            </div>
                            {/* insight needed */}
                            {/* <p className="text-center">
                                {data?.overall_result?.communication_analysis?.word_per_min}
                            </p> */}
                        </div>
                        <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                            <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                                <p className="font-semibold text-sm text-center">
                                    Question Wise Fluctuation 📈
                                </p>
                            </div>
                            <div className="py-2 h-[200px]">
                                <RelevancyLineChart />
                            </div>
                            <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                                Q: Question
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
                                    value={data?.overall_result?.communication_analysis?.fluency}
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            {/* category needed */}
                            {/* <p className="text-center">
                                {data?.overall_result?.communication_analysis?.fluency}
                            </p> */}
                        </div>
                        <div className="mt-2">
                            Fluency is evaluated by examining how fast you speak, the variation in
                            your speech rate, the frequency of long pauses, the use of filler words,
                            and how well you smoothly include connectives
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
                                    value={data?.overall_result?.communication_analysis?.grammar}
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            {/* category needed */}
                            {/* <p className="text-center">
                                {data?.overall_result?.communication_analysis?.grammar}
                            </p> */}
                        </div>
                        <div className="mt-2">
                            Assesses the intricacy and diversity of your grammatical structures,
                            categorizing them as SIMPLE, AVERAGE, or COMPLEX, while also pinpointing
                            any grammatical errors
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
                                        data?.overall_result?.communication_analysis?.pronunciation
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            {/* category needed */}
                            {/* <p className="text-center">
                                {data?.overall_result?.communication_analysis?.pronunciation}
                            </p> */}
                        </div>
                        <div className="mt-2">
                            Assesses the number of your phonemic inaccuracies and correctly
                            pronounced words
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
                                    value={data?.overall_result?.communication_analysis?.vocabulary}
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
                            {/* insight needed */}
                            {/* <p className="text-center">
                                {data?.overall_result?.communication_analysis?.word_per_min}
                            </p> */}
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
                                    <p className="text-center text-lg">Your average Pitch is</p>
                                    <p className="font-semibold text-center text-7xl text-primary">
                                        {pitchLevel} Hz
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
                                {/* {
                                    data?.overall_result?.communication_analysis?.tone[
                                        'insight'
                                    ]
                                } */}
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
                                        {data?.overall_result?.communication_analysis?.average_tone}{' '}
                                        Hz
                                    </p>
                                    <p
                                        className="font-semibold text-center text-2xl"
                                        style={{ color: toneLevelLabel.color }}
                                    >
                                        {toneLevelLabel.label}
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
                                    value={data?.overall_result?.interview_analysis?.confidence}
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    // data?.overall_result?.interview_analysis?.confidence_score[
                                    //     'insight'
                                    // ]
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

                {/* ================== SpiderWebAnalysis ================== */}
                {/* <div className="flex flex-col items-center">
                    <button
                        className="py-2 text-center text-white rounded-full w-full bg-primary/90 mt-4"
                        onClick={() => setOpenCompetencyCard(true)}
                    >
                        SpiderWeb Analysis
                    </button>
                </div> */}
                {/* {openCompetencyCard && (
                    <div
                        className={`${
                            openCompetencyCard
                                ? 'h-[720px]  absolute z-50 bg-red-500 top-0 -left-44'
                                : 'h-0 w-0'
                        }`}
                    ></div>
                )} */}
            </div>
        </div>
    );
};

export default OverallAnalyticsSidebar;
