import { useState } from 'react';
import ProblemStatementContainer from './ProblemStatementContainer';
import SubmissionsContainer from './SubmissionsContainer';

interface QuestionContainerProps {
    data?: any;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({ data }) => {
    const Tabs = ['Problem Statement', 'Submissions'];
    const [activeTab, setActiveTab] = useState<string>(Tabs[0]);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-primary h-[50px] flex gap-6 items-center shadow px-4">
                {Tabs.map((label, index) => {
                    return (
                        <Tab
                            key={index}
                            label={label}
                            isActive={label === activeTab}
                            onClick={() => setActiveTab(label)}
                        />
                    );
                })}
            </div>
            {activeTab === 'Problem Statement' ? <ProblemStatementContainer data={data} /> : null}
            {activeTab === 'Submissions' ? <SubmissionsContainer data={data} /> : null}
        </div>
    );
};

interface TabProps {
    isActive: boolean;
    label: string;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick = () => {} }) => {
    return (
        <p
            className={`text-white h-full grid place-content-center border-b-[4px] cursor-pointer ${
                isActive ? 'border-b-white' : 'border-transparent'
            }`}
            onClick={onClick}
        >
            {label}
        </p>
    );
};

export default QuestionContainer;
