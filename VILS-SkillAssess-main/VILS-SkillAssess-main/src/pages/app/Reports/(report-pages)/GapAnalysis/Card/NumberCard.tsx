import React from 'react';

interface NumberCardProps {
    icon: any;
    label: string;
    value: number;
    toggleModal: () => void;
    data?: any[];
}

const NumberCard: React.FC<NumberCardProps> = ({ icon, label, value, toggleModal }) => {
    const Icon = icon;
    return (
        <div>
            <div className="text-[#0C446E]  bg-[#F7FAFD] p-3 rounded-md">
                <div className="p-1">
                    <Icon />
                </div>

                <div className="text-xs my-4 text-black">{label}</div>
                <div className=" flex justify-between">
                    <span className="text-2xl font-bold">{value}</span>
                    <div className="flex  text-xs items-end text-primary cursor-pointer">
                        {/* <div className="flex gap-2 items-center">
                            <span onClick={toggleModal}>See More</span> <FaAngleRight />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberCard;
