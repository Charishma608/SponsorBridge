// Internal Imports
import { useState, useEffect } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';

interface FillInTheBlankComponentProps {
    id: number;
    data: any;
}

const FillInTheBlankComponent: React.FC<FillInTheBlankComponentProps> = ({ id, data }) => {
    const { solutions, setSolutions } = useTestContext();
    const [answer, setAnswer] = useState<string>('');

    useEffect(() => {
        if (answer === '') return;
        const remainingSolutions = solutions?.filter((solution: any) => solution?.id !== data?.id);
        setSolutions([
            ...remainingSolutions,
            {
                id: data?.id,
                answer: [answer],
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answer, data?.id, setSolutions]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <p>
                    {id}. {data?.question}
                </p>
                <p className="text-gray-600 text-sm">Instructions: {data?.instruction}</p>
            </div>
            <input
                value={answer}
                onChange={(e) => {
                    setAnswer(e.target.value);
                }}
                className="rounded-md border-[1.5px] border-gray-300 outline-none p-2 max-w-[400px] focus:outline-primary"
            />
        </div>
    );
};

export default FillInTheBlankComponent;
