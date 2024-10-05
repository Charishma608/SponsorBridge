// External Imports
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

interface PieChartProps {
    data: Record<string, number>;
    colors: string[];
}

const CustomPieChart: React.FC<PieChartProps> = ({ data, colors }) => {
    const formatData = (data: Record<string, number>): { label: string; value: number }[] => {
        const formattedData: { label: string; value: number }[] = [];

        const keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            formattedData.push({
                label: keys[i],
                value: data[keys[i]],
            });
        }

        return formattedData;
    };

    const formattedData = formatData(data);

    return (
        <div className="flex-1 min-h-full">
            <ResponsiveContainer width={'100%'}>
                <PieChart width={100}>
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
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        const name = payload[0].name;

        return (
            <div className="border-primary border-[1.5px] p-2 bg-white text-xs rounded-md max-w-[200px]">
                <p className="font-semibold text-primary">
                    {name}: {value}
                </p>
            </div>
        );
    }

    return null;
};

export default CustomPieChart;
