// External Imports 
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="w-full h-full">
            <div className="w-4/5 m-auto pt-8 pb-8 h-full overflow-y-scroll">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        {/* <TextHeading>{title}</TextHeading> */}
                        <div>
                            <Skeleton className='w-56 h-10' />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className='w-32 h-10' />
                            <Skeleton className='w-32 h-10' />
                        </div>
                    </div>
                    <Skeleton count={2} />
                </div>
                <div className="w-full mt-8 flex flex-col gap-4">
                    <Skeleton className='h-32' />
                    <Skeleton className='h-32' />
                    <Skeleton className='h-32' />
                    <Skeleton className='h-32' />
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen