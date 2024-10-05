// Internal Imports
import { useNavigate } from 'react-router-dom';
// Assets
import Logo from 'assets/svgs/Logo.svg';

// Hooks
import { useLayout } from 'providers/LayoutProvider';
import { useAuth } from 'providers/AuthProvider';

// Components
import Tab from './Tab';
import { Tabs } from './Tabs';
import UserButton from 'components/Buttons/UserButton';
import LogoutButton from 'components/Buttons/LogoutButton';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const { isSidebarOpened, sidebarComponents } = useLayout();
    const { user } = useAuth();

    const goToSettings = () => {
        navigate('/settings');
    };

    const goToHome = () => {
        navigate('/dashboard');
    };

    const show = (tabName: string) => {
        if (tabName === 'Dashboard') {
            return sidebarComponents?.dashboard?.is_exists;
        }
        if (tabName === 'Reports') {
            return sidebarComponents?.report?.is_exists;
        }
        if (tabName === 'Aptitude') {
            return sidebarComponents?.aptitude;
        }
        if (tabName === 'Behaviour') {
            return sidebarComponents?.behaviour;
        }
        if (tabName === 'Coding') {
            return sidebarComponents?.coding;
        }
        if (tabName === 'Communication') {
            return sidebarComponents?.communication;
        }
        if (tabName === 'Gap Analysis') {
            return sidebarComponents?.gap_analysis;
        }
        if (tabName === 'Human Resource') {
            return sidebarComponents?.hr_interview;
        }
        if (tabName === '1 on 1 Mentor') {
            return sidebarComponents?.mentor;
        }
        if (tabName === 'InterviewPrep Hub') {
            return sidebarComponents?.mock_interview;
        }
        if (tabName === 'Reports') {
            return sidebarComponents?.practice_test;
        }
        return true;
    };

    return (
        <div className="h-full flex flex-1 flex-col justify-between gap-2">
            <div className="flex-1">
                <img src={Logo} alt="logo" onClick={goToHome} className="cursor-pointer" />
                <div className="mt-5 flex flex-col gap-1 items-center h-[80%] overflow-y-scroll">
                    {Tabs.map((tab) => {
                        if (show(tab.label) === false) return null;

                        return (
                            <Tab
                                key={tab.id}
                                label={tab.label}
                                icon={tab.icon}
                                iconClassName={tab.iconClassName}
                                path={tab.path}
                            />
                        );
                    })}
                </div>
            </div>
            {isSidebarOpened ? (
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={goToSettings}>
                        <UserButton />
                        <p className="text-gradient text-sm">
                            {user?.firstname} {user?.lastname}
                        </p>
                    </div>
                    <LogoutButton />
                </div>
            ) : (
                <div className="grid place-content-center">
                    <LogoutButton />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
