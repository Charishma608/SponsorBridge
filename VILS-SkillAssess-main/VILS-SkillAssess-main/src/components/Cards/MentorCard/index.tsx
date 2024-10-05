// Internal Imports
import { useNavigate } from 'react-router-dom';

// Assets
import ProfilePlaceholder from 'assets/images/profile.png';
import TextLight from '../../Texts/TextLight';

// Constants
import { MENTOR_BOOKING_FORM } from 'constants/index';

interface MentorCardProps {
    img: string;
    name: string;
    id: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ img, name, id }) => {
    const navigate = useNavigate();

    const goToMentorProfile = () => {
        navigate({
            pathname: '/one-on-one-mentor/mentor-profile',
            search: new URLSearchParams({
                id: id,
            }).toString(),
        });
    };

    return (
        <div className="w-[250px] h-[280px] shadow-light p-4 rounded-md flex flex-col justify-between items-center">
            <div className="flex flex-col items-center gap-1">
                <img
                    src={img || ProfilePlaceholder}
                    alt="profile"
                    className="h-[100px] w-[100px] rounded-full object-cover border"
                    loading="lazy"
                />
                <p className="font-semibold text-center">{name}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
                <button onClick={goToMentorProfile}>
                    <TextLight className="text-center cursor-pointer">View Profile</TextLight>
                </button>
                <a
                    href={MENTOR_BOOKING_FORM}
                    target="__blank"
                    className="bg-primary py-2 px-8 text-white rounded-3xl text-sm"
                >
                    <p>Book Call</p>
                </a>
            </div>
        </div>
    );
};

export default MentorCard;
