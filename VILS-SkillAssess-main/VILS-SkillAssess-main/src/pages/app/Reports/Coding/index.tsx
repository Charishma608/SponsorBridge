// Internal Imports
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

// Components
import ReportCard from 'components/Cards/ReportCard';
import LoadingScreen from '../LoadingScreen';
import NoDataScreen from '../NoDataScreen';

// Configs
import axiosInstance from 'configs/coding.config';

const cache = {
    data: null,
};

const Coding = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`/student/report/all`);
            if (response.status === 200) {
                setData(response.data);
                cache.data = response.data;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cache.data) {
            setData(cache.data);
            setIsLoading(false);
        } else {
            loadAllReports();
        }
    }, [loadAllReports]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="flex flex-wrap gap-4">
            {data?.map((report: any, index: number) => {
                return (
                    <ReportCard
                        key={index}
                        title={report?.title}
                        description={report?.description}
                        duration={report?.duration}
                        questionCount={report?.number_of_questions}
                        onClick={() => {
                            navigate({
                                pathname: '/reports/coding-report',
                                search: new URLSearchParams({
                                    id: report?.test_id,
                                }).toString(),
                            });
                        }}
                    />
                );
            })}
            {!data || data?.length === 0 ? <NoDataScreen /> : null}
        </div>
    );
};

export default Coding;
