// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full p-4 ps-8">
                <div className="w-full h-screen flex flex-col">
                    <div className="shadow-light py-4 ps-8 relative">
                        <Skeleton circle={true} className="w-10 h-10" />
                        <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Skeleton count={2} className="w-52" />
                        </div>
                    </div>
                    <div className="mt-[1px] p-4 pb-4 ps-8 flex-grow overflow-y-scroll flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-3/5">
                                <Skeleton className="h-[300px]" />
                            </div>
                            <div className="w-2/5 rounded-md border-[1.5px] border-gray-300">
                                <Skeleton className="h-[300px]" />
                            </div>
                        </div>
                        <div className="border-[1.5px] border-gray-300 rounded-md flex gap-2">
                            <Skeleton containerClassName="flex-1" className="h-[300px]" />
                            <Skeleton containerClassName="flex-1" className="h-[300px]" />
                            <Skeleton containerClassName="flex-1" className="h-[300px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
