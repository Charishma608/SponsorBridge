// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="flex-1 overflow-y-scroll ps-8 p-2 flex flex-col gap-4">
            <div className="h-[45px] flex gap-4 items-center">
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
                <Skeleton className="h-[35px] w-[400px]" />
            </div>
            <Skeleton className="rounded-3xl w-[45%] h-[40px]" />
            <div className="flex gap-6 flex-wrap">
                <Skeleton className="w-[300px] h-[320px] p-4 rounded-md" />
                <Skeleton className="w-[300px] h-[320px] p-4 rounded-md" />
                <Skeleton className="w-[300px] h-[320px] p-4 rounded-md" />
            </div>
        </div>
    );
};

export default LoadingScreen;
