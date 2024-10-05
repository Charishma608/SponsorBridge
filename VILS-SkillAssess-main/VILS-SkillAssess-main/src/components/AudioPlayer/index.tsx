// Internal Imports
import { useState } from 'react';

// External Imports
import { FaPlay, FaPause } from 'react-icons/fa6';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import { TfiLoop } from 'react-icons/tfi';
import { IoInformation } from 'react-icons/io5';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <div className="w-full bg-white rounded-md flex flex-col gap-4  shadow-light overflow-hidden p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <p>0:00</p>
                    <p>3:56</p>
                </div>
                <div className="h-[5px] bg-gray-300 rounded-3xl">
                    <div className="w-2/3 h-full bg-primary relative rounded-3xl">
                        <div className="h-4 w-4 bg-primary rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
                    </div>
                </div>
            </div>
            <div className="flex items-center text-xl justify-between text-gray-900">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-100 h-8 w-8 rounded-full grid place-content-center">
                        <TfiLoop />
                    </button>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <button className="bg-gray-100 h-8 w-8 rounded-full grid place-content-center">
                        <BsArrowCounterclockwise />
                    </button>
                    <button
                        onClick={() => {
                            setIsPlaying((prev) => !prev);
                        }}
                        className="bg-primary text-white h-10 w-10 rounded-full grid place-content-center"
                    >
                        {isPlaying ? <FaPause /> : <FaPlay className="pl-1" />}
                    </button>
                    <button className="bg-gray-100 h-8 w-8 rounded-full grid place-content-center">
                        <BsArrowClockwise />
                    </button>
                </div>
                <div>
                    <button className="bg-gray-100 h-8 w-8 rounded-full grid place-content-center">
                        <IoInformation />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
