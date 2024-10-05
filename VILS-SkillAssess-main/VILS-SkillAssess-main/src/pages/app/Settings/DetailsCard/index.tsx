// Utils
import { cn } from 'utils/helper';

// External Imports
import { MdOutlineEdit } from 'react-icons/md';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import TextLight from 'components/Texts/TextLight';
import IconButton from 'components/Buttons/IconButton';

interface DetailsCardProps {
    title: string;
    value: string;
    onClick?: () => void;
    className?: string;
    withBorder?: boolean;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
    title = '',
    value = '',
    onClick = () => {},
    className = '',
    withBorder = true,
}) => {
    return (
        <div>
            <div className={cn('flex justify-between items-center p-4', className)}>
                <div className="flex flex-col gap-2">
                    <TextSubHeading className="text-md">{title}</TextSubHeading>
                    <TextLight>{value}</TextLight>
                </div>
                <IconButton
                    icon={<MdOutlineEdit className="w-5 h-5" />}
                    label="Edit"
                    onClick={onClick}
                    className="bg-white text-black border-2 border-primary"
                />
            </div>
            {withBorder ? <div className="border-light border-0 border-b-[1.5px]" /> : null}
        </div>
    );
};

export default DetailsCard;
