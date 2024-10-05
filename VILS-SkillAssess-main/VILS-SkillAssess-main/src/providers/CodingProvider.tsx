// Internal Imports
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    SetStateAction,
    Dispatch,
    useCallback,
    useEffect,
} from 'react';

// Configs
import axios from 'configs/coding.config';

// Hooks
import { useAuth } from 'providers/AuthProvider';
import axiosInstance from 'configs/coding.config';

interface CodingContextProps {
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loginHandler: (password: string) => Promise<void>;
}

const CodingContext = createContext<CodingContextProps | undefined>(undefined);

// Hook to use the authentication context
export const useCoding = () => {
    const context = useContext(CodingContext);
    if (!context) {
        throw new Error('useAuth must be used within an CodingProvider');
    }
    return context;
};

const CodingProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const loginHandler = useCallback(
        async (password: string) => {
            try {
                setIsLoading(true);
                const payload = {
                    email: user?.email,
                    password: password,
                };
                const res = await axios.post(`/auth/student/login`, payload);
                if (res.status === 206) setIsAuthenticated(true);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },
        [user?.email],
    );

    const checkLogin = async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get('/auth/student/check-login-status');
            if (res.status === 200) setIsAuthenticated(true);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <CodingContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                isLoading,
                loginHandler,
            }}
        >
            {children}
        </CodingContext.Provider>
    );
};

export default CodingProvider;
