// Internal Imports
import { useCallback, useState, useEffect } from 'react';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import LineChart from './LineChart';
import LoadingScreen from './LoadingScreen';
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';
import TooltipComp from 'components/Tooltip';
import InsightsContainer from './InsightsContainer';
import NoDataScreen from '../../NoDataScreen';

// Hooks
import { useDashboardContext } from '../../DashboardProvider';

// Configs
import { axiosV2 } from 'configs/axios.config';

const cache = {
    data: null,
};

const DomainKnowledge = () => {
    const { timeLine } = useDashboardContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axiosV2.post(`/dashboard/overall/domain-knowledge`, timeLine);
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
                    <TextSubHeading className="text-primary">Domain Knowledge</TextSubHeading>
                    <TooltipComp
                        label="Evaluates your technical expertise by examining your proficiency in specific skills or knowledge related to a particular subject or field"
                        position="rightBottom"
                    />
                </div>
                <div className="flex justify-between items-start gap-4">
                    <div className="w-[40%]">
                        <div className="pb-1 border-b-[1.5px] border-gray-300 w-fit flex items-center gap-3">
                            <p className="font-semibold text-dark">
                                Domain Knowledge Average Score:
                            </p>
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
                    </div>
                    <div className="w-[60%] h-[250px]">
                        <LineChart data={data?.assessment_analysis?.reports} />
                    </div>
                </div>
                <div className="mt-2 rounded-md h-[200px] flex shadow-light">
                    <div className="flex-1  h-full border-r-[0.75px] border-gray-300">
                        <div className="h-24 lg:h-16 text-center p-2 font-semibold text-dark">
                            Number of Tests Taken
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-bold text-4xl lg:text-7xl">
                                {data?.assessment_analysis?.number_of_tests_taken}
                            </h3>
                        </div>
                    </div>
                    <div className="flex-1 h-full border-r-[0.75px] border-l-[0.75px] border-gray-300">
                        <div className="flex flex-col h-24 lg:h-16 text-center p-2 font-semibold text-dark">
                            Highest Domain Knowledge score
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-4xl lg:text-7xl">
                                {Math.round(
                                    parseFloat(data?.assessment_analysis?.max_score?.value),
                                ) + '%'}
                            </h3>
                            <p className="text-sm">{data?.assessment_analysis?.max_score?.role}</p>
                        </div>
                    </div>
                    <div className="h-full flex-1 border-l-[0.75px] border-gray-300">
                        <div className="flex flex-col h-24 lg:h-16 text-center p-2 px-4 font-semibold text-dark">
                            Most number of tests taken for the role
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-2xl">
                                {data?.assessment_analysis?.max_tests_taken?.role}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Labels />
                </div>
            </div>
            <InsightsContainer insights={data?.insights} />
        </div>
    );
};

export default DomainKnowledge;
