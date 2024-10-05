// Internal Imports
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Configs
import axios from 'configs/coding.config';

// Components
import Navbar from './Navbar';
import ReminderModal from './Modals/ReminderModal';
import LoadingScreen from './LoadingScreen';
import AssessmentsCard from './AssessmentsCard';

const AssessmentsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const companyId = searchParams.get('companyId');

    const TABS = ['All Tests', 'Completed', 'Not Completed'];
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<string>(TABS[0]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allTests, setAllTests] = useState<any>();
    const [tests, setTests] = useState<any>();
    const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
    const [testSelected, setTestSelected] = useState<string>('');
    const [testTitle, setTestTitle] = useState<string>('');

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axios.get(`/student/company/${companyId}/assessment/all`);
            if (res.status === 200) {
                setAllTests(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [companyId]);

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
        <div className="h-screen flex flex-col">
            {showReminderModal ? (
                <ReminderModal
                    onSuccess={() => {
                        navigate({
                            pathname: '/coding/test',
                            search: new URLSearchParams({
                                id: testSelected,
                                title: testTitle,
                            }).toString(),
                        });
                        setShowReminderModal(false);
                    }}
                    onCancel={() => {
                        setShowReminderModal(false);
                    }}
                />
            ) : null}
            <Navbar />
            <div className="flex-1 overflow-y-scroll ps-8 p-2 flex flex-col gap-4">
                <div className="flex gap-4 rounded-3xl shadow-stripe justify-between w-fit">
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
                    {tests?.map((test: any, index: number) => (
                        <AssessmentsCard
                            key={index}
                            data={test}
                            startTestAction={() => {
                                setTestSelected(test?.id);
                                setTestTitle(test?.name);
                                setShowReminderModal(true);
                            }}
                            viewReportAction={() => {
                                navigate("/reports/coding-report?id=" + test?.id)
                            }}
                        />
                    ))}
                    {tests?.length === 0 ? <NoDataScreen /> : null}
                </div>
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    isActive: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label = '', isActive = false, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-6 text-sm w-[200px] rounded-3xl ${
                isActive ? 'bg-primary text-white' : ''
            }`}
        >
            <p>{label}</p>
        </button>
    );
};

const NoDataScreen = () => {
    return (
        <div className="w-full min-h-[50vh] grid place-content-center">
            <div className="flex gap-2 flex-col justify-center items-start">
                <span className="text-7xl m-auto">🦖</span>
                <p className="font-inter text-dark">Uh, oh, nothing to show here!</p>
            </div>
        </div>
    );
};

export default AssessmentsPage;
