// Components
// import AudioPlayer from 'components/AudioPlayer';
import {useInterviewPrepHubReportsContext} from "../../InterviewPrepHubReportProvider";

const RecommendationsContainer = () => {

    const {currentQuestionData} = useInterviewPrepHubReportsContext();

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-primary">Recommendation</h3>
            {/*<div>*/}
            {/*    <AudioPlayer />*/}
            {/*</div>*/}
            <div className="text-justify">
                <p className="text-sm">
                    {currentQuestionData?.recommended_answer_structure}
                </p>
            </div>
        </div>
    );
};

export default RecommendationsContainer;
