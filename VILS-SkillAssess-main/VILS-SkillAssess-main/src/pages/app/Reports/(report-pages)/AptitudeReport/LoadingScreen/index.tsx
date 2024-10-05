// Internal Imports
import { useState } from 'react';

// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    const [data] = useState<any[]>(
        Array(5).fill(() => {
            return '';
        }),
    );

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 w-full h-screen flex flex-col">
                <div className="shadow-light py-2 ps-8 relative">
                    <Skeleton circle={true} className="w-10 h-10" />
                    <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Skeleton count={2} className="w-52" />
                    </div>
                </div>
                <div className="flex-grow mt-[1px] overflow-y-scroll p-4">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-80 h-8" />
                        <Skeleton className="w-96 h-8" />
                    </div>
                    <div className="my-4 flex gap-4">
                        <Skeleton containerClassName="flex-1" className="h-[250px]" />
                        <Skeleton containerClassName="flex-1" className="h-[250px]" />
                    </div>
                    <div>
                        <Skeleton className="w-80 h-8" />
                        <div className="flex flex-col gap-3 mt-4">
                            {data.map((x, index) => {
                                return (
                                    <Skeleton
                                        key={index}
                                        className="h-[100px]"
                                        containerClassName="flex-1"
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
