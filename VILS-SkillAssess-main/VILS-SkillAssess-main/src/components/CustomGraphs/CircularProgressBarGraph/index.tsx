// Utilities
import { cn } from 'utils/helper';

// External Imports
import { FaArrowRight } from 'react-icons/fa6';

interface CircularProgressBarGraphProps {
    value: number;
    size?: number;
    radius?: number;
    strokeWidth?: number;
    label?: string;
    labelClassName?: string;
    labelShow?: boolean;
    arrowShow?: boolean;
    color?: string;
}

const CircularProgressBarGraph: React.FC<CircularProgressBarGraphProps> = ({
    value = 0,
    size = window.screen.width < 1000 ? 165 : 180,
    radius = window.screen.width < 1000 ? 65 : 75,
    label = '',
    labelClassName = '',
    labelShow = true,
    arrowShow = true,
    strokeWidth = 25,
    color = null,
}) => {
    const cx = size / 2;
    const strokeDashArray = 2 * Math.PI * radius;
    const strokeDashOffset = strokeDashArray - (strokeDashArray * value) / 100;

    const fill = value >= 80 ? '#39D389' : value >= 60 ? '#40A2D8' : '#FC6736';

    return (
        <div className="relative w-fit">
            {arrowShow ? (
                <FaArrowRight
                    className={`absolute left-1/2 -translate-x-1/2 ${
                        window.screen.width < 1000 ? 'top-[5px]' : 'top-[2px]'
                    } ml-1  z-10 text-white text-sm font-light`}
                    style={{
                        height: strokeWidth,
                    }}
                />
            ) : null}
            <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`} className="relative">
                <circle
                    cx={cx}
                    cy={cx}
                    strokeWidth={strokeWidth}
                    r={radius}
                    className={`fill-none`}
                    style={{
                        stroke: color ? color : fill,
                        opacity: 0.4,
                    }}
                />
                <circle
                    cx={cx}
                    cy={cx}
                    strokeWidth={strokeWidth}
                    r={radius}
                    className={`fill-none`}
                    style={{
                        strokeDasharray: strokeDashArray,
                        strokeDashoffset: strokeDashOffset,
                        stroke: color ? color : fill,
                    }}
                    transform={`rotate(-90 ${cx} ${cx})`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {labelShow && (
                    <text
                        x={'50%'}
                        y={'50%'}
                        dy={'0.3em'}
                        textAnchor="middle"
                        className={cn('text-4xl font-semibold', labelClassName)}
                    >
                        {label ? label : value}
                    </text>
                )}
            </svg>
        </div>
    );
};

export default CircularProgressBarGraph;
