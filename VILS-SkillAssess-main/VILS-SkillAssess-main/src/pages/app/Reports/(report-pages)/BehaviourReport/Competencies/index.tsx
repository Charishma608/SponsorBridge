// Internal Imports
import { Suspense, lazy, useState } from 'react';

// Components
import Tab from '../Tab';
import TooltipComp from 'components/Tooltip';

// Tabs
const EnterprisingAndPerformingTab = lazy(() => import('./EnterprisingAndPerformingTab'));
const LeadingAndDecidingTab = lazy(() => import('./LeadingAndDecidingTab'));
const OrganisingAndExecutingTab = lazy(() => import('./OrganisingAndExecutingTab'));
const InteractingAndPresentingTab = lazy(() => import('./InteractingAndPresentingTab'));
const SupportingAndCooperatingTab = lazy(() => import('./SupportingAndCooperatingTab'));
const AdaptingAndCopingTab = lazy(() => import('./AdaptingAndCopingTab'));
const AnalysingAndInterpretingTab = lazy(() => import('./AnalysingAndInterpretingTab'));
const CreatingAndConceptualizingTab = lazy(() => import('./CreatingAndConceptualizingTab'));

interface TabType {
    label: string;
    comp: React.FC;
    tooltip: string;
}

const Competencies = () => {
    const TABS: TabType[] = [
        {
            label: 'Enterprising and Performing',
            comp: EnterprisingAndPerformingTab,
            tooltip: "Focuses on results and achieving personal work objectives. Works best when work is related closely to results and the impact of personal efforts is obvious. Shows an understanding of business, commerce and finance. Seeks opportunities for self-development and career advancement"
        },
        {
            label: 'Leading and Deciding',
            comp: LeadingAndDecidingTab,
            tooltip: "Takes control and exercises leadership. Initiates action, gives direction and takes responsibility"
        },
        {
            label: 'Organising and Executing',
            comp: OrganisingAndExecutingTab,    
            tooltip: "Plans ahead and works in a systematic and organised way. Follows directions and procedures. Focuses on customer satisfaction and delivers a quality service or product to the agreed standards."
        },
        {
            label: 'Interacting and Presenting',
            comp: InteractingAndPresentingTab,
            tooltip: "Communicates and networks effectively. Successfully persuades and influences others. Relates to others in a confident and relaxed manner"
        },
        {
            label: 'Supporting and Co-operating',
            comp: SupportingAndCooperatingTab,
            tooltip: "Supports others and shows respect and positive regard for them in social situations. Puts people first, working effectively with individuals and teams, clients and staff. Behaves consistently with clear personal values that complement those of the organisation"
        },
        {
            label: 'Adapting and Coping',
            comp: AdaptingAndCopingTab,
            tooltip: "Adapts and responds well to change. Manages pressure effectively and copes with setbacks"
        },
        {
            label: 'Analysing and Interpreting',
            comp: AnalysingAndInterpretingTab,
            tooltip: "Shows evidence of clear analytical thinking. Gets to the heart of complex problems and issues. Applies own expertise effectively. Quickly learns new technology. Communicates well in writing"
        },
        {
            label: 'Creating and Conceptualizing',
            comp: CreatingAndConceptualizingTab,
            tooltip: "Open to new ideas and experiences. Seeks out learning opportunities. Handles situations and problems with innovation and creativity. Thinks broadly and strategically. Supports and drives organisational change"
        },
    ];

    const [activeTab, setActiveTab] = useState<TabType>(TABS[0]);

    return (
        <div className="flex gap-6">
            <div className="w-[200px] lg:w-[350px] flex flex-col gap-3">
                {TABS.map((tab, index: number) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        isActive={activeTab.label === tab.label}
                        onClick={() => {
                            setActiveTab(tab);
                        }}
                    />
                ))}
            </div>
            <div className="flex-1 rounded-2xl p-4 border-[1.3px] border-primary">
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold text-primary border-b-[1.5px] border-primary w-fit flex items-center gap-2">
                        {activeTab.label}
                        <TooltipComp
                            label={activeTab.tooltip}
                            position='top'
                        />
                    </h2>
                    <Suspense>
                        <activeTab.comp />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Competencies;
