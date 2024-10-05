import { useEffect, useState } from 'react';

// Components
import FullScreen from 'components/FullScreen';
import Navbar from './Navbar';
import NavigationTab from './NavigationTab';
import QuestionContainer from './QuestionContainer';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

// Providers
import TestProvider, { useTestContext } from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';
import InstructionsPage from './Instructions';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const TestPage = () => {
    const [instructionRead, setInstructionRead] = useState<boolean>(false);

    return (
        <TestProvider>
            <FullScreenDetectorProvider>
                <FullScreen>
                    {instructionRead ? (
                        <OutOfWindowDetector>
                            <div className="relative flex flex-col md:flex-row h-screen w-full p-4 gap-3">
                                <div className="h-full flex-1 flex flex-col gap-3">
                                    <Navbar />
                                    <QuestionContainer />
                                </div>
                                <NavigationTab />
                                <div className="absolute bottom-0 w-[100%] right-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] bg-white md:hidden">
                                    <NavigationTabMobile />
                                </div>
                            </div>
                        </OutOfWindowDetector>
                    ) : (
                        <InstructionsPage setInstructionRead={setInstructionRead} />
                    )}
                </FullScreen>
            </FullScreenDetectorProvider>
        </TestProvider>
    );
};

export default TestPage;

const NavigationTabMobile = () => {
    const { startTimer, totalQuestion, solutions, data, setCurrentQuestionIndex } =
        useTestContext();

    const checkIfAnswered = (index: number) => {
        const questionId = data?.questions[index]?.question_id;
        const sol =
            solutions.filter((solution: any) => {
                return solution.question_id === questionId;
            }) || [];

        return sol.length > 0;
    };

    useEffect(() => {
        startTimer();
    }, [startTimer]);

    const [isOpenNavigation, setIsOpenNavigation] = useState<boolean>(false);

    return (
        <div className="h-full md:w-1/3 w-full border-[1.5px] border-gray-300 rounded-md   md:flex flex-col justify-between">
            <div>
                <div
                    className="p-4 flex justify-between items-center w-full shadow-md "
                    onClick={() => setIsOpenNavigation(!isOpenNavigation)}
                >
                    <div className="">
                        <p className="font-semibold">Overview</p>
                    </div>
                    <div className="flex justify-center items-center">
                        {isOpenNavigation ? <FaAngleUp size={30} /> : <FaAngleDown size={30} />}
                    </div>
                </div>
                {isOpenNavigation && (
                    <>
                        <div className="mt-4 p-4 flex flex-col gap-3">
                            <div className="flex  justify-between items-center text-sm">
                                <div className="flex items-center gap-4 justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-6 w-6 bg-primary rounded" />
                                        <p>Answered</p>
                                    </div>
                                    <p>{solutions?.length}</p>
                                </div>
                                <div className="flex items-center gap-4 justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 border-primary border-[1.5px] rounded" />
                                        <p>Unanswered</p>
                                    </div>
                                    <p>{totalQuestion - solutions?.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4  p-4 flex gap-2 flex-wrap">
                            {new Array(totalQuestion).fill(0).map((_, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`h-10 w-10 grid place-content-center rounded cursor-pointer ${
                                            checkIfAnswered(index)
                                                ? 'bg-primary text-white'
                                                : 'border-[1.5px] border-primary text-primary'
                                        }`}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                        }}
                                    >
                                        <p className="text-xs">{index + 1}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
