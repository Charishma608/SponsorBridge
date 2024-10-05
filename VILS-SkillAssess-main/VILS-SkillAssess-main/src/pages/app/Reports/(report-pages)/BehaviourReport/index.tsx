// Internal Imports
import { Suspense, lazy, useState } from 'react';

// Components
import Navbar from './Navbar';
import SwitchContainer from './SwitchContainer';
import BehaviourReportsProvider from './BehaviourReportProvider';

// Tabs
const PersonalityType = lazy(() => import('./PersonalityType'));
const Competencies = lazy(() => import('./Competencies'));

const BehaviourReport = () => {
    const [activeTab, setActiveTab] = useState<'personality_type' | 'competencies'>(
        'personality_type',
    );

    return (
        <BehaviourReportsProvider>
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-screen flex flex-col">
                    <Navbar />
                    <div className="flex flex-col flex-1 overflow-y-scroll mt-[1px]">
                        <SwitchContainer activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className="flex flex-col gap-2 ps-8 pe-4 flex-1">
                            <div>
                                <h3 className="text-lg font-semibold ml-1">
                                    {activeTab === 'personality_type'
                                        ? 'Personality Type'
                                        : 'Competencies'}
                                </h3>
                            </div>
                            <div className="flex-1 mb-4">
                                <Suspense>
                                    {activeTab === 'personality_type' ? (
                                        <PersonalityType />
                                    ) : (
                                        <Competencies />
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BehaviourReportsProvider>
    );
};

export default BehaviourReport;
