// External Imports 
import Skeleton from "react-loading-skeleton"

const LoadingScreen = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 h-[250px]">
                <Skeleton containerClassName="flex-1" className="h-full" />
                <Skeleton containerClassName="flex-1" className="h-full" />
            </div>
            <div className="flex gap-3 h-[250px]">
                <Skeleton containerClassName="flex-1" className="h-full" />
                <Skeleton containerClassName="flex-1" className="h-full" />
            </div>
            <div className="mt-2">
                <Skeleton className="h-20" />
            </div>
        </div>
    )
}

export default LoadingScreen