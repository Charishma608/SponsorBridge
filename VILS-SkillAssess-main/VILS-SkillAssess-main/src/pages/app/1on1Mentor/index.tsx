// Internal Imports
import { useState, useCallback, useEffect } from 'react';

// Configs
import axios from 'configs/axios.config';

// Components
import MentorCard from 'components/Cards/MentorCard';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';

const OneOnOneMentor = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mentors, setMentors] = useState([]);

    const loadMentors = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/load-all-mentors`);
            if (res.status === 200) {
                setMentors(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMentors();
    }, [loadMentors]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="p-4 ps-8 flex flex-col gap-4">
            <Navbar />
            <div className="flex flex-wrap gap-4">
                {mentors.map(({ photo_url, name, mentor_id }) => (
                    <MentorCard img={photo_url} name={name} id={mentor_id} key={mentor_id} />
                ))}
            </div>
        </div>
    );
};

export default OneOnOneMentor;
