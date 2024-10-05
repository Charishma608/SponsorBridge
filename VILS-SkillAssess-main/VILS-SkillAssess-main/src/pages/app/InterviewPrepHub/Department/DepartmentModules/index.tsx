// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Configs
import { axiosV2 } from 'configs/axios.config';

// Components
import Navbar from './Navbar';
import TestCard from './TestCard';
import LoadingScreen from './LoadingScreen';
import AudioVideoCheckModal from './Modals/AudioVideoCheckModal';

// External Imports
import { FaBookOpenReader } from 'react-icons/fa6';

const DepartmentModules = () => {
    const TABS = ['All Tests', 'Completed', 'Not Completed'];
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const roleId = searchParams.get('roleId') || '';
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allTests, setAllTests] = useState<any>();
    const [tests, setTests] = useState<any>();
    const [activeTab, setActiveTab] = useState<string>(TABS[0]);
    const [showVideoCheckModal, setShowVideoCheckModal] = useState<boolean>(false);
    const [testSelected, setTestSelected] = useState<string>('');

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axiosV2(`/practice-test/role/${roleId}/assessment/all`);
            if (res.status === 200) {
                setAllTests(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [roleId]);

    useEffect(() => {
        fetchAllTests();
    }, [fetchAllTests]);

    useEffect(() => {
        if (activeTab === 'All Tests') {
            setTests(allTests);
        } else if (activeTab === 'Completed') {
            setTests(allTests.filter((item: any) => item.status !== 'INCOMPLETE'));
        } else if (activeTab === 'Not Completed') {
            setTests(allTests.filter((item: any) => item.status === 'INCOMPLETE'));
        }
    }, [activeTab, allTests]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {showVideoCheckModal ? (
                <AudioVideoCheckModal
                    onSuccess={() => {
                        navigate({
                            pathname: '/interview-prep-hub/test',
                            search: new URLSearchParams({
                                id: testSelected,
                            }).toString(),
                        });
                        setShowVideoCheckModal(false);
                    }}
                    onCancel={() => {
                        setShowVideoCheckModal(false);
                    }}
                />
            ) : null}
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
                    {tests?.map((test: any, index: number) => (
                        <TestCard
                            key={index}
                            data={test}
                            icon={<FaBookOpenReader className="text-[#66B5B6]" />}
                            iconClassName="bg-[#EBFEFF]"
                            viewReportAction={() => {
                                navigate({
                                    pathname: '/reports/interview-prep-hub-report',
                                    search: new URLSearchParams({
                                        id: test.id,
                                        latest: '1',
                                    }).toString(),
                                });
                            }}
                            startTestAction={() => {
                                setTestSelected(test?.id);
                                setShowVideoCheckModal(true);
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
            className={`py-2 px-6 text-sm w-[180px] lg:w-[200px] rounded-3xl ${
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

export default DepartmentModules;
