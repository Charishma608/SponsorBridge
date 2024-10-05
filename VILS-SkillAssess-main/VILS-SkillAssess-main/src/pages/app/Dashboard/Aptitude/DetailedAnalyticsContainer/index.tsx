// Components
// import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import TooltipComp from 'components/Tooltip';

// Utils
import {
    // cn,
    capitalizeFirstLetter,
} from 'utils/helper';

// Constants
import { APTITUDE_DETAILED_REPORT } from 'constants/index';

const removeUnderscores = (str: string) => {
    if (!str) return '';
    return str
        ?.split('_')
        .map((word: string) => capitalizeFirstLetter(word))
        .join(' ');
};

interface DetailedAnalyticsContainerProps {
    data: any;
}

const DetailedAnalyticsContainer: React.FC<DetailedAnalyticsContainerProps> = ({ data }) => {
    if (!data) return null;
    return (
        <div className="flex flex-col gap-4">
            {Object.keys(data).map((section: any, index: number) => (
                <DetailedAnalytics
                    label={removeUnderscores(section)}
                    topics={data[section]?.topics}
                />
            ))}
        </div>
    );
};

interface DetailedAnalyticsProps {
    label: string;
    topics: any;
}

const DetailedAnalytics: React.FC<DetailedAnalyticsProps> = ({ label, topics = {} }) => {
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <p className="font-semibold text-lg">{label}</p>
                    <TooltipComp label={APTITUDE_DETAILED_REPORT[label]} position="rightBottom" />
                </div>
            </div>
            <div className="border-primary border-[1.5px] rounded-md p-4 mt-2">
                <div className="flex flex-col gap-4">
                    {Object.keys(topics).map((key: string, index: number) => (
                        <DataBox
                            key={index}
                            label={removeUnderscores(key)}
                            value={topics[key].score}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface DataBoxProps {
    label: string;
    value: number;
    className?: string;
}

const DataBox: React.FC<DataBoxProps> = ({ label, value, className }) => {
    // return (
    //     <div className={cn(`flex-1 bg-white py-4`, className)}>
    //         <p className="text-center h-12 px-2 font-semibold">{label}</p>
    //         <div className="h-[100px] mt-2 grid place-content-center">
    //             <CircularProgressBarGraph
    //                 value={parseFloat(value.toFixed(2))}
    //                 label={Math.round(parseFloat(value.toString())) + '%'}
    //                 labelClassName="text-xl"
    //                 size={140}
    //                 radius={40}
    //                 strokeWidth={15}
    //                 arrowShow={false}
    //             />
    //         </div>
    //     </div>
    // );

    const getColor = (value = 0) => {
        if (value <= 40) return '#FC6736';
        else if (value <= 70) return '#40A2D8';
        return '#39D389';
    };

    return (
        <div className="flex items-center">
            <p className="w-1/4 font-inter">{label}</p>
            <div className="bg-slate-200 rounded-full w-3/4 h-6 overflow-hidden relative">
                <div
                    className="rounded-full absolute top-0 left-0 h-full"
                    style={{
                        width: value + '%',
                        background: getColor(value),
                    }}
                ></div>
                <p
                    style={{ left: value + '%' }}
                    className="font-inter text-sm absolute top-1/2 -translate-y-1/2 ps-2"
                >
                    {value}%
                </p>
            </div>
        </div>
    );
};

export default DetailedAnalyticsContainer;
