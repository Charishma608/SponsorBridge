// External Imports 
import Skeleton from 'react-loading-skeleton'

const LoadingScreen = () => {
    return (
        <div className="rounded-md border-[1.5px] border-primary p-4">
            <Skeleton className='w-56' />
            <div className="mt-4 flex justify-between items-start gap-4">
                <div className="w-[40%]">
                    <Skeleton count={5} />
                </div>
                <div className="w-[60%] h-[250px]">
                    <Skeleton className='h-full' />
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen