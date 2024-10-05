// Internal Imports
import { useState, useCallback, useEffect } from 'react';

// Configs
import axios from 'configs/axios.config';

// Components
import InsightsContainer from './InsightsContainer';
import ShortBioContainer from './ShortBioContainer';
import LoadingScreen from './LoadingScreen';
import PersonalityChartContainer from './PersonalityChartContainer';
import StrengthContainer from './StrengthsContainer';
import CompetencyChartContainer from './CompetencyChartContainer';
import NoDataScreen from '../../NoDataScreen';

const cache = {
    data: null,
};

const Personality = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/dashboard/behaviour`);
            if (res.status === 200) {
                setData(res.data);
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
            fetchReports();
        }
    }, [fetchReports]);

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (!data)
        return (
            <NoDataScreen
                description="Evaluates your personality by creating a concise profile that emphasizes your strengths, employing standardized models such as the Big 5, Value Model, and Dark Triads"
                helpers='Click "Get Started" to dive into our test and unlock fascinating insights into your personality'
                path="/behaviour/behaviour-module"
            />
        );
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
                <ShortBioContainer bio={data?.short_bio as string} />
                <PersonalityChartContainer personality={data?.personality_type} />
            </div>
            <div className="flex gap-3">
                <StrengthContainer strengths={data?.strengths} intrigues={data?.intrigues} />
                <CompetencyChartContainer data={data?.competency_chart} />
            </div>
            <div className="mt-2">
                <InsightsContainer insights={data?.insights} />
            </div>
        </div>
    );
};

export default Personality;
