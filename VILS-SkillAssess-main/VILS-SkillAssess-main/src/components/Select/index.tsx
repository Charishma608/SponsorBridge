// Internal Imports
import React, { useState } from 'react';

// External Imports
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

// Utils
import { cn } from 'utils/helper';

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
    options: string[];
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    placeHolder?: string;
    classWidth?: string;
}

const Selector: React.FC<SelectProps> = ({
    options,
    value = '',
    setValue = () => {},
    placeHolder = '',
    classWidth = '',
    ...rest
}) => {
    const { className, ...restProps } = rest;
    const [visible, setVisible] = useState<boolean>(false);

    // function for handling single selects
    const handleSelect = (select: string) => {
        setValue(select);
        setVisible(false);
    };

    return (
        <div className={cn('w-full', classWidth)} {...restProps}>
            <div
                className={cn(
                    `flex items-center gap-4 border-[1px] px-4 py-2 border-primary-grey rounded-full cursor-pointer justify-between`,
                    className,
                    `${visible ? 'border-b-0 rounded-md rounded-b-none' : ''} `,
                )}
                onClick={() => setVisible((prev) => !prev)}
            >
                <p className="text-sm">{value === '' ? placeHolder : value}</p>
                {visible ? (
                    <IoIosArrowUp className="w-5 h-5" />
                ) : (
                    <IoIosArrowDown className="w-5 h-5" />
                )}
            </div>
            {visible ? (
                <div className="relative z-50">
                    <div
                        className={`${
                            visible ? 'rounded-t-none' : ''
                        } z-10 absolute w-full bg-white rounded-md border-primary-grey border-[1px] shadow-xl border-l-[#9ca3af] border-r-[#9ca3af] border-b-[#9ca3af]`}
                    >
                        {options.map((option, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${
                                        index !== options.length - 1
                                            ? 'border-b-[1px]'
                                            : 'border-transparent'
                                    } flex items-center justify-start gap-2 px-4 py-2 cursor-pointer hover:border-primary border-[1px] border-transparent ${
                                        index === options.length - 1 ? 'rounded-b' : ''
                                    }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    <p className="text-sm">{option}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Selector;
