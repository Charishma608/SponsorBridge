// Internal Imports
import { useLocation } from 'react-router-dom';

// Components
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';

const Navbar = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const companyName = searchParams.get('companyName') || '';

    return (
        <div className="flex items-center gap-4 p-4 ps-8">
            <BackButton />
            <TextHeading>{companyName} Assessments</TextHeading>
        </div>
    );
};

export default Navbar;
