// Components
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';

const Navbar = () => {
    return (
        <div className="flex items-center justify-between ps-8 p-4">
            <div className="flex flex-col gap-1">
                <TextHeading>Human Resource</TextHeading>
                <TextLight className="w-2/3">
                    Improve your competencies and culture fit to succeed in diverse environments.
                    This module helps you develop the skills necessary for personal and professional
                    growth.
                </TextLight>
            </div>
        </div>
    );
};

export default Navbar;
