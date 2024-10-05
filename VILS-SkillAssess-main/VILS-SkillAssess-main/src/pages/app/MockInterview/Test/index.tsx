import { useState } from 'react';

// Providers
import TestProvider from './TestProvider';

// Components
import Navbar from './Navbar';
import VideoScreen from './VideoScreen';
import QuestionContainer from './QuestionContainer';
import FullScreen from 'components/FullScreen';
import OutOfWindowDetector from 'components/OutOfWindowDetector';
import InstructionsPage from './Instructions';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';
import InternetSpeedCheckerProvider from 'providers/InternetSpeedCheckerProvider';

const TestPage = () => {
    const [instructionRead, setInstructionRead] = useState<boolean>(false);

    return (
        <InternetSpeedCheckerProvider>
            <TestProvider>
                <FullScreenDetectorProvider>
                    <FullScreen>
                        {instructionRead ? (
                            <OutOfWindowDetector>
                                <>
                                    <div className="h-screen w-full hidden md:flex flex-col p-4 gap-3 overflow-hidden">
                                        <Navbar />
                                        <VideoScreen />
                                        <QuestionContainer />
                                    </div>
                                    <div
                                        className="h-screen w-full md:hidden flex flex-col p-4 gap-6"
                                        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                                    >
                                        <Navbar />
                                        <div className="flex-1 flex flex-row justify-center  items-stretch  overflow-hidden overflow-y-scroll">
                                            <QuestionContainer />
                                        </div>
                                        <div className="w-full flex-shrink-0">
                                            <VideoScreen />
                                        </div>
                                    </div>
                                </>
                            </OutOfWindowDetector>
                        ) : (
                            <InstructionsPage setInstructionRead={setInstructionRead} />
                        )}
                    </FullScreen>
                </FullScreenDetectorProvider>
            </TestProvider>
        </InternetSpeedCheckerProvider>
    );
};

export default TestPage;
