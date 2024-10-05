// Internal Imports
import { useState, useEffect, useCallback } from 'react';
import PrimaryButton from 'components/Buttons';

// Hooks
import { useTestContext } from '../TestProvider';

interface FillInTheBlankComponentProps {
    id: string;
    data: any;
}

const FillInTheBlankComponent: React.FC<FillInTheBlankComponentProps> = ({ data }) => {
    const {
        solutions,
        setSolutions,
        data: dt,
        currentQuestionIndex,
        setCurrentQuestionIndex,
    } = useTestContext();

    const getAnsweredValue = useCallback(() => {
        const solution = solutions.find((solution: any) => solution.id === data.id);
        return solution ? solution.answer : '';
    }, [solutions, data.id]);

    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        setAnswer(getAnsweredValue());
    }, [getAnsweredValue]);

    const clearResponse = useCallback(() => {
        setSolutions((prevSolutions: any) =>
            prevSolutions.filter((solution: any) => solution.id !== data.id),
        );
        setAnswer('');
    }, [data.id, setSolutions]);

    const handleSaveAndNext = useCallback(() => {
        setSolutions((prevSolutions: any) => {
            const remainingSolutions = prevSolutions.filter(
                (solution: any) => solution.id !== data.id,
            );
            return answer === ''
                ? remainingSolutions
                : [...remainingSolutions, { id: data.id, answer }];
        });
        setCurrentQuestionIndex((prev) => prev + 1);
    }, [answer, data.id, setSolutions, setCurrentQuestionIndex]);

    return (
        <div className="flex-1 h-full flex flex-col justify-between">
            <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="rounded-md border-[1.5px] border-gray-300 outline-none p-4 focus:outline-primary w-full my-4"
                placeholder="Enter your answer here ..."
            />
            <div className="flex items-center justify-between">
                <p onClick={clearResponse} className="text-gray-500 cursor-pointer">
                    Clear Response
                </p>
                {dt?.questions?.length - 1 > currentQuestionIndex && (
                    <PrimaryButton
                        label="Save and Next"
                        className="w-fit px-10"
                        onClick={handleSaveAndNext}
                    />
                )}
            </div>
        </div>
    );
};

export default FillInTheBlankComponent;
