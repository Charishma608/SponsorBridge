// Hooks
import { useLayout } from 'providers/LayoutProvider';

const SidebarToggleButton = () => {
    const { toggleSidebar } = useLayout();

    return (
        <button
            onClick={toggleSidebar}
            className={`rounded-full bg-primary h-[45px] w-[45px] grid place-content-center`}
        >
            <div className="h-[3px] rounded-2xl bg-white w-[25px] m-auto" />
            <div className="h-[3px] rounded-2xl bg-white w-[25px] m-auto mt-[5px]" />
        </button>
    );
};

export default SidebarToggleButton;
