// Internal Imports
import { useCallback, useEffect, useState } from 'react';

// Configs
import axios from 'configs/coding.config';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';

// External Imports
import { MdArrowBack } from 'react-icons/md';

interface PastSolutionsScreenProps {
    id: string;
    setOpenSolutionScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PastSolutionsScreen: React.FC<PastSolutionsScreenProps> = ({ id, setOpenSolutionScreen }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);

    console.log(data);

    const fetchSubmission = useCallback(async () => {
        try {
            const resp = await axios.get(`/student/submission/${id}`);
            if (resp.status === 200) {
                setData(resp.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    console.log(data);

    useEffect(() => {
        fetchSubmission();
    }, [fetchSubmission]);

    if (isLoading)
        return (
            <div className="absolute bg-white z-20 top-0 left-0 h-full w-full grid place-content-center">
                <p className="font-inter">Loading ...</p>
            </div>
        );
    return (
        <div className="absolute bg-white z-20 top-0 left-0 h-full w-full overflow-y-scroll p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <MdArrowBack
                    className="text-xl cursor-pointer text-primary"
                    onClick={() => {
                        setOpenSolutionScreen(false);
                    }}
                />
                <TextSubHeading className="text-primary">Submission Details</TextSubHeading>
            </div>
            <div className="rounded-md overflow-hidden shadow">
                <div className="bg-primary text-sm p-4 text-white flex items-center justify-between">
                    <p>Submitted Code</p>
                    <p>Language : {data?.language}</p>
                </div>
                <textarea
                    className="overflow-y-scroll outline-none border-none text-sm bg-gray-50 p-4 w-full h-[300px] border"
                    value={data?.code}
                    readOnly={true}
                />
            </div>
            <div className="flex divide-x-2 text-sm rounded-md overflow-x-hidden shadow">
                <div className="flex flex-1 flex-col divide-y-2">
                    <p className="px-4 py-2 bg-primary text-center text-white">Backspace Count</p>
                    <p className="px-4 py-2 grid place-content-center">{data?.backspace_count}</p>
                </div>
                <div className="flex flex-1 flex-col divide-y-2">
                    <p className="px-4 py-2 bg-primary text-center text-white">Delete Count</p>
                    <p className="px-4 py-2 grid place-content-center">{data?.delete_count}</p>
                </div>
                <div className="flex flex-col divide-y-2">
                    <p className="px-4 py-2 bg-primary text-center text-white">Memory</p>
                    <p className="px-4 py-2 grid place-content-center">{data?.memory}</p>
                </div>
                <div className="flex flex-col divide-y-2">
                    <p className="px-4 py-2 bg-primary text-center text-white">Runtime</p>
                    <p className="px-4 py-2 grid place-content-center">{data?.runtime}</p>
                </div>
            </div>

            <div className="text-sm flex items-center justify-between font-semibold text-gray-700">
                <p>
                    Test cases Passed : {data?.passed_test_cases}/{data?.total_test_cases}
                </p>
                <p>
                    Verdict :
                    <span
                        className={`underline ${
                            data?.verdict === 'Accepted' ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {' ' + data?.verdict}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PastSolutionsScreen;
