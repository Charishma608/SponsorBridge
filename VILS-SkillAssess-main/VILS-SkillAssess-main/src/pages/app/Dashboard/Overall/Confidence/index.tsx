// Internal Imports
import { useCallback, useState, useEffect } from 'react';

// Hooks
import { useDashboardContext } from '../../DashboardProvider';

// Configs
import { axiosV2 } from 'configs/axios.config';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import NoDataScreen from '../../NoDataScreen';
import LoadingScreen from './LoadingScreen';
import TooltipComp from 'components/Tooltip';
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import LineChart from './LineChart';
import CompanyWiseAnalytics from './CompanyWiseAnalytics';
import TestAnalytics from './TestAnalytics';

const cache = {
    data: null,
};

const Confidence = () => {
    const { timeLine } = useDashboardContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axiosV2.post(`/dashboard/confidence`, timeLine);
            if (response.status === 201) {
                setData(response.data);
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
                description="Explore your technical proficiency to uncover your skills, experience, and depth of knowledge in your specific domain."
                path="/mock-interview/departments"
            />
        );
    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-md border-[1.5px] border-primary p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <TextSubHeading className="text-primary">Confidence</TextSubHeading>
                    <TooltipComp label="Provide the contents" position="rightBottom" />
                </div>
                <div className="flex justify-between items-start gap-4">
                    <div className="w-[40%]">
                        <div className="pb-1 border-b-[1.5px] border-gray-300 w-fit flex items-center gap-3">
                            <p className="font-semibold text-dark">Confidence Average Score:</p>
                            <p>{Math.round(parseFloat(data?.assessment_analysis?.avg_score))}%</p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <CircularProgressBarGraph
                                value={Math.round(parseFloat(data?.assessment_analysis?.avg_score))}
                                label={
                                    Math.round(parseFloat(data?.assessment_analysis?.avg_score)) +
                                    '%'
                                }
                            />
                        </div>
                        <div className="mt-4 border-t-[1.5px] border-gray-300 pt-2">
                            <p>
                                <span className="font-semibold text-dark">
                                    {' '}
                                    Highest Confidence Score:{' '}
                                </span>
                                <span>
                                    {Math.round(
                                        parseFloat(data?.assessment_analysis?.max_score?.value),
                                    )}
                                    % ({data?.assessment_analysis?.max_score?.role})
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="w-[60%] h-[250px]">
                        <LineChart data={data?.assessment_analysis?.reports} />
                    </div>
                </div>
            </div>
            <TestAnalytics data={data?.role_analysis} />
            <CompanyWiseAnalytics data={data?.company_analysis} />
        </div>
    );
};

export default Confidence;
