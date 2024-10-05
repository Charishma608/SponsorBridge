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

// Utils
import { capitalizeFirstLetter } from 'utils/helper';

// Hooks
import { useSpeakingReportsContext } from '../../SpeakingReportProvider';

const CustomeLineChart = () => {
    const { data } = useSpeakingReportsContext();

    const generateData = () => {
        const formattedData: {
            question: string;
            min: number;
            max: number;
            average: number;
        }[] = [];

        for (var i = 0; i < data?.individual_reports?.length; i++) {
            if (!data?.individual_reports[i]?.is_attempted) continue;

            // const questionNumber = data?.individual_reports[i]?.question_id.split('-')[1];
            const questionNumber = i + 1;

            const min = data?.individual_reports[i]?.scores?.speech_analysis?.min_tone;
            const max = data?.individual_reports[i]?.scores?.speech_analysis?.max_tone;
            const average = data?.individual_reports[i]?.scores?.speech_analysis?.average_tone;

            formattedData.push({
                question: `Q-${questionNumber}`,
                min,
                max,
                average,
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
                        label="Max Tone Level"
                    />
                    <Line
                        dataKey={'average'}
                        stroke="#EB5757"
                        strokeWidth={2}
                        fill="#EB5757"
                        type={'natural'}
                        label="Average Tone Level"
                    />
                    <Line
                        dataKey={'min'}
                        stroke="#DCA11D"
                        strokeWidth={2}
                        fill="#DCA11D"
                        type={'natural'}
                        label="Min Tone Level"
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
                <p className="text-md">Q{label?.split('-')[1]}</p>
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

export default CustomeLineChart;
