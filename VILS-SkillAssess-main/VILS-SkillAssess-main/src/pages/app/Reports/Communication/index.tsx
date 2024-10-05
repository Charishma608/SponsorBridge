// Internal Imports
import { lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Components
import PageNotFound from '../PageNotFound';

// Components
const Reading = lazy(() => import('./Reading'));
const Writing = lazy(() => import('./Writing'));
const Speaking = lazy(() => import('./Speaking'));
const Listening = lazy(() => import('./Listening'));
const Grammar = lazy(() => import('./Grammar'));
const Vocabulary = lazy(() => import('./Vocabulary'));

const Communication = () => {
    const TABS = [
        {
            label: 'Reading',
            component: Reading,
            tabPath: 'reading',
        },
        {
            label: 'Writing',
            component: Writing,
            tabPath: 'writing',
        },
        {
            label: 'Speaking',
            component: Speaking,
            tabPath: 'speaking',
        },
        {
            label: 'Listening',
            component: Listening,
            tabPath: 'listening',
        },
        {
            label: 'Grammar',
            component: Grammar,
            tabPath: 'grammar',
        },
        {
            label: 'Vocabulary',
            component: Vocabulary,
            tabPath: 'vocabulary',
        },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const activeTab = searchParams.get('type') || 'reading';

    const Comp = TABS.find((tab) => tab.tabPath === activeTab)?.component;

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-hidden flex justify-between items-center gap-3 shadow-stripe rounded-3xl">
                {TABS.map(({ label, tabPath }, index) => (
                    <Tab
                        key={index}
                        label={label}
                        isActive={activeTab === tabPath}
                        onClick={() => {
                            navigate({
                                pathname: '/reports',
                                search: new URLSearchParams({
                                    activeTab: 'communication',
                                    type: tabPath,
                                }).toString(),
                            });
                        }}
                    />
                ))}
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
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label = '', isActive = false, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-6 text-sm  rounded-3xl ${isActive ? 'bg-primary text-white' : ''}`}
        >
            <p>{label}</p>
        </button>
    );
};

export default Communication;
