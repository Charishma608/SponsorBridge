// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

// Components
import LoadingScreen from '../LoadingScreen';
import Navbar from './Navbar';

// External Imports
import Button from 'components/Buttons';

const GrammarModule = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tests, setTests] = useState<any>();

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axios('/grammar/levels/all');
            if (res.status === 200) {
                setTests(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

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
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full grid place-content-center bg-[#53a09956] font-bold text-[#53a099]">
                                        {test?.title?.split(' ')[0]}
                                    </div>
                                    <h2 className="text-md font-semibold flex-1 h-[50px]">
                                        {test.title}
                                    </h2>
                                </div>
                                <p className="text-sm text-justify text-gray-500 my-6 line-clamp-6">
                                    {test.description}
                                </p>
                                <Button
                                    label="View Topics"
                                    onClick={() => {
                                        navigate({
                                            pathname: 'level',
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

export default GrammarModule;
