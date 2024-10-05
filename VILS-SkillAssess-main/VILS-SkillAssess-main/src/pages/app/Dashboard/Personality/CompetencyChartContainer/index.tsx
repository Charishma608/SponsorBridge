// Components
import RadarGraph from 'components/CustomGraphs/RadarGraph';
import TooltipComp from 'components/Tooltip';

interface CompetencyChartContainerProps {
    data: [];
}

const CompetencyChartContainer: React.FC<CompetencyChartContainerProps> = ({ data = [] }) => {
    const formatData = (data: []) => {
        const formattedData: {
            value: number;
            label: string;
        }[] = [];

        data.forEach((competency) => {
            if (
                competency[0] === 'Benevolence' ||
                competency[0] === 'Tradition' ||
                competency[0] === 'Self Direction' ||
                competency[0] === 'Achievement'
            ) {
                return;
            } else {
                formattedData.push({
                    label: competency[0],
                    value: competency[1],
                });
            }
        });

        return formattedData;
    };

    return (
        <div className="flex-1 border-[1.5px] border-primary rounded-md p-4 flex flex-col gap-2">
            <p className="font-semibold border-b-[1.5px] w-fit border-primary pb-1 flex items-center gap-2">
                Competency Chart
                <TooltipComp 
                    label='Discover your competency chart by assessing your skills like Leading and Deciding, Supporting and Cooperating, Interacting and Presenting, and Analyzing and Interpreting' 
                    position='top' 
                />
            </p>
            <div className="mt-4">
                <RadarGraph data={formatData(data)} />
            </div>
        </div>
    );
};

export default CompetencyChartContainer;
