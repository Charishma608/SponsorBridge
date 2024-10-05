// External Imports
import { FaLaptopCode } from 'react-icons/fa';
import { BsMemory } from 'react-icons/bs';

interface ResultDetailsContainerProps {
    result: any;
}

const ResultDetailsContainer: React.FC<ResultDetailsContainerProps> = ({ result }) => {
    return (
        <div className="rounded-md overflow-hidden shadow-light h-full">
            <div className="bg-primary px-4 py-3 shadow">
                <p className="text-white">Result Details</p>
            </div>
            <div className="p-4 flex flex-col divide-y-2">
                <div className="text-sm flex flex-col gap-2 font-semibold">
                    <p>
                        Verdict: <span className={result.verdict === "Accepted" ? "text-green-600" : "text-red-500"}>{result.verdict}</span>
                    </p>
                    <p>
                        Total Test Cases:{' '}
                        <span className="text-gray-600">{result.total_test_cases}</span>
                    </p>
                    <p>
                        Passed Test Cases:{' '}
                        <span className="text-gray-600">{result.passed_test_cases}</span>
                    </p>
                    <p>
                        Score: <span className="text-gray-600">{result.score}</span>
                    </p>
                </div>
                <div className="flex divide-x-2 mt-4">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="h-[50px] flex items-center gap-3 text-sm">
                            <p>Runtime: </p>
                            <FaLaptopCode className="text-xl" />
                        </div>
                        <p className="font-semibold text-2xl text-primary">{result.runtime}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="h-[50px] flex items-center gap-3 text-sm">
                            <p>Memory: </p>
                            <BsMemory className="text-xl" />
                        </div>
                        <p className="font-semibold text-2xl text-primary">{result.memory}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDetailsContainer;
