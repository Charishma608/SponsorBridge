// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

// Components
import NotEligibleScreen from '../NotEligibleScreen';
import LoadingScreen from '../LoadingScreen';
import Navbar from './Navbar';
import TestCard from '../TestCard';
import AudioCheckModal from './Modals/AudioCheckModal';
import ReminderModal from './Modals/ReminderModal';

// External Imports
import { FaHeadphonesAlt } from 'react-icons/fa';

const ListeningModule = () => {
    const TABS = ['All Tests', 'Completed', 'Not Completed'];
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allTests, setAllTests] = useState<any>();
    const [tests, setTests] = useState<any>();
    const [notEligible, setNotEligible] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>(TABS[0]);
    const [showAudioCheckModal, setShowAudioCheckModal] = useState<boolean>(false);
    const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
    const [testSelected, setTestSelected] = useState<string>('');

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axios('/listening/assessment/all');
            if (res.status === 200) {
                if (res.data.msg) {
                    setNotEligible(res.data.msg);
                } else {
                    setAllTests(res.data);
                }
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
    if (notEligible) return <NotEligibleScreen />;
    return (
        <div className="h-screen w-full flex flex-col">
            {showAudioCheckModal ? (
                <AudioCheckModal
                    onSuccess={() => {
                        setShowAudioCheckModal(false);
                        setShowReminderModal(true);
                    }}
                    onCancel={() => {
                        setShowAudioCheckModal(false);
                    }}
                />
            ) : null}
            {showReminderModal ? (
                <ReminderModal
                    onSuccess={() => {
                        navigate({
                            pathname: '/communication/listening-module/test',
                            search: new URLSearchParams({
                                id: testSelected,
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
                            icon={<FaHeadphonesAlt className="text-[#8B8BDC]" />}
                            iconClassName="bg-[#EFEFFB]"
                            viewReportAction={() => {
                                navigate({
                                    pathname: '/reports/listening-report',
                                    search: new URLSearchParams({
                                        id: test.id,
                                        latest: '1',
                                    }).toString(),
                                });
                            }}
                            startTestAction={() => {
                                setTestSelected(test?.id);
                                setShowAudioCheckModal(true);
                            }}
                        />
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

export default ListeningModule;
