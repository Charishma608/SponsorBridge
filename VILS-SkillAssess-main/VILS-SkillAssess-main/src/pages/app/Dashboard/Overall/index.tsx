// Internal Imports
import { Suspense, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import PageNotFound from '../PageNotFound';
import { useLayout } from 'providers/LayoutProvider';

// Tabs
const Communication = lazy(() => import('./Communication'));
const DomainKnowledge = lazy(() => import('./DomainKnowledge'));
const Personality = lazy(() => import('./Personality'));
const Confidence = lazy(() => import('./Confidence'));
// const CareerGuidance = lazy(() => import('./CareerGuidance'));

const Overall = () => {
    const { sidebarComponents } = useLayout();

    const show = (tabName: string) => {
        if (tabName === 'Confidence') {
            return sidebarComponents?.dashboard?.components?.overall?.confidence;
        }
        if (tabName === 'Communication') {
            return sidebarComponents?.dashboard?.components?.overall?.communication;
        }
        if (tabName === 'Domain Knowledge') {
            return sidebarComponents?.dashboard?.components?.overall?.domain_knowledge;
        }
        if (tabName === 'Personality') {
            return sidebarComponents?.dashboard?.components?.overall?.personality;
        }

        return true;
    };

    const TABS = [
        {
            label: 'Communication',
            component: Communication,
            tabPath: 'communication',
        },
        {
            label: 'Domain Knowledge',
            component: DomainKnowledge,
            tabPath: 'domain-knowledge',
        },
        {
            label: 'Personality',
            component: Personality,
            tabPath: 'personality',
        },
        {
            label: 'Confidence',
            component: Confidence,
            tabPath: 'confidence',
        },
        // {
        //     label: 'Career Guidance',
        //     component: CareerGuidance,
        //     tabPath: 'career-guidance',
        // },
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const activeTab = searchParams.get('type') || 'communication';

    const Comp = TABS.find((tab) => tab.tabPath === activeTab)?.component;
    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="overflow-hidden flex justify-between horizontal-scroll overflow-x-auto items-center gap-3 shadow-stripe rounded-3xl">
                {TABS.map(({ label, tabPath }, index) => {
                    if (show(label) === false) return null;
                    return (
                        <Tab
                            key={index}
                            label={label}
                            isActive={activeTab === tabPath}
                            onClick={() => {
                                navigate({
                                    pathname: '/dashboard',
                                    search: new URLSearchParams({
                                        activeTab: 'overall',
                                        type: tabPath,
                                    }).toString(),
                                });
                            }}
                        />
                    );
                })}
            </div>
            <div className="flex-1">
                <Suspense>{Comp ? <Comp /> : <PageNotFound />}</Suspense>
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    isActive: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label = '', isActive = false, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-6 min-w-[200px] w-full text-sm rounded-3xl ${
                isActive ? 'bg-primary text-white' : ''
            }`}
        >
            <p>{label}</p>
        </button>
    );
};

export default Overall;
