// Utilities
import { cn } from 'utils/helper';
import Loader from '../../Loaders';

interface IconButtonProps {
    icon: React.ReactNode;
    label: string;
    className?: string;
    onClick?: () => void;
    iconAligment?: string;
    loading?: boolean;
    loaderLargeArcColor?: string;
    loaderSmallArcColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon = null,
    label = '',
    className = '',
    onClick = () => {},
    iconAligment = 'right',
    loading = false,
    loaderLargeArcColor = 'text-gray-200',
    loaderSmallArcColor = 'fill-blue-600',
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'bg-primary py-2 px-6 rounded-3xl text-white text-sm flex items-center justify-center gap-2',
                className,
            )}
            disabled={loading}
        >
            {loading ? (
                <Loader
                    loadingText={false}
                    size="sm"
                    largeArcColor={loaderLargeArcColor}
                    smallArcColor={loaderSmallArcColor}
                />
            ) : (
                <>
                    {iconAligment === 'left' && icon ? icon : null}
                    <p>{label}</p>
                    {iconAligment === 'right' && icon ? icon : null}
                </>
            )}
        </button>
    );
};

export default IconButton;
