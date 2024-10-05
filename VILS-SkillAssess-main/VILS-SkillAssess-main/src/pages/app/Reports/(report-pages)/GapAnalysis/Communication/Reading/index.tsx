import QuestionCard from '../QuestionCard';

interface Option {
    alphabet: string;
    value: string;
}
interface ReadingQuestionCardProps {
    quesNo: string;
    ques: string;
    options: Option[];
    choosenOption: string;
    rightOption: string;
    explanation: string;
}

interface ReadingProps {
    passage?: any[];
    questions?: ReadingQuestionCardProps[];
}

const Reading: React.FC<ReadingProps> = ({ passage, questions }) => {
    return (
        <div>
            <div className="bg-[#F5F5F5] p-4">
                <div className="text-xl mb-2 text-primary underline">Passage</div>
                {passage?.map((e) => {
                    return <div className="my-2">{e}</div>;
                })}
            </div>
            <div className=" mt-5">
                {questions?.map((e) => (
                    <QuestionCard
                        choosenOption={e.choosenOption}
                        explanation={e.explanation}
                        options={e.options}
                        ques={e.ques}
                        quesNo={e.quesNo}
                        rightOption={e.rightOption}
                    />
                ))}
            </div>
        </div>
    );
};

export default Reading;
