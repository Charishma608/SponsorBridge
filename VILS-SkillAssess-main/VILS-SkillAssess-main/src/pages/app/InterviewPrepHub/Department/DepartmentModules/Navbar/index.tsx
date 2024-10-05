// Components
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';
import BackButton from 'components/Buttons/BackButton';

// Internal Imports
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const departmentName = searchParams.get('departmentName') || '';

    return (
        <div className="flex items-center gap-4 ps-8 py-2">
            <BackButton />
            <div>
                <TextHeading>{departmentName} Modules</TextHeading>
                <TextLight>
                    Find Your Target Job Role's Mock Interview - Practice and Prepare for Success!
                </TextLight>
            </div>
        </div>
    );
};

export default Navbar;
