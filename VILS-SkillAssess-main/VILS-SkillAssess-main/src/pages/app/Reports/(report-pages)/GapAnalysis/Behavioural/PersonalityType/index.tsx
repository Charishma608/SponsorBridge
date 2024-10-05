import React, { useState } from 'react';
import { PERSONALITY_LOGOS } from 'constants/index';

const PersonalityType = () => {
    const Tabs = [
        {
            label: 'Short Bio',
            points: ['This is a short bio'],
        },
        {
            label: 'Personality Type',
            points: [
                'As an influencer, you motivate and encourage others to do their best work.',
                'You are a role model, setting a positive example for others to follow',
                'You empower your peers to take ownership of their work and find creative solutions to challenges.',
                'You are able to build strong, positive relationships with your peers and create a supportive work environment.',
            ],
        },
        {
            label: 'Strengths',
            points: [
                'Execution excellence',
                'Ownership and accountability',
                'Team leadership',
                'Business acumen',
                'Passion for delivering results',
            ],
        },
        {
            label: 'Interest',
            points: ['This is the interests tab'],
        },
        {
            label: 'Core Strength',
            points: [
                'Shasidar is a skilled communicator and assertive leader, he excels in problem-solving, strategic planning, and driving positive change while confidently forging his unique path within the organization.',
                'Shasidar is a skilled communicator and assertive leader, he excels in problem-solving, strategic planning, and driving positive change while confidently forging his unique path within the organization.',
                'Shasidar is a skilled communicator and assertive leader, he excels in problem-solving, strategic planning, and driving positive change while confidently forging his unique path within the organization.',
            ],
        },
        {
            label: 'Development Areas',
            points: ['This is the Development Areas tab'],
        },
        {
            label: 'Core Traits',
            points: ['This is the Core Traits tab'],
        },
    ];

    const [currentActiveTab, setCurrentActiveTab] = useState(Tabs[0].label);
    const [currentActiveTabPoints, setCurrentActiveTabPoints] = useState(Tabs[0].points);

    return (
        <div>
            <div className="flex p-6">
                <div className="w-[50%] ">
                    {Tabs.map((e) => {
                        return (
                            <div
                                className={`rounded-full w-[80%] p-2  pl-5 mb-3 cursor-pointer ${
                                    currentActiveTab === e.label
                                        ? 'bg-primary text-white'
                                        : 'border-[1px] border-primary'
                                }`}
                                onClick={() => {
                                    setCurrentActiveTab(e.label);
                                    setCurrentActiveTabPoints(e.points);
                                }}
                            >
                                {' '}
                                {e.label}{' '}
                            </div>
                        );
                    })}
                </div>
                {currentActiveTab === 'Personality Type' ? (
                    <PersonalityContainerTab
                        personality="Influencer"
                        points={currentActiveTabPoints}
                    />
                ) : (
                    <CurrentOpenTab label={currentActiveTab} points={currentActiveTabPoints} />
                )}
            </div>
        </div>
    );
};

export default PersonalityType;

interface CurrentOpenTabs {
    label?: string;
    points?: string[];
}

const CurrentOpenTab: React.FC<CurrentOpenTabs> = ({ label, points }) => {
    return (
        <div className="border-primary rounded-md p-4 border-[1px] w-full">
            <div className="text-xl text-primary underline mb-3">{label}</div>
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

interface PersonalityContainerTabProps {
    personality?: string;
    points?: string[];
}

const PersonalityContainerTab: React.FC<PersonalityContainerTabProps> = ({
    points,
    personality,
}) => {
    return (
        <div className="border-primary rounded-md p-4 border-[1px] w-full">
            <div className="text-xl text-primary underline mb-3">{personality}</div>
            <div className="">
                Latha is well-suited for a leadership position. Her drive, intelligence, and energy
                make her an ideal candidate to lead a team. She possesses the ability to provide
                direction and guidance to effectively manage and complete tasks with a group of
                individuals.
            </div>

            <div className="flex justify-center items-center p-3">
                <div className="w-[220px] h-[220px]">
                    <img
                        src={PERSONALITY_LOGOS[personality as string]}
                        alt="influencer"
                        loading="lazy"
                    />
                </div>
            </div>

            <div className=" py-3">
                <ul className="list-disc pl-5">
                    {points?.map((e) => (
                        <li>{e}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
