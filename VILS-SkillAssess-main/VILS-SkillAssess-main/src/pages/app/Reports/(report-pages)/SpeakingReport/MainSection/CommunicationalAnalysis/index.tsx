// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';
import TooltipComp from 'components/Tooltip';

// Hooks
import { useSpeakingReportsContext } from '../../SpeakingReportProvider';

const CommunicationalAnalysis = () => {
    const { currentQuestionData } = useSpeakingReportsContext();
    if (!currentQuestionData) return null;

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-primary">Communicational Analysis</h3>
            <div className="border-[1.5px] border-b-0 border-gray-300 rounded-md overflow-hidden flex flex-wrap">
                <CommunicationalAnalysisCard
                    label="Fluency"
                    value={currentQuestionData?.scores['fluency']}
                    position="front"
                />
                <CommunicationalAnalysisCard
                    label="Grammar"
                    value={currentQuestionData?.scores['grammar']}
                    position="last"
                />
            </div>
            <div className="border-[1.5px] border-b-0 border-gray-300 rounded-md overflow-hidden flex flex-wrap">
                <CommunicationalAnalysisCard
                    label="Pronunciation"
                    value={Math.round(currentQuestionData?.scores['pronunciation_score'])}
                    position="front"
                />
                <CommunicationalAnalysisCard
                    label="Vocabulary"
                    value={currentQuestionData?.scores['vocabulary_score']}
                    position="last"
                />
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 flex items-center justify-center gap-2 py-3 bg-gray-50">
                    <p className="font-semibold text-center">Language Proficiency Insights</p>
                    <TooltipComp
                        label="Evaluates your pronunciation, fluency proficiency"
                        position="top"
                    />
                </div>
                <div className="flex flex-col gap-3 py-4 px-3 text-sm">
                    {currentQuestionData?.scores?.communicational_insights?.map(
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

            <div className="flex justify-end mt-2">
                <Labels />
            </div>
        </div>
    );
};

interface CommunicationalAnalysisCardProps {
    label: string;
    value: number;
    position?: 'front' | 'last' | '';
}
const CommunicationalAnalysisCard: React.FC<CommunicationalAnalysisCardProps> = ({
    label,
    value,
    position = '',
}) => {
    return (
        <div
            className={`flex-1 border-l-[0.5px] border-r-[0.5px] border-gray-300 border-b-[1.5px] ${
                position === 'front'
                    ? 'border-l-[0px]'
                    : position === 'last'
                    ? 'border-r-[0px]'
                    : ''
            }`}
        >
            <div className="grid place-content-center p-4">
                <CircularProgressBarGraph value={value} size={150} radius={60} />
            </div>
            <div className="border-t-[1px] border-gray-300 bg-gray-50 p-4">
                <p className="text-center text-sm font-semibold">{label}</p>
            </div>
        </div>
    );
};

export default CommunicationalAnalysis;
