// Components
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';

const Navbar = () => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <TextHeading>1 on 1 Mentor</TextHeading>
                <TextLight>
                    Refine Your Interview Skills and Secure Your Dream Job with Expert Guidance!
                </TextLight>
            </div>
        </div>
    );
};

export default Navbar;
