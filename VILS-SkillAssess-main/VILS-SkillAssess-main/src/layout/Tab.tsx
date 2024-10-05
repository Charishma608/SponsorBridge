// Internal Imports
import { useNavigate } from 'react-router-dom';

// Hooks
import { useLayout } from 'providers/LayoutProvider';

// Interface defining the props for the Tab component
interface TabProps {
    label: string;
    icon?: any;
    iconClassName?: string;
    isActive?: boolean;
    path: string;
}

// Functional Component representing a navigation tab
const Tab: React.FC<TabProps> = ({
    label = '',
    icon = null,
    iconClassName = '',
    path = '/dashboard',
}) => {
    // Destructure the icon and isSidebarOpened from custom hook
    const Icon = icon;
    const navigate = useNavigate();
    const { isSidebarOpened } = useLayout();

    // Determine if the tab is active based on the current path
    const isActive =
        path.split('/')[1].split('?')[0] === window.location.pathname.split('/')[1].split('?')[0];

    // Function to handle tab navigation
    const handleNavigation = () => {
        navigate(path);
    };

    // Render different styles based on sidebar state
    if (isSidebarOpened) {
        return (
            <div
                onClick={handleNavigation}
                className={`${
                    isActive ? 'bg-primary text-white' : 'bg-white text-black'
                } rounded-3xl py-2 px-3 lg:px-4 flex items-center cursor-pointer w-full`}
            >
                {icon && (
                    <div className="min-w-[28px] text-[18px]">
                        <Icon />
                    </div>
                )}
                {iconClassName && (
                    <div className="min-w-[28px]">
                        <i className={`${iconClassName} text-[20px]`} />
                    </div>
                )}
                <p className="text-sm ms-2">{label}</p>
            </div>
        );
    } else {
        return (
            <div
                onClick={handleNavigation}
                className={`grid place-content-center ${
                    isActive ? 'bg-primary text-white' : 'bg-white text-black'
                } rounded-full h-[40px] w-[40px] cursor-pointer`}
            >
                {icon && (
                    <div className="w-[30px] text-[20px] grid place-content-center">
                        <Icon />
                    </div>
                )}
                {iconClassName && (
                    <div className="w-[30px] grid place-content-center">
                        <i className={`${iconClassName} text-[20px]`} />
                    </div>
                )}
            </div>
        );
    }
};

export default Tab;
