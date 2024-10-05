// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';

// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const AdaptingAndCopingTab = () => {
    const { data } = useBehaviourReportsContext();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 items-center">
                <div>
                    <p>{data?.['Adapting and Coping'].summary}</p>
                </div>
                <div>
                    <CircularProgressBarGraph
                        value={Math.round(data?.comptency_score?.['Adapting and Coping'])}
                        size={150}
                        radius={60}
                        label={Math.round(data?.comptency_score?.['Adapting and Coping']) + '%'}
                        labelClassName="text-3xl"
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Labels />
            </div>
            <div className="border-t-[1.5px] border-gray-300">
                <h3 className="font-semibold py-3">Insights</h3>
                <div className="flex flex-col gap-3">
                    {data?.['Adapting and Coping']?.development_area?.map(
                        (area: string, index: number) => (
                            <p key={index}>🎯 {area}</p>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdaptingAndCopingTab;
