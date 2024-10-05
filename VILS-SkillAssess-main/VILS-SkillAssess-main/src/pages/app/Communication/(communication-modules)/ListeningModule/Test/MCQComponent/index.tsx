// Internal Imports
import { useState, useEffect } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';

interface MCQComponentProps {
    id: number;
    questionNumber: number;
    data?: any;
}

const MCQComponent: React.FC<MCQComponentProps> = ({ data, id, questionNumber }) => {
    const [selectedOptions, setSelectedOptions] = useState<any>();
    const { solutions, setSolutions } = useTestContext();

    const handleOptionSelect = (optionId: string) => {
        setSelectedOptions(optionId);
    };

    useEffect(() => {
        if (!selectedOptions) return;
        const remainingSolutions = solutions?.filter((solution: any) => solution?.id !== id);

        setSolutions([
            ...(remainingSolutions ? remainingSolutions : []),
            {
                id: id,
                answer: [selectedOptions],
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, selectedOptions, setSolutions]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <p>
                    {questionNumber}. {data?.question}
                </p>
                <p className="text-gray-600 text-sm">Instructions: {data?.instruction}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                {data?.options.map((option: any) => (
                    <div key={option?.option_id} className="flex items-center gap-2">
                        <label>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOptions?.includes(option?.id)}
                                onChange={() => handleOptionSelect(option?.id)}
                                className="mt-1"
                            />
                        </label>
                        <span>{option?.data}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MCQComponent;
