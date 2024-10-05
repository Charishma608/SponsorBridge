// External Imports
import { FaUserAlt } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';

interface SwitchContainerProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<'personality_type' | 'competencies'>>;
}

const SwitchContainer: React.FC<SwitchContainerProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="py-4 grid place-content-center">
            <div className="rounded-3xl flex bg-[#F6F8FE]">
                <Tab
                    label="Personality Type"
                    icon={<FaUserAlt />}
                    isActive={activeTab === 'personality_type'}
                    onClick={() => {
                        setActiveTab('personality_type');
                    }}
                />
                <Tab
                    label="Competencies"
                    icon={<MdBarChart className="text-lg" />}
                    isActive={activeTab === 'competencies'}
                    onClick={() => {
                        setActiveTab('competencies');
                    }}
                />
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    icon: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, icon, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-4 w-[200px] text-sm flex items-center justify-center gap-3 rounded-3xl ${
                isActive ? 'bg-primary text-white shadow-stripe' : ''
            } text-primary`}
        >
            <div className={isActive ? 'text-white' : 'text-primary'}>{icon}</div>
            <p>{label}</p>
        </button>
    );
};

export default SwitchContainer;
