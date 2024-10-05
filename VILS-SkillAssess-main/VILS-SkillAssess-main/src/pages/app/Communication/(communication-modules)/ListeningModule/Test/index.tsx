// Internal Imports
import { useState } from 'react';

// Components
import FullScreen from 'components/FullScreen';
import Instructions from './Instructions';
import Navbar from './Navbar';
import MainSection from './MainSection';

// Providers
import TestProvider from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';
import OutOfWindowDetector from 'components/OutOfWindowDetector';
import MainSectionMobile from './MainSectionMobile';

const TestPage = () => {
    const [instructionRead, setInstructionRead] = useState<boolean>(false);

    return (
        <TestProvider>
            <FullScreenDetectorProvider>
                <FullScreen>
                    {instructionRead ? (
                        <OutOfWindowDetector>
                            <div className="h-screen w-full flex flex-col gap-3 p-4 overflow-hidden">
                                <Navbar />
                                <MainSection />
                                <MainSectionMobile />
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
