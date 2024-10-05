// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';
import TextSubHeading from 'components/Texts/TextSubHeading';
import LineChart from './LineChart';

// Utils
import { capitalizeFirstLetter } from 'utils/helper';

const removeUnderscores = (str: string) => {
    if (!str) return '';
    return str
        ?.split('_')
        .map((word: string) => capitalizeFirstLetter(word))
        .join(' ');
};

interface OverallContainerProps {
    data: any;
}

const OverallContainer: React.FC<OverallContainerProps> = ({ data }) => {
    // if (!data) return null;

    const StrongestSection = removeUnderscores(data?.strongest_topic?.name) || 'N/A';
    const WeakestSection = removeUnderscores(data?.weakest_topic?.name) || 'N/A';
    const OverallScore = data?.avg_score || 0;

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-md border-[1.5px] border-primary p-4 flex flex-col gap-4">
                <TextSubHeading className="text-primary">Grammar</TextSubHeading>
                <div className="flex justify-between items-start gap-4">
                    <div className="w-[40%]">
                        <div className="pb-1 border-b-[1.5px] border-gray-300 w-fit flex items-center gap-3">
                            <p className="font-semibold text-dark">Aptitude Grammar Score:</p>
                            <p>{Math.round(parseFloat(OverallScore))}%</p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <CircularProgressBarGraph
                                value={OverallScore}
                                label={Math.round(parseFloat(OverallScore)) + '%'}
                                labelClassName="text-3xl"
                            />
                        </div>
                    </div>
                    <div className="w-[60%] h-[250px]">
                        <LineChart data={data?.reports} />
                    </div>
                </div>
                <div className="mt-2 rounded-md h-[200px] flex shadow-light">
                    <div className="flex-1 h-full border-r-[0.75px] border-gray-300">
                        <div className="flex flex-col h-16 text-center p-2 font-semibold text-dark">
                            Highest Grammar score
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-7xl">
                                {Math.round(parseFloat(data?.max_score)) || 0}%
                            </h3>
                        </div>
                    </div>
                    <div className="flex-1 h-full border-r-[0.75px] border-l-[0.75px] border-gray-300">
                        <div className="flex flex-col h-16 text-center p-2 px-4 font-semibold text-dark">
                            Your Strongest Topic
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-2xl">{StrongestSection}</h3>
                        </div>
                    </div>
                    <div className="flex-1 h-full border-l-[0.75px] border-gray-300">
                        <div className="flex flex-col h-16 text-center p-2 px-4 font-semibold text-dark">
                            Your Weakest Topic
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-2xl">{WeakestSection}</h3>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-2 rounded-md flex flex-col shadow-light p-4">
                    <TextSubHeading className="text-primary">
                        Grammar Proficiency Level
                    </TextSubHeading>
                    <div className="flex gap-4 mt-14">
                        <ProficiencyWrapper
                            label="Beginner"
                            //@ts-ignore
                            values={['A1', 'A2']}
                            color="#FC6736"
                            yourValue="A2"
                        />
                        <ProficiencyWrapper
                            label="Intermediate"
                            //@ts-ignore
                            values={['B1', 'B2']}
                            color="#40A2D8"
                        />
                        <ProficiencyWrapper
                            label="Proficient"
                            //@ts-ignore
                            values={['C1', 'C2']}
                            color="#39D389"
                        />
                    </div>
                </div> */}

                <div className="flex justify-end">
                    <Labels />
                </div>
            </div>
        </div>
    );
};

// const ProficiencyWrapper = ({ label = '', values = [], color = '', yourValue = '' }) => {
//     return (
//         <div className="flex-1 relative">
//             <div className="border-4 border-gray-400 h-20 w-full">
//                 <div className="absolute top-0 left-0 bg-white z-10 h-16 w-full flex gap-4 pt-4">
//                     {values.map((value) => {
//                         return (
//                             <ProficiencyBox
//                                 key={value}
//                                 label={value}
//                                 color={color}
//                                 yourValue={yourValue}
//                             />
//                         );
//                     })}
//                 </div>
//             </div>
//             <p className="text-center pt-2 font-inter">{label}</p>
//         </div>
//     );
// };

// const ProficiencyBox = ({ label = '', color = '#39D389', yourValue = '' }) => {
//     return (
//         <div className="flex-1 relative">
//             {label === yourValue && (
//                 <div>
//                     <p className="absolute -top-12 left-1/2 -translate-x-1/2 font-inter">
//                         Your Level
//                     </p>
//                     <div className="absolute -top-5 left-1/2 -translate-x-1/2">
//                         <div
//                             className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-primary border-r-[10px] border-r-transparent"
//                             style={{
//                                 borderTopColor: color,
//                             }}
//                         />
//                     </div>
//                 </div>
//             )}
//             <div className="h-4 rounded-full" style={{ background: color }}></div>
//             <p className="font-inter text-center">{label}</p>
//         </div>
//     );
// };

export default OverallContainer;
