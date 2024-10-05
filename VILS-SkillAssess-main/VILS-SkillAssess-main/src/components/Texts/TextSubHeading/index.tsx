// Utils
import { cn } from 'utils/helper';

interface TextSubHeadingProps {
    children: React.ReactNode;
    className?: string;
}

const TextSubHeading: React.FC<TextSubHeadingProps> = ({ children, className = '' }) => {
    return <h1 className={cn('text-xl font-semibold text-black', className)}>{children}</h1>;
};

export default TextSubHeading;
