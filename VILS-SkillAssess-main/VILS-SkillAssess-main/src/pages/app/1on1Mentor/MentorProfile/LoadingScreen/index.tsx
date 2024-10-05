// External Imports
import Skeleton from 'react-loading-skeleton';

const LoadingScreen = () => {
    return (
        <div className="flex flex-col gap-8 p-4 ps-8">
            {/* Navbar */}
            <div>
                <Skeleton className="h-10 w-[35vw]" />
                <Skeleton className="w-[60vw]" />
            </div>

            <div className="flex gap-4">
                <div>
                    <Skeleton circle className="w-[150px] h-[150px]" />
                </div>
                <div className="flex flex-1 gap-4 flex-col">
                    <div className="flex justify-between gap-4">
                        <div>
                            <Skeleton className="w-24" />
                            <div>
                                <Skeleton count={5} containerClassName="flex-1" className="w-96" />
                            </div>
                        </div>
                        <div>
                            {/* <a href={MENTOR_BOOKING_FORM} target="__blank">
                                <p className="bg-primary py-2 px-8 text-white rounded-3xl text-sm">
                                    Book Call
                                </p>
                            </a> */}
                        </div>
                    </div>
                    {/* <div>
                        <div className="flex items-center gap-6 font-semibold">
                            <a href={data.linkedin}>LinkedIn</a>
                            <p>Industry: {data.industry}</p>
                            <p>Total Experience: {data.total_experience}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm">{data.about}</p>
                    </div> */}
                </div>
            </div>
            <div className="flex gap-4">
                <Skeleton className="h-[400px] w-[300px]" />
                <Skeleton className="h-[400px] w-[300px]" />
            </div>
        </div>
    );
};

export default LoadingScreen;
