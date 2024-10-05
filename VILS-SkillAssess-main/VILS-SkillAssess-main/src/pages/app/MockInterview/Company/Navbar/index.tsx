// Components
import TextHeading from 'components/Texts/TextHeading';
import BackButton from 'components/Buttons/BackButton';

// Internal Imports
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const departmentName = searchParams.get('name') || '';

    return (
        <div className="flex items-center gap-4">
            <BackButton />
            <TextHeading>Companies ({departmentName})</TextHeading>
        </div>
    );
};

export default Navbar;
