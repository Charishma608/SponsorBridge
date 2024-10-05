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
    companyId: string;
    companyName: string;
}

const RolesCard: React.FC<RolesCardProps> = ({
    iconClassName,
    label,
    description,
    roleId,
    companyId,
    companyName,
}) => {
    const navigate = useNavigate();

    return (
        <div className="shadow-light rounded-md p-4 w-full md:w-[300px]">
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
            <div className="mt-4 h-[200px]">
                <p className="text-sm text-justify">{description}</p>
            </div>
            <Button
                label="Get Started"
                className="py-2"
                onClick={() => {
                    navigate({
                        pathname: '/mock-interview/departments/company/job-roles/assessments',
                        search: new URLSearchParams({
                            roleId,
                            companyId,
                            companyName,
                            roleName: label,
                        }).toString(),
                    });
                }}
            />
        </div>
    );
};

export default RolesCard;
