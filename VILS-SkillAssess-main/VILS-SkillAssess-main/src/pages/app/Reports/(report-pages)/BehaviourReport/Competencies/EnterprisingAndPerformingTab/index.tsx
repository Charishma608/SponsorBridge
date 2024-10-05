// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';

// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

const EnterprisingAndPerformingTab = () => {
    const { data } = useBehaviourReportsContext();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex lg:flex-row flex-col gap-4 lg:gap-2 items-center">
                <div>
                    <p>{data?.['Enterprising and Performing'].summary}</p>
                </div>
                <div>
                    <CircularProgressBarGraph
                        value={Math.round(data?.comptency_score?.['Enterprising and Performing'])}
                        size={150}
                        radius={60}
                        label={
                            Math.round(data?.comptency_score?.['Enterprising and Performing']) + '%'
                        }
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
                    {data?.['Enterprising and Performing']?.development_area?.map(
                        (area: string, index: number) => (
                            <p key={index}>🎯 {area}</p>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnterprisingAndPerformingTab;
