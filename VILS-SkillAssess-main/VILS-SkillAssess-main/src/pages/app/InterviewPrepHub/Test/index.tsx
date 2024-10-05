import { useState } from 'react';

// Providers
import TestProvider from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';

// Components
import Navbar from './Navbar';
import VideoScreen from './VideoScreen';
import QuestionContainer from './QuestionContainer';
import FullScreen from 'components/FullScreen';
import OutOfWindowDetector from 'components/OutOfWindowDetector';
import InstructionsPage from './Instructions';
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
                                <div className="h-screen w-full flex flex-col p-4 gap-3">
                                    <Navbar />
                                    <VideoScreen />
                                    <QuestionContainer />
                                </div>
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
