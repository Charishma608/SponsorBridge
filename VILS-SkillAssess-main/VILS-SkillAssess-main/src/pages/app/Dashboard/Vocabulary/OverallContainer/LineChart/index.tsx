// External Imports
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
} from 'recharts';

// Hooks
import { useDashboardContext } from '../../../DashboardProvider';

interface DataItem {
    date: string;
    score: string;
}

interface CustomLineChartProps {
    data: DataItem[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ data = [] }) => {
    const { timeLine } = useDashboardContext();

    const generateLastNDaysData = (data: DataItem[]) => {
        const formattedData = [];

        const minimumDataPoints =
            timeLine.days + timeLine.weeks * 7 + timeLine.months * 30 + timeLine.years * 365;
        const numDataPoints = Math.max(data.length, minimumDataPoints);

        for (let i = 0; i < numDataPoints; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);
            const date = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
            }).format(currentDate);
            const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

            const report = data.find((entry) => {
                const entryDate = new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'short',
                }).format(new Date(entry.date));

                return entryDate === date;
            });
            const score = report ? parseFloat(report.score) : 0;

            if (report) {
                formattedData.unshift({
                    date,
                    score,
                    dayOfWeek,
                });
            }
        }

        return formattedData;
    };

    return (
        <div className="w-full h-full -ml-[15px] mt-[10px]">
            <ResponsiveContainer className={'w-full'}>
                <LineChart data={generateLastNDaysData(data)}>
                    <XAxis dataKey={'date'} className="text-[12px]" domain={[0, 100]} />
                    <YAxis domain={[0, 100]} className="text-[12px]" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={CustomTooltip} />
                    <Line
                        dataKey={'score'}
                        stroke="#0280D4"
                        fill="#0280D4"
                        strokeWidth={2}
                        type={'monotone'}
                    />
                    <ReferenceLine y={50} stroke="#0280D4" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="border-primary border-[1.5px] p-2 bg-white text-xs rounded-md max-w-[200px]">
                <p>{`${payload[0]?.payload?.dayOfWeek} ${label}`}</p>
                {payload[0].value === 0 ? (
                    <p className="mt-2 text-xs">
                        Your score was 0 on this day, indicating no tests may have been taken
                    </p>
                ) : (
                    <p className="font-semibold mt-2 text-primary">{`Your overall Grammar score on this day was ${payload[0].value}%`}</p>
                )}
            </div>
        );
    }

    return null;
};

export default CustomLineChart;
