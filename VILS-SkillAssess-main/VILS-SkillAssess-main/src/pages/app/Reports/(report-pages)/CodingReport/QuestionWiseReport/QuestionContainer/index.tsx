interface QuestionContainerProps {
    questionNumber: number;
    questionDetails: any;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({ questionDetails }) => {
    return (
        <div className="rounded-md overflow-hidden shadow-light">
            <div className="bg-primary px-4 py-3 shadow">
                <p className="text-white">{questionDetails?.title}</p>
            </div>
            <div className="p-4 flex flex-col gap-7">
                <p className="font-semibold">Problem Statement</p>
                <div className="flex flex-col gap-3 text-sm">
                    <p className="whitespace-pre-wrap">{questionDetails?.description}</p>
                </div>
                <p className="font-semibold">Input Format</p>
                <div className="flex flex-col gap-3 text-sm">
                    <p className="whitespace-pre-wrap">{questionDetails?.input_format}</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionContainer;
