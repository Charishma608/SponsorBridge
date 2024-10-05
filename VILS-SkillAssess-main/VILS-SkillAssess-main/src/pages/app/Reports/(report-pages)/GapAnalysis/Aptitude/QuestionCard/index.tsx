import IconButton from 'components/Buttons/IconButton';

import React, { useState } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';

interface Option {
    alphabet: string;
    value: string;
}
interface QuestionCardProps {
    quesNo: string;
    ques: string;
    options: Option[];
    choosenOption: string;
    rightOption: string;
    explanation: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    quesNo,
    ques,
    options,
    choosenOption,
    rightOption,
    explanation,
}) => {
    const [showExplanation, setShowExplanation] = useState(false);
    return (
        <div className="mb-8 px-4">
            <div className="text-xl font-semibold my-4">Question {quesNo}</div>
            <div className=" my-4"> {ques}</div>
            <div className="grid grid-cols-1  py-2">
                {options.map((option) => (
                    <div className="">
                        <div
                            className={`my-2  border-[1px] rounded-md  p-4 grid grid-cols-11 ${
                                choosenOption === option.alphabet
                                    ? choosenOption === rightOption
                                        ? 'border-primary-green text-primary-green'
                                        : 'border-[#E1605B] text-[#E1605B]'
                                    : option.alphabet === rightOption
                                    ? 'border-primary-green text-primary-green'
                                    : 'border-gray-300 text-[#999999]'
                            }`}
                        >
                            <div className="flex flex-row items-center col-span-1">
                                <span
                                // className={`rounded-full  text-white text-center px-[7px] ${
                                //     choosenOption === optionprimary-green
                                //         ? ' bg-[#E1605B]'
                                //         : 'bg-[#999999]'
                                // }`}
                                >
                                    {rightOption === option.alphabet ? (
                                        <FaCheckCircle className="text-primary-green" size={30} />
                                    ) : choosenOption === option.alphabet ? (
                                        <IoIosCloseCircle color="red" size={30} />
                                    ) : (
                                        <FaCheckCircle size={30} />
                                    )}
                                </span>
                            </div>
                            <div className="col-span-6">{option.value}</div>
                        </div>
                        <div className="text-xs">
                            {choosenOption === rightOption && option.alphabet === choosenOption ? (
                                <div className="text-primary-green">
                                    You have choosen the right answer
                                </div>
                            ) : option.alphabet === choosenOption ? (
                                <></>
                            ) : option.alphabet === rightOption ? (
                                <div className="text-primary-green">Correct Answer</div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showExplanation ? (
                <IconButton
                    icon={<IoIosArrowUp />}
                    label="Explanation"
                    onClick={() => {
                        setShowExplanation(!showExplanation);
                    }}
                />
            ) : (
                <IconButton
                    icon={<IoIosArrowDown />}
                    label="Explanation"
                    onClick={() => {
                        setShowExplanation(!showExplanation);
                    }}
                />
            )}

            <div
                className={` transition-all ease-in-out duration-700  ${
                    showExplanation ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {showExplanation && (
                    <div className="my-4 border-[1px] rounded-md border-gray-300 p-4 ">
                        {explanation}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionCard;
