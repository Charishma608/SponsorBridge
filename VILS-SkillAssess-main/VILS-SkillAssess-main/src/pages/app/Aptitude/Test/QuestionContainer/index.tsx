// Internal Imports
import { useEffect, useState } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';

// Components
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
    const [optionsSelected, setOptionsSelected] = useState<number[]>(
        new Array(totalQuestion).fill(-1),
    );
    const [questionStartTime, setQuestionStartTime] = useState(new Date().getTime());
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(false);

    const handleClearResponse = () => {
        setOptionsSelected((prevValues: number[]) => {
            const updatedValues = [...prevValues];
            updatedValues[currentQuestionIndex] = -1;
            return updatedValues;
        });

        const updatedSolutions = solutions.filter(
            (sol: any) => sol?.question_id !== currentQuestionData?.question_id,
        );
        setSolutions(updatedSolutions);
    };

    const handleStoreAnswer = () => {
        if (optionsSelected[currentQuestionIndex] !== -1) {
            const questionId = currentQuestionData?.question_id;
            const remainingSolutions = solutions.filter(
                (sol: any) => sol?.question_id !== questionId,
            );

            const questionEndTime = new Date().getTime();
            const timeTaken = Math.floor((questionEndTime - questionStartTime) / 1000);

            setSolutions([
                ...remainingSolutions,
                {
                    question_id: questionId,
                    type: currentQuestionData?.type,
                    topic: currentQuestionData?.topic,
                    time_taken: timeTaken,
                    answer: currentQuestionData?.options[optionsSelected[currentQuestionIndex]]
                        ?.data,
                },
            ]);
        }
        handleGoToNextQuestion();
    };

    useEffect(() => {
        setQuestionStartTime(new Date().getTime());

        if (currentQuestionIndex === totalQuestion - 1) {
            const isLastAnswerPresent = solutions.find(
                (sol: any) => sol?.question_id === currentQuestionData?.question_id,
            );
            if (isLastAnswerPresent) setIsSaveButtonDisabled(true);
            else setIsSaveButtonDisabled(false);
        } else {
            setIsSaveButtonDisabled(false);
        }
    }, [currentQuestionIndex, totalQuestion, solutions, currentQuestionData]);

    return (
        <div className="w-full mb-20 md:mb-0 flex-1 md:border-[1.5px] border-gray-300 rounded-md p-4 flex flex-col justify-between gap-20 overflow-y-scroll">
            <div>
                <div className="flex flex-col gap-2">
                    <div className="font-medium flex flex-col gap-1">
                        {currentQuestionData?.instruction?.map((inst: string, index: number) => (
                            <p key={index}>
                                {index === 0 ? `Q${currentQuestionIndex + 1}. ` : ''}
                                {inst}
                            </p>
                        ))}
                    </div>
                    <div className="font-medium flex flex-col gap-1">
                        {currentQuestionData?.question?.map((ques: string, index: number) => (
                            <p key={index}>
                                {index === 0 && !currentQuestionData?.instruction?.length
                                    ? `Q${currentQuestionIndex + 1}. `
                                    : ''}
                                {ques}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="my-4">
                    <div className="grid grid-cols-2 gap-3">
                        {currentQuestionData?.options?.map((option: any, index: number) => {
                            if (!option?.data) return null;
                            return (
                                <OptionCard
                                    data={option}
                                    key={index}
                                    active={index === optionsSelected[currentQuestionIndex]}
                                    onClick={() => {
                                        setOptionsSelected((prevValues: number[]) => {
                                            const updatedValues = [...prevValues];
                                            updatedValues[currentQuestionIndex] = index;
                                            return updatedValues;
                                        });
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="md:hidden flex flex-col gap-4">
                    <div className="flex justify-end">
                        {isSaveButtonDisabled && (
                            <p className="text-red-500 font-medium">
                                * Now click on the submit button to submit the test.
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full gap-4 justify-between items-center">
                        <button className="text-sm text-gray-600 " onClick={handleClearResponse}>
                            Clear Response
                        </button>
                        <Button
                            label={
                                currentQuestionIndex === totalQuestion - 1
                                    ? 'Save'
                                    : optionsSelected[currentQuestionIndex] === -1
                                    ? 'Skip'
                                    : 'Save & Next'
                            }
                            className={`w-fit px-8 rounded-full `}
                            onClick={handleStoreAnswer}
                            disabled={isSaveButtonDisabled}
                        />
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col gap-4">
                <div className="flex justify-end">
                    {isSaveButtonDisabled && (
                        <p className="text-red-500 font-medium">
                            * Now click on the submit button to submit the test.
                        </p>
                    )}
                </div>
                <div className="flex justify-between items-end">
                    <button className="text-sm text-gray-600" onClick={handleClearResponse}>
                        Clear Response
                    </button>
                    <Button
                        label={
                            currentQuestionIndex === totalQuestion - 1
                                ? 'Save'
                                : optionsSelected[currentQuestionIndex] === -1
                                ? 'Skip'
                                : 'Save & Next'
                        }
                        className={`w-fit px-8 rounded-md`}
                        onClick={handleStoreAnswer}
                        disabled={isSaveButtonDisabled}
                    />
                </div>
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
            className={`grid place-content-center text-sm rounded-md border border-gray-300 min-h-[50px] p-4 ${
                active && 'bg-primary text-white'
            }`}
        >
            <p className="text-center">{data?.data}</p>
        </button>
    );
};

export default QuestionContainer;
