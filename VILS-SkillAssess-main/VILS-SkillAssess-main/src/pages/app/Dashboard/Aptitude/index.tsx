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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`/dashboard/aptitude`, timeLine);
            if (res.status === 202) {
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
    if (!data)
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
                    value={data?.analytics?.number_of_tests_taken}
                    icon={TestsTaken}
                />
            </div>
            <OverallContainer data={data?.analytics} />
            <DetailedAnalyticsContainer data={data?.analytics?.detailed_reports} />
        </div>
    );
};

export default Aptitude;
