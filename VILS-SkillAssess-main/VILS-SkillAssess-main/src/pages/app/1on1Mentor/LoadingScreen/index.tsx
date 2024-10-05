// External Imports
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    const [mentors] = useState<any[]>(
        Array(30).fill(() => {
            return {};
        }),
    );

    return (
        <div className="flex flex-col gap-4 p-4 ps-8">
            {/* Navbar  */}
            <div>
                <Skeleton className="h-10 w-[35vw]" />
                <Skeleton className="w-[60vw]" />
            </div>

            {/* Mentors  */}
            <div className="flex flex-wrap gap-4">
                {mentors.map((x: any, index) => (
                    <div>
                        <Skeleton className="w-[230px] h-[300px]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingScreen;
