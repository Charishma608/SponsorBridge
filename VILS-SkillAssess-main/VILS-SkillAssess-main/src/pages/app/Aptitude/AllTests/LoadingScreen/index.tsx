// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="flex gap-6 flex-wrap">
            <Skeleton className="w-[340px] h-[320px] p-4 rounded-md" />
            <Skeleton className="w-[340px] h-[320px] p-4 rounded-md" />
            <Skeleton className="w-[340px] h-[320px] p-4 rounded-md" />
        </div>
    );
};

export default LoadingScreen;
