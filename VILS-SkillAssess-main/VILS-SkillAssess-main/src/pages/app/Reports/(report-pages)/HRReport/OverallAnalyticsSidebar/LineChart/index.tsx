// External Imports
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';

// Hooks
import { useHRReportsContext } from '../../HRReportProvider';

interface CustomLineChartProps {
    type: 'wpm' | 'confidence_score';
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ type }) => {
    const { data } = useHRReportsContext();

    const generateData = () => {
        const formattedData: {
            question: string;
            questionNumber: number;
            value: number;
        }[] = [];

        for (var i = 0; i < data?.question_wise_result.length; i++) {
            if (data?.question_wise_result[i]?.skipped) continue;
            const questionNumber = i + 1;

            if (type === 'wpm') {
                const wpm =
                    data?.question_wise_result[i]?.result?.communication_analysis?.word_per_min;
                

                formattedData.push({
                    question: `Q-${questionNumber}`,
                    questionNumber,
                    value: wpm,
                });
            } else if (type === 'confidence_score') {
                const confidenceScore =
                    data?.question_wise_result[i]?.result?.interview_analysis?.confidence;

                formattedData.push({
                    question: `Q-${questionNumber}`,
                    questionNumber,
                    value: confidenceScore,
                });
            }
        }

        return formattedData;
    };

    return (
        <div className="w-full h-full">
            <ResponsiveContainer className={'w-full -ml-5 mt-3'}>
                <LineChart data={generateData()}>
                    <XAxis dataKey={'question'} className="text-[12px]" domain={[0, 100]} />
                    <YAxis
                        domain={type === 'wpm' ? [100, 300] : [0, 100]}
                        className="text-[12px]"
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip type={type} />} />
                    <Line
                        dataKey={'value'}
                        stroke="#0280D4"
                        fill="#0280D4"
                        strokeWidth={2}
                        type={'monotone'}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, type }: any) => {
    if (active && payload && payload.length) {
        if (type === 'wpm')
            return (
                <div className="border-primary border-[1.5px] p-3 bg-white text-xs rounded-md max-w-[200px]">
                    <p>
                        For Q{payload[0]?.payload?.questionNumber}, your have{' '}
                        <span className="text-primary">{payload[0].value} WPM.</span>
                    </p>
                </div>
            );
        else {
            return (
                <div className="border-primary border-[1.5px] p-3 bg-white text-xs rounded-md max-w-[200px]">
                    <p>
                        For Q{payload[0]?.payload?.questionNumber}, Your confidence score :
                        <span className="text-primary">{' ' + payload[0].value}/100</span>
                    </p>
                </div>
            );
        }
    }

    return null;
};

export default CustomLineChart;
