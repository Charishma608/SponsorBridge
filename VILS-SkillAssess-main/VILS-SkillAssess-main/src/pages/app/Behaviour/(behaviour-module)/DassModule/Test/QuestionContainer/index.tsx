// Internal Imports
import { useState } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';
import Button from 'components/Buttons';

const QuestionContainer = () => {
    const {
        currentQuestionData,
        currentQuestionIndex,
        solutions,
        setSolutions,
        totalQuestion,
        handleGoToNextQuestion,
    } = useTestContext();
    const [solution, setSolution] = useState<number>(-1);

    const handleClearResponse = () => {
        setSolution(-1);
    };

    const handleStoreAnswer = () => {
        if (solution === -1) return;

        const questionId = currentQuestionData?.question_id;
        const remainingSolutions = solutions.filter((sol: any) => sol?.question_id !== questionId);

        setSolutions([
            ...remainingSolutions,
            {
                question_id: questionId,
                type: currentQuestionData?.type,
                time_taken: '00:05:23',
                answer: currentQuestionData?.options[solution]?.data,
            },
        ]);

        handleGoToNextQuestion();
        setSolution(-1);
    };

    return (
        <div className="w-full flex-1 border-[1.5px] border-gray-300 rounded-md p-4 flex flex-col justify-between gap-20 overflow-y-scroll">
            <div>
                <div className="flex flex-col gap-1">
                    <p className="font-semibold">
                        Q{currentQuestionIndex + 1}. {currentQuestionData?.question}
                    </p>
                    {currentQuestionData?.meaning && (
                        <p className="text-sm">Meaning: {currentQuestionData?.meaning}</p>
                    )}
                </div>

                <div className="my-4">
                    <div className="grid grid-cols-2 gap-3">
                        {currentQuestionData?.options?.map((option: any, index: number) => {
                            return (
                                <OptionCard
                                    data={option}
                                    key={index}
                                    active={index === solution}
                                    onClick={() => {
                                        setSolution(index);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <button className="text-sm text-gray-600" onClick={handleClearResponse}>
                    Clear Response
                </button>
                <Button
                    label={currentQuestionIndex === totalQuestion - 1 ? 'Save' : 'Save & Next'}
                    className={`w-fit px-8 rounded-md ${
                        solution === -1 ? 'bg-gray-500 cursor-not-allowed' : ''
                    }`}
                    onClick={handleStoreAnswer}
                />
            </div>
        </div>
    );
};

interface OptionCardProps {
    data?: any;
    active?: boolean;
    onClick?: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ data, active = false, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={`grid place-content-center text-sm rounded-md border border-gray-300 min-h-[100px] p-4 ${
                active && 'bg-primary text-white'
            }`}
        >
            <p className="text-center">{data?.data}</p>
        </button>
    );
};

export default QuestionContainer;
