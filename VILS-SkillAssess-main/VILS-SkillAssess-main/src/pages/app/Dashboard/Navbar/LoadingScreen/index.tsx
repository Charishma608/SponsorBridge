// External Imports 
import Skeleton from "react-loading-skeleton";


const LoadingScreen = () => {
    return (
        <div>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-2xl font-semibold">
                    <Skeleton className='w-32' />
                </div>
                <div>
                    <Skeleton className='w-32' />
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;