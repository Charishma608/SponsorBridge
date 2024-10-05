// Components
import { useEffect, useState } from 'react';

interface MCQComponentProps {
    id: number;
    data: any;
    solutions: any;
    setSolutions: any;
    questionsId: string;
}

const MCQComponent: React.FC<MCQComponentProps> = ({
    id,
    data,
    solutions,
    setSolutions,
    questionsId,
}) => {
    const [optionSelected, setOptionSelected] = useState('');

    const handleOptionSelect = (option: string) => {
        setOptionSelected(option);
        const remainingSolutions = solutions.filter(
            (solution: any) => solution?.id !== questionsId,
        );
        setSolutions([
            ...remainingSolutions,
            {
                id: questionsId,
                answer: option,
            },
        ]);
    };

    const handleClearResponse = () => {
        setOptionSelected('');
        // Remove the response from the solutions array when clearing
        setSolutions((prevSolutions: any) =>
            prevSolutions.filter((solution: any) => solution?.id !== questionsId),
        );
    };

    useEffect(() => {
        const answer = solutions.find((item: any) => item.id === questionsId);
        if (answer) {
            setOptionSelected(answer.answer);
        } else {
            setOptionSelected('');
        }
    }, [questionsId, solutions]);

    return (
        <div className="flex flex-col gap-2 text-sm">
            <p>
                {id}. {data?.question}
            </p>
            {data?.options?.map((option: any, index: number) => {
                const isSelected = optionSelected === option?.id;
                return (
                    <div key={option?.id} className="flex gap-2 mt-2">
                        <label>
                            <input
                                type="radio"
                                value={option?.option}
                                checked={isSelected}
                                onChange={() => handleOptionSelect(option?.id)}
                                className="mt-2"
                            />
                        </label>
                        <span className="mt-1">{option?.data}</span>
                    </div>
                );
            })}
            <p className="text-gray-600 cursor-pointer mt-4" onClick={handleClearResponse}>
                Clear Response
            </p>
        </div>
    );
};

export default MCQComponent;
