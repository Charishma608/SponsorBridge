// Utils
import { cn } from 'utils/helper';

interface TextLightProps {
    children: React.ReactNode;
    className?: string;
}

const TextLight: React.FC<TextLightProps> = ({ children, className = '' }) => {
    return <h1 className={cn('text-xs md:text-sm text-gray-500', className)}>{children}</h1>;
};

export default TextLight;
