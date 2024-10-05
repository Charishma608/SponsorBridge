// Utils
import { cn } from 'utils/helper';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: (value: string) => void;
    Icon?: JSX.Element;
    iconComponent: boolean;
    src?: string;
}

const InputWithIcon: React.FC<Props> = ({
    value = '',
    setValue = () => {},
    Icon,
    iconComponent,
    src,
    ...rest
}) => {
    const { className, ...restProps } = rest;

    return (
        <div className="relative">
            <input
                type="text"
                className={cn(
                    `w-full rounded-3xl px-4 py-2 outline-none focus:border-blue-600 border-gray-400 border-2 flex items-center text-sm ${className} pl-10`,
                )}
                onChange={(e) => setValue(e.target.value)}
                {...restProps}
            />
            {iconComponent ? (
                <div className="w-5 absolute left-4 top-1/2 -translate-y-1/2">{Icon}</div>
            ) : (
                <img
                    src={src}
                    className="w-5 absolute left-4 top-1/2 -translate-y-1/2"
                    alt="icon"
                />
            )}
        </div>
    );
};

export default InputWithIcon;
