import CircularProgressBarGraph from 'components/CustomGraphs/CircularProgressBarGraph';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import QuestionCard from '../QuestionCard';

const Speaking = () => {
    const [open, setOpen] = useState(true);
    const [showQuestions, setShowQuestion] = useState(true);
    const DATA = [
        {
            label: 'Classification',
            value: 78,
        },
        {
            label: 'Data Suffiency',
            value: 65,
        },
        {
            label: 'Data Suffiency',
            value: 35,
        },
        {
            label: 'Data Suffiency',
            value: 45,
        },
    ];
    const QuestionData = [
        {
            quesNo: '1',
            ques: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
            options: [
                {
                    alphabet: 'a',
                    value: 'Work closely',
                },
                {
                    alphabet: 'b',
                    value: 'Work Cautiosly',
                },
                {
                    alphabet: 'c',
                    value: 'Work clearly',
                },
                {
                    alphabet: 'd',
                    value: 'Work clearly',
                },
            ],
            choosenOption: 'a',
            rightOption: 'b',
            explanation:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
        },
        {
            quesNo: '2',
            ques: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
            options: [
                {
                    alphabet: 'a',
                    value: 'Work closely',
                },
                {
                    alphabet: 'b',
                    value: 'Work Cautiosly',
                },
                {
                    alphabet: 'c',
                    value: 'Work clearly',
                },
                {
                    alphabet: 'd',
                    value: 'Work clearly',
                },
            ],
            choosenOption: 'b',
            rightOption: 'b',
            explanation:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
        },
    ];
    return (
        <div className="p-4 border-2 rounded-lg shadow-lg">
            <div className="flex w-full justify-between items-center border-b-2">
                <div className="text-3xl">Speaking</div>
                <div className="flex gap-4 items-center">
                    <div className="">Time Taken: 4 min / 10 min</div>

                    <CircularProgressBarGraph
                        value={68}
                        size={110}
                        radius={32}
                        strokeWidth={16}
                        labelClassName="text-xl"
                    />
                    {open ? (
                        <IoIosArrowUp onClick={() => setOpen(false)} size={30} />
                    ) : (
                        <IoIosArrowDown onClick={() => setOpen(true)} size={30} />
                    )}
                </div>
            </div>
            {open && (
                <>
                    <div className="flex flex-col gap-5 p-3 mb-2">
                        {DATA.map((e) => (
                            <DataLine
                                label={e.label}
                                percentage={e.value}
                                lineColorCode={'#0280d4'}
                            />
                        ))}
                    </div>
                    <div
                        className={`w-[220px] py-2 text-center text-lg rounded-3xl cursor-pointer 
                    bg-primary text-white  flex gap-2 justify-center items-center
                `}
                        onClick={() => setShowQuestion(!showQuestions)}
                    >
                        <div className="">Questions</div>
                        <div className="">
                            {showQuestions ? (
                                <IoIosArrowUp size={25} />
                            ) : (
                                <IoIosArrowDown size={25} />
                            )}
                        </div>
                    </div>
                    {showQuestions && (
                        <div className="">
                            {QuestionData.map((e) => (
                                <QuestionCard
                                    choosenOption={e.choosenOption}
                                    explanation={e.explanation}
                                    options={e.options}
                                    ques={e.ques}
                                    quesNo={e.quesNo}
                                    rightOption={e.rightOption}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Speaking;

interface DataLineProps {
    label: string;
    percentage: number;
    lineColorCode: string;
}

const DataLine: React.FC<DataLineProps> = ({ label, lineColorCode, percentage }) => {
    return (
        <div className="flex gap-3 px-4 py-2">
            <div className="w-[30%] text-xl">{label}</div>
            <div className="w-full flex items-center bg-slate-200 rounded-full overflow-hidden h-3">
                <div
                    className="rounded-full  h-full"
                    style={{ width: `${percentage}%`, backgroundColor: lineColorCode }}
                ></div>
                <div
                    className="rounded-r-full bg-slate-200 h-full"
                    style={{ width: `${100 - percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
