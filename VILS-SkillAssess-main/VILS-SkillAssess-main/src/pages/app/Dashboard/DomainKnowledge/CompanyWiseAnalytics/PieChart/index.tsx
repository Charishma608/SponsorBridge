// External Imports
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

// Hooks
import { useDashboardContext } from '../../../DashboardProvider';

// Constants
import { COLORS } from 'constants/index';

interface PieChartProps {
    data: Record<string, number>;
}

const CustomPieChart: React.FC<PieChartProps> = ({ data }) => {
    const formatData = (data: Record<string, any>): { label: string; value: number }[] => {
        const formattedData: { label: string; value: number }[] = [];

        const keys = data ? Object.keys(data) : [];
        for (var i = 0; i < keys.length; i++) {
            formattedData.push({
                label: keys[i],
                value: data[keys[i]]?.tests_taken,
            });
        }

        return formattedData;
    };

    const formattedData = formatData(data);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex-1">
                <ResponsiveContainer>
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Pie
                            className="cursor-pointer"
                            data={formattedData}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#3EA3B9"
                            legendType="circle"
                        >
                            {formattedData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="text-sm font-inter flex gap-3 flex-wrap">
                {formattedData.map((data, index: number) => {
                    return (
                        <p
                            key={index}
                            style={{
                                color: COLORS[index % COLORS.length],
                            }}
                        >
                            {data.label}: {data.value}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
    const { timeLineSelected } = useDashboardContext();

    if (active && payload && payload.length) {
        const value = payload[0].value;
        const name = payload[0].name;

        return (
            <div className="border-primary border-[1.5px] p-2 bg-white text-xs rounded-md max-w-[200px]">
                <p>{name}</p>
                <p className="mt-2 text-primary font-semibold">
                    In the past {timeLineSelected}, you have taken {value}{' '}
                    {value > 1 ? 'tests' : 'test'}.
                </p>
            </div>
        );
    }

    return null;
};

export default CustomPieChart;
