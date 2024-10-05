// Internal Imports
import { useCallback, useEffect, useState } from 'react';

// Hooks
import { useDashboardContext } from '../DashboardProvider';

// Configs
import axios from 'configs/axios.config';

// Components
import InsightsContainer from './InsightsContainer';
import ListeningContainer from './ListeningContainer';
import ReadingContainer from './ReadingContainer';
import SpeakingContainer from './SpeakingContainer';
import WritingContainer from './WritingContainer';
import LoadingScreen from './LoadingScreen';

const cache = {
    data: null,
};

const Communication = () => {
    const { timeLine } = useDashboardContext();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.post(`/dashboard/communication`, timeLine);

            if (res.status === 200) {
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
    return (
        <div className="flex flex-col gap-4">
            <SpeakingContainer data={data?.speaking} />
            <ReadingContainer data={data?.reading} />
            <ListeningContainer data={data?.listening} />
            <WritingContainer data={data?.writing} />
            <InsightsContainer insights={data?.insights} />
        </div>
    );
};

export default Communication;
