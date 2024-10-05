// External Imports
import { MdDoNotDisturbOn } from 'react-icons/md';

// Internal Imports
import { useState } from 'react';

// Components
import Button from 'components/Buttons';
import CodingContainer from './CodingContainer';
import QuestionContainer from './QuestionContainer';
import ResultDetailsContainer from './ResultsDetailsContainer';
import SubmissionDetailsContainer from './SubmissionDetailsContainer';

interface QuestionWiseResultProps {
    questionWiseResult: any;
}

const QuestionWiseReport: React.FC<QuestionWiseResultProps> = ({ questionWiseResult }) => {
    const [selected, setSelected] = useState<number>(0);

    if (!questionWiseResult || !questionWiseResult.length)
        return (
            <div className="text-center shadow-light rounded-md p-8">
                <p className="text-3xl font-bold text-red-500 primary">No Data Found</p>
                <p className="mt-2 text-sm font-semibold text-gray-700">
                    No reports have been generated due to the absence of codes.
                </p>
            </div>
        );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-xl">Question Wise</h3>
                <div className="flex gap-2">
                    {questionWiseResult?.map((_: any, index: number) => {
                        return (
                            <Button
                                key={index}
                                onClick={() => setSelected(index)}
                                label={`Question ${index + 1}`}
                                className={`${
                                    selected === index ? 'bg-primary' : 'bg-gray-500'
                                } w-[150px]`}
                            />
                        );
                    })}
                </div>
            </div>

            <QuestionContainer
                questionNumber={selected + 1}
                questionDetails={
                    questionWiseResult ? questionWiseResult?.[selected]?.question : null
                }
            />

            {questionWiseResult?.[selected].submission ? (
                <div className="flex gap-4 h-[480px]">
                    <div className="w-1/2 h-full">
                        <CodingContainer
                            code={questionWiseResult?.[selected]?.submission?.code}
                            language={questionWiseResult?.[selected]?.submission?.language}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-1/2 h-full">
                        <SubmissionDetailsContainer
                            backspaceCount={
                                questionWiseResult?.[selected]?.submission?.backspace_count
                            }
                            deleteCount={questionWiseResult?.[selected]?.submission?.delete_count}
                            timestamp={questionWiseResult?.[selected]?.submission?.timestamp}
                        />
                        <div className="flex-1">
                            <ResultDetailsContainer
                                result={questionWiseResult?.[selected]?.result}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-md overflow-hidden shadow-light flex flex-col gap-2 justify-center items-center p-8">
                    <div>
                        <MdDoNotDisturbOn className="w-16 h-16 text-primary" />
                    </div>
                    <p>No Submission Found!</p>
                </div>
            )}
        </div>
    );
};

export default QuestionWiseReport;
