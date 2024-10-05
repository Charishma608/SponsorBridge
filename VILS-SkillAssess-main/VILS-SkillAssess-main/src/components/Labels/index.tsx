const Labels = () => {
    return (
        <div className="w-fit flex-wrap justify-end flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm">
                <div className="h-4 min-w-4 rounded-full bg-[#39D389]" />
                <p>Proficient</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <div className="h-4 min-w-4 rounded-full bg-[#40A2D8]" />
                <p>Good</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <div className="h-4 min-w-4 rounded-full bg-[#FC6736]" />
                <p>Scope for Improvement</p>
            </div>
        </div>
    );
};

export default Labels;
