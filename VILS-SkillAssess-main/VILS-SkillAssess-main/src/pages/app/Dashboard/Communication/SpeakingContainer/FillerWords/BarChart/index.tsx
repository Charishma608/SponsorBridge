interface BarChartProps {
    data?: any;
}

const BarChart: React.FC<BarChartProps> = ({ data = [] }) => {
    let totalWords = 0;
    data.forEach((dt: any) => {
        totalWords += dt[1];
    });

    return (
        <div className="flex flex-col gap-4">
            {data.map((dt: any, index: number) => {
                const barLengthPercentage = Math.round((dt[1] / totalWords) * 100);
                return (
                    <Bar
                        key={index}
                        value={dt[1]}
                        label={dt[0]}
                        barLengthPercentage={barLengthPercentage}
                    />
                );
            })}
        </div>
    );
};

interface BarProps {
    label: string;
    value: number;
    barLengthPercentage: number;
}
const Bar: React.FC<BarProps> = ({ barLengthPercentage, label, value }) => {
    const FOREGROUND =
        barLengthPercentage >= 30
            ? '#0280D4'
            : barLengthPercentage >= 25
            ? '#3EA3B9'
            : barLengthPercentage >= 15
            ? '#527B96'
            : barLengthPercentage > 10
            ? '#226FA1'
            : '#2596DF';
    const BACKGROUND =
        barLengthPercentage >= 30
            ? '#ADDEFF'
            : barLengthPercentage >= 25
            ? '#B2EDFA'
            : barLengthPercentage >= 15
            ? '#98C5E3'
            : barLengthPercentage > 10
            ? '#7EBFE9'
            : '#B9E3FF';

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-sm">
                <p>"{label}"</p>
                <p>{value}</p>
            </div>
            <div className={`relative h-3 rounded-3xl`} style={{ background: BACKGROUND }}>
                <div
                    className="absolute top-0 left-0 h-full rounded-3xl"
                    style={{
                        width: `${barLengthPercentage}%`,
                        background: FOREGROUND,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default BarChart;
