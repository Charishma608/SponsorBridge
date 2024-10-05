// Components
import ScoreCard from '../ScoreCard';
import TooltipComp from 'components/Tooltip';

// Hooks
import { useInterviewPrepHubReportsContext } from '../../InterviewPrepHubReportProvider';
import { capitalizeFirstLetter } from 'utils/helper';

const InterviewAnalysisContainer = () => {
    const { currentQuestionData } = useInterviewPrepHubReportsContext();
    if (!currentQuestionData || currentQuestionData?.skipped) return null;

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-primary">Interview Analysis</h3>
                <TooltipComp
                    label="Evaluates how well you apply theoretical knowledge to practical scenarios, problem-solving approach, and your ability to articulate technical concepts and even mesures your emotions like you are neutral or sad or happy while answering the question"
                    position="right"
                />
            </div>
            <div>
                <ScoreCard
                    label="Confidence Score"
                    description="The confidence score reflects your level of certainty and assurance in expressing ideas, demonstrating the strength and conviction behind your communication"
                    value={currentQuestionData?.result?.interview_analysis?.confidence_score?.value}
                />
            </div>

            <div className="flex items-center gap-6 my-4">
                <div className="border-[1.2px] flex-1" />
                <p className="font-semibold">Emotions Score</p>
                <div className="border-[1.2px] flex-1" />
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center">
                {currentQuestionData?.result?.interview_analysis?.emotions_score?.map(
                    (emotionObject: { emotion: string; score: number }, index: number) => {
                        const { emotion, score } = emotionObject;
                        return <EmotionText emotion={emotion} score={score} key={index} />;
                    },
                )}
            </div>

            <div className="border-[1.2px] flex-1 my-4" />

            <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center justify-center gap-2">
                    Takeaway for the Interviewer
                    <TooltipComp
                        label="Highlights your expertise in technology, problem-solving abilities, and distinctive strengths within your field to the interviewer"
                        position="top"
                    />
                </h2>
                <div className="p-4">
                    <div className="flex flex-col gap-4 text-sm">
                        {currentQuestionData?.result?.interview_analysis?.['take_away']?.map(
                            (feedback: string, index: number) => (
                                <p key={index}>📝 {feedback}</p>
                            ),
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center justify-center gap-2">
                    Incorrectness and Oversights
                    <TooltipComp
                        label="Detects and addresses potential mistakes and oversights in your responses, offering suggestions to enhance your understanding in the respective topics"
                        position="top"
                    />
                </h2>
                <div className="p-4">
                    <div className="flex flex-col gap-4 text-sm">
                        {currentQuestionData?.result?.interview_analysis?.['negative_points']?.map(
                            (feedback: string, index: number) => {
                                if (feedback === '') return null;
                                if (index >= 1) {
                                    return <p key={index}> 📌 {feedback}</p>;
                                }
                                return null;
                            },
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center justify-center gap-2">
                    Suggested answer
                    <TooltipComp
                        label="Suggested answers help in preparing and improving your performance in future technical interviews"
                        position="top"
                    />
                </h2>
                <div className="p-4 text-sm">
                    <p>{currentQuestionData?.recommended_answer_structure}</p>
                </div>
            </div>
        </div>
    );
};

interface EmotionTextProps {
    emotion: string;
    score: number;
}

const EmotionText: React.FC<EmotionTextProps> = ({ emotion, score }) => {
    let emojiImg: string = '';
    let lowerCasedEmotion = emotion.toLowerCase();
    let label = capitalizeFirstLetter(lowerCasedEmotion);

    if (lowerCasedEmotion.length > 15) return null;

    if (lowerCasedEmotion.includes('joy')) {
        emojiImg = '😃';
    } else if (lowerCasedEmotion.includes('happy')) {
        emojiImg = '🤩';
    } else if (lowerCasedEmotion.includes('fear')) {
        emojiImg = '😨';
    } else if (lowerCasedEmotion.includes('sad')) {
        emojiImg = '🥺';
    } else if (lowerCasedEmotion.includes('neutral')) {
        emojiImg = '😐';
    } else return null;

    if (emotion) {
        return (
            <p className="bg-[#F5F5F5] px-4 py-1 rounded-md">
                <span className="text-xl mr-1">{emojiImg}</span>
                <span>{label}</span>
                <span> : {score}%</span>
            </p>
        );
    } else return null;
};

export default InterviewAnalysisContainer;
