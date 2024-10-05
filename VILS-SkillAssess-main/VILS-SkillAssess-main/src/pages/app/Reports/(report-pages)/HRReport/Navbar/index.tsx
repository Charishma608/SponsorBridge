// Components
import BackButton from 'components/Buttons/BackButton';
import TextLight from 'components/Texts/TextLight';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Utils
import { formatDate } from 'utils/helper';

// Hooks
import { useHRReportsContext } from '../HRReportProvider';

const Navbar = () => {
    const { data } = useHRReportsContext();

    return (
        <div className="shadow-light ps-8 relative z-10 h-[13vh] flex flex-col justify-center">
            <div className="absolute left-8 top-4">
                <BackButton />
            </div>
            <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TextSubHeading className="text-primary">Human Resource Report</TextSubHeading>
                <TextLight>{formatDate(data?.submitted_at)}</TextLight>
            </div>
            <div />
        </div>
    );
};

export default Navbar;
