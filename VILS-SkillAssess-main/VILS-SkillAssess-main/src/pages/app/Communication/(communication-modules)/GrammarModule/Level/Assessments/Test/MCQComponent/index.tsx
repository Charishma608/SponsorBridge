// Internal Imports
import { useState, useEffect } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';
import { cn } from 'utils/helper';
import PrimaryButton from 'components/Buttons';

interface MCQComponentProps {
    id: number;
    data?: any;
}

const MCQComponent: React.FC<MCQComponentProps> = ({ data, id }) => {
    const [selectedOptions, setSelectedOptions] = useState<any>(null);
    const {
        solutions,
        setSolutions,
        data: dt,
        currentQuestionIndex,
        setCurrentQuestionIndex,
    } = useTestContext();

    const handleOptionSelect = (optionId: string) => {
        setSelectedOptions(optionId);
    };

    const getAnsweredValue = () => {
        const remainingSolutions = solutions?.filter((solution: any) => solution?.id === id);
        if (remainingSolutions && remainingSolutions?.length) {
            return remainingSolutions[0].answer;
        }
        return false;
    };

    useEffect(() => {
        if (selectedOptions) {
            const remainingSolutions = solutions?.filter((solution: any) => solution?.id !== id);

            if (selectedOptions === '-1') setSolutions(remainingSolutions);
            else
                setSolutions([
                    ...(remainingSolutions ? remainingSolutions : []),
                    {
                        id: id,
                        answer: selectedOptions,
                    },
                ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOptions]);

    return (
        <div className="flex-1 h-full flex flex-col justify-between">
            <div className="flex flex-wrap justify-between gap-3">
                {data?.options?.map((option: any) => {
                    return (
                        <div
                            className={cn(
                                'w-[49%] cursor-pointer h-[100px] rounded shadow grid place-content-center border px-2 text-center',
                                getAnsweredValue() === option.id &&
                                    'bg-primary border-primary text-white',
                            )}
                            onClick={() => {
                                handleOptionSelect(option.id);
                            }}
                        >
                            {option?.data}
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center justify-between">
                <p
                    onClick={() => setSelectedOptions('-1')}
                    className="text-gray-500 cursor-pointer"
                >
                    Clear Response
                </p>
                {dt?.questions?.length - 1 > currentQuestionIndex && (
                    <PrimaryButton
                        label="Next"
                        className="w-fit px-10"
                        onClick={() => {
                            setCurrentQuestionIndex((prev) => prev + 1);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default MCQComponent;
