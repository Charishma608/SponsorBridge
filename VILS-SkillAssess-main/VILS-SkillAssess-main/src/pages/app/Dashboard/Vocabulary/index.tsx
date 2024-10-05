// Internal Imports
import { useState, useCallback, useEffect } from 'react';

// Hooks
import { useDashboardContext } from '../DashboardProvider';

// Configs
import axios from 'configs/axios.config';

// Assets
import TestsTaken from 'assets/svgs/dashboard/tests_taken.svg';

// Components
import { ScoreCard } from '../ScoreCardContainer';
import LoadingScreen from './LoadingScreen';
import OverallContainer from './OverallContainer';
import DetailedAnalyticsContainer from './DetailedAnalyticsContainer';
import NoDataScreen from '../NoDataScreen';

const cache = {
    data: null,
};

const Aptitude = () => {
    const { timeLine } = useDashboardContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`/dashboard/vocabulary`, timeLine);
            if (res.status === 201) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [timeLine]);

    useEffect(() => {
        if (cache.data) {
            setData(cache.data);
        } else {
            fetchReports();
        }
    }, [fetchReports]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (!data || !data?.number_of_tests_taken)
        return (
            <NoDataScreen
                path="/aptitude?activeTab=all-tests"
                description="Uncover the unique tapestry of your aptitude skills"
                helpers='Click on "Get Started" to uncover your aptitude skills and seize the opportunities that await you'
            />
        );
    return (
        <div className="flex flex-col gap-4">
            <div className="w-[300px]">
                <ScoreCard
                    label="Number of tests taken"
                    value={data?.number_of_tests_taken || 0}
                    icon={TestsTaken}
                />
            </div>
            <OverallContainer data={data} />
            <DetailedAnalyticsContainer data={data?.tags} />
        </div>
    );
};

export default Aptitude;
