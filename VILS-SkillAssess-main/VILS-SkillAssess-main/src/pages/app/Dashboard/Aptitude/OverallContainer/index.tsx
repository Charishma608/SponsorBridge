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
    if (!data) return null;

    const StrongestSection = removeUnderscores(data?.strongest_aptitude_type);
    const WeakestSection = removeUnderscores(data?.weakest_aptitude_type);
    const OverallScore = data?.aptitude_avg_score?.split('%')[0];

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-md border-[1.5px] border-primary p-4 flex flex-col gap-4">
                <TextSubHeading className="text-primary">Aptitude</TextSubHeading>
                <div className="flex justify-between items-start gap-4">
                    <div className="w-[40%]">
                        <div className="pb-1 border-b-[1.5px] border-gray-300 w-fit flex items-center gap-3">
                            <p className="font-semibold text-dark">Aptitude Average Score:</p>
                            <p>{Math.round(parseFloat(data?.aptitude_avg_score))}%</p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <CircularProgressBarGraph
                                value={OverallScore}
                                label={Math.round(parseFloat(data?.aptitude_avg_score)) + '%'}
                                labelClassName="text-3xl"
                            />
                        </div>
                    </div>
                    <div className="w-[60%] h-[250px]">
                        <LineChart data={data?.tests_taken_graph_data} />
                    </div>
                </div>
                <div className="mt-2 rounded-md h-[200px] flex shadow-light">
                    <div className="flex-1 h-full border-r-[0.75px] border-gray-300">
                        <div className="flex flex-col h-16 text-center p-2 font-semibold text-dark">
                            Highest Aptitude score
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-7xl">
                                {Math.round(parseFloat(data?.highest_aptitude_score))}%
                            </h3>
                        </div>
                    </div>
                    <div className="flex-1 h-full border-r-[0.75px] border-l-[0.75px] border-gray-300">
                        <div className="flex flex-col h-16 text-center p-2 px-4 font-semibold text-dark">
                            Your Strongest Section
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-2xl">{StrongestSection}</h3>
                        </div>
                    </div>
                    <div className="flex-1 h-full border-l-[0.75px] border-gray-300">
                        <div className="flex flex-col h-16 text-center p-2 px-4 font-semibold text-dark">
                            Your Weakest Section
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-2xl">{WeakestSection}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Labels />
                </div>
            </div>
        </div>
    );
};

export default OverallContainer;
