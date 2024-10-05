// Internal Imports
import { useEffect, useRef, useState } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';

// Utils
import { countParagraphs, countSpaces, countWords } from 'utils/textUtils';
import { cn } from 'utils/helper';

// Components
// import Button from 'components/Buttons';

const QuestionContainer = () => {
    const passageDivRef = useRef<any>(null);
    const questionsDivRef = useRef<any>(null);
    const textareaRef = useRef<any>(null);

    const {
        currentQuestionData,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        solutions,
        setSolutions,
        data,
    } = useTestContext();

    const [answer, setAnswer] = useState<string>(
        solutions?.[currentQuestionData?.id]?.answer || '',
    );

    useEffect(() => {
        setAnswer(solutions?.[currentQuestionData?.id]?.answer || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (!textareaRef.current) return;

        const handlePaste = (event: ClipboardEvent) => {
            event.preventDefault();
        };

        const handleCopy = (event: ClipboardEvent) => {
            event.preventDefault();
        };

        // Add event listeners
        textareaRef.current.addEventListener('paste', handlePaste as EventListener);
        textareaRef.current.addEventListener('copy', handleCopy as EventListener);

        // Cleanup function to remove event listeners
        return () => {
            textareaRef.current?.removeEventListener('paste', handlePaste as EventListener);
            textareaRef.current?.removeEventListener('copy', handleCopy as EventListener);
        };
    }, []);

    return (
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <div className="h-full flex flex-col md:flex-row gap-4">
                <div
                    ref={passageDivRef}
                    className="border-[1.5px] border-gray-300 rounded-md overflow-x-hidden flex-1 flex flex-col"
                >
                    <div
                        className={`border-b-[1.5px] border-gray-300 p-1 h-[40px] flex items-center justify-between ${
                            data?.tasks?.length === 1
                                ? 'cursor-not-allowed bg-gray-400'
                                : 'md:bg-gray-50'
                        }`}
                    >
                        <button
                            className={`flex-1 ${
                                currentQuestionIndex === 0
                                    ? 'bg-primary py-1 rounded-full md:rounded text-white'
                                    : ''
                            }`}
                            onClick={() => {
                                setCurrentQuestionIndex(0);
                            }}
                        >
                            <p className="text-center">Task 1</p>
                        </button>
                        <button
                            className={cn(
                                `flex-1 border-l-[0.75px] border-gray-300 ${
                                    currentQuestionIndex === 1
                                        ? 'bg-primary py-1 rounded-full md:rounded text-white'
                                        : ''
                                }`,
                                data?.tasks?.length === 1 && 'cursor-not-allowed bg-gray-400',
                            )}
                            onClick={() => {
                                if (data?.tasks?.length === 1) return;
                                setCurrentQuestionIndex(1);
                            }}
                        >
                            <p className="text-center">Task 2</p>
                        </button>
                    </div>
                    <div className="overflow-y-scroll flex-1">
                        {currentQuestionData?.instruction && (
                            <p className="text-sm p-4 border-b">
                                <span className="font-semibold">Instructions : </span>{' '}
                                {currentQuestionData?.instruction}
                            </p>
                        )}
                        <div className="p-4 flex flex-col gap-1">
                            <p className="text-sm font-semibold">Question</p>
                            <p className="text-sm mt-1">{currentQuestionData?.question}</p>
                            {currentQuestionData?.image_url && (
                                <img
                                    src={currentQuestionData?.image_url}
                                    className="w-full object-contain border rounded-md overflow-hidden mt-4"
                                    alt="question-ref"
                                />
                            )}
                            {currentQuestionData?.keywords && (
                                <div className="mt-4 hidden md:flex flex-col gap-2">
                                    <p className="text-sm font-semibold">Keywords</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {currentQuestionData?.keywords?.map(
                                            (keyword: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="py-1 px-2 bg-gray-200 text-sm rounded-md"
                                                >
                                                    {keyword}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    ref={questionsDivRef}
                    className="border-[1.5px] border-gray-300 rounded-md flex-1 flex flex-col overflow-hidden"
                >
                    <div className="p-2 font-inter border-b-[1.5px] border-gray-300 h-[40px] text-sm flex items-center bg-gray-200">
                        <div className="px-2 border-r-[1.5px] border-gray-300">
                            Word Count : {solutions?.[currentQuestionData?.id]?.word_count | 0}
                        </div>
                        <div className="px-2 border-r-[1.5px] border-gray-300">
                            Paragraph Count :{' '}
                            {solutions?.[currentQuestionData?.id]?.paragraph_count | 0}
                        </div>
                        <div className="px-2 border-r-[1.5px] border-gray-300">
                            Spaces Count : {solutions?.[currentQuestionData?.id]?.space_count | 0}
                        </div>
                    </div>
                    <div className="flex-1 w-full  flex flex-col">
                        <textarea
                            ref={textareaRef}
                            spellCheck={false}
                            className="overflow-scroll flex-1 w-full min-h-72  resize-none p-4 text-sm outline-none"
                            placeholder="Put your answer here"
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value);

                                const taskId = currentQuestionData?.id;
                                const solution = {
                                    id: currentQuestionData?.id,
                                    answer: e.target.value,
                                    word_count: countWords(e.target.value.trim()),
                                    paragraph_count: countParagraphs(e.target.value.trim()),
                                    space_count: countSpaces(e.target.value.trim()),
                                    backspace_count: 0,
                                    delete_count: 0,
                                };

                                // Count backspaces and deletes
                                const inputType = (e.nativeEvent as InputEvent).inputType;
                                const backspaceCount =
                                    inputType === 'deleteContentBackward' ? 1 : 0;
                                const deleteCount = inputType === 'deleteContentForward' ? 1 : 0;

                                setSolutions((prev: any) => ({
                                    ...prev,
                                    [taskId]: {
                                        ...solution,
                                        backspace_count: solution.backspace_count + backspaceCount,
                                        delete_count: solution.delete_count + deleteCount,
                                    },
                                }));
                            }}
                        />
                        {/* <div className="flex justify-end p-3">
                            {currentQuestionIndex === 0 && (
                                <Button
                                    label="Next"
                                    className="w-fit px-6"
                                    disabled={
                                        solutions.length === 0 ||
                                        solutions?.[currentQuestionData?.id]?.word_count > 150
                                    }
                                    onClick={() => {
                                        setCurrentQuestionIndex(1);
                                    }}
                                />
                            )}
                        </div> */}
                        {currentQuestionData?.keywords && (
                            <div className="mt-4 md:hidden flex flex-col gap-2">
                                <p className="text-sm font-semibold">Keywords</p>
                                <div className="flex gap-2 flex-wrap">
                                    {currentQuestionData?.keywords?.map(
                                        (keyword: string, index: number) => (
                                            <span
                                                key={index}
                                                className="py-1 px-2 bg-gray-200 text-sm rounded-md"
                                            >
                                                {keyword}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionContainer;
