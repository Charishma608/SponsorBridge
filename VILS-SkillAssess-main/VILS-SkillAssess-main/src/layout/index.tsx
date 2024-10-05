// Hooks
import { useAuth } from 'providers/AuthProvider';
import { useLayout } from 'providers/LayoutProvider';

// Components
import Sidebar from './Sidebar';
import SidebarToggleButton from './SidebarToggleButton';
import TextHeading from 'components/Texts/TextHeading';

import Logo from 'assets/svgs/Logo.svg';
import axiosInstance from 'configs/axios.config';
import cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import ModalWrapper from 'components/ModalWrapper';
import { RxCross2 } from 'react-icons/rx';
import { LuLogOut } from 'react-icons/lu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const { isSidebarOpened } = useLayout();
    
    const handleLogout = async () => {
        const res = await axiosInstance.post('/student/auth/logout');
        if (res.status === 200) {
            const allCookies = cookies.get();
            for (const cookieName in allCookies) {
                cookies.remove(cookieName);
            }
            localStorage.clear();
            setIsAuthenticated(false);
        }
    };
    
    const [iconData, setIconData] = useState('');
    const fetchData = useCallback(async () => {
        try {
            const res = await axiosInstance(`/student/load-partner-details`);
            setIconData(res?.data?.icon);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [logoutScreen, setLogoutScreen] = useState(false);

    // State to manage navbar visibility
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setNavbarVisible(false);
            } else {
                // Scrolling up
                setNavbarVisible(true);
            }
            setLastScrollY(currentScrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return isAuthenticated ? (
        <>
            {logoutScreen && (
                <ModalWrapper>
                    <div className="bg-white w-[95vw] md:w-[50vw] rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-center font-medium">
                                <p>Logout</p>
                            </div>
                            <div>
                                <RxCross2 onClick={() => setLogoutScreen(false)} />
                            </div>
                        </div>
                        <div className="mt-10 text-center">Do you really want to logout?</div>
                        <div className="mt-6 mb-3 text-center">
                            <button
                                className="w-[80%] text-lg p-3 bg-red-500 text-white rounded-full"
                                onClick={handleLogout}
                            >
                                Yes
                            </button>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={() => setLogoutScreen(false)}
                                className="w-[80%] text-lg p-3 bg-slate-500 text-white rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </ModalWrapper>
            )}

            {/* Navbar */}
            <div className={`flex fixed top-0 left-0 w-full bg-white mb-3 items-center justify-between p-2 md:p-3 transition-transform duration-300 ${navbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <img src={iconData} alt="logo" className="h-8" /> {/* Reduced height */}
                <TextHeading className="mt-2 text-sm">Welcome</TextHeading> {/* Adjusted margin and font size */}
                <div className="border-2 shadow-xl rounded-full p-2">
                    <LuLogOut className="h-5 w-5 cursor-pointer" onClick={() => setLogoutScreen(true)} /> {/* Adjusted icon size */}
                </div>
            </div>
            <div className="h-screen w-screen mt-20 md:mt-0 flex gap-[1px] overflow-hidden">
                <div
                    className={`${
                        isSidebarOpened ? 'w-[21.5%] lg:w-[20%]' : 'w-[100px]'
                    } h-full rounded-r-md shadow-stripe px-1 lg:px-4 py-6 relative duration-100 hidden`}
                >
                    <Sidebar />
                    <div className="absolute top-3 right-0 translate-x-1/2 z-40">
                        <SidebarToggleButton />
                    </div>
                </div>
                <div
                    className={`h-full overflow-y-scroll overflow-x-hidden`}
                    style={{
                        width:
                            window.screen.width < 750
                                ? '100%'
                                : isSidebarOpened
                                ? '100%'
                                : 'calc(100vw - 100px)',
                    }}
                >
                    <div>{children}</div>
                </div>
            </div>
        </>
    ) : (
        <div>{children}</div>
    );
};

export default Layout;
