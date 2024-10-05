// Internal Imports
import { Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';

// Tabs
const AllTests = lazy(() => import('./AllTests'));
const StudyMaterial = lazy(() => import('./StudyMaterial'));
const PageNotFound = lazy(() => import('./PageNotFound'));

const AptitudePage = () => {
    const TABS = [
        {
            label: 'All Tests',
            component: AllTests,
            tabPath: 'all-tests',
        },
        {
            label: 'Study Materials',
            component: StudyMaterial,
            tabPath: 'study-materials',
        },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const activeTab = searchParams.get('activeTab') || 'all-tests';
    const Comp = TABS.find((tab) => tab.tabPath === activeTab)?.component;

    return (
        <div className="flex flex-col gap-4 p-4 ps-8">
            <Navbar />
            <div className="md:flex hidden items-center w-fit shadow-stripe rounded-3xl">
                {TABS.map(({ label, tabPath }, index: number) => (
                    <Tab
                        key={index}
                        label={label}
                        isActive={activeTab === tabPath}
                        onClick={() => {
                            navigate({
                                pathname: '/aptitude',
                                search: new URLSearchParams({
                                    activeTab: tabPath,
                                }).toString(),
                            });
                        }}
                    />
                ))}
            </div>
            <div className="w-full md:hidden flex items-center p-2">
    <select
        className="w-full p-2 border-2 border-gray-300 text-primary rounded-3xl shadow-xl bg-white focus:outline-none max-w-full"
        value={activeTab}
        onChange={(e) => {
            const selectedTabPath = e.target.value;
            navigate({
                pathname: '/aptitude',
                search: new URLSearchParams({
                    activeTab: selectedTabPath,
                }).toString(),
            });
        }}
    >
        {TABS.map(({ label, tabPath }, index: number) => (
            <option key={index} value={tabPath} className="truncate">
                {label}
            </option>
        ))}
    </select>
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
            className={`py-2 px-6 text-sm w-[200px] text-center rounded-3xl ${
                isActive ? 'bg-primary text-white shadow-stripe' : ''
            }`}
        >
            <p>{label}</p>
        </button>
    );
};
export default AptitudePage;
