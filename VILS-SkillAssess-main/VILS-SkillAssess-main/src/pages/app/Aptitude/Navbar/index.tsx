// Components
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';

const Navbar = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                {/* <TextHeading>Aptitude</TextHeading> */}
                <div className="flex items-center gap-4">
                    <BackButton className="md:hidden" />
                    <TextHeading>Aptitude</TextHeading>
                </div>
                <TextLight className="mt-20">
                    Find various industry standard aptitude questions and up skill your career
                </TextLight>
            </div>
        </div>
    );
};

export default Navbar;
