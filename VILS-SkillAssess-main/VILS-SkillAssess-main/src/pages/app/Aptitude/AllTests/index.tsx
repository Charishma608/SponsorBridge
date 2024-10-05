// Configs
import axios from 'configs/axios.config';

// Internal Imports
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// External Imports
import { FaBookOpenReader } from 'react-icons/fa6';

// Components
import LoadingScreen from './LoadingScreen';
import AptitudeTestCard from '../AptitudeTestCard';

const AllTests = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tests, setTests] = useState<any>();

    const loadTests = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/aptitude/load-all-test`);
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
        loadTests();
    }, [loadTests]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="flex gap-6 flex-wrap">
            {tests?.map((test: any, index: number) => (
                <AptitudeTestCard
                    key={index}
                    data={test}
                    icon={<FaBookOpenReader className="text-[#66B5B6]" />}
                    iconClassName="bg-[#EBFEFF]"
                    viewReportAction={() => {
                        navigate({
                            pathname: '/reports/aptitude-report',
                            search: new URLSearchParams({
                                id: test.test_id,
                            }).toString(),
                        });
                    }}
                    startTestAction={() => {
                        navigate({
                            pathname: '/aptitude/test',
                            search: new URLSearchParams({
                                id: test.test_id,
                            }).toString(),
                        });
                    }}
                />
            ))}
        </div>
    );
};

export default AllTests;
