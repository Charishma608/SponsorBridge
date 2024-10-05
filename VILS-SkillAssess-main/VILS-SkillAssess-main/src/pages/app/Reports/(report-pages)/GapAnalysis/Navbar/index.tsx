// Components
import BackButton from 'components/Buttons/BackButton';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Utils

// Hooks

const Navbar = () => {
    return (
        <div className="ps-8 relative z-10 h-[13vh] flex flex-col justify-center">
            <div className="absolute left-8 top-4">
                <BackButton />
            </div>
            <div className="flex  flex-col gap-1 absolute top-6 left-20 ">
                <TextSubHeading className="text-primary text-left">
                    Gap Analysis Report
                </TextSubHeading>
            </div>
            <div />
        </div>
    );
};

export default Navbar;
