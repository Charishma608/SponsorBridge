// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="flex items-center gap-4">
            <Skeleton className="w-56 h-20" />
            <Skeleton className="w-56 h-20" />
            <Skeleton className="w-56 h-20" />
            <Skeleton className="w-56 h-20" />
        </div>
    );
};

export default LoadingScreen;
