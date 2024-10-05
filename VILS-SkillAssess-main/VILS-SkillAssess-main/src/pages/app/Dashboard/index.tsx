// Internal Imports
import React, { lazy, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import ScoreCardContainer from './ScoreCardContainer';

// Hooks
import DashboardProvider from './DashboardProvider';
import PageNotFound from './PageNotFound';
import { useLayout } from 'providers/LayoutProvider';

// Tabs
const Overall = lazy(() => import('./Overall'));
const Communication = lazy(() => import('./Communication'));
const DomainKnowledge = lazy(() => import('./DomainKnowledge'));
const Aptitude = lazy(() => import('./Aptitude'));
const Grammar = lazy(() => import('./Grammar'));
const Vocab = lazy(() => import('./Vocabulary'));
const Personality = lazy(() => import('./Personality'));

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const activeTab = searchParams.get('activeTab') || 'overall';

    const { sidebarComponents } = useLayout();

    const show = (tabName: string) => {
        if (tabName === 'Aptitude') {
            return sidebarComponents?.dashboard?.components?.aptitude;
        }
        if (tabName === 'Communication') {
            return sidebarComponents?.dashboard?.components?.communication;
        }
        if (tabName === 'Domain Knowledge') {
            return sidebarComponents?.dashboard?.components?.domain_knowledge;
        }
        if (tabName === 'Grammar') {
            return sidebarComponents?.dashboard?.components?.grammar;
        }
        if (tabName === 'Vocabulary') {
            return sidebarComponents?.dashboard?.components?.vocabulary;
        }
        if (tabName === 'Personality') {
            return sidebarComponents?.dashboard?.components?.personality;
        }

        return true;
    };

    const TABS = [
        {
            label: 'Overall',
            component: Overall,
            tabPath: 'overall',
        },
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
            label: 'Aptitude',
            component: Aptitude,
            tabPath: 'aptitude',
        },
        {
            label: 'Grammar',
            component: Grammar,
            tabPath: 'grammar',
        },
        {
            label: 'Vocabulary',
            component: Vocab,
            tabPath: 'vocabulary',
        },
        {
            label: 'Personality',
            component: Personality,
            tabPath: 'personality',
        },
    ];
    const Comp = TABS.find((tab) => tab.tabPath === activeTab)?.component;

    const MOBILETABS = [
        {
            label: 'Mock Interview',
            //component: Personality,
            backgroundCol: '#037AD6',
            tabPath: 'mock-interview/departments',
        },
        {
            label: 'Communication',
            //component: Communication,
            backgroundCol: '#5380A0',
            tabPath: 'communication',
        },
        {
            label: 'Domain Knowledge',
            //component: DomainKnowledge,
            backgroundCol: '#1EC3CB',
            tabPath: 'gap-analysis',
        },
        {
            label: 'Aptitude',
            // component: Aptitude,
            backgroundCol: '#CC605C',
            tabPath: 'aptitude',
        },
        {
            label: 'Personality',
            //component: Personality,
            backgroundCol: '#FF6060',
            tabPath: 'behaviour',
        },
    ];

    return (
        <DashboardProvider>
            <div className="flex flex-col gap-4 p-4 md:ps-8 min-h-screen">
                <Navbar />
                <ScoreCardContainer />
                <div className="md:flex hidden flex-col md:flex-row items-center gap-8 mt-4 overflow-x-scroll horizontal-scroll">
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
                                            activeTab: tabPath,
                                        }).toString(),
                                    });
                                }}
                            />
                        );
                    })}
                </div>
                <div className="flex md:hidden flex-col md:flex-row items-center gap-4 mt-4 mx-2 overflow-x-scroll horizontal-scroll">
                    {MOBILETABS.map(({ label, tabPath, backgroundCol }, index) => {
                        if (show(label) === false) return null;
                        return (
                            <MobileTab
                                key={index}
                                label={label}
                                isActive={activeTab === tabPath}
                                color={backgroundCol}
                                onClick={() => {
                                    navigate({
                                        pathname: `/${tabPath}`,
                                    });
                                }}
                            />
                        );
                    })}
                </div>
                <Suspense>
                    <div className="flex-1 md:block hidden">
                        {Comp ? <Comp /> : <PageNotFound />}
                    </div>
                </Suspense>
            </div>
        </DashboardProvider>
    );
};

interface TabProps {
    label: string;
    isActive: boolean;
    onClick?: () => void;
}
interface MobileTabProps {
    label: string;
    isActive: boolean;
    onClick?: () => void;
    color?: string;
}

const Tab: React.FC<TabProps> = ({ label = '', isActive = false, onClick = () => {} }) => {
    return (
        <button onClick={onClick}>
            <p className={isActive ? 'text-black' : 'text-gray-500'}>{label}</p>
            <div className={`h-[2px] mt-[2px] ${isActive ? 'bg-primary' : 'bg-transparent'}`} />
        </button>
    );
};

const MobileTab: React.FC<MobileTabProps> = ({
    label = '',
    isActive = false,
    onClick = () => {},
    color,
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center min-h-[80px] gap-3  w-full bg-white shadow-lg rounded-lg border-2"
        >
            <div className="relative w-[20px] h-[80px] overflow-hidden">
                <div
                    className="absolute top-[-20px] right-0 w-[300%] h-[150%] rounded-r-full bg-[color]"
                    style={{ backgroundColor: color }}
                />
            </div>

            <div className="flex justify-between w-[80%] items-center pl-2">
                <p className="font-semibold">{label}</p>
                <span className="text-4xl">&gt;</span>
            </div>
        </button>
    );
};

export default DashboardPage;
