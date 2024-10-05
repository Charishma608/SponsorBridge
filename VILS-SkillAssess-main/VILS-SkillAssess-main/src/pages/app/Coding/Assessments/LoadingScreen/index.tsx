// Internal Imports 
import { useState } from 'react';

// External Imports 
import Skeleton from 'react-loading-skeleton';



const LoadingScreen = () => {
    const [mentors] = useState<any[]>(
        Array(8).fill(() => {
            return {};
        }),
    );


    return (
        <div className="h-screen flex flex-col">
            <div className="flex items-center gap-4 p-4 ps-8">
                <Skeleton circle = {true} className='h-[40px] w-[40px]' />
                <Skeleton className="w-52 h-[32px]" />
            </div>
            <div className="flex-1 overflow-y-scroll ps-8 p-2 flex flex-col gap-4">
                <div className="flex gap-4 rounded-3xl justify-between w-fit">
                    <div className='w-56'>
                        <Skeleton className='h-10' />
                    </div>
                    <div className='w-56'>
                        <Skeleton className='h-10' />
                    </div>
                    <div className='w-56'>
                        <Skeleton className='h-10' />
                    </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {mentors.map((x: any, index) => (
                        <div key={index}>
                            <Skeleton className="w-[300px] h-[350px]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen