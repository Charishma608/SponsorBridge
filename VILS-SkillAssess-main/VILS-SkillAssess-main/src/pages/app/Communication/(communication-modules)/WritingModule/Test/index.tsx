// Components
import Navbar from './Navbar';
import Instructions from './Instructions';
import QuestionContainer from './QuestionContainer';
import FullScreen from 'components/FullScreen';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

// Internal Imports
import { useState } from 'react';

// Providers
import TestProvider from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';
import { useLocation } from 'react-router-dom';

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
                            <div className="md:h-screen overflow-hidden w-full flex flex-col gap-3 justify-between p-4">
                                <Navbar />
                                <QuestionContainer />
                            </div>
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
