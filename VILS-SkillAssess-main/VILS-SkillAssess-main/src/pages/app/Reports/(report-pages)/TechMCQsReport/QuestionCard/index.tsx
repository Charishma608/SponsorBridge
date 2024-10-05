import IconButton from 'components/Buttons/IconButton';

import React, { useState } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';

interface Option {
    id: string;
    data: string;
}
interface QuestionCardProps {
    quesNo: number;
    ques: string;
    options: Option[];
    choosenOption: string;
    rightOption: string;
    explanation?: string;
    isAttempted: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    quesNo,
    ques,
    options,
    choosenOption,
    rightOption,
    // isAttempted = false,
    explanation = null,
}) => {
    const [showExplanation, setShowExplanation] = useState(false);
    return (
        <div className="mb-8 border-2 rounded-md px-4 pb-4">
            <div className="text-md font-medium my-4">
                {quesNo}. {ques}
            </div>
            <div className="grid grid-cols-2 gap-x-8">
                {options?.map((option, index) => (
                    <div className="">
                        <div
                            className={`mt-2 border-2 rounded-md p-4 flex items-center  ${
                                choosenOption === option.id
                                    ? 'border-[#E1605B] text-[#E1605B]'
                                    : 'border-gray-300 text-[#999999]'
                            } ${option.id === rightOption && 'border-[#87B948] text-[#87B948]'}`}
                        >
                            <div className="flex flex-row items-center col-span-1">
                                <span
                                    className={`rounded-full text-white text-center w-8 h-8 grid place-content-center ${
                                        choosenOption === option.id
                                            ? ' bg-[#E1605B]'
                                            : 'bg-[#999999]'
                                    } ${
                                        option.id === rightOption && 'bg-[#87B948] text-[#87B948]'
                                    }`}
                                >
                                    {index + 1}
                                </span>
                            </div>
                            <div
                                className={`col-span-6 mx-4 flex-1 ${
                                    option.id === rightOption && 'border-[#87B948] text-[#87B948]'
                                }`}
                            >
                                {option.data}
                            </div>
                            <div className="flex items-center justify-end col-span-2 text-right">
                                {rightOption === option.id ? (
                                    <FaCheckCircle className="text-[#87B948] text-xl" />
                                ) : choosenOption === option.id ? (
                                    <IoIosCloseCircle color="red" className="text-2xl -mr-1" />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="mt-2 mb-4">
                            {choosenOption === rightOption && option.id === choosenOption ? (
                                <div className="text-[#87B948]">
                                    You have chosen the right answer
                                </div>
                            ) : option.id === choosenOption ? (
                                <div className="text-[#E1605B]">Your Answer</div>
                            ) : option.id === rightOption ? (
                                <div className="text-[#87B948]">Correct Answer</div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/* {!isAttempted && <div className="text-orange-400">Not Attempted</div>} */}
            {explanation !== null && showExplanation ? (
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
                    <div className="mt-2 border-2 rounded-md bg-slate-100 p-4">{explanation}</div>
                )}
            </div>
        </div>
    );
};

export default QuestionCard;
