// Internal Imports
import { Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import { useLayout } from 'providers/LayoutProvider';

// Tabs
const Communication = lazy(() => import('./Communication'));
const TechMCQs = lazy(() => import('./TechMCQs'));
const Behaviour = lazy(() => import('./Behaviour'));
const MockInterviews = lazy(() => import('./MockInterviews'));
const HR = lazy(() => import('./HR'));
const InterviewPrepHub = lazy(() => import('./InterviewPrepHub'));
const AptitudeTests = lazy(() => import('./AptitudeTests'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const Coding = lazy(() => import('./Coding'));
// const GapAnalysis = lazy(() => import('./GapAnalysis'));

const Reports = () => {
    const { sidebarComponents } = useLayout();

    const show = (tabName: string) => {
        if (tabName === 'Aptitude') {
            return sidebarComponents?.report?.components?.aptitude;
        }
        if (tabName === 'Communication') {
            return sidebarComponents?.report?.components?.communication;
        }
        if (tabName === 'Behaviour') {
            return sidebarComponents?.report?.components?.behaviour;
        }
        if (tabName === 'Coding') {
            return sidebarComponents?.report?.components?.coding;
        }
        if (tabName === 'Human Resource') {
            return sidebarComponents?.report?.components?.hr_interview;
        }
        if (tabName === 'Mock Interviews') {
            return sidebarComponents?.report?.components?.mock_interview;
        }
        if (tabName === 'Interview Prep Hub') {
            return sidebarComponents?.report?.components?.practice_test;
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
            label: 'Behaviour',
            component: Behaviour,
            tabPath: 'behaviour',
        },
        {
            label: 'Mock Interviews',
            component: MockInterviews,
            tabPath: 'mock-interviews',
        },
        {
            label: 'Human Resource',
            component: HR,
            tabPath: 'hr',
        },
        {
            label: 'Interview Prep Hub',
            component: InterviewPrepHub,
            tabPath: 'interview-prep-hub',
        },
        {
            label: 'Aptitude',
            component: AptitudeTests,
            tabPath: 'aptitude-tests',
        },
        {
            label: 'Coding',
            component: Coding,
            tabPath: 'coding',
        },
        {
            label: 'Tech MCQs',
            component: TechMCQs,
            tabPath: 'tech-mcqs',
        },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const activeTab = searchParams.get('activeTab') || 'communication';
    const Comp = TABS.find((tab) => tab.tabPath === activeTab)?.component;

    return (
        <div className="flex flex-col gap-4 p-4 ps-8">
            <Navbar />
            <div className="flex items-center horizontal-scroll overflow-x-auto gap-8 mt-4">
                {TABS.map(({ label, tabPath }, index) => {
                    if (show(label) === false) return null;
                    return (
                        <Tab
                            key={index}
                            label={label}
                            isActive={activeTab === tabPath}
                            disabled={false}
                            onClick={() => {
                                navigate({
                                    pathname: '/reports',
                                    search: new URLSearchParams({
                                        activeTab: tabPath,
                                    }).toString(),
                                });
                            }}
                        />
                    );
                })}
            </div>
            <div>
                <Suspense>{Comp ? <Comp /> : <PageNotFound />}</Suspense>
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    isActive: boolean;
    disabled: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({
    label = '',
    isActive = false,
    onClick = () => {},
    disabled,
}) => {
    return (
        <button onClick={disabled ? () => {} : onClick}>
            <p
                className={
                    disabled
                        ? 'text-gray-500 cursor-not-allowed'
                        : isActive
                        ? 'text-black'
                        : 'text-gray-500'
                }
            >
                {label}
            </p>
            <div className={`h-[2px] mt-[2px] ${isActive ? 'bg-primary' : 'bg-transparent'}`} />
        </button>
    );
};

export default Reports;
