interface SpeakingProps {
    question?: string[];
    answer?: string[];
    correctedAnswer?: string[];
    IELTSVersion?: string[];
}

const Speaking: React.FC<SpeakingProps> = ({ IELTSVersion, answer, correctedAnswer, question }) => {
    return (
        <div className="p-4">
            <div className="">
                <div className="text-xl mb-2 text-primary underline">Reading</div>
            </div>
            {question?.map((e) => {
                return <div className="my-2 ">{e}</div>;
            })}
            <div className="my-4 font-medium">Your Answer</div>
            {answer?.map((e) => {
                return <div className="my-2 pl-4">{e}</div>;
            })}
            <div className="my-4 font-medium">Corrected Answer</div>
            {correctedAnswer?.map((e) => {
                return <div className="my-2 pl-4">{e}</div>;
            })}
            <div className="my-4 font-medium">IELTS Version</div>
            {IELTSVersion?.map((e) => {
                return <div className="my-2 pl-4">{e}</div>;
            })}
        </div>
    );
};

export default Speaking;
