// Hooks
import { useTestContext } from '../TestProvider';
import MCQComponent from '../MCQComponent';
import FillInTheBlankComponent from '../FillInTheBlankComponent';

const MainSection = () => {
    const { currentQuestionData, currentQuestionIndex } = useTestContext();

    return (
        <div className="md:h-full  h-[70%] overflow-hidden overflow-y-scroll  flex flex-col justify-between p-4">
            <div className="flex flex-col h-full">
                <h1 className="font-semibold text-md">
                    {currentQuestionIndex + 1}. {currentQuestionData?.question}
                </h1>
                <div className="mt-6 flex-1">
                    {currentQuestionData?.type === 'radio' ? (
                        <MCQComponent id={currentQuestionData?.id} data={currentQuestionData} />
                    ) : currentQuestionData?.type === 'text' ? (
                        <FillInTheBlankComponent
                            id={currentQuestionData?.id}
                            data={currentQuestionData}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default MainSection;
