const NoDataScreen = () => {
    return (
        <div className="w-full min-h-[50vh] grid place-content-center">
            <div className="flex gap-2 flex-col justify-center items-start">
                <span className="text-7xl m-auto">🐳</span>
                <p className="font-inter text-dark">Uh, oh, nothing to show here!</p>
            </div>
        </div>
    );
};

export default NoDataScreen;
