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
        <div className="shadow-light ps-8 relative z-10 h-[13vh] flex flex-col justify-center">
            <div className="absolute left-8 top-4">
                <BackButton className='relative z-10' />
            </div>
            <div className="flex w-full items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TextSubHeading className="text-primary">
                    Communication Writing Report
                </TextSubHeading>
                <TextLight>{formatDate(date)}</TextLight>
            </div>
            <div />
        </div>
    );
};

export default Navbar;
