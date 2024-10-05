// Internal Imports
import { useNavigate } from 'react-router-dom';

// External Imports
import { IoArrowBackOutline } from 'react-icons/io5';

// Utils
import { cn } from 'utils/helper';

interface BackButtonProps {
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '', iconClassName = '' }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button
            className={cn(
                `grid place-content-center bg-primary rounded-full h-[34px] w-[34px] md:h-[40px] md:w-[40px]`,
                className,
            )}
            onClick={onClick ? onClick : handleGoBack}
        >
            <IoArrowBackOutline className={cn('text-white text-xl', iconClassName)} />
        </button>
    );
};

export default BackButton;
