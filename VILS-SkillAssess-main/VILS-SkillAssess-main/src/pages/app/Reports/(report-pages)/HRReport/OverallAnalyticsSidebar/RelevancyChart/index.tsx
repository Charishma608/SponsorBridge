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

const RelevancyLineChart = () => {
    const { data } = useHRReportsContext();

    // const generateData = () => {
    //     const formattedData: {
    //         question: string;
    //         questionNumber: number;
    //         value: number;
    //     }[] = [];

    //     for (var i = 0; i < data?.question_wise_result.length; i++) {
    //         if (data?.question_wise_result[i]?.skipped) continue;
    //         const questionNumber = i + 1;
    //         const pitch = data?.question_wise_result[i]?.result?.communication_analysis?.pitch;

    //         formattedData.push({
    //             question: `Q-${questionNumber}`,
    //             questionNumber,
    //             value: pitch,
    //         });
    //     }

    //     return formattedData;
    // };

    const DATA = [
        {
            question: 'Q-1',
            questionNumber: 1,
            value: 67,
        },
        {
            question: 'Q-2',
            questionNumber: 2,
            value: 78,
        },
        {
            question: 'Q-3',
            questionNumber: 3,
            value: 87,
        },
        {
            question: 'Q-4',
            questionNumber: 4,
            value: 98,
        },
        {
            question: 'Q-5',
            questionNumber: 5,
            value: 45,
        },
        {
            question: 'Q-6',
            questionNumber: 6,
            value: 44,
        },
        {
            question: 'Q-7',
            questionNumber: 7,
            value: 78,
        },
        {
            question: 'Q-8',
            questionNumber: 8,
            value: 68,
        },
        {
            question: 'Q-9',
            questionNumber: 9,
            value: 78,
        },
        {
            question: 'Q-10',
            questionNumber: 10,
            value: 92,
        },
    ];
    return (
        <div className="w-full h-full">
            <ResponsiveContainer className={'w-full -ml-5 mt-3'}>
                <LineChart data={DATA}>
                    <XAxis dataKey={'question'} className="text-[12px]" domain={[0, 100]} />
                    <YAxis domain={[0, 100]} className="text-[12px]" />
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
                    For Q{payload[0]?.payload?.questionNumber}, Your Relevancy Score was{' '}
                    <span className="text-primary">{payload[0].value} .</span>
                </p>
            </div>
        );
    }

    return null;
};

export default RelevancyLineChart;
