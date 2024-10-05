// Components
import Button from 'components/Buttons';

// Internal Imports
import { useNavigate } from 'react-router-dom';

// External Imports
import { FaBookOpenReader } from 'react-icons/fa6';

// Utils
import { cn } from 'utils/helper';

interface RolesCardProps {
    iconClassName?: string;
    label: string;
    description: string;
    roleId: string;
    departmentId: string;
    departmentName: string;
}

const RolesCard: React.FC<RolesCardProps> = ({
    iconClassName,
    label,
    description,
    roleId,
    departmentId,
    departmentName,
}) => {
    const navigate = useNavigate();

    return (
        <div className="shadow-light rounded-md p-4 w-[300px] flex flex-col justify-between">
            <div>
                <div className="flex gap-3">
                    <div
                        className={cn(
                            `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl bg-[#EBFEFF]`,
                            iconClassName,
                        )}
                    >
                        <FaBookOpenReader className="text-[#66B5B6]" />
                    </div>
                    <p className="flex-1 font-semibold">{label}</p>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-justify line-clamp-6">{description}</p>
                </div>
            </div>
            <Button
                label="Get Started"
                className="py-2 mt-6"
                onClick={() => {
                    navigate({
                        pathname: '/interview-prep-hub/departments/department/department-modules',
                        search: new URLSearchParams({
                            roleId,
                            departmentId,
                            departmentName,
                        }).toString(),
                    });
                }}
            />
        </div>
    );
};

export default RolesCard;
