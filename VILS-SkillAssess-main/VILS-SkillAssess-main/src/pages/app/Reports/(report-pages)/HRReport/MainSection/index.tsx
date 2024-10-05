// Components
import TopBar from './TopBar';
import YourResponseContainer from './YourResponseContainer';
import CommunicationAnalysisContainer from './CommunicationalAnalysisContainer';
import InterviewAnalysisContainer from './InterviewAnalysisContainer';

// Hooks
import { useHRReportsContext } from '../HRReportProvider';

const MainSection = () => {
    const { currentQuestionData, currentQuestionIndex } = useHRReportsContext();
    console.log(currentQuestionData);

    return (
        <div className="relative">
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="flex flex-col gap-4 p-4">
                    <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-2">
                        <h3 className="font-semibold text-primary">
                            Question (Q{currentQuestionIndex + 1})
                        </h3>
                        <p className="text-sm text-justify">{currentQuestionData?.question}</p>
                    </div>
                    <YourResponseContainer />
                    {!currentQuestionData?.is_attempted ? (
                        <div className="rounded-md shadow-light p-4">
                            <h3 className="font-semibold">
                                👀 Uh, oh you had skipped this question!
                            </h3>
                            <p className="text-sm mt-4">
                                Do not skip any question! If you do, ensure you note them down and
                                try giving a well-prepared answer next time. It is a good way to
                                gather more tech knowledge and also enhances your overall
                                understanding of the subject
                            </p>
                        </div>
                    ) : currentQuestionData?.is_result_generated ? (
                        <>
                            <CommunicationAnalysisContainer />
                            <InterviewAnalysisContainer />
                        </>
                    ) : (
                        <div className="rounded-md shadow-light p-4">
                            <h3 className="font-semibold">👀 Uh, oh Something bad happened!</h3>
                            {currentQuestionData?.message ? (
                                <p className="text-sm mt-4">{currentQuestionData?.message}</p>
                            ) : (
                                <p className="text-sm mt-4">
                                    For the following case, the response is present, but the report
                                    is not generated due to insufficient data or background noise in
                                    response.
                                </p>
                            )}
                        </div>
                    )}
                    {/* <RecommendationsContainer /> */}
                </div>
            </div>
        </div>
    );
};

export default MainSection;
