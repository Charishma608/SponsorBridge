interface RangeBarProps {
    min: number;
    max: number;
    mid: number;
}

const RangeBar: React.FC<RangeBarProps> = ({ min, max, mid }) => {
    const validateValue = (value: number) => {
        if (value < 0) return 0;
        if (value > 100) return 100;
        return value;
    };

    const start = validateValue(min);
    const end = validateValue(max);

    return (
        <div className="mb-2">
            <div className="relative h-2 w-[200px] bg-gray-200 rounded-full flex">
                <div
                    className="h-2 bg-transparent rounded-l-full"
                    style={{
                        width: `${start}%`,
                    }}
                ></div>
                <div
                    className="h-2 bg-[#0280D4] rounded-l-full"
                    style={{
                        width: `${mid - start}%`,
                    }}
                ></div>
                <div
                    className="h-2 bg-[#0280D4] rounded-r-full"
                    style={{
                        width: `${end - mid}%`,
                    }}
                ></div>
                <div
                    className="h-2 bg-transparent"
                    style={{
                        width: `${100 - end}%`,
                    }}
                ></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-700">
                <div
                    className="h-2 "
                    style={{
                        width: `${start}%`,
                    }}
                ></div>
                <div
                    className="h-2 "
                    style={{
                        width: `${mid - start}%`,
                    }}
                >
                    {start}
                </div>

                <div
                    className="h-2 "
                    style={{
                        width: `${end - mid}%`,
                    }}
                >
                    {mid}
                </div>
                <div
                    className="h-2"
                    style={{
                        width: `${100 - end}%`,
                    }}
                >
                    {end}
                </div>
            </div>
        </div>
    );
};

export default RangeBar;
