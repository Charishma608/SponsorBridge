// Internal Imports
import axiosInstance from 'configs/axios.config';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LayoutContextProps {
    isSidebarOpened: boolean;
    setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
    sidebarComponents: any;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

// Hook to use the layout context
export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within an AuthProvider');
    }
    return context;
};

export const LayoutProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);
    const [sidebarComponents, setSidebarComponents] = useState<any>();

    // Simulates opening the Sidebar
    const openSidebar = () => {
        setIsSidebarOpened(true);
    };

    // Simulates closing the Sidebar
    const closeSidebar = () => {
        setIsSidebarOpened(false);
    };

    // Simulates toggline the Sidebar
    const toggleSidebar = () => {
        setIsSidebarOpened((prev) => !prev);
    };

    useEffect(() => {
        async function getSideBarDeatils() {
            const res = await axiosInstance.get('/student/load-sidebar-components');
            setSidebarComponents(res.data);
            // console.log(res.data);
        }

        getSideBarDeatils();
    }, []);

    // Provide the layout context to the app
    const layoutContextValue: LayoutContextProps = {
        isSidebarOpened,
        setIsSidebarOpened,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        sidebarComponents,
    };

    return <LayoutContext.Provider value={layoutContextValue}>{children}</LayoutContext.Provider>;
};
