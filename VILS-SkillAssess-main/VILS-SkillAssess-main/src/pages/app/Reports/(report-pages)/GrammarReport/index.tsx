import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'configs/axios.config';

// Components
import Navbar from './Navbar';
import AnalyticsTable from './AnalyticsTable';
import PieChart from './PieChart';
import QuestionCard from './QuestionCard';
import LoadingScreen from './LoadingScreen';
import FillInTheBlankCard from './FillInTheBlackCard';

const GrammarReport = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const url =
                latest === '1'
                    ? `/grammarr/assessment/${id}/report/latest`
                    : `/grammarr/report/${id}`;

            const response = await axios.get(url);

            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id, latest]);

    useEffect(() => {
        loadAllReports();
    }, [loadAllReports]);

    const COLORS = ['#3EB96F', '#FF7D7D', '#FBA834'];
    const Labels = ['Correct Answers', 'Incorrect Answers', 'Not Attempted'];

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full">
                <div className="w-full h-screen flex flex-col">
                    <Navbar date={data?.submitted_at} />
                    <div className="mt-[1px] p-4 pb-4 ps-8 flex-grow overflow-y-scroll flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-3/5">
                                <AnalyticsTable
                                    correctAnswers={data?.analytics?.correct_answers}
                                    wrongAnswers={data?.analytics?.wrong_answers}
                                    skippedAnswers={data?.analytics?.skipped}
                                    timeUsed={data?.analytics?.time_used}
                                />
                            </div>
                            <div className="w-2/5 rounded-md border-[1.5px] border-gray-300 flex flex-col">
                                <div className="flex-1">
                                    <PieChart
                                        data={{
                                            'Correct Answers': data?.analytics?.correct_answers,
                                            'Wrong Answers': data?.analytics?.wrong_answers,
                                            'Skipped Answers': data?.analytics?.skipped,
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
                            <h2 className="mb-4 text-lg font-semibold ms-1">
                                Question Wise Analysis
                            </h2>
                            {data?.questions?.map((question: any, index: number) => {
                                if (question?.type === 'text')
                                    return (
                                        <FillInTheBlankCard data={question} quesNo={index + 1} />
                                    );
                                else if (question?.type === 'radio')
                                    return (
                                        <QuestionCard
                                            key={question?.id}
                                            quesNo={index + 1}
                                            ques={question?.question}
                                            options={question?.options}
                                            choosenOption={question?.user_chosen_option || ''}
                                            rightOption={question?.correct_option}
                                            isAttempted={question?.is_attempted}
                                            explanation={question?.explanation}
                                        />
                                    );
                                else return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrammarReport;
