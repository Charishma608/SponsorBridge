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
import { useMockInterviewReportsContext } from '../../MockInterviewReportProvider';

const CustomLineChart = () => {
    const { data } = useMockInterviewReportsContext();

    const generateData = () => {
        const formattedData: {
            question: string;
            questionNumber: number;
            value: number;
        }[] = [];

        for (var i = 0; i < data?.question_wise_result.length; i++) {
            if (data?.question_wise_result[i]?.skipped) continue;
            const questionNumber = i + 1;
            const pitch =
                data?.question_wise_result[i]?.result?.communication_analysis?.average_pitch[
                    'value'
                ];

            formattedData.push({
                question: `Q-${questionNumber}`,
                questionNumber,
                value: pitch,
            });
        }

        return formattedData;
    };

    return (
        <div className="w-full h-full">
            <ResponsiveContainer className={'w-full -ml-5 mt-3'}>
                <LineChart data={generateData()}>
                    <XAxis dataKey={'question'} className="text-[12px]" domain={[0, 100]} />
                    <YAxis domain={[0, 300]} className="text-[12px]" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
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
        return (
            <div className="border-primary border-[1.5px] p-3 bg-white text-xs rounded-md max-w-[200px]">
                <p>
                    For Q{payload[0]?.payload?.questionNumber}, Your Pitch was of{' '}
                    <span className="text-primary">{payload[0].value} Hz.</span>
                </p>
            </div>
        );
    }

    return null;
};

export default CustomLineChart;
