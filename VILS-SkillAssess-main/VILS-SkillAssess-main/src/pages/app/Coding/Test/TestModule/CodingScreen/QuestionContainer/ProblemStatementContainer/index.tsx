interface ProblemStatementContainerProps {
    data?: any;
}

const ProblemStatementContainer: React.FC<ProblemStatementContainerProps> = ({ data }) => {
    return (
        <div className="flex-1 overflow-y-scroll p-4 flex flex-col gap-4">
            <p className="font-medium">{data?.title}</p>
            <p className="text-sm">{data?.description}</p>

            <div className="flex flex-col gap-2">
                <p className="font-medium">Input Format</p>
                <p className="text-sm bg-gray-100 rounded-md py-3 px-4">{data?.input_format}</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium">Output Format</p>
                <p className="text-sm bg-gray-100 rounded-md py-3 px-4">{data?.output_format}</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium">Sample Test Cases</p>
                <div>
                    {data?.sample_test_cases?.map((sample: any, index: any) => {
                        return (
                            <div
                                key={index}
                                className="text-sm bg-gray-100 rounded-md py-3 px-4 flex flex-col gap-2"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Input :</p>
                                    <p className="whitespace-pre-wrap">{sample?.input}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Output :</p>
                                    <p className="whitespace-pre-wrap">{sample?.output}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">Explanation :</p>
                                    <p>{sample?.explanation}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium">Constraints</p>
                <p className="whitespace-pre-wrap text-sm bg-gray-100 rounded-md py-3 px-4">
                    {data?.constraints}
                </p>
            </div>
        </div>
    );
};

export default ProblemStatementContainer;
