// Internal Imports
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    SetStateAction,
    Dispatch,
    useCallback,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Routes
import { AuthRoutes } from 'routes/AuthRoutes';

// Constants
import { LOG_STATUS } from 'constants/index';

// Configs
import axios from 'configs/axios.config';

// Types
import { User } from 'types/User.type';

// External Imports
import cookies from 'js-cookie';

interface AuthContextProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    updateProfilePicture: (image: string) => void;
    user: User | null;
    isVerified: boolean;
    setIsVerified: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook to use the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [initialRedirection, setInitialRedirection] = useState<boolean>(false);

    // Checks if the users id logged in or not
    const checkIfUserLoggedIn = useCallback(async () => {
        try {
            setIsLoading(true);
            if (cookies.get('__SKILLASSESS_LOG_STATUS__') === LOG_STATUS) {
                const response = await axios.get('/student/auth/check-login-status');
                if (response && response.data) {
                    if (response.data.message === 'Student Logged In') {
                        setIsAuthenticated(true);
                    } else {
                        cookies.remove('__SKILLASSESS_LOG_STATUS__', { path: '/' });
                    }
                }
            }
        } catch (error) {
            // console.log(error);
            cookies.remove('__LOG_STATUS__', { path: '/' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Loads the user details
    const fetchUserDetails = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/student/load-details');
            setUser(response?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Function to check if the given path is in the AuthRoutes
    const isPathInAuthRoutes = (path: string) => {
        return AuthRoutes.some((route) => route.path === path);
    };

    // Update Profile Picture
    const updateProfilePicture = (image: string) => {
        setUser((prev) => {
            return { ...prev, photo_url: image };
        });
    };

    useEffect(() => {
        if (isLoading) return;

        const currentPath = window.location.pathname;
        if (isAuthenticated) {
            // if (cookies.get('__REGISTRATION_COMPLETED__') !== 'yes') {
            //     navigate('/register-student-details');
            // } else
            if (currentPath === '/skill/auth/login') {
                navigate('/gap-analysis');
            } else if (isPathInAuthRoutes(currentPath)) {
                navigate('/gap-analysis');
            } else if (currentPath === '/gap-analysis' && location.search === '') {
                navigate('/gap-analysis');
            } else if (currentPath === '/gap-analysis') {
                navigate(`/gap-analysis`);
            } else if (currentPath.split('/').includes('test') && !initialRedirection) {
                navigate('/gap-analysis');
            }
            setInitialRedirection(true);
        } else {
            if (!isPathInAuthRoutes(currentPath)) {
                navigate('/auth/login');
            }
        }
    }, [isAuthenticated, navigate, isLoading, location.search, initialRedirection]);

    useEffect(() => {
        checkIfUserLoggedIn();
    }, [checkIfUserLoggedIn]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserDetails();
        }
    }, [fetchUserDetails, isAuthenticated]);

    const authContextValue: AuthContextProps = {
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        updateProfilePicture,
        user,
        isVerified,
        setIsVerified,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
