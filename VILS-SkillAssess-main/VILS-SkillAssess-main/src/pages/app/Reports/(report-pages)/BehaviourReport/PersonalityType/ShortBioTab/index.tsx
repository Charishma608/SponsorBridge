// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const ShortBioTab = () => {
    const { data } = useBehaviourReportsContext();
    return (
        <div>
            <p>{data?.short_bio}</p>
        </div>
    );
};

export default ShortBioTab;
