// Components
import TooltipComp from 'components/Tooltip';
import LineChart from './LineChart';

interface FluencyProps {
    data?: any;
    tooltip?: string;
}

const Fluency: React.FC<FluencyProps> = ({ data, tooltip = "" }) => {
    return (
        <div className="flex items-start gap-3">
            <div className="w-[40%] flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                    <p className="font-semibold">Fluency</p>
                    <TooltipComp label={tooltip} position='rightBottom' />
                </div>
                <div className="flex flex-col gap-2 w-6/7">
                    <div className="pb-2 border-b-[1.5px] border-gray-400 flex gap-2 items-center">
                        <p className="text-dark font-semibold">Overall Average:</p>
                        <p>{data?.avg_count}</p>
                    </div>
                    <div className="text-sm">
                        <p>
                            Fluency means expressing thoughts smoothly and effortlessly, without
                            pauses or disruptions.Mastering fluency involves communicating clearly
                            and without stumbling in your words
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

export default Fluency;
