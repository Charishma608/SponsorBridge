// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const InterestTab = () => {
    const { data } = useBehaviourReportsContext();

    return (
        <div className="flex flex-col gap-3">
            {Object.keys(data?.intrigues).map((interest: string, index: number) => (
                <p key={index}>✨ {interest}</p>
            ))}
        </div>
    );
};

export default InterestTab;
