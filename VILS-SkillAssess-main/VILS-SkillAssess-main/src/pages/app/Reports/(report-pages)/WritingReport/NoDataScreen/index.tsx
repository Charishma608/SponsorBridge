const NoDataScreen = () => {
    return (
        <div className="h-screen w-full grid place-content-center">
            <div className="w-2/3 m-auto">
                <h3 className="font-semibold">Uh, oh report doesn't exists</h3>
                <p className="text-sm mt-2">
                    Oops, the report you're looking for isn't available. It's possible that the
                    report hasn't been generated yet or there's been an error.
                </p>
            </div>
        </div>
    );
};

export default NoDataScreen;
