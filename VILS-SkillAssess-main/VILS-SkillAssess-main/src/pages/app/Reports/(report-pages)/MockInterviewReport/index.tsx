// Internal Imports
import React, { useState } from 'react';

// Components
import Navbar from './Navbar';
import MainSection from './MainSection';
import OverallAnalyticsSidebar from './OverallAnalyticsSidebar';

// External Imports
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

// Providers
import MockInterviewReportProvider from './MockInterviewReportProvider';

const MockInterviewReport = () => {
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpened((prev) => !prev);
    };

    return (
        <MockInterviewReportProvider>
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-screen">
                    <div className="w-full h-full flex flex-col">
                        <Navbar />

                        <div className="flex h-[87vh] relative">
                            <div
                                className={`absolute z-10 top-0 ${
                                    isSidebarOpened ? 'left-[70%]' : 'left-full'
                                } -translate-x-1/2 -translate-y-1/2 transition-all duration-100`}
                            >
                                <SidebarToggleButton
                                    isOpened={isSidebarOpened}
                                    toggle={handleToggleSidebar}
                                />
                            </div>

                            <div
                                className={`${
                                    isSidebarOpened ? 'w-[70%]' : 'w-full'
                                } h-full overflow-y-scroll transition-all duration-100 flex flex-col`}
                            >
                                <MainSection />
                            </div>
                            <OverallAnalyticsSidebar isSidebarOpened={isSidebarOpened} />
                        </div>
                    </div>
                </div>
            </div>
        </MockInterviewReportProvider>
    );
};

interface SidebarToggleButtonProps {
    isOpened: boolean;
    toggle: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
    isOpened,
    toggle = () => {},
}) => {
    return (
        <button
            onClick={toggle}
            className="h-[40px] w-[40px] rounded-full grid place-content-center text-white bg-gradient"
        >
            {isOpened ? <GrLinkNext /> : <GrLinkPrevious />}
        </button>
    );
};

export default MockInterviewReport;
