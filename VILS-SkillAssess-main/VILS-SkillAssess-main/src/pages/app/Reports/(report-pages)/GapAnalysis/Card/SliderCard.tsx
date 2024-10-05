import React from 'react';
// import { FaAngleRight } from 'react-icons/fa';
import RangeBar from './RangeBar';
import { RiRectangleFill } from 'react-icons/ri';

interface NumberCardProps {
    icon: any;
    label: string;
    min: number;
    max: number;
    avg: number;
    st: number;
    toggleModal?: () => void;
}

const SliderCard: React.FC<NumberCardProps> = ({ icon, label, min, max, toggleModal, avg, st }) => {
    const Icon = icon;
    return (
        <div>
            <div className="text-[#0C446E]  bg-[#F7FAFD] p-3 rounded-md w-full">
                <div className="p-1 flex justify-between items-center">
                    <Icon />
                    <div className=" flex gap-1 text-xs items-center">
                        <RiRectangleFill color="#0280D4" width={30} height={5} />{' '}
                        <div className="">Your Score</div>
                    </div>
                </div>

                <div className="text-xs my-4 text-black">{label}</div>
                <div className="">
                    <RangeBar max={max} min={min} mid={avg} />
                </div>

                <div className="flex justify-between  text-xs  text-primary cursor-pointer">
                    <div className="text-black mt-4">Industry Standard: {st}</div>
                    {/* <div className="flex gap-2 items-center">
                        <span onClick={toggleModal}>See More</span> <FaAngleRight />
                    </div> */}
                </div>
                {/* <div className=" flex justify-end items-center">
                    <div className="flex items-center gap-4">
                        <Label label="Lowest Score" bgColor="bg-red" />
                        <Label label="Average Score" bgColor="bg-[#FF961B]" />
                       
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SliderCard;
