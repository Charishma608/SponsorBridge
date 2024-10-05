// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const StrengthsTab = () => {
    const { data } = useBehaviourReportsContext();

    return (
        <div className="flex flex-col gap-3">
            {Object.keys(data?.natural).map((strength: string, index: number) => (
                <p key={index}>💪 {strength}</p>
            ))}
        </div>
    );
};

export default StrengthsTab;
