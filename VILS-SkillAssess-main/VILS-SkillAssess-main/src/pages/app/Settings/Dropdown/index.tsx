import { ChangeEvent, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface DropDownProps {
    data?: any[];
    valueHeading?: string;
    heading: string;
    onClickHandler: (e: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ data, heading, onClickHandler, valueHeading }) => {
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (inputValue === '') {
            setFilteredData(data);
        } else {
            const lowerCaseInput = inputValue.toLowerCase();
            setFilteredData(data?.filter((d) => d.toLowerCase().includes(lowerCaseInput)));
        }
    }, [inputValue, data, heading]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleSelect = (e: string) => {
        onClickHandler(e);
        setInputValue('');
        setToggleDropDown(false);
    };
    return (
        <div className=" text-sm border-[#DFE4EF] border-2 relative">
            <div
                className={`flex flex-wrap items-center justify-between gap-3 cursor-pointer px-4 py-2`}
                onClick={() => setToggleDropDown(!toggleDropDown)}
            >
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    {valueHeading ? <p>{valueHeading}</p> : <p className="">{heading}</p>}
                </div>
                {!toggleDropDown ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div className="absolute z-20 w-full">
                <div
                    className={`${
                        toggleDropDown
                            ? 'h-full  text-sm border-x-[1.5px] border-t-[1.5px] border-[#DFE4EF] '
                            : 'h-0'
                    } transition-all duration-100 overflow-hidden text-xs  `}
                >
                    <input
                        className=" py-1 text-sm cursor-pointer pl-3   "
                        value={inputValue}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div
                    className={`${
                        toggleDropDown
                            ? 'max-h-28  text-sm border-t-[1.5px] border-[#DFE4EF] '
                            : 'h-0'
                    } transition-all duration-100 overflow-hidden text-xs  overflow-y-scroll  bg-white `}
                >
                    {filteredData?.map((e) => {
                        return (
                            <div
                                className="px-3 py-1 text-sm cursor-pointer border-[1px] border-[#DFE4EF]"
                                onClick={() => {
                                    handleSelect(e);
                                }}
                            >
                                {e}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DropDown;
