// Components
import TooltipComp from 'components/Tooltip';

// Hooks
import { useSpeakingReportsContext } from '../../SpeakingReportProvider';

const AnalyticsContainer = () => {
    const { currentQuestionData, getWPMLabel, getConfidenceLabel, getPausesLabel } =
        useSpeakingReportsContext();

    const fillerWords =
        currentQuestionData && currentQuestionData?.scores['filler_words']
            ? Object.keys(currentQuestionData?.scores['filler_words'])
            : [];

    for (var i = 0; i < currentQuestionData?.scores?.repitative_words?.length; i++) {
        fillerWords.push(currentQuestionData?.scores?.repitative_words[i][0]);
    }

    const wpmScore = parseInt(currentQuestionData?.scores['wpm']);
    const wpmScoreLabel = getWPMLabel(wpmScore);
    const confidenceScore = getConfidenceLabel(
        parseInt(currentQuestionData?.scores?.confidence_score),
    );
    const numberOfPauses = parseInt(currentQuestionData?.scores?.speech_analysis?.number_of_pauses);
    const numberOfPausesLabel = getPausesLabel(numberOfPauses);

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-primary">Analytics</h3>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="p-2 text-center border-b-[1px] border-gray-300 bg-gray-50">
                    <h3 className="font-semibold">Words Per Minute (WPM)</h3>
                </div>
                <div className="flex items-center p-4">
                    <div>
                        <div className="flex flex-col items-center gap-3 p-8 rounded-md">
                            <p
                                className={`text-7xl font-bold`}
                                style={{
                                    color: wpmScoreLabel.color,
                                }}
                            >
                                {wpmScore}
                            </p>
                            <p className="font-semibold">{wpmScoreLabel.label}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-justify pe-4">
                            In a speaking test, words per minute (WPM) is a crucial metric that
                            measures the rate at which a person can articulate spoken words within a
                            given timeframe. This metric serves as an indicator of an individual's
                            fluency, pace, and overall efficiency in verbal communication.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="p-2 text-center border-b-[1px] border-gray-300 bg-gray-50">
                    <h3 className="font-semibold">Relavancy</h3>
                </div>
                <div className="flex gap-4 items-center p-4">
                    <div className="grid place-content-center p-8 rounded-md w-[25%] border shadow">
                        <p
                            // style={{
                            //     color: confidenceScore.color,
                            // }}
                            className="text-4xl font-semibold text-center"
                        >
                            {currentQuestionData?.scores?.relavancy_level}
                        </p>
                        <p>Relavancy Level</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-xl mb-1 text-primary">Feedback</p>
                        <p className="text-sm text-justify pe-4">
                            {currentQuestionData?.scores?.relavancy_feedback}
                        </p>
                    </div>
                </div>
                {/* <div className="border-t-2 p-4">
                    <h4 className="text-xl font-medium mb-2 text-primary">AI Genrated Response</h4>
                    <p className="text-sm text-justify pe-4">
                        {currentQuestionData?.scores?.aigenerated}
                    </p>
                </div> */}
            </div>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="p-2 text-center border-b-[1px] border-gray-300 bg-gray-50">
                    <h3 className="font-semibold">Confidence Score</h3>
                </div>
                <div className="flex gap-4 items-center p-4">
                    <div className="grid place-content-center p-8 rounded-md">
                        <p
                            style={{
                                color: confidenceScore.color,
                            }}
                            className="text-4xl font-semibold"
                        >
                            {confidenceScore.label}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-justify pe-4">
                            Confidence score is a measure used to indicate the level of certainty or
                            reliability associated with a particular piece of information,
                            prediction, or decision. It provides an estimate of how likely a given
                            statement or conclusion is to be accurate, based on available evidence,
                            data, or reasoning.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 flex bg-gray-50">
                    <div className="w-1/2 border-r-[0.5px] border-gray-300 py-2">
                        <p className="font-semibold text-center">Number of Pauses</p>
                    </div>
                    <div className="w-1/2  border-r-[0.5px] border-l-[0.5px] border-gray-300 py-2">
                        <p className="font-semibold text-center">Pitch</p>
                    </div>
                    <div className="w-1/2 border-l-[0.5px] border-gray-300 py-2">
                        <p className="font-semibold text-center">Tone Level</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 border-r-[0.5px] border-gray-300 py-6">
                        <p className="text-primary text-4xl text-center font-bold">
                            {numberOfPauses}
                        </p>
                        <p style={{ color: numberOfPausesLabel.color }} className="text-center">
                            ( {numberOfPausesLabel.label} )
                        </p>
                    </div>
                    <div className="w-1/2 border-l-[0.5px] border-r-[0.5px] border-gray-300 py-6">
                        <p className="text-primary text-4xl text-center font-bold">
                            {currentQuestionData?.scores?.averag_pitch} Hz
                        </p>
                    </div>
                    <div className="w-1/2 border-l-[0.5px] border-gray-300 py-6">
                        <p className="text-primary text-4xl text-center font-bold">
                            {currentQuestionData?.scores?.speech_analysis?.average_tone} Hz
                        </p>
                    </div>
                </div>
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 flex items-center justify-center gap-2 py-3 bg-gray-50">
                    <p className="font-semibold text-center">Speech Delivery Insights</p>
                    <TooltipComp
                        label="Analyzes your communication by assessing your WPM, pauses, tone levels"
                        position="top"
                    />
                </div>
                <div className="flex flex-col gap-3 py-4 px-3 text-sm">
                    {currentQuestionData?.scores?.analytics_insights?.map(
                        (insight: string, index: number) => {
                            return (
                                <p className="flex items-start gap-3" key={index}>
                                    <span>🎯</span>
                                    <span>{insight}</span>
                                </p>
                            );
                        },
                    )}
                </div>
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2 flex items-center gap-2">
                    <div className="flex items-center gap-3 m-auto">
                        <p className="text-center font-semibold">Repeated Words</p>
                        <TooltipComp
                            label="Observes and quantifies your use of filler words like 'um' or 'uh,' as well as repeated words in a list"
                            position="top"
                        />
                    </div>
                </div>
                <div className="p-4 flex flex-wrap gap-3 text-sm">
                    {fillerWords?.length === 0 ? (
                        <p className="text-center m-auto">😎🔥 Yoop, no filler words found!</p>
                    ) : null}
                    {fillerWords?.map((fillerWord: string, index: number) => {
                        return (
                            <div key={index} className="py-1 px-3 bg-[#F5F5F5] rounded-lg">
                                "{fillerWord}"
                            </div>
                        );
                    })}
                </div>
            </div>
            {currentQuestionData?.scores?.warning?.['NotEnoughWordsSpokenWarning'] ? (
                <p className="text-sm border-t-[1px] border-gray-300 text-center pt-2 mt-2">
                    🚨 <span className="text-red-600">Warning: </span>
                    {currentQuestionData?.scores?.warning['NotEnoughWordsSpokenWarning']}
                </p>
            ) : null}
        </div>
    );
};

export default AnalyticsContainer;
