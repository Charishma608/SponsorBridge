// Components
import Navbar from './Navbar';
import Instructions from './Instructions';
import NavigationBar from './NavigationBar';
import QuestionContainer from './QuestionContainer';
import FullScreen from 'components/FullScreen';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

// Internal Imports
import { useEffect, useState } from 'react';

// Providers
import TestProvider, { useTestContext } from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';
import { useLocation } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const TestPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const showInstructions = searchParams.get('instructions');

    const [instructionRead, setInstructionRead] = useState<boolean>(
        showInstructions ? true : false,
    );

    return (
        <TestProvider>
            <FullScreenDetectorProvider>
                <FullScreen>
                    {instructionRead ? (
                        <OutOfWindowDetector>
                            <>
                                {/* Main container that uses flex layout */}
                                <div className="h-screen flex flex-col overflow-hidden">
                                    {/* Main content area */}
                                    <div className="flex-1 overflow-y-scroll p-4 flex flex-col gap-3">
                                        <Navbar />
                                        <QuestionContainer />
                                        <NavigationBar />
                                    </div>
                                    {/* Sticky navigation tab at the bottom */}
                                    <div
                                        className="w-full sticky bottom-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] bg-white md:hidden"
                                        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                                    >
                                        <NavigationTabMobile />
                                    </div>
                                </div>
                            </>
                        </OutOfWindowDetector>
                    ) : (
                        <Instructions setInstructionRead={setInstructionRead} />
                    )}
                </FullScreen>
            </FullScreenDetectorProvider>
        </TestProvider>
    );
};

export default TestPage;

const NavigationTabMobile = () => {
    const {
        solutions,
        currentQuestionData,
        currentQuestionIndex,
        totalQuestion,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
        setCurrentQuestionIndex,
        data,
    } = useTestContext();

    const checkIfAnswered = (question_id: string) => {
        const sol = solutions.filter((solution: any) => solution.id === question_id);
        if (sol.length === 0) return false;
        return true;
    };

    const [isOpenNavigation, setIsOpenNavigation] = useState<boolean>(false);

    return (
        <div className="h-full md:w-1/3 w-full border-[1.5px] border-gray-300 rounded-md   md:flex flex-col justify-between">
            <div>
                <div
                    className="px-4 py-2 flex justify-between items-center w-full shadow-md "
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
                        {/* <div className="mt-4 p-4 flex flex-col gap-3">
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
                        </div> */}

                        <div className="mt-4  p-4 flex gap-2 flex-wrap">
                            {data?.map((question: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`h-10 w-10 grid place-content-center rounded cursor-pointer ${
                                            checkIfAnswered(question.id)
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
