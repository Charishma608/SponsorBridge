// Components
import BackButton from 'components/Buttons/BackButton';
import TextLight from 'components/Texts/TextLight';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Utils
import { formatDate } from 'utils/helper';

// Hooks
import { useBehaviourReportsContext } from '../BehaviourReportProvider';

const Navbar = () => {
    const { submittedAt } = useBehaviourReportsContext();

    return (
        <div className="shadow-light py-4 ps-8 relative">
            <BackButton />
            <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TextSubHeading className="text-primary">Behaviour Test Report</TextSubHeading>
                <TextLight>{formatDate(submittedAt)}</TextLight>
            </div>
            <div />
        </div>
    );
};

export default Navbar;
