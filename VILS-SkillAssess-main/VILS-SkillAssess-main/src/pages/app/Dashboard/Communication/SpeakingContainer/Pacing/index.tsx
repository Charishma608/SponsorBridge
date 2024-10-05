// Components
import TooltipComp from 'components/Tooltip';
import LineChart from './LineChart';

interface PacingProps {
    data?: any;
    tooltip?: string;
}

const Pacing: React.FC<PacingProps> = ({ data, tooltip = "" }) => {
    return (
        <div className="flex items-start gap-3">
            <div className="w-[40%] flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                    <p className="font-semibold">Pacing</p>
                    <TooltipComp label={tooltip} position='rightBottom' />
                </div>
                <div className="flex flex-col gap-2 w-6/7">
                    <div className="pb-2 border-b-[1.5px] border-gray-400 flex gap-2 items-center">
                        <p className="text-dark font-semibold">Overall Average:</p>
                        <p>{data?.avg_count}</p>
                    </div>
                    <div className="text-sm">
                        <p>
                            Pacing refers to how quickly or slowly someone speaks when communicating
                            verbally. It plays a vital role in effective communication by
                            influencing clarity, comprehension, engagement, and the conveyance of
                            emotion. Adapting speech rate to the context and audience is crucial for
                            successful communication.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-[60%] h-[250px] mt-4">
                <LineChart data={data.reports} />
            </div>
        </div>
    );
};

export default Pacing;
