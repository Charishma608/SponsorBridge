// Hooks
import { useMockInterviewReportsContext } from '../../MockInterviewReportProvider';

const YourResponseContainer = () => {
    const { currentQuestionData } = useMockInterviewReportsContext();
    if (!currentQuestionData || currentQuestionData?.skipped) return null;

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-primary">Your Response</h3>
            <video
                src={currentQuestionData?.video_url}
                controls
                className="rounded-md h-[400px] w-full object-contain border"
            />
            {currentQuestionData?.result_generated && (
                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">Transcription</h4>
                    <p className="text-sm text-justify">{currentQuestionData?.transcript}</p>
                </div>
            )}
        </div>
    );
};

export default YourResponseContainer;
