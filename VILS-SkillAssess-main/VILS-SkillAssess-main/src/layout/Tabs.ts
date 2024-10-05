// Types
import { Tab, createTab } from 'types/Tab.type';

// Assets
import { IoSettingsOutline } from 'react-icons/io5';
import { LuBrainCircuit } from 'react-icons/lu';
import { CgReadme } from 'react-icons/cg';
import { FaCode } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { PiFinnTheHumanThin } from 'react-icons/pi';
import { BiBookmarkAlt } from 'react-icons/bi';

export const Tabs: Tab[] = [
    createTab({
        label: 'Dashboard',
        path: '/dashboard',
        icon: RiDashboardFill,
    }),
    createTab({
        label: 'Mock Interview',
        path: '/mock-interview/departments',
        iconClassName: 'icon-mock_interviews',
    }),
    createTab({
        label: 'Gap Analysis',
        path: '/gap-analysis/',
        icon: BiBookmarkAlt,
    }),
    createTab({
        label: 'Human Resource',
        path: '/hr/departments',
        icon: PiFinnTheHumanThin,
    }),
    createTab({
        label: 'InterviewPrep Hub',
        path: '/interview-prep-hub/departments',
        iconClassName: 'icon-practice_test',
    }),
    createTab({
        label: 'Communication',
        path: '/communication',
        icon: CgReadme,
    }),
    createTab({
        label: 'Behaviour',
        path: '/behaviour',
        icon: LuBrainCircuit,
    }),
    createTab({
        label: 'Aptitude',
        path: '/aptitude?activeTab=all-tests',
        iconClassName: 'icon-aptitude',
    }),
    createTab({
        label: '1 on 1 Mentor',
        path: '/one-on-one-mentor',
        iconClassName: 'icon-mentoring',
    }),
    createTab({
        label: 'Coding',
        path: '/coding-pro',
        icon: FaCode,
    }),
    createTab({
        label: 'Reports',
        path: '/reports?activeTab=communication&type=reading',
        iconClassName: 'icon-reports',
    }),
    createTab({
        label: 'Settings',
        path: '/settings',
        icon: IoSettingsOutline,
    }),
];
