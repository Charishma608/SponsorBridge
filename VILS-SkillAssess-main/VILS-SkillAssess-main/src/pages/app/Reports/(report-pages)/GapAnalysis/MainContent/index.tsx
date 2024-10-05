import Aptitude from '../Aptitude';
import Behavioural from '../Behavioural';
import Coding from '../Coding';
import Communication from '../Communication';
import DomainSkills from '../DomainSkills';
import { useGapAnalysisContext } from '../GapAnalysisProvider';
import Navbar from '../Navbar';
import OverAll from '../OverAll';
import SideBar from '../SideBar';

const MainContent = () => {
    const { currentWindow } = useGapAnalysisContext();

    return (
        <div className="">
            {/* <h1 className="text-primary text-3xl font-semibold">Dashboard</h1> */}
            <Navbar />
            <div className="flex">
                <div className="w-[15%]  border-r-2 h-[87vh] p-2">
                    <SideBar />
                </div>

                <div className="mt-5 w-[85%] flex flex-col gap-3 ml-5">
                    {currentWindow === 'Overall' && <OverAll />}

                    {currentWindow === 'Aptitude' && <Aptitude />}

                    {currentWindow === 'Domain Skills' && <DomainSkills />}

                    {currentWindow === 'Behavioural' && <Behavioural />}

                    {currentWindow === 'Coding' && <Coding />}

                    {currentWindow === 'Communication' && <Communication />}
                    {/*

                    {(currentWindow === 'All' || currentWindow === 'Aptitude') && <Aptitude />}

                    {(currentWindow === 'All' || currentWindow === 'Behaviour') && (
                        <>
                            <BehaviourContainer />

                            <WellbeingContainer />

                            <PersonalityChartsContainer />
                        </>
                    )}
                        */}
                </div>
            </div>
        </div>
    );
};

export default MainContent;
