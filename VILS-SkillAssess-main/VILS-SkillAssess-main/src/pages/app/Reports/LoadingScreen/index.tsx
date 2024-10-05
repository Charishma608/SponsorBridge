// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div>
            <div className="flex flex-wrap gap-4">
                <Skeleton className="w-[300px] h-[300px]" />
                <Skeleton className="w-[300px] h-[300px]" />
                <Skeleton className="w-[300px] h-[300px]" />
            </div>
        </div>
    );
};

export default LoadingScreen;
