interface DetailedAnalyticsContainerProps {
    data: any;
}

const DetailedAnalyticsContainer: React.FC<DetailedAnalyticsContainerProps> = ({ data }) => {
    if (!data) return null;
    return (
        <div className="flex flex-col gap-4">
            <p className="text-primary text-xl font-semibold">Tags</p>
            {data?.map((section: any, index: number) => (
                <DataBox key={index} label={section?.name} value={section?.score} />
            ))}
        </div>
    );
};

interface DataBoxProps {
    label: string;
    value: number;
    className?: string;
}

const DataBox: React.FC<DataBoxProps> = ({ label, value, className }) => {
    const getColor = (value = 0) => {
        if (value <= 40) return '#FC6736';
        else if (value <= 70) return '#40A2D8';
        return '#39D389';
    };

    return (
        <div className="flex items-center">
            <p className="w-1/4 font-inter">{label}</p>
            <div className="bg-slate-200 rounded-full w-3/4 h-6 overflow-hidden relative">
                <div
                    className="rounded-full absolute top-0 left-0 h-full"
                    style={{
                        width: value + '%',
                        background: getColor(value),
                    }}
                ></div>
                <p
                    style={{ left: value + '%' }}
                    className="font-inter text-sm absolute top-1/2 -translate-y-1/2 ps-2"
                >
                    {value}%
                </p>
            </div>
        </div>
    );
};

export default DetailedAnalyticsContainer;
