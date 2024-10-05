// External Imports
import { CgBell } from 'react-icons/cg';

// Utils
import { cn } from 'utils/helper';

interface NotificationButtonProps {
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
    onClick = () => {},
    className = '',
    iconClassName = '',
}) => {
    return (
        <button
            className={cn(
                `grid place-content-center bg-primary rounded-full h-[35px] w-[35px]`,
                className,
            )}
            onClick={onClick}
        >
            <CgBell className={cn('icon-notifications text-white text-xl', iconClassName)} />
        </button>
    );
};

export default NotificationButton;
