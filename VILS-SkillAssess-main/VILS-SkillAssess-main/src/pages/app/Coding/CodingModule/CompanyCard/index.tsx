// Components
import Button from 'components/Buttons';

// Internal Imports
import { useNavigate } from 'react-router-dom';

// Utils
import { cn } from 'utils/helper';

interface CompanyCardProps {
    icon: string;
    iconClassName?: string;
    label: string;
    companyId: string;
    description: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
    icon,
    iconClassName,
    label,
    companyId,
    description,
}) => {
    const navigate = useNavigate();

    return (
        <div className="shadow-light rounded-md p-4 w-[300px]">
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        `h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl overflow-hidden`,
                        iconClassName,
                    )}
                >
                    <img src={icon} alt="company-icon" className="h-full w-full object-contain" />
                </div>
                <p className="flex-1 font-semibold">{label}</p>
            </div>
            <p className="text-sm mt-4 h-[170px] text-justify">{description}</p>

            <Button
                label="Get Started"
                className="py-2 mt-6"
                onClick={() => {
                    navigate({
                        pathname: '/coding/assessments',
                        search: new URLSearchParams({
                            companyId,
                            companyName: label,
                        }).toString(),
                    });
                }}
            />
        </div>
    );
};

export default CompanyCard;
