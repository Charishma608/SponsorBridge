// Components
import TooltipComp from 'components/Tooltip';
import BarChart from './BarChart';

// Internal Imports
import { useState } from 'react';

interface FillerWordsProps {
    data?: any;
    tooltip?: string;
}
const FillerWords: React.FC<FillerWordsProps> = ({ data, tooltip = '' }) => {
    const [seeAllFillerWords, setSeeAllFillerWords] = useState<boolean>(false);

    return (
        <div className="flex items-start gap-3">
            <div className="w-[40%] flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                    <p className="font-semibold">Repeated Words</p>
                    <TooltipComp label={tooltip} position="rightBottom" />
                </div>
                <div className="flex flex-col gap-2 w-4/5">
                    {/* <div className="pb-2 border-b-[1.5px] border-gray-400 flex gap-2 items-center">
                        <p className="text-dark font-semibold">Overall Average Repeated Count: </p>
                        <p>{data?.avg_count}</p>
                    </div> */}
                    <div>
                        <p className="text-dark font-semibold">Most Repeated words</p>
                        <div className="mt-3 flex gap-1 flex-wrap">
                            {data?.most_used?.length === 0 && <p className="text-sm">No Data</p>}
                            {data?.most_used.map((word: string, index: number) => {
                                if (index > 4 && !seeAllFillerWords) return null;
                                return (
                                    <span
                                        key={index}
                                        className="text-sm bg-[#F5F5F5] rounded-md px-4 py-2"
                                    >
                                        {word}
                                    </span>
                                );
                            })}
                            {data?.most_used.length >= 5 && (
                                <p
                                    className="text-sm text-primary px-4 py-2 cursor-pointer underline"
                                    onClick={() => setSeeAllFillerWords((prev) => !prev)}
                                >
                                    {seeAllFillerWords ? 'See Less' : 'See All'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[60%] max-h-[300px] overflow-y-scroll scroll pe-2">
                <BarChart data={data?.top_words} />
            </div>
        </div>
    );
};

export default FillerWords;
