// Components
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';
import BackButton from 'components/Buttons/BackButton';

// Internal Imports
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const companyName = searchParams.get('companyName') || '';

    return (
        <div className="flex items-center gap-2 ps-4 md:ps-8 p-2 md:py-2">
            <div>
                <BackButton />
            </div>

            <div>
                <TextHeading>{companyName}</TextHeading>
                <TextLight>
                    Find Your Target Job Role's Mock Interview Practice and Prepare for Success!
                </TextLight>
            </div>
        </div>
    );
};

export default Navbar;
