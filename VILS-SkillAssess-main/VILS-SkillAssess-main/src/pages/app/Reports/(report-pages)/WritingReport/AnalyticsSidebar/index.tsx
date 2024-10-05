// Internal Imports
import { useState } from 'react';

// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import DropDown from 'components/DropDown';

// Constants
import { WRITING_STYLES } from 'constants/index';

// External Imports
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { capitalizeFirstLetter } from 'utils/helper';

interface AnalyticsSidebarProps {
    data?: any;
    isSidebarOpened: boolean;
}

const AnalyticsSidebar: React.FC<AnalyticsSidebarProps> = ({ data, isSidebarOpened }) => {
    return (
        <div
            className={`${
                isSidebarOpened ? 'w-[30%]' : 'w-0'
            } h-full overflow-y-scroll transition-all duration-100 border-l-[1.5px] border-gray-300 flex flex-col`}
        >
            <div className="py-2 text-center bg-[#BAE2FD] shadow-light">
                <p className="font-semibold text-dark">Analytics</p>
            </div>
            <div className="flex-1 overflow-y-scroll flex flex-col gap-4 p-2">
                <DropDown
                    label="Wrongly Spelled Words"
                    tooltip="Identifies and highlights instances where words are misspelled, ensuring accuracy in written expression. Evaluates the writer's proficiency in spelling, recognizing the importance of precision and correctness in language usage."
                >
                    {data?.wrongly_spelled_words_list?.length === 0 ? (
                        <div>
                            <p>Congrats 🎉, no wrongly spelled words found!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {data?.wrongly_spelled_words_list?.map((dt: string, index: number) => {
                                const wrongWord = dt?.split(':')[0];
                                const correctWord = dt?.split(':')[1];

                                if (
                                    !wrongWord ||
                                    !correctWord ||
                                    correctWord === '[]' ||
                                    wrongWord === correctWord
                                )
                                    return null;

                                return (
                                    <div className={`flex gap-4 items-center`} key={index}>
                                        <div className="h-2 w-2 rounded-full bg-black" />
                                        <p>{wrongWord} ❌</p>
                                        <p>{correctWord} ✅</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </DropDown>

                <DropDown
                    label="Improvement Areas"
                    tooltip="Identifies specific areas in your writing that offer opportunities for improvement and refinement"
                >
                    {data?.improvement_needed_list?.length === 0 ? (
                        <div>
                            <p>Congrats 🎉, no improvement areas detected!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {data?.improvement_needed_list?.map((dt: string, index: number) => {
                                if (!dt) return null;
                                return (
                                    <div key={index}>
                                        <p>🎯 {dt}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </DropDown>

                <DropDown
                    label="Writing Style"
                    tooltip="Assesses the author's unique voice, tone, and expression, focusing on the creativity, fluency, and appropriateness of language choices to engage and effectively convey the intended message to the audience."
                >
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">
                            🔰 {capitalizeFirstLetter(data?.writing_style)}
                        </p>
                        <p>{WRITING_STYLES[capitalizeFirstLetter(data?.writing_style)!]}</p>
                    </div>
                </DropDown>

                <DropDown
                    label="Grammatical Score"
                    tooltip="Evaluates the errors in grammar including aspects such as sentence structure, verb tense, and agreement"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.grammatical_score}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">
                            Grammatical Score Evaluation" refers to the process of assessing a
                            person's proficiency in grammar and syntax, particularly in written
                            communication.
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Vocabulary Score"
                    tooltip="Evaluates the variety and suitability of words used"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.vacabulary_score}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">
                            A "vocabulary score" typically refers to a measure of a person's
                            vocabulary knowledge or proficiency. It can be assessed in various ways,
                            depending on the context.
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Spelling Accuracy Score"
                    tooltip="Spelling Accuracy Score evaluates how accurately words are spelled in a written text"
                    tooltipPosition="top"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.spelling_accuracy}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">
                            Spelling Accuracy Score typically refers to a measurement of how
                            accurately words are spelled in a written text. In the context of
                            language assessment or evaluation, especially in educational settings,
                            spelling accuracy is an essential component.
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Readability Index"
                    tooltip="Assesses the complexity of the language and structure, providing insight into the overall ease or difficulty of comprehending the content"
                >
                    <div className="flex flex-col gap-3">
                        <div className="grid place-content-center">
                            <CircularProgressBarGraph
                                value={data?.readbility_index}
                                size={150}
                                radius={60}
                            />
                        </div>
                        <p className="text-center">
                            A readability index is a tool used to measure the readability of a
                            written text. It quantifies the complexity of a text's language and
                            structure, indicating how easy or difficult it is to understand the
                            content
                        </p>
                    </div>
                </DropDown>

                <DropDown
                    label="Vocabulary List"
                    tooltip="A personalized Vocabulary List Recommendations is provided for enhancing your language repertoire and communication skills"
                >
                    <div className="flex flex-col gap-3">
                        <p>
                            A personalized Vocabulary List Recommendations is provided for enhancing
                            your language repertoire and communication skills
                        </p>
                        <div className="flex flex-col gap-3">
                            {data?.vocabulary_list?.map((dt: any, index: number) => {
                                return (
                                    <VocabListDropDown label={dt[0]} values={dt[1]} key={index} />
                                );
                            })}
                        </div>
                    </div>
                </DropDown>

                <DropDown
                    label="IELTS Score"
                    tooltip="Assesses the overall proficiency in English by applying the IELTS scoring criteria"
                >
                    <div>
                        <p className="text-center text-md">💥 Coming Soon</p>
                    </div>
                </DropDown>

                <DropDown
                    label="Recommendation"
                    tooltip="Provides constructive suggestions and advice on how to enhance and improve the overall quality of the content, offering insights into areas such as clarity, coherence, and effectiveness of communication."
                >
                    <div>
                        <p className="text-center text-md">💥 Coming Soon</p>
                    </div>
                </DropDown>
            </div>
        </div>
    );
};

interface VocabListDropDownProps {
    label: string;
    values: string[];
}

const VocabListDropDown: React.FC<VocabListDropDownProps> = ({ label = '', values = [] }) => {
    const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);

    const toggleDropDown = () => {
        setIsDropDownOpened((prev) => !prev);
    };

    return (
        <div className="rounded-md bg-white shadow-light">
            <div
                className={`py-3 px-4 flex items-center justify-between gap-3 cursor-pointer text-primary`}
                onClick={toggleDropDown}
            >
                <p className="font-semibold">{label}</p>
                {isDropDownOpened ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div
                className={`${
                    isDropDownOpened
                        ? 'h-full py-2 px-4 text-sm border-t-[1.5px] border-gray-300'
                        : 'h-0'
                } overflow-hidden text-xs flex flex-wrap gap-2`}
            >
                {values.map((value, index) => {
                    if (!value) return null;
                    return <p key={index}>{value},</p>;
                })}
            </div>
        </div>
    );
};

export default AnalyticsSidebar;
