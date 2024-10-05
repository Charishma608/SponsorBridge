import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import TextSubHeading from 'components/Texts/TextSubHeading';
import { IoPlayForwardCircleOutline } from 'react-icons/io5';
import ScoreCard from './ScoreCard';
import { lazy, Suspense, useEffect, useState } from 'react';
import { cn } from 'utils/helper';

const Aptitude = () => {
    const Tabs = ['Verbal Reasoning', 'Numerical Aptitude', 'Speaking'];

    const [activeTab, setActiveTab] = useState<string>(Tabs[0]);
    const [Comp, setComp] = useState<React.FC | null>(null);

    const VerbalReasoning = lazy(() => import('./VerbalReasoning'));
    const NumericalAptitude = lazy(() => import('./NumericalAptitude'));
    const Speaking = lazy(() => import('./Speaking'));

    useEffect(() => {
        switch (activeTab) {
            case 'Verbal Reasoning':
                setComp(VerbalReasoning);
                break;
            case 'Numerical Aptitude':
                setComp(NumericalAptitude);
                break;
            case 'Speaking':
                setComp(Speaking);
                break;
            default:
                setComp(null);
                break;
        }
    }, [activeTab,NumericalAptitude,Speaking,VerbalReasoning]);
    return (
        <div className="max-h-[87vh] overflow-hidden overflow-y-scroll ">
            <div className="">
                <TextSubHeading className="text-primary text-left">Aptitude Test</TextSubHeading>
            </div>
            <div className="flex gap-[5%]">
                <div className="w-[45%] mt-3 p-2 border-2 rounded-lg shadow-lg">
                    <div className="font-semibold p-3">My Score</div>
                    <div className="flex items-center w-full">
                        <div className="">
                            <CircularProgressBarGraph
                                value={88}
                                size={240}
                                radius={70}
                                labelClassName="text-primary-green"
                            />
                        </div>
                        <div className="text-2xl text-primary-green ">Overall Score : 88%</div>
                    </div>
                    <div className="flex gap-10 p-3">
                        <div className="">
                            <div className="">Correct</div>
                            <div className="text-xl font-semibold">37</div>
                        </div>
                        <div className="">
                            <div className="">Incorrect</div>
                            <div className="text-xl font-semibold">3</div>
                        </div>
                        <div className="">
                            <div className="">Not Attempted</div>
                            <div className="text-xl font-semibold">34</div>
                        </div>
                    </div>
                </div>
                <div className="w-[45%] mt-3 p-2 border-2 rounded-lg shadow-lg">
                    <div className="font-semibold p-3">Analytics</div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 border-2 rounded-md py-4 px-3 shadow-lg">
                            <IoPlayForwardCircleOutline size={35} />
                            <div className="">
                                <div className="text-red-500 text-xl">9</div>
                                <div className="">Skipped</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-2 rounded-md py-4 px-3 shadow-lg">
                            <IoPlayForwardCircleOutline size={35} />
                            <div className="">
                                <div className="text-red-500 text-2xl">9</div>
                                <div className="">Out Of Time</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-2 rounded-md py-4 px-3 shadow-lg">
                            <IoPlayForwardCircleOutline size={35} />
                            <div className="">
                                <div className="text-primary text-2xl">9</div>
                                <div className="">Time Used</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-2 rounded-md py-4 px-3 shadow-lg">
                            <IoPlayForwardCircleOutline size={35} />
                            <div className="">
                                <div className="text-primary text-2xl">9</div>
                                <div className="">Time Left</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-2 rounded-md py-4 px-3 w-[110%] shadow-lg">
                            <IoPlayForwardCircleOutline size={35} />
                            <div className="">
                                <div className="text-primary-green text-2xl">9</div>
                                <div className="">Average Time per Question</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-6 my-3 pr-2">
                <ScoreCard
                    answered={3}
                    label="Quantative Aptitude"
                    questions={7}
                    score={66}
                    skipped={2}
                    key={1}
                />
                <ScoreCard
                    answered={3}
                    label="Quantative Aptitude"
                    questions={7}
                    score={66}
                    skipped={2}
                    key={1}
                />
                <ScoreCard
                    answered={3}
                    label="Quantative Aptitude"
                    questions={7}
                    score={66}
                    skipped={2}
                    key={1}
                />
                <ScoreCard
                    answered={3}
                    label="Quantative Aptitude"
                    questions={7}
                    score={66}
                    skipped={2}
                    key={1}
                />
            </div>

            <div className="rounded-3xl shadow-stripe overflow-hidden flex justify-between my-6">
                {Tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab}
                        isActive={activeTab === tab}
                        onClick={() => {
                            setActiveTab(tab);
                        }}
                        className="flex-1"
                    />
                ))}
            </div>

            <Suspense>{Comp && <Comp />}</Suspense>
        </div>
    );
};

export default Aptitude;

interface TabProps {
    label: string;
    onClick?: () => void;
    className?: string;
    isActive?: boolean;
    withFlex?: boolean;
}

const Tab: React.FC<TabProps> = ({
    label = '',
    onClick = () => {},
    isActive = false,
    className = '',
}) => {
    return (
        <button
            className={cn(
                `z-10 w-[200px] py-2 text-center text-sm rounded-3xl cursor-pointer ${
                    isActive ? 'bg-primary text-white' : 'bg-white text-black'
                }`,
                className,
            )}
            onClick={onClick}
        >
            <p>{label}</p>
        </button>
    );
};
