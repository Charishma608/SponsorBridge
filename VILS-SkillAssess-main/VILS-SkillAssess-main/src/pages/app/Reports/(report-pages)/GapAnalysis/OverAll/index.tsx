import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import TextSubHeading from 'components/Texts/TextSubHeading';
import { HiMiniPencil } from 'react-icons/hi2';
import SliderCard from '../Card/SliderCard';
import { SlGraph } from 'react-icons/sl';
import DataLine from '../DataLine';
import { MdQuestionMark } from 'react-icons/md';
import { LuArrowUpFromLine } from 'react-icons/lu';
import { TiTick } from 'react-icons/ti';
import { AiOutlinePercentage } from 'react-icons/ai';
import questionMark from 'assets/svgs/questionmark.svg';
import percentage from 'assets/svgs/percentage.svg';
import timetaken from 'assets/svgs/timetaken.svg';
import totalsubmission from 'assets/svgs/totalsubmission.svg';
import { PERSONALITY_LOGOS } from 'constants/index';

const OverAll = () => {
    const AptitudeData = [
        {
            label: 'Numercal Aptitude',
            percentage: 79,
            color: '#05ab2e',
        },
        {
            label: 'Verbal Aptitude',
            percentage: 59,
            color: '#09BED8',
        },
        {
            label: 'Quantative Aptitude',
            percentage: 37,
            color: '#FE9237',
        },
        {
            label: 'Qualitative Aptitude',
            percentage: 83,
            color: '#05ab2e',
        },
    ];
    return (
        <div className="max-h-[87vh] overflow-hidden overflow-y-scroll ">
            <div className="">
                <TextSubHeading className="text-primary text-left">Overall</TextSubHeading>
            </div>
            <div className="my-3 border-2 rounded-lg shadow-md p-2 w-[70%]">
                <div className="flex gap-2 text-lg items-center">
                    <HiMiniPencil className="underline" /> Test Details
                </div>
                <div className="flex gap-2 text-lg items-center">
                    <div className="">Total Score : </div>
                    <CircularProgressBarGraph
                        value={68}
                        size={45}
                        radius={17}
                        strokeWidth={7}
                        labelClassName="text-xs"
                    />
                </div>
                <div className="grid grid-cols-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Name: </div>
                        <div className="">Rahul B</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Date: </div>
                        <div className="">31/12/2023</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Number of question: </div>
                        <div className="">60/62</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-gray-400">Time Taken: </div>
                        <div className="">2:15:45 / 3:00:00</div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="text-lg font-semibold my-2 ">Aptitude</div>
            </div>
            <div className="flex gap-3 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Aptitude</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>

                <div className=" border-2 rounded-lg shadow-md w-full flex items-center">
                    <div className="w-full">
                        {AptitudeData.map((e) => (
                            <DataLine
                                label={e.label}
                                lineColorCode={e.color}
                                percentage={e.percentage}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">Communication</div>
            </div>
            <div className="grid grid-cols-4 gap-2 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Listening</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Reading</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Writing</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Spreaking</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">Domain Skills</div>
            </div>
            <div className="flex gap-3 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Domain Score</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>

                <div className=" border-2 rounded-lg shadow-md w-full flex items-center">
                    <div className="w-full">
                        {AptitudeData.map((e) => (
                            <DataLine
                                label={e.label}
                                lineColorCode={e.color}
                                percentage={e.percentage}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">Coding Overall Score</div>
            </div>
            <div className="flex gap-3 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Coding</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>

                <div className=" border-2 rounded-lg shadow-md w-full  p-3">
                    <div className="font-semibold my-2 text-primary">Sub Analytics</div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="border-2 rounded-md flex gap-3 items-center p-3 shadow-md font-semibold">
                            <img src={questionMark} alt="no-img" width={30} height={30} />
                            <div className="">
                                <div className="">Total Question</div>
                                <div className="text-primary">3</div>
                            </div>
                        </div>
                        <div className="border-2 rounded-md flex gap-3 items-center p-3 shadow-md font-semibold">
                            <img src={totalsubmission} alt="no-img" width={30} height={30} />
                            <div className="">
                                <div className="">Total Submission</div>
                                <div className="text-primary">9</div>
                            </div>
                        </div>
                        <div className="border-2 rounded-md flex gap-3 items-center p-3 shadow-md font-semibold">
                            <img src={timetaken} alt="no-img" width={30} height={30} />
                            <div className="">
                                <div className="">Time Taken</div>
                                <div className="text-primary">2:13:13</div>
                            </div>
                        </div>
                        <div className="border-2 rounded-md flex gap-3 items-center p-3 shadow-md font-semibold">
                            <img src={percentage} alt="no-img" width={30} height={30} />
                            <div className="">
                                <div className="">Submission Percentage</div>
                                <div className="text-primary">45%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">Technical Mock Score</div>
            </div>
            <div className="flex gap-3 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Technical Mock</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>

                <div className=" border-2 rounded-lg shadow-md w-full flex items-center">
                    <div className="w-full">
                        {AptitudeData.map((e) => (
                            <DataLine
                                label={e.label}
                                lineColorCode={e.color}
                                percentage={e.percentage}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">Behaviour </div>
            </div>
            <div className="flex gap-3 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Personality Type</div>
                    <div className="w-[220px] h-[220px]">
                        <img
                            src={PERSONALITY_LOGOS['Influencer']}
                            alt="influencer"
                            loading="lazy"
                        />
                    </div>
                    <div className="text-center text-primary">Inspirer</div>
                </div>

                <div className=" border-2 rounded-lg shadow-md w-full p-3 ">
                    <div className="text-primary text-lg font-semibold">Short Bio:</div>
                    <div className="my-3 text-lg ">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam amet
                        laboriosam, explicabo eligendi vitae expedita, non repudiandae odit cum sint
                        nesciunt laborum atque culpa excepturi placeat ipsam accusamus consequuntur
                        aut.
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">HR Mock Score</div>
            </div>
            <div className="flex gap-3 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">HR Mock</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Average Score"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>

                <div className=" border-2 rounded-lg shadow-md w-full flex items-center">
                    <div className="w-full">
                        {AptitudeData.map((e) => (
                            <DataLine
                                label={e.label}
                                lineColorCode={e.color}
                                percentage={e.percentage}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t-2 mt-6">
                <div className="text-lg font-semibold my-2 ">Career Guidance</div>
            </div>
            <div className="grid grid-cols-4 gap-2 pr-2">
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Career 1</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Role Name"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Career 2</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Role Name"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
                <div className=" border-2 rounded-lg shadow-md p-2">
                    <div className="font-semibold my-2 text-primary">Career 3</div>
                    <div className="flex">
                        <SliderCard
                            avg={48}
                            icon={SlGraph}
                            label="Role Name"
                            max={78}
                            min={0}
                            st={62}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverAll;
