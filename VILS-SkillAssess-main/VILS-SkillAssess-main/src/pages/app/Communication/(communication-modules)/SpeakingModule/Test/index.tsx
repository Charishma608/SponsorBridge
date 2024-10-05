// Components
import FullScreen from 'components/FullScreen';
import Navbar from './Navbar';
import QuestionContainer from './QuestionContainer';
import VideoScreen from './VideoScreen';
import InstructionsPage from './Instructions';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

// Providers
import TestProvider from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';

// Internal Imports
import { useState } from 'react';
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
                                    <div className="h-screen w-full hidden md:flex flex-col p-4 gap-3">
                                        <Navbar />
                                        <VideoScreen />
                                        <QuestionContainer />
                                    </div>
                                    <div
                                        className="h-screen w-full md:hidden flex flex-col p-4 gap-6"
                                        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                                    >
                                        <Navbar />
                                        <div className="flex-1">
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
