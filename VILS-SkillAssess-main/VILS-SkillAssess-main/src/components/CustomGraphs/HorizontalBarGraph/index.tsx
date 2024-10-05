interface HorizontalBarGraphProps {
    value: number;
}

const HorizontalBarGraph: React.FC<HorizontalBarGraphProps> = ({ value = 0 }) => {
    return (
        <div className="flex-1 text-xs h-3 rounded-3xl border-[1px] border-[#09C7B8]">
            <div
                className="h-full rounded-3xl flex justify-end items-center shadow-md"
                style={{
                    background: 'linear-gradient(90deg, #0280D4 0%, #0ADAB0 113.36%)',
                    width: `${value}%`,
                }}
            >
                <div className="bg-white rounded-full h-5 w-5 text-primary border-gray-200 border-[1px] text-[8px] grid place-content-center cursor-pointer hover:scale-125 delay-75">
                    <p>{value}</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalBarGraph;
