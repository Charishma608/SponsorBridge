// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-screen flex flex-col">
                <div className="w-full flex flex-col">
                    <div className="shadow-light py-4 ps-8 relative">
                        <Skeleton circle={true} className="w-10 h-10" />
                        <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Skeleton count={2} className="w-52" />
                        </div>
                    </div>
                </div>
                <div className="mt-[1px]">
                    <div className="py-4 grid">
                        <div className="flex justify-center gap-2">
                            <Skeleton className="w-72 h-10 rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 ps-8 pe-4 flex-1">
                        <div>
                            <Skeleton className="w-72 h-8" />
                        </div>
                        <div className="flex-1 mb-4">
                            <div className="flex gap-6">
                                <div className="w-[350px] flex flex-col gap-3">
                                    <Skeleton className="w-full h-[300px]" />
                                </div>
                                <div className="flex-1">
                                    <Skeleton
                                        containerClassName="flex-1"
                                        className="w-full h-[300px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
