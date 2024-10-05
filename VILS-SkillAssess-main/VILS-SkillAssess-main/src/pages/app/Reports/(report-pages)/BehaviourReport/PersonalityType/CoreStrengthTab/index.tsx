// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const CoreStrengthTab = () => {
    const { data } = useBehaviourReportsContext();

    return (
        <div className="flex flex-col gap-3">
            {data?.BigFive?.BigFive_content.map((strength: string, index: number) => (
                <p key={index}>🔥 {strength}</p>
            ))}
        </div>
    );
};

export default CoreStrengthTab;
