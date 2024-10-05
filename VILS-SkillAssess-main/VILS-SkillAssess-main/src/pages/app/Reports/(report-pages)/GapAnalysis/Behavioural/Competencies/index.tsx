import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import React, { useState } from 'react';

const Competencies = () => {
    const Tabs = [
        {
            label: 'Enterprising and Performing',
            score: 60,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },

        {
            label: 'Leading and Deciding',
            score: 78,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',
            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },
        {
            label: 'Organising and Executing',
            score: 64,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },
        {
            label: 'Interacting and Presenting',
            score: 69,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },
        {
            label: 'Supporting and Co-operating',
            score: 63,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },

        {
            label: 'Adopting and Coping',
            score: 60,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },
        {
            label: 'Analysing and Interpreting',
            score: 40,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },
        {
            label: 'Creating and Conceptualizing',
            score: 70,
            details:
                'Latha is well-suited for a leadership position. Her drive, intelligence, and energy make her an ideal candidate to lead a team. She possesses the ability to provide direction and guidance to effectively manage and complete tasks with a group of individuals.',

            points: [
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
                'Latha may often demonstrate efficiency in her tasks and work, making her a reliable contributor. She occasionally feels like she lacks extensive knowledge, which fuels her eagerness to follow instructions from others in order to learn and grow.',
            ],
        },
    ];

    const [currentActiveTab, setCurrentActiveTab] = useState(Tabs[0].label);
    const [currentActiveTabPoints, setCurrentActiveTabPoints] = useState(Tabs[0].points);
    const [currentActiveTabdetails, setCurrentActiveTabdetails] = useState(Tabs[0].details);
    const [currentActiveTabScore, setCurrentActiveTabScore] = useState(Tabs[0].score);

    return (
        <div>
            <div className="flex p-6">
                <div className="w-[50%] ">
                    {Tabs.map((e) => {
                        return (
                            <div
                                className={`rounded-full w-[80%] py-2  pl-4 mb-3 cursor-pointer ${
                                    currentActiveTab === e.label
                                        ? 'bg-primary text-white'
                                        : 'border-[1px] border-primary'
                                }`}
                                onClick={() => {
                                    setCurrentActiveTab(e.label);
                                    setCurrentActiveTabPoints(e.points);
                                    setCurrentActiveTabdetails(e.details);
                                    setCurrentActiveTabScore(e.score);
                                }}
                            >
                                {' '}
                                {e.label}{' '}
                            </div>
                        );
                    })}
                </div>
                <CurrentOpenTab
                    label={currentActiveTab}
                    points={currentActiveTabPoints}
                    details={currentActiveTabdetails}
                    score={currentActiveTabScore}
                />
            </div>
        </div>
    );
};

export default Competencies;

interface CurrentOpenTabs {
    label?: string;
    points?: string[];
    score?: number;
    details?: string;
}

const CurrentOpenTab: React.FC<CurrentOpenTabs> = ({ label, points, details, score }) => {
    return (
        <div className="border-primary rounded-md p-4 border-[1px] w-full">
            <div className="text-xl text-primary underline mb-3">{label}</div>
            <div className="flex justify-between items-center">
                <div className="">{details}</div>
                <CircularProgressBarGraph
                    value={score as number}
                    size={200}
                    radius={60}
                    labelClassName="text-primary-green"
                />
            </div>
            <div className="border-t-[1px] py-3">
                <ul className="list-disc pl-5">
                    {points?.map((e) => (
                        <li>{e}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
