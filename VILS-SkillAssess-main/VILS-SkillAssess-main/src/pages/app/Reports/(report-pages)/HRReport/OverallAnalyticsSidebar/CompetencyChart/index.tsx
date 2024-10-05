// External Imports
import {
    RadarChart,
    ResponsiveContainer,
    PolarGrid,
    Radar,
    PolarAngleAxis,
    Tooltip,
    Dot,
    PolarRadiusAxis,
} from 'recharts';

interface RadarGraphProps {
    data: {
        label: string;
        value: number;
    }[];
    stroke?: string;
    fill?: string;
    name?: string;
    tooltipBorder?: string;
    tooltipColor?: string;
    className?: string;
    tickFontSize?: number;
}

const CompetencyChart: React.FC<RadarGraphProps> = ({
    data = [],
    stroke = '#0280D4',
    fill = '#AADDFF',
    name = 'Radar Graph',
    tooltipBorder = '#0280D4',
    tooltipColor = 'black',
    className = '',
    tickFontSize = 10,
}) => {
    return (
        <ResponsiveContainer className={`w-full ${className}`} aspect={1.2}>
            <RadarChart data={data} className="-ml-2">
                <PolarGrid />
                <Tooltip content={<CustomTooltip border={tooltipBorder} color={tooltipColor} />} />
                <PolarAngleAxis
                    dataKey="label"
                    tick={{
                        fontFamily: 'Inter',
                        fontSize: tickFontSize,
                        fill: 'black',
                        width: '50px',
                    }}
                />
                <PolarRadiusAxis
                    domain={[0, 100]}
                    angle={90}
                    tick={{
                        fontSize: 0,
                    }}
                />
                <Radar
                    name={name}
                    dataKey="value"
                    stroke={stroke}
                    fill={fill}
                    fillOpacity={0.6}
                    dot={<CustomDot color={fill} />}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label, border, color }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className={`border-[1.5px] p-2 bg-white rounded-md`}
                style={{ borderColor: border }}
            >
                <p
                    className="font-semibold text-xs"
                    style={{ color: color }}
                >{`${label}: ${payload[0].value}%`}</p>
            </div>
        );
    }

    return null;
};

const CustomDot = ({ cx, cy, stroke, payload, value, color, ...restProps }: any) => {
    return <Dot cx={cx} cy={cy} stroke={color} fill={'white'} strokeWidth={5} {...restProps} />;
};

export default CompetencyChart;
