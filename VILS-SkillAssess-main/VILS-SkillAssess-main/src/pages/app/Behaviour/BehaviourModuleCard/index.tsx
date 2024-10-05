// Components
import Button from 'components/Buttons';

// Utils
import { cn } from 'utils/helper';

interface BehaviourModuleCardProps {
    icon: React.ReactNode;
    iconClassName?: string;
    label: string;
    description: string;
    onClick?: () => void;
}

const BehaviourModuleCard: React.FC<BehaviourModuleCardProps> = ({
    icon,
    iconClassName,
    label,
    description,
    onClick = () => {},
}) => {
    return (
        <div className="shadow-light rounded-md p-4 w-[300px]">
            <div className="flex gap-3 items-center">
                <div
                    className={cn(
                        `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl`,
                        iconClassName,
                    )}
                >
                    {icon}
                </div>
                <p className="flex-1 font-semibold text-lg">{label}</p>
            </div>
            <div className="mt-4 h-[180px] text-justify">
                <p className="text-sm">{description}</p>
            </div>
            <Button label="Get Started" className="py-2" onClick={onClick} />
        </div>
    );
};

export default BehaviourModuleCard;
