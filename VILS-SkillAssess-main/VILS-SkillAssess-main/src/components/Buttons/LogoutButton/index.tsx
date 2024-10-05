// External Imports
import cookies from 'js-cookie';
import { LuLogOut } from 'react-icons/lu';

// Utils
import { cn } from 'utils/helper';

// Hooks
import { useAuth } from 'providers/AuthProvider';

// Configs
import axiosInstance from 'configs/axios.config';
// import codingAxiosInstance from 'configs/coding.config';

interface LogoutButtonProps {
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
    onClick,
    className = '',
    iconClassName = '',
}) => {
    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        // const resp = await codingAxiosInstance.post(`/auth/student/logout`);
        // if (resp.status === 201) {
        const res = await axiosInstance.post('/student/auth/logout');
        if (res.status === 200) {
            // Clear all cookies
            const allCookies = cookies.get();
            for (const cookieName in allCookies) {
                cookies.remove(cookieName);
            }

            localStorage.clear();

            setIsAuthenticated(false);
        }
        // }
    };

    return (
        <button className={cn(className)} onClick={onClick ? onClick : handleLogout}>
            <LuLogOut className={cn('text-xl text-yellow-600', iconClassName)} />
        </button>
    );
};

export default LogoutButton;
