// Utils
import { cn } from 'utils/helper';
import Loader from '../Loaders';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick?: () => void;
    loading?: boolean;
    loaderLargeArcColor?: string;
    loaderSmallArcColor?: string;
    dull?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label = 'Button',
    onClick = () => {},
    loading = false,
    loaderLargeArcColor = "text-gray-200",
    loaderSmallArcColor = "fill-blue-600",
    dull = false,
    disabled=false,
    ...rest
}) => {
    const { className, ...restProps } = rest;

    return (
        <button
            className={cn(
                `bg-primary relative z-10 text-white rounded-3xl py-2 px-4 w-full flex justify-center overflow-hidden items-center text-sm ${disabled ? "bg-gray-400 cursor-not-allowed" : ""} ${className}`,
            )}
            onClick={disabled ? () => {} : onClick}
            disabled={loading}
            {...restProps}
        >  
            {dull ? <div className='bg-black z-20 bg-opacity-50 absolute w-full h-full top-0 left-0'></div>: null}
            <div className='z-30'>
                {loading ? <Loader loadingText={false} size="sm" largeArcColor={loaderLargeArcColor} smallArcColor={loaderSmallArcColor} /> : label}
            </div>
        </button>
    );
};

export default Button;
