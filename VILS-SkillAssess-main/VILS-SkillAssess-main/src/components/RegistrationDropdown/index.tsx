// Internal Imports
import { useState } from 'react';

// External Imports
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import TooltipComp from '../Tooltip';

interface DropDownProps {
    label: string;
    tooltip?: string;
    tooltipPosition?:
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight'
        | 'leftTop'
        | 'leftBottom'
        | 'rightTop'
        | 'rightBottom';
    children?: React.ReactNode;
    data: string[];
    onClickHandler: (e: string) => void;
    other?: boolean;
}

const RegistrationDropDown: React.FC<DropDownProps> = ({
    label,
    tooltip,
    tooltipPosition = 'top',
    data,
    onClickHandler,
    other,
}) => {
    const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);
    const [currLabel, setCurrLabel] = useState(label);
    const [isOpenField, setIsOpenField] = useState<boolean>(false);

    const toggleDropDown = () => {
        setIsDropDownOpened((prev) => !prev);
    };

    const handleClick = (e: string) => {
        setCurrLabel(e);
        setIsDropDownOpened(false);
        setIsOpenField(false);
        onClickHandler(e);
    };

    if (other) {
        const handleClick2 = (e: string) => {
            setCurrLabel(e);
            setIsDropDownOpened(false);
            if (e === 'Other') {
                setIsOpenField(true);
            } else {
                onClickHandler(e);
                setIsOpenField(false);
            }
        };
        const otherFieldHandler = (e: string) => {
            if (isOpenField) {
                onClickHandler(e);
            }
        };
        return (
            <div className=" text-sm border-[#DFE4EF] border-2 ">
                <div
                    className={`flex flex-wrap items-center justify-between gap-3 cursor-pointer px-4 py-2`}
                    onClick={toggleDropDown}
                >
                    <div className="flex flex-wrap items-center gap-2 justify-end">
                        <p className="">{currLabel}</p>
                        {tooltip && tooltip.length > 0 ? (
                            <TooltipComp label={tooltip} position={tooltipPosition} />
                        ) : null}
                    </div>
                    {!isDropDownOpened ? <FaChevronDown /> : <FaChevronUp />}
                </div>
                <div
                    className={`${
                        isDropDownOpened
                            ? 'h-full  text-sm border-t-[1.5px] border-[#DFE4EF] '
                            : 'h-0'
                    } transition-all duration-100 overflow-hidden text-xs max-h-28 overflow-y-scroll `}
                >
                    {data.map((e) => {
                        return (
                            <div className="px-3 py-1 text-sm" onClick={() => handleClick2(e)}>
                                {e}
                            </div>
                        );
                    })}
                </div>
                {isOpenField && (
                    <div className="">
                        <input
                            type="text"
                            className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                            onChange={(e) => {
                                otherFieldHandler(e.target.value);
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className=" text-sm border-[#DFE4EF] border-2 ">
            <div
                className={`flex flex-wrap items-center justify-between gap-3 cursor-pointer px-4 py-2 `}
                onClick={toggleDropDown}
            >
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    <p className="">{currLabel}</p>
                    {tooltip && tooltip.length > 0 ? (
                        <TooltipComp label={tooltip} position={tooltipPosition} />
                    ) : null}
                </div>
                {!isDropDownOpened ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div
                className={`${
                    isDropDownOpened
                        ? 'max-h-28  text-sm border-t-[1.5px] border-[#DFE4EF] '
                        : 'h-0'
                } transition-all duration-100 overflow-hidden text-xs  overflow-y-scroll absolute z-20 bg-white w-[40%] `}
            >
                {data.map((e) => {
                    return (
                        <div
                            className="px-3 py-1 text-sm cursor-pointer border-[1px] border-[#DFE4EF]"
                            onClick={() => handleClick(e)}
                        >
                            {e}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RegistrationDropDown;
