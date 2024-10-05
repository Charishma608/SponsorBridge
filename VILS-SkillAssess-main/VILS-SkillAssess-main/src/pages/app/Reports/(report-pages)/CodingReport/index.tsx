import { useCallback, useEffect, useState } from 'react';
import Navbar from './Navbar';
import OverallContainer from './OverallContainer';
import QuestionWiseReport from './QuestionWiseReport';
import { useLocation } from 'react-router-dom';
import axiosInstance from 'configs/coding.config';
import { formatDate } from 'utils/helper';
import LoadingScreen from './LoadingScreen';

const CodingReport = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const loadReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get(`/student/report/assessment/${id}`);            
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

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!data) {
        return (
            <div className="h-screen w-full grid place-content-center text-center">
                <h1 className="text-3xl font-bold text-red-600">Oops no data found!</h1>
                <p className="w-2/3 mt-3 m-auto">
                    There could be multiple reasons for this issue. We would request you to contact
                    our team via mail.
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-screen flex flex-col">
                <Navbar submittedAt={formatDate(data?.session?.ended_at)} />
                <div className="flex-1 overflow-y-scroll flex flex-col gap-6 p-4">
                    <OverallContainer overall={data?.overall_result} />
                    <QuestionWiseReport questionWiseResult={data?.question_wise_result} />
                </div>
            </div>
        </div>
    );
};

export default CodingReport;
