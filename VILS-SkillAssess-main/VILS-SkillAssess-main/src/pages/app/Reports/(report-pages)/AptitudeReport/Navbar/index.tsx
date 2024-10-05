// Components
import BackButton from 'components/Buttons/BackButton';
import TextSubHeading from 'components/Texts/TextSubHeading';
import TextLight from 'components/Texts/TextLight';

interface NavbarProps {
    submittedAt: string;
}

const Navbar: React.FC<NavbarProps> = ({ submittedAt }) => {
    return (
        <div className="shadow-light py-4 ps-8 relative">
            <BackButton />
            <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TextSubHeading className="text-primary">Aptitude Test Report</TextSubHeading>
                <TextLight>{formatDate(submittedAt)}</TextLight>
            </div>
            <div />
        </div>
    );
};

function formatDate(dateString: string) {
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return formattedDate;
}

export default Navbar;
