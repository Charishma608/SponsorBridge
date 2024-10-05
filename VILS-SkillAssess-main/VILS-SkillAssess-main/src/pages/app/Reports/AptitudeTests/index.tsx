// Internal Imports
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

// Components
import ReportCard from 'components/Cards/ReportCard';
import NoDataScreen from '../NoDataScreen';
import LoadingScreen from '../LoadingScreen';

// Configs
import axios from 'configs/axios.config';

// Hooks
// import { useReportsContext } from '../ReportsProvider';

const cache = {
    data: null,
};


const AptitudeTests = () => {
    // const { data } = useReportsContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const loadAllReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/report/aptitude`);
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
        } else {
            loadAllReports();
        }
    }, [loadAllReports]);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="flex flex-wrap gap-4">
            {data?.map((dt: any, index: number) => (
                <ReportCard
                    key={index}
                    title={dt.title}
                    description={dt.description}
                    duration={dt.duration}
                    questionCount={dt.number_of_questions}
                    onClick={() => {
                        navigate({
                            pathname: '/reports/aptitude-report',
                            search: new URLSearchParams({
                                id: dt.test_id,
                            }).toString(),
                        });
                    }}
                />
            ))}
            {data?.length === 0 ? <NoDataScreen /> : null}
        </div>
    );
};

export default AptitudeTests;
