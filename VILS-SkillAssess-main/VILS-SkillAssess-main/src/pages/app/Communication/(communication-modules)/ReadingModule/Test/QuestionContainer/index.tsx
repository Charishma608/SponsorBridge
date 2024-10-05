// Internal Imports
import { useEffect, useRef } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';
import MCQComponent from './MCQComponent';
import MobileMCQComponent from './MobileMCQComponent';

const QuestionContainer = () => {
    const passageDivRef = useRef<any>(null);
    const questionsDivRef = useRef<any>(null);

    const { currentQuestionData, solutions, setSolutions, currentQuestionIndex } = useTestContext();

    useEffect(() => {
        if (questionsDivRef.current) {
            questionsDivRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', // Optional: Add smooth scrolling
            });
        }
        if (passageDivRef.current) {
            passageDivRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', // Optional: Add smooth scrolling
            });
        }
    }, [questionsDivRef, passageDivRef, currentQuestionIndex]);

    return (
        <div className="flex-1 flex flex-col gap-2 overflow-hidden overflow-y-scroll">
            <p className="font-semibold ml-1">
                Read the following Passage and Answer the questions ( Passage{' '}
                {currentQuestionIndex + 1} )
            </p>
            <div className="flex-1 flex gap-4 overflow-y-scroll overflow-hidden flex-col md:flex-row">
                <div
                    ref={passageDivRef}
                    className="border-[1.5px]  border-gray-300 rounded-md px-4 py-2 md:flex-1 flex flex-col"
                >
                    <p className="font-semibold">Passage Heading</p>
                    <div className="flex-1 overflow-scroll ">
                        <p className="mt-2 text-sm text-justify   h-[150px] overflow-scroll  md:h-auto">
                            {currentQuestionData?.paragraph}
                        </p>
                    </div>
                </div>
                <div
                    ref={questionsDivRef}
                    className="border-[1.5px] max-h-[500px] md:h-auto overflow-hidden border-gray-300 rounded-md overflow-y-scroll flex-1"
                >
                    {currentQuestionData?.questions?.map((question: any, index: number) => {
                        return (
                            <div
                                className="p-4 md:block hidden border-b-[1.5px] border-gray-300"
                                key={index}
                            >
                                <MCQComponent
                                    id={index + 1}
                                    data={question}
                                    solutions={solutions}
                                    setSolutions={setSolutions}
                                    key={question?.id}
                                    questionsId={question?.id}
                                />
                            </div>
                        );
                    })}
                    <MobileMCQComponent data={currentQuestionData?.questions} />
                </div>
            </div>
        </div>
    );
};

export default QuestionContainer;
