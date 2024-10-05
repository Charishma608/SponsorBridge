// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import AnalyticsTable from './AnalyticsTable';
import PieChart from './PieChart';
import ScoresContainer from './ScoresContainer';

// Configs
import axios from 'configs/axios.config';

const ListeningReport = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>();

    const correctAnswers = data?.analytics?.correct_answers;
    const wrongAnswers = data?.analytics?.wrong_answers;
    const skippedAnswers = data?.analytics?.skipped;

    const COLORS = ['#3EB96F', '#FF7D7D', '#FBA834'];
    const Labels = ['Correct Answers', 'Incorrect Answers', 'Not Attempted'];

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const url =
                latest === '1'
                    ? `/listening/assessment/${id}/report/latest`
                    : `/listening/report/${id}`;
            const res = await axios.get(url);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [id, latest]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full">
                <div className="w-full h-screen flex flex-col">
                    <Navbar date={data?.submitted_at} />
                    <div className="mt-[1px] p-4 pb-4 ps-8 flex-grow overflow-y-scroll flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-3/5">
                                <AnalyticsTable
                                    correctAnswers={correctAnswers}
                                    wrongAnswers={wrongAnswers}
                                    skippedAnswers={skippedAnswers}
                                    timeUsed={data?.analytics?.time_used}
                                />
                            </div>
                            <div className="w-2/5 rounded-md border-[1.5px] border-gray-300 flex flex-col">
                                <div className="flex-1">
                                    <PieChart
                                        data={{
                                            'Correct Answers': correctAnswers,
                                            'Wrong Answers': wrongAnswers,
                                            'Skipped Answers': skippedAnswers,
                                        }}
                                        colors={COLORS}
                                    />
                                </div>
                                <div className="flex flex-wrap justify-center items-start gap-3 px-2 font-inter">
                                    {Labels.map((label, index) => {
                                        return (
                                            <div key={index} className="flex items-center gap-2">
                                                <div
                                                    className={`h-3 min-w-3 rounded-full`}
                                                    style={{
                                                        background: COLORS[index],
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        color: COLORS[index],
                                                    }}
                                                    className="text-sm"
                                                >
                                                    {label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <ScoresContainer data={data?.scores} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListeningReport;
