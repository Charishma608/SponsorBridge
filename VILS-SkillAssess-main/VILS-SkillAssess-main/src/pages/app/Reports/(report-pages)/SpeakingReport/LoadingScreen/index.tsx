// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-screen">
                <div className="w-full h-full flex flex-col">
                    <div className="shadow-light py-9 ps-8 relative">
                        <Skeleton circle={true} className="w-10 h-10" />
                        <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Skeleton count={2} className="w-52" />
                        </div>
                    </div>

                    <div className="flex h-[87vh] relative gap-2">
                        <div className="h-full w-[70%] flex flex-col gap-3 overflow-y-scroll">
                            <div className="flex gap-2">
                                <Skeleton containerClassName="flex-1" className="h-10" />
                            </div>

                            <div>
                                <Skeleton className="w-full h-[100px]" />
                            </div>

                            <div>
                                <Skeleton className="w-full h-[300px]" />
                            </div>

                            <div>
                                <Skeleton className="w-full h-[300px]" />
                            </div>

                            <div>
                                <Skeleton className="w-full h-[300px]" />
                            </div>

                            <div>
                                <Skeleton className="w-full h-[300px]" />
                            </div>
                        </div>
                        <div className="w-[30%]">
                            <Skeleton className="h-full w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
