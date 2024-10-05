// Components
import TextHeading from 'components/Texts/TextHeading';
import CommuincationModuleCard from './CommunicationModuleCard';

// External Imports
import { FaBookOpenReader, FaMicrophone } from 'react-icons/fa6';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { RiEnglishInput } from 'react-icons/ri';

// Internal Imports
import { useNavigate } from 'react-router-dom';
import BackButton from 'components/Buttons/BackButton';

const CommunicationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 ps-8">
            {/* <TextHeading>Communication Modules</TextHeading> */}
            <div className="flex items-center gap-4">
                <BackButton className="md:hidden" />
                <TextHeading>Communication Modules</TextHeading>
            </div>
            <div className="mt-20 flex flex-wrap gap-6">
                <CommuincationModuleCard
                    icon={<FaBookOpenReader className="text-[#66B5B6]" />}
                    iconClassName="bg-[#EBFEFF]"
                    label="Comprehensive Reading Test"
                    description="Master Reading for a Lifetime of Informed Choices and Lifelong Learning"
                    onClick={() => {
                        navigate('/communication/reading-module');
                    }}
                />
                <CommuincationModuleCard
                    icon={<FaMicrophone className="text-[#00C6D0]" />}
                    iconClassName="bg-[#E5F4FF]"
                    label="Comprehensive Speaking Test"
                    description="Achieve Proficiency in Speaking for Confidence in All Life's Conversations and Presentations"
                    onClick={() => {
                        navigate('/communication/speaking-module');
                    }}
                />
                <CommuincationModuleCard
                    icon={<FaHeadphonesAlt className="text-[#8B8BDC]" />}
                    iconClassName="bg-[#EFEFFB]"
                    label="Comprehensive Listening Test"
                    description="Strengthen Listening Abilities for Clear Communication and Strong Relationships"
                    onClick={() => {
                        navigate('/communication/listening-module');
                    }}
                />
                <CommuincationModuleCard
                    icon={<TfiWrite className="text-[#5380A0]" />}
                    iconClassName="bg-[#E5F4FF]"
                    label="Comprehensive Writing Test"
                    description="Excel in Writing for Effective Expression in Personal and Professional Pursuits"
                    onClick={() => {
                        navigate('/communication/writing-module');
                    }}
                />
                <CommuincationModuleCard
                    icon={<RiEnglishInput className="text-[#53a099]" />}
                    iconClassName="bg-[#E5F4FF]"
                    label="Comprehensive Grammar Test"
                    description="Enhance your command of language with a focus on correct grammar usage to improve communication skills."
                    onClick={() => {
                        navigate('/communication/grammar-module');
                    }}
                />
                <CommuincationModuleCard
                    icon={<RiEnglishInput className="text-[#a09353]" />}
                    iconClassName="bg-[#E5F4FF]"
                    label="Comprehensive Vocabulary Test"
                    description="Expand your vocabulary to strengthen your communication skills and express ideas more effectively."
                    onClick={() => {
                        navigate('/communication/vocabulary-module');
                    }}
                />
            </div>
        </div>
    );
};

export default CommunicationPage;
