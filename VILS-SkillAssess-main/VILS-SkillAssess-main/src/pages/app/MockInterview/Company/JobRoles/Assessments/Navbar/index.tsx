// Components
import TextHeading from 'components/Texts/TextHeading';
import BackButton from 'components/Buttons/BackButton';

// Internal Imports
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const roleName = searchParams.get('roleName') || '';

    return (
        <div className="flex items-center gap-4 ps-8 py-4">
            <BackButton />
            <div>
                <TextHeading>{roleName} Assessments</TextHeading>
            </div>
        </div>
    );
};

export default Navbar;
