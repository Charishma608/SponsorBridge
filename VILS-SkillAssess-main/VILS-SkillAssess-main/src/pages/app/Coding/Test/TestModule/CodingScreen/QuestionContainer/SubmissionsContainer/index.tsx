// Internal Imports
import { useCallback, useEffect, useState } from 'react';

// Configs
import axios from 'configs/coding.config';

// Components
import PastSolutionsScreen from './PastSolutionsScreen';

interface SubmissionsContainerProps {
    data?: any;
}

const SubmissionsContainer: React.FC<SubmissionsContainerProps> = ({ data }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<any>(null);

    const fetchData = useCallback(async () => {
        try {
            const resp = await axios.get(`/student/question/${data.id}/submission`);
            setResponse(resp.data?.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [data.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading)
        return (
            <div className="flex-1 grid place-content-center">
                <p className="font-inter">Loading ...</p>
            </div>
        );
    return (
        <div className="flex-1 overflow-y-scroll p-4 flex flex-col gap-4">
            {response?.length === 0 ? (
                <NoDataScreen />
            ) : (
                <div className="flex flex-col gap-4">
                    <p className="font-medium">Your Submissions</p>
                    <Table data={response} />
                </div>
            )}
        </div>
    );
};

const NoDataScreen = () => {
    return (
        <div className="h-full w-full grid place-content-center">
            <h1 className="text-7xl text-center">🐳</h1>
            <p className="text-center font-inter mt-2">Uh, oh no submissions yet!</p>
        </div>
    );
};

interface TableProps {
    data: {
        id: string;
        language: string;
        memory: string;
        runtime: number;
        timestamp: string;
        verdict: string;
    }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    const [openSolutionsScreen, setOpenSolutionScreen] = useState<boolean>(false);
    const [solutionId, setSolutionId] = useState<string>('');

    if (openSolutionsScreen) {
        return (
            <PastSolutionsScreen id={solutionId} setOpenSolutionScreen={setOpenSolutionScreen} />
        );
    }
    return (
        <div className="flex flex-col rounded-t-md overflow-hidden">
            <div className="flex border-2 border-primary divide-x-2 divide-primary text-sm bg-primary text-white">
                <p className="flex-1 text-center py-4 px-1">Language</p>
                <p className="flex-1 text-center py-4 px-1">Memory</p>
                <p className="flex-1 text-center py-4 px-1">Runtime</p>
                <p className="flex-1 text-center py-4 px-1">Submitted At</p>
                <p className="flex-1 text-center py-4 px-1">Verdict</p>
            </div>

            <div className="flex flex-col border-2 border-gray-300 divide-y-2 divide-gray-300 bg-gray-50">
                {data?.map(({ language, memory, runtime, timestamp, verdict, id }) => (
                    <div className={`flex divide-x-2 divide-gray-300 text-sm h-[70px]`} key={id}>
                        <p className="flex-1 py-2 h-full grid place-content-center">{language}</p>
                        <p className="flex-1 py-2 h-full grid place-content-center">{memory}</p>
                        <p className="flex-1 py-2 h-full grid place-content-center">{runtime}</p>
                        <p className="flex-1 py-2 h-full grid place-content-center">{timestamp}</p>
                        <p
                            className={`flex-1 py-2 h-full text-center grid place-content-center cursor-pointer underline ${
                                verdict === 'Accepted' ? 'text-green-500' : 'text-red-500'
                            }`}
                            onClick={() => {
                                setSolutionId(id);
                                setOpenSolutionScreen(true);
                            }}
                        >
                            {verdict}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubmissionsContainer;
