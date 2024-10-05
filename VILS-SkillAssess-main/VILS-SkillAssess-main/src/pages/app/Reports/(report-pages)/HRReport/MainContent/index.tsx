// Internal Imports
import React, { useState } from 'react';

// Components
import Navbar from '../Navbar';
import MainSection from '../MainSection';
import OverallAnalyticsSidebar from '../OverallAnalyticsSidebar';

// External Imports
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

// context

import { useHRReportsContext } from '../HRReportProvider';
import ModalWrapper from 'components/ModalWrapper';
import { MdCancel } from 'react-icons/md';
import CompetencyChart from '../OverallAnalyticsSidebar/CompetencyChart';

const MainContent = () => {
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpened((prev) => !prev);
    };
    const { spiderWebOpen, data, handleToggleSpiderWebAnalysis } = useHRReportsContext();

    return (
        <>
            {spiderWebOpen && (
                <ModalWrapper>
                    <div>
                        <div className="w-[60vw] h-[90vh] bg-white p-4 rounded-md relative flex flex-col overflow-hidden">
                            <button className="absolute top-3 right-3">
                                <MdCancel onClick={handleToggleSpiderWebAnalysis} />
                            </button>
                            <div className="text-center">
                                <p className="font-semibold font-inter">Competency Chart</p>
                            </div>
                            <div className="flex-1 h-full overflow-hidden">
                                <div className="h-[600px]">
                                    <CompetencyChart
                                        data={[
                                            {
                                                label: 'Team Work',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.teamwork,
                                            },
                                            {
                                                label: 'Leadership',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.leadership,
                                            },
                                            {
                                                label: 'Innovation',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.creativity_innovation,
                                            },
                                            {
                                                label: 'Motivation',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.motivation,
                                            },
                                            {
                                                label: 'Positive Attitude',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.positive_attitude,
                                            },
                                            {
                                                label: 'Problem Solving',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.problem_solving,
                                            },
                                            {
                                                label: 'Detail-Oriented',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.detail_oriented,
                                            },
                                            {
                                                label: 'Adatability',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.adaptability,
                                            },
                                            {
                                                label: 'Learning Ability',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.learning_ability_initiative,
                                            },
                                            {
                                                label: 'Professionalism',
                                                value: data?.overall_result?.competency_analysis
                                                    ?.professionalism,
                                            },
                                        ]}
                                        fill="#3EA3B9"
                                        stroke="#3EA3B9"
                                        tooltipBorder="#3EA3B9"
                                        tooltipColor="#3EA3B9"
                                        tickFontSize={16}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalWrapper>
            )}
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
        </>
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

export default MainContent;
