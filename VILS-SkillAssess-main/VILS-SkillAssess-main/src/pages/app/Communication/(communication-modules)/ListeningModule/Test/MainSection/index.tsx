// Internal Imports
import { useRef, useState } from 'react';

// External Imports
import { IoVolumeHigh } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { GrLinkPrevious } from 'react-icons/gr';

// Hooks
import { useTestContext } from '../TestProvider';
import MCQComponent from '../MCQComponent';
import FillInTheBlankComponent from '../FillInTheBlankComponent';

const MainSection = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isNotesOpened, setIsNotesOpened] = useState<boolean>(true);

    const { data } = useTestContext();

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = parseFloat(event.target.value);
        }
    };

    const toggleNotes = () => {
        setIsNotesOpened((prev) => !prev);
    };

    return (
        <div className="hidden md:flex flex-col gap-3 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
                <p>Listen the following audio carefully and answer the questions</p>
                <div className="flex items-center gap-2 shadow-light py-2 px-4 rounded-3xl my-[1px] me-[1px]">
                    <IoVolumeHigh />
                    <input
                        type="range"
                        id="volumeControl"
                        min="0"
                        max="1"
                        step="0.01"
                        defaultValue="1"
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
            <div className="rounded-md border-[1.5px] border-gray-300 flex-1 flex relative overflow-y-scroll overflow-x-hidden">
                {!isNotesOpened && (
                    <button
                        onClick={toggleNotes}
                        className="absolute flex items-center gap-2 -right-[10px] top-4 p-2 px-4 rounded-bl-md -translate-x-1 font-intertext-sm"
                    >
                        <GrLinkPrevious />
                    </button>
                )}
                <div className="h-full flex-1 p-4 flex flex-col gap-6 overflow-y-scroll scroll">
                    {window.screen.width >= 750 && (
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
                    {data?.sections?.map((section: any, sectionIndex: number) => {
                        return (
                            <div key={section?.id}>
                                <div className="rounded-md bg-slate-100 py-2 px-4 font-semibold mb-4">
                                    {section?.title}
                                </div>
                                <div className="flex flex-col gap-5">
                                    {section?.questions?.map((question: any, index: number) => {
                                        const qn = sectionIndex * 10 + index + 1;

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
                                    })}
                                </div>
                            </div>
                        );

                        // if (question?.format === 'radio') {
                        //     return (
                        //         <div key={index}>
                        //             {showHeader && (
                        //
                        //             )}

                        //         </div>
                        //     );
                    })}
                </div>
                <div
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
                </div>
            </div>
        </div>
    );
};

export default MainSection;
