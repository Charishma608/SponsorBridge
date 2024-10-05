import Logo from 'assets/svgs/Logo.svg';
import { FaAngleDown, FaAngleUp, FaRegClock } from 'react-icons/fa';
import { useTestContext } from '../TestProvider';
import { cn } from 'utils/helper';
import { useState } from 'react';

const MobileSidebar = () => {
    const { timer, solutions, data, setCurrentQuestionIndex } = useTestContext();
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

    const isSolved = (id: string) => {
        const solution = solutions?.find((sol: any) => sol.id === id) || undefined;
        if (solution) return true;
        return false;
    };
    const [isOpenNavigation, setIsOpenNavigation] = useState<boolean>(false);

    return (
        <div className="h-full md:w-1/3 w-full border-[1.5px] border-gray-300 rounded-md   md:flex flex-col justify-between">
            <div>
                <div
                    className="p-4 flex justify-between items-center w-full shadow-md "
                    onClick={() => setIsOpenNavigation(!isOpenNavigation)}
                >
                    <div className="">
                        <p className="font-semibold">Overview</p>
                    </div>
                    <div className="flex justify-center items-center">
                        {isOpenNavigation ? <FaAngleUp size={30} /> : <FaAngleDown size={30} />}
                    </div>
                </div>

                {isOpenNavigation && (
                    <>
                        <div className="p-4">
                            <div className="mt-6">
                                <p className="text-lg font-semibold">Overview</p>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded bg-primary"></div>
                                        <p>Answered</p>
                                    </div>
                                    <p>{solutions?.length}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded border-[1.5px] border-primary"></div>
                                        <p>Unanswered</p>
                                    </div>
                                    <p>{data?.questions?.length - solutions?.length}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-8">
                                {data?.questions?.map((question: any, index: number) => (
                                    <button
                                        className={cn(
                                            'h-8 w-8 rounded border-[1.5px] border-primary text-primary grid place-content-center',
                                            isSolved(question?.id) && 'bg-primary text-white',
                                        )}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="text-center font-semibold text-md">
                            All the best for your test
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileSidebar;
