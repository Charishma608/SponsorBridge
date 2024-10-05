// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

// Components
import LoadingScreen from '../../../LoadingScreen';
import Navbar from './Navbar';

// External Imports
import Button from 'components/Buttons';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { FaBookReader } from 'react-icons/fa';

const GrammarLevelTopics = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const TABS = ['All Tests', 'Completed', 'Not Completed'];

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allTests, setAllTests] = useState<any>();
    const [tests, setTests] = useState<any>();
    // const [notEligible, setNotEligible] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>(TABS[0]);
    // const [showAudioCheckModal, setShowAudioCheckModal] = useState<boolean>(false);
    // const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
    // const [testSelected, setTestSelected] = useState<string>('');

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axios(`/vocabulary/topic/${id}/assessments/all`);
            if (res.status === 200) {
                setAllTests(res.data);
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

    useEffect(() => {
        if (activeTab === 'All Tests') {
            setTests(allTests);
        } else if (activeTab === 'Completed') {
            setTests(allTests.filter((item: any) => item.status === 'COMPLETED'));
        } else if (activeTab === 'Not Completed') {
            setTests(allTests.filter((item: any) => item.status === 'INCOMPLETE'));
        }
    }, [activeTab, allTests]);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="h-screen w-full flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-y-scroll ps-8 p-2 flex flex-col gap-4">
                <div className="flex lg:gap-4 rounded-3xl shadow-stripe justify-between w-fit">
                    {TABS.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab}
                            isActive={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>
                <div className="flex gap-6 flex-wrap">
                    {tests?.map((test: any) => (
                        <div key={test.id} className="p-4 rounded-md shadow w-[320px] border">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600/10 h-14 w-14 rounded-full grid place-content-center">
                                    <FaBookReader className="text-primary text-2xl" />
                                </div>
                                <h2 className="text-lg font-semibold flex-1">{test.title}</h2>
                            </div>
                            <p className="text-sm text-justify mt-4 mb-6 line-clamp-6 h-[100px]">
                                {test.description}
                            </p>
                            <div className="my-5 flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <FaRegClock />
                                    {test.duration_in_minutes} Mins
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaRegQuestionCircle />
                                    {test.number_of_questions} Questions
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {test.status === 'COMPLETED' && (
                                    <Button
                                        className="flex-1 bg-orange-400"
                                        label="View Report"
                                        onClick={() => {
                                            navigate({
                                                pathname: '/reports/vocabulary-report',
                                                search: new URLSearchParams({
                                                    id: test.id,
                                                    latest: '1',
                                                }).toString(),
                                            });
                                        }}
                                    />
                                )}
                                <Button
                                    className="flex-1 bg-primary"
                                    label="Start"
                                    onClick={() => {
                                        navigate({
                                            pathname: 'test',
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

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${
                isActive ? 'bg-primary text-white' : 'text-black'
            } lg:px-8 py-1 rounded-3xl w-[180px] lg:w-[200px]`}
        >
            <p className="text-center">{label}</p>
        </button>
    );
};

export default GrammarLevelTopics;
