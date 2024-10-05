// Internal Imports
import { useState } from 'react';

// Utils
import { cn } from 'utils/helper';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    setValue?: (value: string) => void;
}

/**
 * Input component for handling text input.
 * @param {InputProps} props - The input component properties.
 * @returns {JSX.Element} - The rendered Input component.
 */
const NAInput: React.FC<InputProps> = ({ value = '', setValue = () => {}, ...rest }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleRadioChange = () => {
        setIsDisabled(!isDisabled);
        if (!isDisabled) {
            setValue('Not Applicable');
        } else {
            setValue('');
        }
    };

    const { className, ...restProps } = rest;

    /**
     * Handle input change event.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isDisabled) {
            setValue(e.target.value);
        }
    };

    return (
        <div className="relative">
            <input
                className={cn(
                    `w-full px-4 py-2 outline-primary border-gray-400 border-[1.5px] flex items-center text-sm ${className}`,
                )}
                value={value}
                onChange={handleChange}
                {...restProps}
                type="text"
                disabled={isDisabled}
            />
            <div className="w-10 absolute right-4 top-1/2 -translate-y-2/4 cursor-pointer flex items-center gap-1 z-40">
                <input
                    type="checkbox"
                    className="appearance-none w-3 h-3 border border-gray-400 rounded-full checked:bg-black  focus:outline-none"
                    checked={isDisabled}
                    onChange={handleRadioChange}
                ></input>
                <div className="">NA</div>
            </div>
        </div>
    );
};

export default NAInput;
