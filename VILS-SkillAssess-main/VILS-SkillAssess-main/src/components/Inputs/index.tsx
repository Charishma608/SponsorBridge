// Internal Imports
import { useState } from 'react';

// Utils
import { cn } from 'utils/helper';

// External Imports
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    setValue?: (value: string) => void;
    eye?: boolean;
}

/**
 * Input component for handling text input.
 * @param {InputProps} props - The input component properties.
 * @returns {JSX.Element} - The rendered Input component.
 */
const Input: React.FC<InputProps> = ({ value = '', setValue = () => {}, eye = false, ...rest }) => {
    const [visible, setVisible] = useState(false);
    const { className, ...restProps } = rest;

    /**
     * Handle input change event.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleVisibility = () => {
        setVisible((prev) => !prev);
    };

    return (
        <div className="relative">
            <input
                className={cn(
                    `w-full rounded-3xl px-4 py-2 outline-primary border-gray-400 border-[1.5px] flex items-center text-sm ${className}`,
                )}
                value={value}
                onChange={handleChange}
                {...restProps}
                type={
                    eye
                        ? visible
                            ? restProps?.type
                                ? restProps.type === 'password'
                                    ? 'text'
                                    : restProps.type
                                : 'text'
                            : 'password'
                        : restProps?.type
                        ? restProps.type
                        : 'text'
                }
            />
            {eye ? (
                visible ? (
                    <button
                        type='button'
                        onClick={handleVisibility}
                        className="w-5 absolute right-4 top-1/2 -translate-y-2/4 cursor-pointer"
                    >
                        <FiEye />
                    </button>
                ) : (
                    <button
                        type='button'
                        onClick={handleVisibility}
                        className="w-5 absolute right-4 top-1/2 -translate-y-2/4 cursor-pointer"
                    >
                        <FiEyeOff />
                    </button>
                )
            ) : null}
        </div>
    );
};

export default Input;
