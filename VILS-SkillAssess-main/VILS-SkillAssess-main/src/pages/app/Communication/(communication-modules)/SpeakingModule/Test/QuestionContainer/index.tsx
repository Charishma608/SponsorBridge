// Internal Imports
// import { useCallback, useEffect } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';

const QuestionContainer = () => {
    const { currentQuestionData, totalQuestion, currentQuestionIndex } = useTestContext();

    // const speak = useCallback(() => {
    //     if ('speechSynthesis' in window) {
    //         const utterance = new SpeechSynthesisUtterance(currentQuestionData?.question);
    //         window.speechSynthesis.speak(utterance);
    //     }
    // }, [currentQuestionData]);

    // useEffect(() => {
    //     speak();
    // }, [speak]);

    return (
        <div className="md:border-[1.5px] border-gray-300 min-h-[300px] text-sm sm:text-md rounded-md p-4 md:min-h-[120px] overflow-y-scroll flex flex-col items-center justify-center md:items-start md:justify-start">
            {totalQuestion > currentQuestionIndex && (
                <>
                    <p className="font-semibold mb-1 text-center md:text-left">
                        Question {currentQuestionIndex + 1} of {totalQuestion}
                    </p>
                    <p className="text-center md:text-left">{currentQuestionData?.question}</p>
                </>
            )}
            {totalQuestion === currentQuestionIndex && (
                <p className="text-center md:text-left">
                    Thanks for completing the test. Please click on `Submit Test` to submit your
                    response.
                </p>
            )}
        </div>
    );
};

export default QuestionContainer;
