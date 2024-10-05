// Internal Imports
import { lazy, useEffect, useState } from 'react';

// Components
import TooltipComp from 'components/Tooltip';
import NoDataScreen from '../../NoDataScreen';

// Tabs
const FillerWords = lazy(() => import('./FillerWords'));
const Fluency = lazy(() => import('./Fluency'));
const Pacing = lazy(() => import('./Pacing'));
const Pronunciation = lazy(() => import('./Pronunciation'));

interface SpeakingContainerProps {
    data: any;
}

const SpeakingContainer: React.FC<SpeakingContainerProps> = ({ data }) => {
    const TABS = ['Filler Words', 'Pacing', 'Fluency', 'Pronunciation'];
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [comp, setComp] = useState<any>(null);
    const isDataAvailable = data ? Object.keys(data).length !== 0 : false;

    useEffect(() => {
        switch (activeTab) {
            case 'Filler Words':
                setComp(
                    <FillerWords
                        data={data?.filler_words}
                        tooltip="In your speech, you might use filler words like 'um', 'uh', or 'like' occasionally, either to provide yourself with a moment to think or as a habitual part of your communication"
                    />,
                );
                break;
            case 'Pacing':
                setComp(
                    <Pacing
                        data={data?.pacing}
                        tooltip="Pacing is measured based on the speed you talk and is measured in words per minute(wpm)"
                    />,
                );
                break;
            case 'Fluency':
                setComp(
                    <Fluency
                        data={data?.fluency}
                        tooltip="Fluency means being able to speak smoothly and easily, without hesitations or interruptions"
                    />,
                );
                break;
            case 'Pronunciation':
                setComp(
                    <Pronunciation
                        data={data?.pronounciation}
                        tooltip="Pronunciation means saying words correctly and clearly, so people can understand you easily"
                    />,
                );
                break;
            default:
                setComp(null);
        }
    }, [activeTab, data]);

    return (
        <div className="border-[1.5px] border-primary rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">Speaking</p>
                <TooltipComp
                    label="The Speaking test evaluates your language proficiency and communication abilities, assessing your capacity to express yourself effectively"
                    position="rightBottom"
                />
            </div>
            {isDataAvailable ? (
                <div className="rounded-3xl shadow-stripe horizontal-scroll overflow-x-scroll flex justify-between gap-3">
                    {TABS.map((tab, index) => (
                        <Tab
                            label={tab}
                            isActive={activeTab === tab}
                            onClick={() => {
                                setActiveTab(tab);
                            }}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <NoDataScreen
                    description="Engage in our Speaking test to cultivate proficient verbal communication, a vital asset across professions, empowering you to articulate ideas, collaborate seamlessly, and project confidence in interviews or meetings"
                    path="/communication/speaking-module"
                />
            )}
            {isDataAvailable ? <div>{comp}</div> : null}
        </div>
    );
};

interface TabProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label = '', isActive = false, onClick = () => {} }) => {
    return (
        <button
            className={`py-2 px-8 text-sm rounded-3xl min-w-[150px] ${
                isActive ? 'bg-primary text-white' : 'text-black'
            }`}
            onClick={onClick}
        >
            <p>{label}</p>
        </button>
    );
};

export default SpeakingContainer;
