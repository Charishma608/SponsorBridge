// Internal Imports
import { Suspense, lazy, useState } from 'react';

// Components
import Tab from '../Tab';
import TooltipComp from 'components/Tooltip';

// Tabs
const ShortBioTab = lazy(() => import('./ShortBioTab'));
const PersonalityTypeTab = lazy(() => import('./PersonalityTypeTab'));
const StrengthsTab = lazy(() => import('./StrengthsTab'));
const InterestTab = lazy(() => import('./InterestTab'));
const CoreStrengthTab = lazy(() => import('./CoreStrengthTab'));
const ImprovementAreasTab = lazy(() => import('./ImprovementAreasTab'));

interface TabType {
    label: string;
    comp: React.FC;
    tooltip: string;
}

const PersonalityType = () => {
    const TABS: TabType[] = [
        {
            label: 'Short Bio',
            comp: ShortBioTab,
            tooltip: "Short bio offers a brief profile that provides a perceptive summary of your internal characteristics"
        },
        {
            label: 'Personality Type',
            comp: PersonalityTypeTab,
            tooltip: "Explore more about your personality type like whether you resonate more with being an organizer or an influencer"
        },
        {
            label: 'Strengths',
            comp: StrengthsTab,
            tooltip: "Discover more about your untapped or new strengths"
        },
        {
            label: 'Interest',
            comp: InterestTab,
            tooltip: "Discover more about your untapped or new interests"
        },
        {
            label: 'Core Strength',
            comp: CoreStrengthTab,
            tooltip: "Identify and leverage your inherent strengths, empowering you to excel in your pursuits and contribute meaningfully"
        },
        {
            label: 'Improvement Areas',
            comp: ImprovementAreasTab,
            tooltip: "Pinpoint areas for growth and development, fostering a continuous journey of self-improvement and personal evolution."
        },
    ];

    const [activeTab, setActiveTab] = useState<TabType>(TABS[0]);

    return (
        <div className="flex gap-6">
            <div className="w-[22n[m0px] lg:w-[350px] flex flex-col gap-3">
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

export default PersonalityType;
