// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const ImprovementAreasTab = () => {
    const { data } = useBehaviourReportsContext();
    return (
        <div className="flex flex-col gap-3">
            {data?.impareas?.map((area: string, index: number) => (
                <p key={index}>🎯 {area}</p>
            ))}
        </div>
    );
};

export default ImprovementAreasTab;
