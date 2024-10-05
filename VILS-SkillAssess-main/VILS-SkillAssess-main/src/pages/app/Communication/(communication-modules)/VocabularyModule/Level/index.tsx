// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

// Components
import LoadingScreen from '../../LoadingScreen';
import Navbar from '../Navbar';

// External Imports
import Button from 'components/Buttons';

const GrammarLevelTopics = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tests, setTests] = useState<any>();

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axios(`/vocabulary/level/${id}/topics/all`);
            if (res.status === 200) {
                setTests(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchAllTests();
    }, [fetchAllTests]);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="h-screen w-full flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-y-scroll ps-8 p-2 flex flex-col gap-4">
                <div className="flex gap-6 flex-wrap">
                    {tests?.map((test: any) => (
                        <div className="overflow-hidden rounded">
                            <div
                                key={test.id}
                                className="p-4 rounded shadow w-[300px] border border-gray-300 border-t-4 border-t-primary"
                            >
                                {/* <p className="text-sm text-primary">TOPIC</p> */}
                                <h2 className="text-md font-semibold h-[40px]">{test.title}</h2>
                                <p className="text-sm text-justify text-gray-500 mt-2 mb-6 line-clamp-6 h-[100px]">
                                    {test.description}
                                </p>
                                <Button
                                    label="View Assessments"
                                    onClick={() => {
                                        navigate({
                                            pathname: 'assessment',
                                            search: new URLSearchParams({
                                                id: test.id,
                                            }).toString(),
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GrammarLevelTopics;
