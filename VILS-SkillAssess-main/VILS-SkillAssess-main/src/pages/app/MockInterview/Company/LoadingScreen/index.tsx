// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="p-4 ps-8 flex flex-col gap-4">
            <div className="h-[45px] flex gap-4 items-center">
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
                <Skeleton className="h-[35px] w-[400px]" />
            </div>
            <div className="flex flex-wrap gap-2">
                <Skeleton className="w-[300px] h-[150px]" />
                <Skeleton className="w-[300px] h-[150px]" />
                <Skeleton className="w-[300px] h-[150px]" />
                <Skeleton className="w-[300px] h-[150px]" />
                <Skeleton className="w-[300px] h-[150px]" />
                <Skeleton className="w-[300px] h-[150px]" />
            </div>
        </div>
    );
};

export default LoadingScreen;
