// Internal Imports
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';

// Assets
import ProfilePlaceholder from 'assets/images/profile.png';

// Contants
import { MENTOR_BOOKING_FORM } from 'constants/index';

// Configs
import axios from 'configs/axios.config';
import LoadingScreen from './LoadingScreen';
import TextSubHeading from 'components/Texts/TextSubHeading';
import JobHistoryContainer from './JobHistoryContainer';
import EducationContainer from './EducationContainer';

const MentorProfile = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>();

    const loadMentorDetails = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/mentor/${id}/load-mentor-details`);

            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadMentorDetails();
    }, [loadMentorDetails]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-col gap-8 px-8 py-4">
            <Navbar />
            <div className="flex gap-4">
                <div>
                    <img
                        src={data?.photo_url || ProfilePlaceholder}
                        alt="profile"
                        className="h-[150px] w-[150px] rounded-full object-cover border"
                    />
                </div>
                <div className="flex flex-1 gap-4 flex-col">
                    <div className="flex justify-between gap-4">
                        <div>
                            <TextSubHeading>{data.name}</TextSubHeading>
                            <div className="text-gray-600 text-sm flex items-center justify-start gap-4">
                                <p>{data.current_company_job_title}</p>
                                <p>/</p>
                                <p>{data.current_company}</p> 
                                <p>/</p>
                                <p>{data.current_company_year}</p>
                            </div>
                        </div>
                        <div>
                            <a href={MENTOR_BOOKING_FORM} target="__blank">
                                <p className="bg-primary py-2 px-4 lg:px-8 min-w-[100px] text-white text-center rounded-3xl text-sm">
                                    Book Call
                                </p>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-6 font-semibold">
                            <a href={data.linkedin}>LinkedIn</a>
                            <p>Industry: {data.industry}</p>
                            <p>Total Experience: {data.total_experience}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-justify">{data.about}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <JobHistoryContainer data={data.job_history} />
                <EducationContainer data={data.education_history} />
            </div>
        </div>
    );
};

export default MentorProfile;
