// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configs
import axios from 'configs/axios.config';

// Components
import Navbar from './Navbar';
import TestCard from '../TestCard';
import LoadingScreen from '../LoadingScreen';
import ReminderModal from './Modals/ReminderModal';
import NotEligibleScreen from '../NotEligibleScreen';
import AudioCheckModal from './Modals/AudioCheckModal';
import TermsAndConditionModal from './Modals/TermsAndConditionModal';

// External Imports
import { FaBookOpenReader } from 'react-icons/fa6';

const BehaviourModule = () => {
    const TABS = ['All Tests', 'Completed', 'Not Completed'];
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allTests, setAllTests] = useState<any>();
    const [tests, setTests] = useState<any>();
    const [notEligible, setNotEligible] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>(TABS[0]);
    const [showAudioCheckModal, setShowAudioCheckModal] = useState<boolean>(false);
    const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
    const [showTermsAndConditionModal, setShowTermsAndConditionModal] = useState<boolean>(false);
    const [testSelected, setTestSelected] = useState<string>('');

    const fetchAllTests = useCallback(async () => {
        try {
            const res = await axios('/behaviour/load-all-tests');
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
    if (notEligible) return <NotEligibleScreen message={notEligible} />;
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
                        setShowReminderModal(false);
                        setShowTermsAndConditionModal(true);
                    }}
                    onCancel={() => {
                        setShowReminderModal(false);
                    }}
                />
            ) : null}
            {showTermsAndConditionModal ? (
                <TermsAndConditionModal
                    onSuccess={() => {
                        navigate({
                            pathname: '/behaviour/behaviour-module/test',
                            search: new URLSearchParams({
                                id: testSelected,
                            }).toString(),
                        });
                        setShowReminderModal(false);
                        setShowTermsAndConditionModal(true);
                    }}
                    onCancel={() => {
                        setShowTermsAndConditionModal(false);
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
                        <TestCard
                            key={index}
                            data={test}
                            icon={<FaBookOpenReader className="text-[#66B5B6]" />}
                            iconClassName="bg-[#EBFEFF]"
                            viewReportAction={() => {
                                navigate({
                                    pathname: '/reports/behaviour-report',
                                    search: new URLSearchParams({
                                        id: test.test_id,
                                    }).toString(),
                                });
                            }}
                            startTestAction={() => {
                                setTestSelected(test?.test_id);
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
            } px-8 py-1 rounded-3xl w-[200px]`}
        >
            <p className="text-center">{label}</p>
        </button>
    );
};

export default BehaviourModule;
