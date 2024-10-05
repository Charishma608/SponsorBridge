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
import { useSpeakingReportsContext } from '../../SpeakingReportProvider';

// Constants
import { TONE_PACE } from 'constants/index';

interface CustomLineChartProps {
    type: 'wpm' | 'tonePace' | 'pitchLevel' | 'confidenceLevel';
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ type }) => {
    const { data } = useSpeakingReportsContext();

    const generateData = () => {
        const formattedData: {
            question: string;
            questionNumber: number;
            value: number;
        }[] = [];

        for (var i = 0; i < data?.individual_reports?.length; i++) {
            if (!data?.individual_reports[i]?.is_attempted) continue;
            // const questionNumber = data?.individual_reports[i]?.question_id.split('-')[1];
            const questionNumber = i + 1;

            if (type === 'wpm') {
                const wpm = data?.individual_reports[i]?.scores?.['wpm'];
                if (!wpm) return;

                formattedData.push({
                    question: `Q-${questionNumber}`,
                    questionNumber,
                    value: wpm,
                });
            } else if (type === 'tonePace') {
                const tonePace = data?.individual_reports[i]?.scores?.['tone pace'];
                if (!tonePace) return;

                formattedData.push({
                    question: `Q-${questionNumber}`,
                    questionNumber,
                    value: TONE_PACE[tonePace],
                });
            } else if (type === 'pitchLevel') {
                const pitchLevel = data?.individual_reports[i]?.scores?.['averag_pitch'];
                if (!pitchLevel) return;

                formattedData.push({
                    question: `Q-${questionNumber}`,
                    questionNumber,
                    value: pitchLevel,
                });
            } else if (type === 'confidenceLevel') {
                const confidenceLevel = data?.individual_reports[i]?.scores?.['confidence_score'];
                if (!confidenceLevel) return;

                formattedData.push({
                    question: `Q-${questionNumber}`,
                    questionNumber,
                    value: confidenceLevel,
                });
            }
        }

        return formattedData;
    };

    const formattedData = generateData();

    return (
        <div className="w-full h-full">
            <ResponsiveContainer className={'w-full -ml-5 mt-3'}>
                <LineChart data={formattedData}>
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
                    <ReferenceLine y={140} stroke="#0280D4" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, type }: any) => {
    if (active && payload && payload.length) {
        if (type === 'wpm') {
            return (
                <div className="border-primary border-[1.5px] p-3 bg-white text-xs rounded-md max-w-[200px]">
                    <p>
                        For Q{payload[0]?.payload?.questionNumber}, you have{' '}
                        <span className="text-primary">{payload[0].value} WPM.</span>
                    </p>
                </div>
            );
        } else if (type === 'confidenceLevel') {
            return (
                <div className="border-primary border-[1.5px] p-3 bg-white text-xs rounded-md max-w-[200px]">
                    <p>
                        For Q{payload[0]?.payload?.questionNumber}, Your confidence score :
                        <span className="text-primary">{' ' + payload[0].value}/100</span>
                    </p>
                </div>
            );
        } else {
            const tonePace =
                payload[0].value === 75
                    ? 'Too Fast'
                    : payload[0].value === 50
                    ? 'Normal'
                    : 'Too Slow';
            return (
                <div className="border-primary border-[1.5px] p-3 bg-white text-xs rounded-md max-w-[200px]">
                    <p>
                        Q{payload[0]?.payload?.questionNumber} :
                        <span className="text-primary">{' ' + tonePace}</span> Identified.
                    </p>
                </div>
            );
        }
    }

    return null;
};

export default CustomLineChart;
