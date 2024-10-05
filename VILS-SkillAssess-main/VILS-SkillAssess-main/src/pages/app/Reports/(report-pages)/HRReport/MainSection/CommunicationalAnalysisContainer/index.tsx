// Components
import ScoreCard from '../ScoreCard';
import Labels from 'components/Labels';
import TooltipComp from 'components/Tooltip';

// Hooks
import { useHRReportsContext } from '../../HRReportProvider';

// Utils
// import { capitalizeFirstLetter } from 'utils/helper';

const CommunicationalAnalysisContainer = () => {
    const { currentQuestionData, getWPMLabel } = useHRReportsContext();
    if (!currentQuestionData || currentQuestionData?.skipped) return null;

    const wpmScore = getWPMLabel(currentQuestionData?.result?.communication_analysis?.word_per_min);

    const fillerWords = currentQuestionData
        ? currentQuestionData?.result?.communication_analysis.repeated_words
        : [];

    console.log(currentQuestionData);

    // TODO : Tone and Pitch graph should come up.

    return (
        <div className="rounded-md bg-white shadow-light p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-primary">Communicational Analysis</h3>
                <TooltipComp
                    label="Assesses your communication skills like how well you are able to  pronounce the words and the ability to convey your thoughts and learning"
                    position="rightBottom"
                />
            </div>
            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="p-2 text-center border-b-[1px] border-gray-300 bg-gray-50">
                    <h3 className="font-semibold">Relevance</h3>
                </div>
                <div className="flex gap-4 items-center p-4">
                    <div className="grid place-content-center p-8 rounded-md w-[25%] border shadow">
                        <p
                            // style={{
                            //     color: confidenceScore.color,
                            // }}
                            className="text-4xl font-semibold text-center"
                        >
                            {currentQuestionData?.result?.communication_analysis?.relevancy?.level}
                        </p>
                        <p className=" text-center">Relevance Level</p>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-xl mb-1 text-primary">Feedback</p>
                        <p className="text-sm text-justify pe-4">
                            {
                                currentQuestionData?.result?.communication_analysis?.relevancy
                                    ?.feedback
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 flex bg-gray-50">
                    <div className="w-1/3 border-r-[0.5px] border-gray-300 py-2">
                        <p className="font-semibold text-center">Number of Pauses</p>
                    </div>
                    <div className="w-1/3 border-l-[0.5px] border-gray-300 py-2">
                        <p className="font-semibold text-center">Average Pitch Level</p>
                    </div>
                    <div className="w-1/3 border-l-[0.5px] border-gray-300 py-2">
                        <p className="font-semibold text-center">Words Per Minute (WPM)</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/3 border-r-[0.5px] border-gray-300 py-6 grid place-content-center">
                        <p className="text-primary text-4xl text-center font-bold">
                            {currentQuestionData?.result?.communication_analysis?.number_of_pauses}
                        </p>
                        <p className="text-center text-sm mt-2">
                            (
                            {currentQuestionData?.result?.communication_analysis
                                ?.number_of_pauses <= 3
                                ? 'Low'
                                : currentQuestionData?.result?.communication_analysis
                                      ?.number_of_pauses <= 6
                                ? 'Ideal'
                                : 'High'}
                            )
                        </p>
                    </div>
                    <div className="w-1/3 border-l-[0.5px] border-gray-300 py-6 grid place-content-center">
                        <p className="text-primary text-4xl font-semibold text-center">
                            {currentQuestionData?.result?.communication_analysis?.pitch} Hz
                        </p>
                        <p className="text-center text-sm mt-2">
                            (
                            {currentQuestionData?.result?.communication_analysis?.pitch <= 70
                                ? 'Low'
                                : currentQuestionData?.result?.communication_analysis?.pitch <= 200
                                ? 'Ideal'
                                : 'High'}
                            )
                        </p>
                    </div>
                    <div className="w-1/3 border-l-[0.5px] border-gray-300 py-6 grid place-content-center">
                        <p
                            className={` text-primary text-4xl font-semibold text-center`}
                            style={{ color: wpmScore.color }}
                        >
                            {currentQuestionData?.result?.communication_analysis?.word_per_min}
                        </p>
                        <p className="text-center text-sm mt-2">( {wpmScore.label} )</p>
                    </div>
                </div>
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 bg-gray-50 flex">
                    <div className="flex justify-center gap-2 border-r-[0.75px] border-gray-300 flex-1 py-2">
                        <p className="text-center font-semibold">Repeated Words</p>
                        <TooltipComp
                            label="Observes and quantifies your use of filter words like 'um' or 'uh', as well as repeated words in a list"
                            position="top"
                        />
                    </div>
                    <div className="flex justify-center gap-2 border-l-[0.75px] border-gray-300 flex-1 py-2">
                        <p className="text-center font-semibold">Average Tone Level</p>
                        <TooltipComp
                            label="Pitch level refers to the perceived frequency or tone of a sound, determining its highness or lowness"
                            position="top"
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="p-4 flex flex-wrap gap-3 text-sm flex-1 border-r-[0.75px] border-gray-300">
                        {fillerWords?.length === 0 ? (
                            <p className="text-center m-auto">😎🔥 Yoop, no filler words found!</p>
                        ) : null}
                        {fillerWords?.map((fillerWord: string, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="py-1 px-3 bg-[#F5F5F5] rounded-lg h-[30px] grid place-content-center"
                                >
                                    "{fillerWord}"
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex-1 grid place-content-center p-4 border-l-[0.75px] border-gray-300">
                        <p className="text-4xl text-primary font-bold">
                            {currentQuestionData?.result?.communication_analysis?.average_tone} Hz
                        </p>

                        <p className="text-center text-sm mt-2">
                            (
                            {currentQuestionData?.result?.communication_analysis?.average_tone <= 90
                                ? 'Low'
                                : currentQuestionData?.result?.communication_analysis
                                      ?.average_tone <= 175
                                ? 'Ideal'
                                : 'High'}
                            )
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 my-4">
                <div className="border-[1.2px] flex-1" />
                <p className="font-semibold">Overall Score</p>
                <div className="border-[1.2px] flex-1" />
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <ScoreCard
                        label="Pronunciation Score"
                        description="Assesses the number of your phonemic inaccuracies and correctly pronounced words"
                        value={currentQuestionData?.result?.communication_analysis?.pronunciation}
                    />
                    <ScoreCard
                        label="Fluency Score"
                        description="Fluency is evaluated by examining how fast you speak, the variation in your speech rate, the frequency of long pauses, the use of filler words, and how well you smoothly include connectives"
                        value={currentQuestionData?.result?.communication_analysis?.fluency}
                    />
                </div>
                <div className="flex gap-2">
                    <ScoreCard
                        label="Vocabulary Score"
                        description="Evaluates and assesses the depth and complexity of your language usage, categorizing vocabulary complexity on a SIMPLE, AVERAGE, COMPLEX scale"
                        value={currentQuestionData?.result?.communication_analysis?.vocabulary}
                    />
                    <ScoreCard
                        label="Grammar Score"
                        description="Assesses the intricacy and diversity of your grammatical structures, categorizing them as SIMPLE, AVERAGE, or COMPLEX, while also pinpointing any grammatical errors"
                        value={currentQuestionData?.result?.communication_analysis?.grammar}
                    />
                </div>
            </div>
            {currentQuestionData?.result?.communication_analysis?.insights ? (
                <div className="rounded-md overflow-hidden border-[1px] border-gray-300">
                    <h2 className="py-2 text-center bg-gray-50 border-b-[1px] border-gray-300 font-semibold flex items-center gap-2 justify-center">
                        Insights
                        <TooltipComp
                            label="Highlights your expertise in communication"
                            position="rightBottom"
                        />
                    </h2>
                    <div className="p-4">
                        {/* There is no currentQuestionData?.result?.communication_analysis?.['insights'] */}

                        <div className="flex flex-col gap-4 text-sm">
                            {currentQuestionData?.result?.communication_analysis?.insights?.map(
                                (insight: string, index: number) => {
                                    if (!insight) return null;
                                    else
                                        return (
                                            <p key={index} className="text-justify">
                                                📝{insight}
                                            </p>
                                        );
                                },
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <div className="flex justify-end mt-4">
                <Labels />
            </div>
        </div>
    );
};

export default CommunicationalAnalysisContainer;
