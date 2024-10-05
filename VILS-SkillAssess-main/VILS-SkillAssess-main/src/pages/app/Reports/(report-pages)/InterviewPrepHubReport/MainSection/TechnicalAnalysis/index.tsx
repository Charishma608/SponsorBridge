// Components
import Labels from 'components/Labels';
import ScoreCard from '../ScoreCard';
import TooltipComp from 'components/Tooltip';

// Hooks
import { useInterviewPrepHubReportsContext } from '../../InterviewPrepHubReportProvider';

const TechnicalAnalysisContainer = () => {
    const { currentQuestionData } = useInterviewPrepHubReportsContext();
    if (!currentQuestionData || currentQuestionData?.skipped) return null;

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-primary">Technical Analysis</h3>
                <TooltipComp
                    label="Engage in our Mock interview to assess your knowledge and skills in specific job roles relevant to your field of study. Preparing for and undertaking mock interviews fosters problem-solving and analytical thinking, valuable transferable skills applicable in diverse professional settings"
                    position="right"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div>
                    <ScoreCard
                        label="Overall Score"
                        description="Assesses and evalautes your proficiency in technical aspects related to this interview"
                        value={
                            currentQuestionData?.result?.technical_analysis?.overall_score?.value
                        }
                    />
                </div>
                <div className="flex gap-2">
                    <ScoreCard
                        label="Technical Term Match Score"
                        description="Keyword assessment involves matching the words you use in your answers with pre-defined ones"
                        value={
                            currentQuestionData?.result?.technical_analysis?.keyword_score?.value
                        }
                    />
                    <ScoreCard
                        label="Phrase Similarity Score"
                        description="Technical phrase assessment checks if you use similar technical text phrases with the predefined text phrases"
                        value={currentQuestionData?.result?.technical_analysis?.phrase_score?.value}
                    />
                    <ScoreCard
                        label="Content Relevance Score"
                        description="Evaluates and checks if your answers are matching or giving similar meaning with the predefined technical answers"
                        value={
                            currentQuestionData?.result?.technical_analysis?.semantic_score?.value
                        }
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Labels />
            </div>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 flex items-center justify-center gap-2 py-3 bg-gray-50">
                    <p className="font-semibold text-center">Insights</p>
                    <TooltipComp label="Please provide the contents" position="top" />
                </div>
                <div className="flex flex-col gap-3 py-4 px-3 text-sm">
                    {currentQuestionData?.result?.technical_analysis?.insights?.map(
                        (insight: string, index: number) => {
                            return (
                                <p className="flex items-start gap-3" key={index}>
                                    <span>🎯</span>
                                    <span>{insight}</span>
                                </p>
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechnicalAnalysisContainer;
