// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

// Components
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import TextSubHeading from 'components/Texts/TextSubHeading';
import MyScoreContainer from './MyScoreContainer';
import AnalyticsContainer from './AnalyticsContainer';
import DetailedReport from './DetailedReport';

const AptitudeReport = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const loadReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/aptitude/${id}/load-report`);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadReport();
    }, [loadReport]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-screen flex flex-col">
                <Navbar submittedAt={data?.submitted_at?.toString()} />
                <div className="flex-grow mt-[1px] overflow-y-scroll p-4">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <TextSubHeading>{data?.test_name}</TextSubHeading>
                            <p className="text-sm text-primary">
                                Questions Attempted {data?.analytics?.attempted_question}/
                                {data?.analytics?.total_questions}
                            </p>
                        </div>
                        <TextSubHeading className="text-primary">
                            Score ({data?.scores?.correct_answers}/
                            {data?.analytics?.total_questions})
                        </TextSubHeading>
                    </div>
                    <div className="my-4 flex gap-4">
                        <div className="flex-1">
                            <MyScoreContainer data={data?.scores} />
                        </div>
                        <div className="flex-1">
                            <AnalyticsContainer
                                data={{
                                    ...data?.analytics,
                                    correct_answers: data?.scores?.correct_answers,
                                    incorrect_answers: data?.scores?.incorrect_answers,
                                }}
                            />
                        </div>
                    </div>
                    <DetailedReport data={data?.detailed_report} />
                </div>
            </div>
        </div>
    );
};

export default AptitudeReport;
