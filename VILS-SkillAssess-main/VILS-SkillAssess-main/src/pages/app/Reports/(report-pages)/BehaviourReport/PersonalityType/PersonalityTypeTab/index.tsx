// Hooks
import { useBehaviourReportsContext } from '../../BehaviourReportProvider';

// Constants
import { PERSONALITY_LOGOS } from 'constants/index';

const PersonalityTypeTab = () => {
    const { data } = useBehaviourReportsContext();

    return (
        <div>
            <div className="mt-3 flex-wrap flex gap-3">
                <div className="flex-1">
                    <h2 className="font-semibold text-lg">{data?.individua_comp?.comp_name}</h2>
                    <p className="mt-2">{data?.individua_comp?.comp_def}</p>
                </div>
                <img
                    src={PERSONALITY_LOGOS[data?.individua_comp?.comp_name]}
                    alt="personality-type"
                    className="h-[300px] m-auto"
                />
            </div>
            <div className="border-t-[1.5px] border-gray-300 mt-4">
                <h3 className="font-semibold py-3 text-lg">Details</h3>
                <div className="flex flex-col gap-2">
                    {data?.individua_comp?.comp_details?.map((comp: string, index: number) => (
                        <p key={index}>🌀 {comp}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalityTypeTab;
