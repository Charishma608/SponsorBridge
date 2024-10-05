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
}

const DropDown: React.FC<DropDownProps> = ({
    label,
    tooltip,
    tooltipPosition = 'top',
    children,
}) => {
    const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(true);

    const toggleDropDown = () => {
        setIsDropDownOpened((prev) => !prev);
    };

    return (
        <div className="rounded-md text-sm shadow-light border-[1px] border-primary">
            <div
                className={`py-3 px-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer text-primary`}
                onClick={toggleDropDown}
            >
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    <p className="font-semibold">{label}</p>
                    {tooltip && tooltip.length > 0 ? (
                        <TooltipComp label={tooltip} position={tooltipPosition} />
                    ) : null}
                </div>
                {isDropDownOpened ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div
                className={`${
                    isDropDownOpened
                        ? 'h-full py-3 px-4 text-sm border-t-[1.5px] border-gray-300'
                        : 'h-0'
                } transition-all duration-100 overflow-hidden text-xs`}
            >
                {children}
            </div>
        </div>
    );
};

export default DropDown;
