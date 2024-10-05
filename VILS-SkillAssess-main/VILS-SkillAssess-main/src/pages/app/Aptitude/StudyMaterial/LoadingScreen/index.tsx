// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
            <Skeleton className="w-[330px] h-[50px] p-4 rounded-md" />
        </div>
    );
};

export default LoadingScreen;
