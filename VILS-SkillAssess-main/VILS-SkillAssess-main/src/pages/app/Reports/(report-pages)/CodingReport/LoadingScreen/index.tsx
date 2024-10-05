// External Imports 
import Skeleton from 'react-loading-skeleton'

const LoadingScreen = () => {
  return (
    <div className="relative">
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col">
            <div className="shadow-light py-4 ps-8 relative">
                <Skeleton circle = {true} className='h-[40px] w-[40px]' />
                <div className="flex items-center flex-col gap-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Skeleton count={2} className="w-52" />
                </div>
            </div>
            <div className="flex-1 overflow-y-scroll flex flex-col gap-6 p-4">
                <div className="p-4 rounded-md shadow-light flex">
                    <div className="w-1/4 border-r-[1.5px] border-gray-300 flex flex-col gap-3">
                        <Skeleton className='h-56' />
                    </div>
                    <div className="flex-1 ps-4">
                        <Skeleton className='h-56' />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                      <Skeleton className='w-44' />
                      <div className="flex gap-2">
                        <div className='w-32'>
                          <Skeleton className='h-10' />
                        </div>
                        <div className='w-32'>
                          <Skeleton className='h-10' />
                        </div>
                        <div className='w-32'>
                          <Skeleton className='h-10' />
                        </div>
                        <div className='w-32'>
                          <Skeleton className='h-10' />
                        </div>
                      </div>
                  </div>

                  <Skeleton className='h-72 w-full' />

                  <div className="flex gap-4 h-[480px]">
                      <div className="w-1/2 h-full">
                          <Skeleton className='h-full' />
                      </div>
                      <div className="flex flex-col gap-4 w-1/2 h-full">
                          <Skeleton className='h-[200px]' />
                          <div className="flex-1">
                            <Skeleton className='h-full' /> 
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default LoadingScreen