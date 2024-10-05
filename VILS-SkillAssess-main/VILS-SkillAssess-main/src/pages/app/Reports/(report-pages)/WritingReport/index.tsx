// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import AnalyticsSidebar from './AnalyticsSidebar';
import MainSection from './MainSection';

// External Imports
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

// Configs
import axios from 'configs/axios.config';
import NoDataScreen from './NoDataScreen';

const WritingReport = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<number>(0);

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);

            const url =
                latest === '1'
                    ? `/writing/assessment/${id}/report/latest`
                    : `/writing/report/${id}`;

            const res = await axios.get(url);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [id, latest]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleToggleSidebar = () => {
        setIsSidebarOpened((prev) => !prev);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }
    if (!data) {
        return <NoDataScreen />;
    }
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-screen">
                <div className="w-full h-full flex flex-col">
                    <Navbar date={data?.submitted_at} />
                    <div className="flex h-[87vh] relative">
                        <div
                            className={`absolute z-10 top-0 ${
                                isSidebarOpened ? 'left-[70%]' : 'left-full'
                            } -translate-x-1/2 -translate-y-1/2 transition-all duration-100`}
                        >
                            <SidebarToggleButton
                                isOpened={isSidebarOpened}
                                toggle={handleToggleSidebar}
                            />
                        </div>

                        <div
                            className={`${
                                isSidebarOpened ? 'w-[70%]' : 'w-full'
                            } h-full overflow-y-scroll transition-all duration-100 flex flex-col`}
                        >
                            <div className="flex">
                                {data?.tasks?.map((_: any, index: number) => (
                                    <TaskTab
                                        key={index}
                                        label={`Task ${index + 1}`}
                                        isActive={index === activeTab}
                                        onClick={() => {
                                            setActiveTab(index);
                                        }}
                                    />
                                ))}
                            </div>

                            <MainSection data={data?.tasks?.[activeTab]} />
                        </div>
                        <AnalyticsSidebar
                            data={data?.tasks?.[activeTab].scores}
                            isSidebarOpened={isSidebarOpened}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface SidebarToggleButtonProps {
    isOpened: boolean;
    toggle: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
    isOpened,
    toggle = () => {},
}) => {
    return (
        <button
            onClick={toggle}
            className="h-[40px] w-[40px] rounded-full grid place-content-center text-white bg-gradient"
        >
            {isOpened ? <GrLinkNext /> : <GrLinkPrevious />}
        </button>
    );
};

interface TaskTabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TaskTab: React.FC<TaskTabProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-1 cursor-pointer border-[0.75px] border-gray-300 ${
                isActive ? 'bg-primary text-white shadow-light' : 'bg-gray-100'
            }`}
        >
            <p className={`text-center ${isActive ? 'font-semibold' : ''}`}>{label}</p>
        </button>
    );
};

export default WritingReport;
