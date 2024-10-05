// Internal Imports
import { useState } from 'react';

// Components
import FullScreen from 'components/FullScreen';
import Instructions from './Instructions';
import Navbar from './Navbar';
import MainSection from './MainSection';

// Providers
import TestProvider from './TestProvider';
import Sidebar from './Sidebar';

import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';
import OutOfWindowDetector from 'components/OutOfWindowDetector';
import { useLocation } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';

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
                            <div className="relative flex flex-col md:flex-row  h-screen w-full p-4 gap-3">
                                <div className="h-full w-full  flex-1 flex flex-col gap-3 ">
                                    <Navbar />
                                    <MainSection />
                                </div>

                                <Sidebar />
                                <div className="absolute bottom-0 w-[100%] right-0 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] bg-white md:hidden">
                                    <MobileSidebar />
                                </div>
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
