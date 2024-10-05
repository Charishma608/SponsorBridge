// Internal Imports
import { useState } from 'react';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import TooltipComp from 'components/Tooltip';
import FocusLineRadarGraph from 'components/CustomGraphs/FocusLineRadarGraph';

// External Imports
import { MdOutlineNavigateNext } from 'react-icons/md';

// Contants
import { TRAITS_TIPS } from 'constants/index';

interface TraitsCardProps {
    data?: any;
}

const TraitsCard: React.FC<TraitsCardProps> = ({ data }) => {
    const formatData = (data: []) => {
        const formattedData: { label: string; value: number }[] = [];

        for (let i = 0; i < data.length; i++) {
            formattedData.push({
                label: data[i][0],
                value: data[i][1],
            });
        }

        return formattedData;
    };

    const [isOpened, setIsOpened] = useState<boolean>(false);
    if (isOpened) {
        return (
            <div className={`shadow-light p-4 rounded-md w-full flex flex-col gap-4`}>
                <div className="flex items-center gap-2">
                    <TextSubHeading>{data.name}</TextSubHeading>
                    <TooltipComp label={TRAITS_TIPS?.[data?.name]} position="rightBottom" />
                </div>
                <div className="flex gap-8 justify-between items-center">
                    <div className="flex-1">
                        <p className="border-b-[1.5px] border-gray-300 font-semibold w-fit">
                            Recommendations
                        </p>
                        <div className="mt-4 text-sm flex flex-col gap-4">
                            {data.recommendations.map((recommendation: string, index: number) => (
                                <p>
                                    {index + 1}. {recommendation}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <FocusLineRadarGraph data={formatData(data.scores)} />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        className="flex items-center gap-2 pb-[1px] border-b-[1.5px] border-primary"
                        onClick={() => {
                            setIsOpened(false);
                        }}
                    >
                        <p className="text-primary text-sm">Click here to see less</p>
                        <div className="h-4 w-4 bg-primary grid place-content-center rounded-full">
                            <MdOutlineNavigateNext className="text-white" />
                        </div>
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className={`shadow-light p-4 rounded-md w-[32.5%] flex flex-col gap-4`}>
            <div className="flex items-center gap-2">
                <TextSubHeading>{data.name}</TextSubHeading>
                <TooltipComp label={TRAITS_TIPS?.[data?.name]} position="rightBottom" />
            </div>
            <div>
                <button
                    className="flex items-center gap-2 pb-[1px] border-b-[1.5px] border-primary"
                    onClick={() => {
                        setIsOpened(true);
                    }}
                >
                    <p className="text-primary text-sm">Click here to see more</p>
                    <div className="h-4 w-4 bg-primary grid place-content-center rounded-full">
                        <MdOutlineNavigateNext className="text-white" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default TraitsCard;
