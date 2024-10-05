import TextSubHeading from 'components/Texts/TextSubHeading';
import { useState } from 'react';
import totalScore from 'assets/svgs/totalscore.svg';
import questionMark from 'assets/svgs/questionmark.svg';
import percentage from 'assets/svgs/percentage.svg';
import timetaken from 'assets/svgs/timetaken.svg';
import totalsubmission from 'assets/svgs/totalsubmission.svg';

import memory from 'assets/svgs/storage.svg';
import laptop from 'assets/svgs/laptop_mac.svg';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';

const Coding = () => {
    const [codingTestName, setCodingTestName] = useState('Coding Test-3');
    const [codingTestDate, setCodingTestDate] = useState('28 October 2023');
    const [submissionDetailsOpen, setSubmissionDetailsOpen] = useState(true);
    const [resultDetailsOpen, setResultDetailsOpen] = useState(true);
    const questionData = [
        {
            problemStatement:
                'You are a part of contest organising team and you should recognize users genders by their user names to decide best male and female coder. You are given user name, and if no of distinct characters in the name is odd, user is male else user is female (if no of characters in the name is even). output where the given user is male or female.',
            inputFormat:
                'The first line of input contains a single integer t, the number of users.',
            submittedAnswer: `
#include <bits/stdc++.h>
using namespace std;
            
int main() {
    int num = 15;
    int a = 0, b = 1;
    ostringstream oss;

    // Print 0th and 1st terms
    oss << a << ", " << b << ", ";
            
    int nextTerm;
            
    // Print the rest of the terms
    for (int i = 2; i < num; i++) {
                    nextTerm = a + b;
        a = b;
        b = nextTerm;
        oss << nextTerm << ", ";
    }

    string result = oss.str();

    // Print the result string
    cout << result << endl;

    return 0;
            }
              `,
            submittedAt: '5:45 PM',
            submissionDetails: {
                BackSpaceCount: 4,
                DeleteCount: 6,
                TimeStamp: `00:23:00`,
            },
            resultDetails: {
                verdict: 'Runtime Error',
                compileOutput: '“This code works fine"',
                stdout: '“hello world”',
                stderr: 'error at line “306"',
                message: 'too many characters in line 10',
            },
        },
    ];
    return (
        <div className="max-h-[87vh] overflow-hidden overflow-y-scroll pr-3">
            <div className="">
                <TextSubHeading className="text-primary text-left">Coding</TextSubHeading>
            </div>
            <div className="my-3 text-2xl font-semibold">{codingTestName}</div>
            <div className="text-[#252928] mb-3">Test Date : {codingTestDate}</div>
            <div className="rounded-md p-3   w-full border-2">
                <div className="flex mb-3">
                    <div className="w-[47.5%] text-xl font-semibold">Overall</div>
                    <div className="">
                        <img src={totalScore} alt="no-img" width={50} height={50} />
                    </div>
                </div>
                <div className="flex justify-center items-center font-medium text-xl my-1">
                    Total Score
                </div>
                <div className="flex justify-center items-center text-primary text-3xl font-medium">
                    78
                </div>
                <div className="flex gap-7 items-center my-5">
                    <div className="rounded-md border-[1px] flex p-3 gap-3 shadow-md">
                        <div className="flex items-center">
                            <img src={questionMark} alt="no-img" width={37} height={37} />
                        </div>
                        <div className="">
                            <div className="">Total Question</div>
                            <div className="text-primary font-semibold">3</div>
                        </div>
                    </div>

                    <div className="rounded-md border-[1px] flex p-3 gap-3 shadow-md">
                        <div className="flex items-center">
                            <img src={totalsubmission} alt="no-img" width={37} height={37} />
                        </div>
                        <div className="">
                            <div className="">Total Submission</div>
                            <div className="text-primary font-semibold">9</div>
                        </div>
                    </div>
                    <div className="rounded-md border-[1px] flex p-3 gap-3 shadow-md">
                        <div className="flex items-center">
                            <img src={timetaken} alt="no-img" width={37} height={37} />
                        </div>
                        <div className="">
                            <div className="">Time Taken</div>
                            <div className="text-primary font-semibold">00:23:00</div>
                        </div>
                    </div>
                    <div className="rounded-md border-[1px] flex p-3 gap-3 shadow-md">
                        <div className="flex items-center">
                            <img src={percentage} alt="no-img" width={37} height={37} />
                        </div>
                        <div className="">
                            <div className="">Submission Percentage </div>
                            <div className="text-primary font-semibold">45%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" my-5">
                <div className="text-2xl font-medium mb-4">Question wise</div>
                {questionData.map((e, index) => {
                    return (
                        <div className="rounded-lg w-full">
                            <div className="rounded-t-lg w-full text-white bg-primary px-5 pt-6 pb-2  text-lg">
                                Question {index + 1}
                            </div>
                            <div className=" border-x-2 border-b-2 rounded-b-lg">
                                <div className="px-5 py-5">Problem Statment:-</div>
                                <div className="my-5 px-5">{e.problemStatement}</div>
                                <div className="px-5">Input Format</div>
                                <div className=" my-5 px-5">{e.inputFormat}</div>
                            </div>
                            <div className="my-5 grid grid-cols-2 gap-4">
                                <div className="">
                                    <div className="rounded-t-lg w-full text-white bg-primary px-5 pt-3 pb-2  text-lg">
                                        Submitted Answer
                                    </div>
                                    <pre className="px-5 border-x-2 border-b-2 rounded-b-lg max-h-[500px]  overflow-auto overflow-y-scroll overflow-x-scroll">
                                        {e.submittedAnswer}
                                    </pre>
                                </div>
                                <div className="rounded-lg border-2 p-5">
                                    <div className="mb-5">
                                        <div
                                            className="flex items-center justify-between rounded-t-lg w-full text-white bg-primary px-3 pt-2 pb-1  text-sm"
                                            onClick={() =>
                                                setSubmissionDetailsOpen(!submissionDetailsOpen)
                                            }
                                        >
                                            <div className=" flex gap-2 items-center">
                                                {submissionDetailsOpen ? (
                                                    <MdKeyboardArrowRight size={30} />
                                                ) : (
                                                    <IoIosArrowDown size={30} />
                                                )}
                                                <div className="">Submission Details</div>
                                            </div>
                                            <div className="">Submitted At: {e.submittedAt}</div>
                                        </div>
                                        {submissionDetailsOpen && (
                                            <div className="px-3 border-x-2 border-b-2 rounded-b-lg">
                                                <div className="pt-4">
                                                    Backspace Count:{' '}
                                                    {e.submissionDetails.BackSpaceCount}
                                                </div>
                                                <div className="pt-4">
                                                    DeleteCount: {e.submissionDetails.DeleteCount}
                                                </div>
                                                <div className="py-4 ">
                                                    TimeStamp: {e.submissionDetails.TimeStamp}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <div
                                            className="flex items-center  rounded-t-lg w-full text-white bg-primary px-3 pt-2 pb-1  text-sm"
                                            onClick={() => setResultDetailsOpen(!resultDetailsOpen)}
                                        >
                                            <div className=" flex gap-2 items-center">
                                                {resultDetailsOpen ? (
                                                    <MdKeyboardArrowRight size={30} />
                                                ) : (
                                                    <IoIosArrowDown size={30} />
                                                )}
                                                <div className="">Result Details</div>
                                            </div>
                                        </div>
                                        {resultDetailsOpen && (
                                            <div className="px-3 border-x-2 border-b-2 rounded-b-lg">
                                                <div className="pt-4 ">
                                                    Verdict:{' '}
                                                    <span className="text-red-500">
                                                        {e.resultDetails.verdict}
                                                    </span>
                                                </div>
                                                <div className="pt-4 ">
                                                    Compile Output:{' '}
                                                    <span className="text-green-500">
                                                        {e.resultDetails.compileOutput}
                                                    </span>
                                                </div>
                                                <div className="pt-4 ">
                                                    stdout:{' '}
                                                    <span className="text-green-500">
                                                        {e.resultDetails.stdout}
                                                    </span>
                                                </div>
                                                <div className="pt-4 ">
                                                    stderr:{' '}
                                                    <span className="text-red-500">
                                                        {e.resultDetails.stderr}
                                                    </span>
                                                </div>
                                                <div className="py-4">
                                                    Message: <span>{e.resultDetails.message}</span>
                                                </div>

                                                <div className="flex justify-between items-center mb-5">
                                                    <div className="pl-6 flex gap-2 items-center">
                                                        <div className="">Runtime: </div>
                                                        <img
                                                            src={laptop}
                                                            alt="no-img"
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                    <div className="pr-6 flex gap-2 items-center">
                                                        <div className="">Memory: </div>
                                                        <img
                                                            src={memory}
                                                            alt="no-img"
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Coding;
