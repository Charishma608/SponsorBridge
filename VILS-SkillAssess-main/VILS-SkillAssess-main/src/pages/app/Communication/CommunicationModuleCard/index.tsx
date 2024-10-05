// Components
import Button from 'components/Buttons';

// Utils
import { cn } from 'utils/helper';

interface CommuincationModuleCardProps {
    icon: React.ReactNode;
    iconClassName?: string;
    label: string;
    description: string;
    onClick?: () => void;
}

const CommuincationModuleCard: React.FC<CommuincationModuleCardProps> = ({
    icon,
    iconClassName,
    label,
    description,
    onClick = () => {},
}) => {
    return (
        <div className="shadow-light rounded-md p-4 w-[300px]">
            <div className="flex gap-3">
                <div
                    className={cn(
                        `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl`,
                        iconClassName,
                    )}
                >
                    {icon}
                </div>
                <p className="flex-1 font-semibold">{label}</p>
            </div>
            <div className="mt-4 h-[100px]">
                <p className="text-sm text-justify">{description}</p>
            </div>
            <Button
  label="Get Started"
  className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
  onClick={onClick}
/>

        </div>
    );
};

export default CommuincationModuleCard;
