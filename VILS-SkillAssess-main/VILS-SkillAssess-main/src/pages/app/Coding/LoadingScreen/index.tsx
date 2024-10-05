// Internal Imports 
import { useState } from "react";

// External Imports 
import Skeleton from "react-loading-skeleton";



const LoadingScreen = () => {
    const [mentors] = useState<any[]>(
        Array(8).fill(() => {
            return {};
        }),
    );

    return (
        <div className="h-screen overflow-y-scroll p-4 ps-8 flex flex-col gap-4">
            <div>
                <Skeleton className="h-10 w-72" />
            </div>
            <div className="flex gap-4 flex-wrap">
                {
                    mentors.map(() => {
                        return (
                            <div>
                                <Skeleton className="h-[350px] w-[300px]" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default LoadingScreen;
