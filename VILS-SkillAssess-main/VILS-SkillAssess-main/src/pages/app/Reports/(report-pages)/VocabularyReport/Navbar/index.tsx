// Components
import BackButton from 'components/Buttons/BackButton';
import TextLight from 'components/Texts/TextLight';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Utils
import { formatDate } from 'utils/helper';

interface NavbarProps {
    date: string;
}

const Navbar: React.FC<NavbarProps> = ({ date }) => {
    return (
        <div className="shadow-light py-4 ps-8 relative">
            <BackButton className="relative z-10" />
            <div className="flex items-center w-full flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TextSubHeading className="text-primary">Vocabulary Report</TextSubHeading>
                <TextLight>{formatDate(date)}</TextLight>
            </div>
            <div />
        </div>
    );
};

export default Navbar;
