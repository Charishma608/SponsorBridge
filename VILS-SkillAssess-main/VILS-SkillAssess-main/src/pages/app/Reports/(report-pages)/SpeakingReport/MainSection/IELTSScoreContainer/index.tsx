// Components
// import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
// import Labels from 'components/Labels';
import TooltipComp from 'components/Tooltip';

// Utils
// import { cn } from 'utils/helper';

// Hooks
import { useSpeakingReportsContext } from '../../SpeakingReportProvider';

const CommunicationalAnalysis = () => {
    const { currentQuestionData } = useSpeakingReportsContext();
    if (!currentQuestionData) return null;

    // const value = currentQuestionData?.scores?.ielts_band * 10;
    // const fill = value >= 80 ? '#39D389' : value >= 60 ? '#40A2D8' : '#FC6736';

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            {/* <h3 className="font-semibold text-primary">IELTS Score</h3> */}
            <h3 className="font-semibold text-primary">Comprehensive Language Test</h3>
            {/* <div className="border-[1.5px] border-gray-300 rounded-md overflow-hidden flex">
                <CommunicationalAnalysisCard
                    label="IELTS Score"
                    value={currentQuestionData?.scores?.ielts_band * 10}
                    graphLabel={currentQuestionData?.scores?.ielts_band}
                    position="front"
                    color={fill}
                />
                <CommunicationalAnalysisCard
                    label="PTE Score"
                    value={currentQuestionData?.scores?.pte_score}
                    color={fill}
                />
                <CommunicationalAnalysisCard
                    label="CEFR Score (TOEFL)"
                    value={100}
                    graphLabel={currentQuestionData?.scores?.cepr_band?.toString().toUpperCase()}
                    position="last"
                    color={fill}
                />
            </div> */}

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 flex items-center justify-center gap-2 py-3 bg-gray-50">
                    <p className="font-semibold text-center">
                        Comprehensive Language Test Insights
                    </p>
                    <TooltipComp
                        label="Derives your IELTS, PTE, and TOEFL scores using standardized assessment criteria"
                        position="top"
                    />
                </div>
                <div className="flex flex-col gap-3 py-4 px-3 text-sm">
                    {currentQuestionData?.scores?.ielts_insights?.map(
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

            {/* <div className="flex justify-end mt-2">
                <Labels />
            </div> */}
        </div>
    );
};

// interface CommunicationalAnalysisCardProps {
//     label: string;
//     value: number;
//     position?: 'front' | 'last' | '';
//     className?: string;
//     graphLabel?: string;
//     color?: string;
// }
// const CommunicationalAnalysisCard: React.FC<CommunicationalAnalysisCardProps> = ({
//     label,
//     value,
//     position = '',
//     className = '',
//     graphLabel = '',
//     color = '',
// }) => {
//     return (
//         <div
//             className={cn(
//                 `flex-1 border-l-[0.5px] border-r-[0.5px] border-gray-300 ${
//                     position === 'front'
//                         ? 'border-l-[0px]'
//                         : position === 'last'
//                         ? 'border-r-[0px]'
//                         : ''
//                 }`,
//                 className,
//             )}
//         >
//             <div className="grid place-content-center p-4">
//                 <CircularProgressBarGraph
//                     value={value}
//                     label={graphLabel ? graphLabel : value?.toString()}
//                     size={150}
//                     radius={60}
//                     color={color}
//                 />
//             </div>
//             <div className="border-t-[1px] border-gray-300 bg-gray-50 p-4">
//                 <p className="text-center text-sm font-semibold">{label}</p>
//             </div>
//         </div>
//     );
// };

export default CommunicationalAnalysis;
