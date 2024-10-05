// Internal Imports
import { useEffect, useRef, useState } from 'react';

// External Imports
import { IoVolumeHigh } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { GrLinkPrevious } from 'react-icons/gr';

// Hooks
import { useTestContext } from '../TestProvider';
import MCQComponent from '../MCQComponent';
import FillInTheBlankComponent from '../FillInTheBlankComponent';

const MainSectionMobile = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isNotesOpened, setIsNotesOpened] = useState<boolean>(true);

    const { data, startTimer, timer } = useTestContext();
    const sections = data?.sections;
    const [sectionNumber, setSectionNumber] = useState(0);

    const nextSection = () => {
        if (sectionNumber === sections.length - 1) return;
        setSectionNumber(sectionNumber + 1);

        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = parseFloat(event.target.value);
        }
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        startTimer();
    }, [startTimer]);

    const toggleNotes = () => {
        setIsNotesOpened((prev) => !prev);
    };
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
    return (
        <>
            <div className="flex md:hidden items-center justify-between">
                <div className="text-primary text-xl">Section {sectionNumber + 1}</div>
                <div className="flex items-center gap-2 shadow-lg py-3 px-3 rounded-full">
                    <IoVolumeHigh />
                    {/* <input
                        type="range"
                        id="volumeControl"
                        min="0"
                        max="1"
                        step="0.01"
                        defaultValue="1"
                        onChange={handleVolumeChange}
                    /> */}
                </div>
            </div>
            <div className="md:hidden flex flex-col gap-3 flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                    <div className="">Passage</div>
                    <div className="text-gray-600"> Remaining Time : {formatTime(timer)}</div>
                </div>
                <div className="flex justify-between items-center">
                    <p>Listen the following audio carefully and answer the questions</p>
                </div>
                <div className="rounded-md  border-gray-300 flex-1 flex flex-col relative overflow-y-scroll overflow-x-hidden">
                    {!isNotesOpened && (
                        <button
                            onClick={toggleNotes}
                            className="absolute flex items-center gap-2 -right-[10px] top-4 p-2 px-4 rounded-bl-md -translate-x-1 font-intertext-sm"
                        >
                            <GrLinkPrevious />
                        </button>
                    )}
                    <div
                        ref={containerRef}
                        className="h-full flex-1  flex flex-col gap-6 overflow-y-scroll scroll"
                    >
                        {window.screen.width < 750 && (
                            <audio
                                ref={audioRef}
                                src={data?.audio_url}
                                autoPlay
                                controls
                                onPlay={(e) => {
                                    const audioElement = e.target as HTMLAudioElement;
                                    if (audioElement) {
                                        audioElement.controls = false;
                                    }
                                }}
                                onPause={(e) => {
                                    const audioElement = e.target as HTMLAudioElement;
                                    if (audioElement) {
                                        audioElement.controls = false;
                                    }
                                }}
                                className="hidden"
                            />
                        )}
                        {/* {data?.sections?.map((section: any, sectionIndex: number) => {
                        return ( */}
                        <div key={sections[sectionNumber]?.id}>
                            <div className="rounded-md bg-slate-100 py-2 px-4 font-semibold mb-4">
                                {sections[sectionNumber]?.title}
                            </div>
                            <div className="flex flex-col gap-5">
                                {sections[sectionNumber]?.questions?.map(
                                    (question: any, index: number) => {
                                        const qn = sectionNumber * 10 + index + 1;

                                        if (question?.type === 'radio') {
                                            return (
                                                <MCQComponent
                                                    id={question?.id}
                                                    questionNumber={qn}
                                                    data={question}
                                                    key={question?.id}
                                                />
                                            );
                                        } else if (question?.type === 'text') {
                                            return (
                                                <FillInTheBlankComponent
                                                    id={qn}
                                                    data={question}
                                                    key={question?.id}
                                                />
                                            );
                                        } else return null;
                                    },
                                )}
                            </div>
                        </div>

                        {/* );

                        // if (question?.format === 'radio') {
                        //     return (
                        //         <div key={index}>
                        //             {showHeader && (
                        //
                        //             )}

                        //         </div>
                        //     );
                    })} */}
                    </div>
                    {/* <div
                    className={`h-full px-4 py-2 flex flex-col transform-all duration-300 overflow-hidden ${
                        isNotesOpened ? 'border-l-[1.5px] border-gray-300 w-2/5' : 'w-0'
                    }`}
                >
                    {isNotesOpened && (
                        <div className="flex items-center justify-between">
                            <p className="w-full font-inter">Notes</p>
                            <button onClick={toggleNotes}>
                                <IoMdClose className="text-lg" />
                            </button>
                        </div>
                    )}
                    <div className="flex-1">
                        <textarea
                            className="resize-none text-sm mt-2 h-full w-full outline-none border-none font-inter"
                            placeholder="Take you notes here ..."
                        />
                    </div>
                </div> */}
                </div>
                {sectionNumber < sections.length - 1 && (
                    <div className="w-full flex items-center justify-center">
                        <div
                            className="w-[50%] py-2 rounded-full bg-primary text-white flex items-center justify-center"
                            onClick={nextSection}
                        >
                            Next Section
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MainSectionMobile;
