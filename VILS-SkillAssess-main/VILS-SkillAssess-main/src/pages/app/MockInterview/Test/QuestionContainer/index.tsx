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
        <div className="md:border-[1.5px] border-gray-300 min-h-[300px] text-sm sm:text-md rounded-md p-4 md:min-h-[120px] flex flex-col justify-center items-center overflow-y-auto md:overflow-auto">
            {totalQuestion > currentQuestionIndex && (
                <div className="text-center">
                    <p className="font-semibold text-center mb-1">
                        Question {currentQuestionIndex + 1} of {totalQuestion}
                    </p>
                    <p className="text-center">{currentQuestionData?.question}</p>
                </div>
            )}
            {totalQuestion === currentQuestionIndex && (
                <p className="text-center">
                    Thanks for completing the test. Please click on `Submit Test` to submit your
                    response.
                </p>
            )}
        </div>
    );
};

export default QuestionContainer;
