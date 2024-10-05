// Components
import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import Labels from 'components/Labels';
import TooltipComp from 'components/Tooltip';
import NoDataScreen from '../../NoDataScreen';

// Utils
import { capitalizeFirstLetter, cn } from 'utils/helper';

// Constants
import { WRITING_STYLES } from 'constants/index';

interface ReadingContainerProps {
    data?: any;
}

const WritingContainer: React.FC<ReadingContainerProps> = ({ data }) => {
    const isDataAvailable = data ? Object.keys(data).length !== 0 : false;
    return (
        <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-3">
                <p className="font-semibold text-lg">Writing</p>
                <TooltipComp
                    label="The Writing test challenges you to articulate your ideas, thoughts, and knowledge on a given topic using words and sentences, fostering the development of effective written communication skills"
                    position="rightBottom"
                />
            </div>
            {isDataAvailable ? (
                <div className="p-4 border-[1.5px] rounded-md border-primary min-h-[40vh]">
                    <div className="flex">
                        <DataBox
                            label="Grammar"
                            description="Grammatical Score Evaluation refers to the process of assessing a person's proficiency in grammar and syntax, particularly in written communication"
                            value={data.grammar}
                            className="border-l-0"
                        />
                        <DataBox
                            label="Readabilty Index"
                            description="It quantifies the complexity of a text's language and structure, indicating how easy or difficult it is to understand the content"
                            value={data.readabilty_index}
                        />
                        <DataBox
                            label="Vocabulary Score"
                            description="A `vocabulary score` typically refers to a measure of a person's vocabulary knowledge or proficiency. It can be assessed in various ways, depending on the context"
                            value={data.vocabulary}
                            className="border-r-0"
                        />
                    </div>
                    <div className="my-10 flex justify-end">
                        <Labels />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="p-4 rounded-md shadow-light">
                            <p className="font-semibold text-lg pb-1 border-primary border-b-[1.5px] w-fit">
                                <span className="text-primary">Writing Style : </span>
                                {capitalizeFirstLetter(data.writing_style.value)} (
                                {data.writing_style.percentage})
                            </p>
                            <p className="text-sm mt-4">
                                {WRITING_STYLES[capitalizeFirstLetter(data.writing_style.value)!]}
                            </p>
                        </div>
                        <div className="p-4 rounded-md shadow-light">
                            <p className="font-semibold text-lg pb-1 border-primary border-b-[1.5px] w-fit">
                                <span className="text-primary">Spelling Accuracy : </span>
                                {data.spelling_accuracy}%
                            </p>
                            <p className="text-sm mt-4">
                                Spelling Accuracy Score typically refers to a measurement of how
                                accurately words are spelled in a written text. In the context of
                                language assessment or evaluation, especially in educational
                                settings, spelling accuracy is an essential component.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <NoDataScreen
                    description="Engage with our Writing test to elevate your proficiency in expressing ideas with clarity, fostering effective communication and the art of impactful writing essential for a successful future"
                    path="/communication/writing-module"
                />
            )}
        </div>
    );
};

interface DataBoxProps {
    label: string;
    value: number;
    description: string;
    className?: string;
}

const DataBox: React.FC<DataBoxProps> = ({ label, value, description, className }) => {
    return (
        <div
            className={cn(
                `flex-1 border-r-[0.75px] border-l-[0.75px] border-gray-300 py-4`,
                className,
            )}
        >
            <p className="text-center h-10 font-semibold">{label}</p>
            <div className="h-[200px] grid place-content-center">
                <CircularProgressBarGraph value={Math.round(parseFloat(value.toString()))} />
            </div>
            <p className="text-xs px-6 text-center">{description}</p>
        </div>
    );
};

export default WritingContainer;
