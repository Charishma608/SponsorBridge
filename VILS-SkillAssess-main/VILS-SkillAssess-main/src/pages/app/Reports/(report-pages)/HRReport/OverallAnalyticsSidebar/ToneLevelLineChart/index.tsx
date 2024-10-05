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

import { useHRReportsContext } from '../../HRReportProvider';
// Utils
import { capitalizeFirstLetter } from 'utils/helper';

const CustomeLineChart = () => {
    const { data } = useHRReportsContext();

    const generateData = () => {
        const formattedData: {
            question: string;
            max: number;
            average: number;
            min: number;
        }[] = [];

        for (var i = 0; i < data?.question_wise_result.length; i++) {
            if (data?.question_wise_result[i]?.skipped) continue;
            const questionNumber = i + 1;

            const max_tone =
                data?.question_wise_result[i]?.result?.communication_analysis?.max_tone;
            const average_tone =
                data?.question_wise_result[i]?.result?.communication_analysis?.average_tone;
            const min_tone =
                data?.question_wise_result[i]?.result?.communication_analysis?.min_tone;

            formattedData.push({
                question: `Q-${questionNumber}`,
                max: max_tone,
                average: average_tone,
                min: min_tone,
            });
        }

        return formattedData;
    };
    return (
        <div className="h-full">
            <ResponsiveContainer className="w-full mt-3">
                <LineChart data={generateData()} className="text-[12px] -ml-4">
                    <XAxis dataKey="question" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        dataKey={'max'}
                        stroke="#FF9040"
                        fill="#FF9040"
                        strokeWidth={2}
                        type={'natural'}
                        label="High Pitch"
                    />
                    <Line
                        dataKey={'average'}
                        stroke="#EB5757"
                        strokeWidth={2}
                        fill="#EB5757"
                        type={'natural'}
                        label="Medium Pitch"
                    />
                    <Line
                        dataKey={'min'}
                        stroke="#DCA11D"
                        strokeWidth={2}
                        fill="#DCA11D"
                        type={'natural'}
                        label="Low Pitch"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="border-primary border-[1.5px] p-2 bg-white text-xs rounded-md">
                <p className="text-md">{`${label}`}</p>
                <div className="border-[0.75px] border-gray-400 w-full mt-2 flex">
                    {payload.map((data: any) => {
                        return (
                            <div>
                                <div
                                    className="flex-1 border-[0.75px] border-gray-400 flex items-center justify-center p-1"
                                    key={data.dataKey}
                                >
                                    <p
                                        style={{
                                            color: data.color,
                                        }}
                                    >
                                        {capitalizeFirstLetter(data.dataKey)}
                                    </p>
                                </div>
                                <div
                                    className="flex-1 border-[0.75px] border-gray-400 flex items-center justify-center p-1"
                                    key={data.dataKey}
                                >
                                    <p>{data.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return null;
};

// const data = [
//     {
//         question: 'Q1',
//         max: 75,
//         average: 50,
//         min: 25,
//     },
//     {
//         question: 'Q2',
//         max: 70,
//         average: 56,
//         min: 31,
//     },
//     {
//         question: 'Q3',
//         max: 95,
//         average: 45,
//         min: 23,
//     },
//     {
//         question: 'Q4',
//         max: 74,
//         average: 56,
//         min: 32,
//     },
// ];

export default CustomeLineChart;
