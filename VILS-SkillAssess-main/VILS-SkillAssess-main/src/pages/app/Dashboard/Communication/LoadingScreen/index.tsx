// External Imports 
import Skeleton from 'react-loading-skeleton'

const LoadingScreen = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Speaking Container  */}
            <div className="border-[1.5px] border-primary rounded-md p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Skeleton className='w-48' />
                </div>
                <div className="flex justify-between gap-3">
                    <Skeleton containerClassName='flex-1' />
                </div>
                <div>
                    <Skeleton className='h-20' />
                </div>
            </div>

            {/* Reading Container  */}
            <div className="flex gap-4 flex-col">
                <div className="flex items-center gap-3">
                    <Skeleton className='w-48' />
                </div>
                
                <div className="p-4 border-[1.5px] rounded-md border-primary min-h-[40vh]">
                    <div className="flex h-[40vh] gap-2">
                        <Skeleton containerClassName='flex-1' className='h-full' />
                        <Skeleton containerClassName='flex-1' className='h-full' />
                        <Skeleton containerClassName='flex-1' className='h-full' />
                    </div>
                    <div className="mt-10 flex justify-end">
                        <Skeleton className='w-80' />
                    </div>
                </div>
            </div>

            {/* Listening Container  */}
            <div className="flex gap-4 flex-col">
                <div className="flex items-center gap-3">
                    <Skeleton className='w-48' />
                </div>
                <div className="p-4 border-[1.5px] rounded-md border-primary min-h-[40vh]">
                    <div className="flex border-gray-300 h-[40vh] gap-2">
                        <Skeleton containerClassName='flex-1' className='h-full' />
                        <Skeleton containerClassName='flex-1' className='h-full' />
                        <Skeleton containerClassName='flex-1' className='h-full' />
                    </div>
                    <div className="flex mt-2 border-gray-300">
                        <div className="flex-1 border-gray-300 h-[40vh]" />
                            <Skeleton containerClassName='flex-1' className='h-full' />
                        <div className="flex-1 border-gray-300" />
                    </div>
                    <div className="mt-10 flex justify-end">
                        <Skeleton className='w-80' />
                    </div>
                </div>
            </div>
            
            {/* Writing Container  */}
            <div className="flex gap-4 flex-col">
                <div className="flex items-center gap-3">
                    <Skeleton className='w-48' />
                </div>
                <div className="p-4 border-[1.5px] rounded-md border-primary min-h-[40vh]">
                    <div className="flex gap-2 h-[40vh]">
                        <Skeleton containerClassName='flex-1' className='h-full' />
                        <Skeleton containerClassName='flex-1' className='h-full' />
                        <Skeleton containerClassName='flex-1' className='h-full' />
                    </div>
                    <div className="my-10 flex justify-end">
                        <Skeleton className='w-80' />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Skeleton className='h-24' />
                        <Skeleton className='h-24' />
                    </div>
                </div>
            </div>
            
            {/* Insights Container  */}
            <Skeleton className="h-20" />
        </div>
    )
}

export default LoadingScreen