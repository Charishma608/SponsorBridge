// Components
import TextHeading from 'components/Texts/TextHeading';
import BehaviourModuleCard from './BehaviourModuleCard';

// External Imports
import { FaBookOpenReader } from 'react-icons/fa6';
import { GiBrain } from 'react-icons/gi';

// Internal Imports
import { useNavigate } from 'react-router-dom';
import BackButton from 'components/Buttons/BackButton';

const BehaviourPage = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 ps-8">
            {/* <TextHeading>Behaviour Modules</TextHeading> */}
            <div className="flex items-center gap-4">
                <BackButton className="md:hidden" />
                <TextHeading>Behaviour Modules</TextHeading>
            </div>
            <div className="mt-4 flex flex-wrap gap-6">
                <BehaviourModuleCard
                    icon={<FaBookOpenReader className="text-[#66B5B6]" />}
                    iconClassName="bg-[#EBFEFF]"
                    label="Behaviour Model"
                    description="Unlock Your Full Potential – Understand Your Unique Personality and Thrive in Every Aspect of Life"
                    onClick={() => {
                        navigate('/behaviour/behaviour-module');
                    }}
                />
                <BehaviourModuleCard
                    icon={<GiBrain className="text-[#8B8BDC]" />}
                    iconClassName="bg-[#EFEFFB]"
                    label="Dass"
                    description="Take our DASS test, where 'DASS' stands for Depression Anxiety Stress Scales, designed to assess and understand the levels of your depression, anxiety, and stress through self-report measures"
                    onClick={() => {
                        navigate('/behaviour/dass-module');
                    }}
                />
            </div>
        </div>
    );
};

export default BehaviourPage;
