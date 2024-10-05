// Components
import ScoreCard from '../ScoreCard';
import TooltipComp from 'components/Tooltip';

// Hooks
import { useHRReportsContext } from '../../HRReportProvider';
import { capitalizeFirstLetter } from 'utils/helper';

const InterviewAnalysisContainer = () => {
    const { currentQuestionData } = useHRReportsContext();
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
                    value={currentQuestionData?.result?.interview_analysis?.confidence}
                />
            </div>

            <div className="flex items-center gap-6 my-4">
                <div className="border-[1.2px] flex-1" />
                <p className="font-semibold">Emotions Score</p>
                <div className="border-[1.2px] flex-1" />
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-center">
                {currentQuestionData?.result?.interview_analysis?.emotions_score && (
                    <>
                        <EmotionText
                            score={
                                currentQuestionData?.result?.interview_analysis?.emotions_score?.joy
                            }
                            emotion={'Joy'}
                            key={0}
                        />
                        <EmotionText
                            score={
                                currentQuestionData?.result?.interview_analysis?.emotions_score?.sad
                            }
                            emotion={'Sad'}
                            key={1}
                        />
                        <EmotionText
                            score={
                                currentQuestionData?.result?.interview_analysis?.emotions_score
                                    ?.happy
                            }
                            emotion={'Happy'}
                            key={2}
                        />
                        <EmotionText
                            score={
                                currentQuestionData?.result?.interview_analysis?.emotions_score
                                    ?.fear
                            }
                            emotion={'Fear'}
                            key={3}
                        />
                        <EmotionText
                            score={
                                currentQuestionData?.result?.interview_analysis?.emotions_score
                                    ?.neutral
                            }
                            emotion={'Neutral'}
                            key={4}
                        />
                    </>
                )}
            </div>

            <div className="border-[1.2px] flex-1 my-4" />

            <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center gap-2 justify-center">
                    Takeaway for the Interviewer
                    <TooltipComp
                        label="Highlights your expertise in technology, problem-solving abilities, and distinctive strengths within your field to the interviewer"
                        position="rightBottom"
                    />
                </h2>
                <div className="p-4">
                    <div className="flex flex-col gap-4 text-sm">
                        {currentQuestionData?.result?.interview_analysis?.take_away?.map(
                            (feedback: string, index: number) => {
                                if (!feedback) return null;
                                else
                                    return (
                                        <p key={index} className="text-justify">
                                            📝{feedback}
                                        </p>
                                    );
                            },
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center gap-2 justify-center">
                    Incorrectness and Oversights
                    <TooltipComp
                        label="Detects and addresses potential mistakes and oversights in your responses, offering suggestions to enhance your understanding in the respective topics"
                        position="rightBottom"
                    />
                </h2>
                <div className="p-4">
                    <div className="flex flex-col gap-4 text-sm">
                        {currentQuestionData?.result?.interview_analysis?.negative_point?.map(
                            (feedback: string, index: number) => {
                                if (feedback === '') return null;
                                if (index >= 1) {
                                    return (
                                        <p key={index} className="text-justify">
                                            📌 {feedback}
                                        </p>
                                    );
                                }
                                return null;
                            },
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center gap-2 justify-center">
                    Suggested answer
                    <TooltipComp
                        label="Suggested answers help in preparing and improving your performance in future technical interviews"
                        position="rightBottom"
                    />
                </h2>
                <div className="p-4 text-sm text-justify">
                    <p>{currentQuestionData?.result?.interview_analysis?.suggested_answer}</p>
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
