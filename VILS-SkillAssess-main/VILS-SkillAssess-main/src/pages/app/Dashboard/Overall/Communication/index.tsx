// Internal Imports
import { useCallback, useState, useEffect } from 'react';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import LineChart from './LineChart';
import TooltipComp from 'components/Tooltip';
import LoadingScreen from './LoadingScreen';
import NoDataScreen from '../../NoDataScreen';

// Hooks
import { useDashboardContext } from '../../DashboardProvider';

// Configs
import axios from 'configs/axios.config';

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
            const response = await axios.post(`/dashboard/overall/communication`, timeLine);
            if (response.status === 200) {
                setData(response.data?.communication);
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
    if (data?.communication_average_score === '0%') {
        return (
            <NoDataScreen
                description="Engage in our Communication test and elevate your communication prowess by getting our personalized insights"
                helpers='Click "Get Started" to take our test and gain insights to understand your personalized communication level and proficiency in English language'
                path="/communication"
            />
        );
    }
    return (
        <div className="rounded-md border-[1.5px] border-primary p-4 h-full">
            <div className="flex items-center gap-2">
                <TextSubHeading className="text-primary">Communication</TextSubHeading>
                <TooltipComp
                    label="Evaluates your communication skills, including speaking, listening, writing and reading, to understand how effectively you can convey and understand information in different ways"
                    position="rightBottom"
                />
            </div>
            <div className="mt-4 flex justify-between items-start gap-4">
                <div className="w-[40%]">
                    <div className="pb-1 border-b-[1.5px] border-gray-300 w-fit flex items-center gap-3">
                        <p className="font-semibold text-dark">Communication Average Score:</p>
                        <p>{data?.communication_average_score}</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <p className="font-semibold text-dark">Recommendation</p>
                        <p className="text-sm">{data?.recommendation}</p>
                    </div>
                </div>
                <div className="w-[60%] h-[250px]">
                    <LineChart data={data?.reports?.all} />
                </div>
            </div>
        </div>
    );
};

export default Communication;
