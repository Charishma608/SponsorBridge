// Internal Imports
import { useNavigate } from 'react-router-dom';

// External Imports
import { FiUser } from 'react-icons/fi';

// Utils
import { cn } from 'utils/helper';
import { useAuth } from 'providers/AuthProvider';

interface UserButtonProps {
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
}

const UserButton: React.FC<UserButtonProps> = ({ onClick, className = '', iconClassName = '' }) => {
    const navigate = useNavigate();

    const {user} = useAuth();

    const goToAccounts = () => {
        navigate('/account');
    };

    return (
        <button
            className={cn(
                `grid place-content-center bg-primary rounded-full h-[35px] w-[35px] overflow-hidden`,
                className,
            )}
            onClick={onClick ? onClick : goToAccounts}
        >   
            {
                user?.photo_url
                ?
                <>
                    <img src={user.photo_url} alt="profile" className='w-full h-full object-contain' />
                </>
                :
                <FiUser className={cn('text-white text-xl', iconClassName)} />
            }
        </button>
    );
};

export default UserButton;
