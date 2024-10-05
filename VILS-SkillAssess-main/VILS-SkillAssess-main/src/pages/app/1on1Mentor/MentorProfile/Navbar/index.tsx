// Components
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';

const Navbar = () => {
    return (
        <div className="flex justify-between">
            <div className="flex gap-3 items-start">
                <BackButton />
                <div className="flex flex-col">
                    <TextHeading>Live Coach</TextHeading>
                    <TextLight>Meet your Interview Success Partners</TextLight>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
