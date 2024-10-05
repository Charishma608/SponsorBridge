// External Imports 
import Skeleton from 'react-loading-skeleton'

const LoadingScreen = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-md border-[1.5px] border-primary p-4 flex flex-col gap-4">
                <Skeleton className='w-56' />
                <div className="flex justify-between items-start gap-4">
                    <div className="w-[40%] h-[250px]">
                        <Skeleton className='h-full' />
                    </div>
                    <div className="w-[60%] h-[250px]">
                        <Skeleton className='h-full' />
                    </div>
                </div>
                <div className="mt-2 h-[200px] flex gap-2">
                    <Skeleton containerClassName='flex-1' className='h-full' />
                    <Skeleton containerClassName='flex-1' className='h-full' />
                    <Skeleton containerClassName='flex-1' className='h-full'  />
                </div>
                <div className="flex justify-end">
                    <Skeleton className='w-80' />
                </div>
            </div>
            <Skeleton className="h-20" />
        </div>
    )
}

export default LoadingScreen