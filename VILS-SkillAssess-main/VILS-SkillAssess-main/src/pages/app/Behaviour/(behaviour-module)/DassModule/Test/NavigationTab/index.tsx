// Assets
import Logo from 'assets/svgs/Logo.svg';

// External Imports
import { LuAlarmClock } from 'react-icons/lu';

// Internal Import
import { useEffect } from 'react';

// Hooks
import { useTestContext } from '../TestProvider';

const NavigationTab = () => {
    const { startTimer, timer, totalQuestion, solutions, data } = useTestContext();

    const formatTime = (seconds: number, format: string = 'Mins-Secs') => {
        if (format === 'Mins-Secs') {
            const mins = Math.floor(seconds / 60);
            const remainingSecs = seconds % 60;

            const minsString = mins > 0 ? `${mins} Min${mins !== 1 ? 's' : ''}` : '';
            const secsString =
                remainingSecs > 0 ? `${remainingSecs} Sec${remainingSecs !== 1 ? 's' : ''}` : '';

            return `${minsString}${mins > 0 && remainingSecs > 0 ? ' ' : ''}${secsString}`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const sec = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                sec,
            ).padStart(2, '0')}`;
        }
    };

    const checkIfAnswered = (index: number) => {
        const questionId = data?.questions[index]?.question_id;
        const sol =
            solutions.filter((solution: any) => {
                return solution.question_id === questionId;
            }) || [];

        return sol.length > 0;
    };

    useEffect(() => {
        startTimer();
    }, [startTimer]);

    return (
        <div className="h-full w-1/3 border-[1.5px] border-gray-300 rounded-md p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 justify-between">
                    <div>
                        <div className="grid place-content-center border-[1.5px] border-primary rounded-full h-10 w-10">
                            <LuAlarmClock className="text-xl" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm">Time Remaining : {formatTime(timer)}</p>
                    </div>
                    <div>
                        <img src={Logo} className="h-10 w-10" alt="logo" />
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                    <p className="font-semibold">Overview</p>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 bg-primary rounded" />
                                <p>Answered</p>
                            </div>
                            <p>{solutions?.length}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 border-primary border-[1.5px] rounded" />
                                <p>Unanswered</p>
                            </div>
                            <p>{totalQuestion - solutions?.length}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                    {new Array(totalQuestion).fill(0).map((_, index: number) => {
                        return (
                            <div
                                key={index}
                                className={`h-6 w-6 grid place-content-center rounded ${
                                    checkIfAnswered(index)
                                        ? 'bg-primary text-white'
                                        : 'border-[1.5px] border-primary text-primary'
                                }`}
                            >
                                <p className="text-xs">{index + 1}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <p className="text-sm font-semibold mt-20">
                Note : You need to answer all the questions to submit this test.
            </p>
        </div>
    );
};

export default NavigationTab;
