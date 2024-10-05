// Components
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';

// External Imports
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="p-4 ps-8 flex items-center gap-4">
            <BackButton
                onClick={() => {
                    navigate(-1);
                }}
            />
            <TextHeading>Assessments</TextHeading>
        </div>
    );
};

export default Navbar;
