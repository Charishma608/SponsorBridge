// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import DropDown from 'components/DropDown';
// import LineChart from './LineChart';
import TooltipComp from 'components/Tooltip';

// Hooks
import { useInterviewPrepHubReportsContext } from '../InterviewPrepHubReportProvider';

interface OverallAnalyticsSidebarProps {
    isSidebarOpened: boolean;
}

const OverallAnalyticsSidebar: React.FC<OverallAnalyticsSidebarProps> = ({ isSidebarOpened }) => {
    const { data } = useInterviewPrepHubReportsContext();

    return (
        <div
            className={`${
                isSidebarOpened ? 'w-[30%]' : 'w-0'
            } h-full overflow-y-scroll transition-all duration-100 border-l-[1.5px] border-gray-300 flex flex-col`}
        >
            <div className="py-2 text-center bg-[#BAE2FD] shadow-light">
                <p className="font-semibold text-dark">Overall Analytics</p>
            </div>

            <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-scroll">
                {/* ==================== Domain Knowledge  ==================== */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Domain Knowledge</p>
                        <TooltipComp
                            label="Engage in our InterviewPrep Hub to assess your knowledge and skills in specific job roles relevant to your field of study. Preparing for and undertaking mock interviews fosters problem-solving and analytical thinking, valuable transferable skills applicable in diverse professional settings"
                            position="bottom"
                        />
                    </div>
                    <DropDown label="Overall Technical Score">
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.overall_score
                                            ?.value
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.overall_score?.insight}
                            </p>
                        </div>
                    </DropDown>
                    <DropDown label="Technical Term Match Score">
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.keyword_score
                                            ?.value
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.keyword_score?.insight}
                            </p>
                        </div>
                    </DropDown>
                    <DropDown label="Phrase Similarity Score">
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.phrase_score
                                            ?.value
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.phrase_score?.insight}
                            </p>
                        </div>
                    </DropDown>
                    <DropDown label="Content Relevance Score">
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.technical_analysis?.semantic_score
                                            ?.value
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {data?.overall_result?.technical_analysis?.semantic_score?.insight}
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

                    <DropDown label="Overall Confidence Score">
                        <div className="flex flex-col gap-3">
                            <div className="grid place-content-center">
                                <CircularProgressBarGraph
                                    value={
                                        data?.overall_result?.interview_analysis?.confidence_score
                                            ?.value
                                    }
                                    size={150}
                                    radius={60}
                                />
                            </div>
                            <p className="text-center">
                                {
                                    data?.overall_result?.interview_analysis?.confidence_score
                                        ?.insight
                                }
                            </p>
                        </div>
                        {/* <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
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
                        </div> */}
                    </DropDown>
                </div>
            </div>
        </div>
    );
};

export default OverallAnalyticsSidebar;
