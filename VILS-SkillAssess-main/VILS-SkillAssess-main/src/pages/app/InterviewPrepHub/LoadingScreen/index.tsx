// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="p-4 ps-8 flex flex-col gap-4">
            <Skeleton className="w-[300px] h-8" />
            <Skeleton className="w-1/2 h-6" />
            <div className="flex flex-wrap gap-2">
                <Skeleton className="w-[300px] h-16" />
                <Skeleton className="w-[300px] h-16" />
                <Skeleton className="w-[300px] h-16" />
                <Skeleton className="w-[300px] h-16" />
                <Skeleton className="w-[300px] h-16" />
                <Skeleton className="w-[300px] h-16" />
            </div>
        </div>
    );
};

export default LoadingScreen;
