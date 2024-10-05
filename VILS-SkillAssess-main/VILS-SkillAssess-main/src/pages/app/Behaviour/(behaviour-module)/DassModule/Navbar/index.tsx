// Components
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';

const Navbar = () => {
    return (
        <div className="p-4 ps-8 flex items-center gap-4">
            <BackButton />
            <TextHeading>Dass Module</TextHeading>
        </div>
    );
};

export default Navbar;
