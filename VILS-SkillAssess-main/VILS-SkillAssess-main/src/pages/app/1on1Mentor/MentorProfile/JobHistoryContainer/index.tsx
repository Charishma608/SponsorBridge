// Internal Imports
import { useState } from 'react';

// External Imports
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { BsFillBriefcaseFill } from 'react-icons/bs';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';

interface JobHistoryContainerProps {
    data?: any;
}

const JobHistoryContainer: React.FC<JobHistoryContainerProps> = ({ data }) => {
    const [isContainerOpened, setIsContainerOpened] = useState(true);

    const handleContainerVisibility = () => {
        setIsContainerOpened((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <div className="shadow-light rounded-3xl py-2 px-4 flex justify-between">
                <p>Job History</p>
                <button onClick={handleContainerVisibility}>
                    {isContainerOpened ? <FaAngleUp /> : <FaAngleDown />}
                </button>
            </div>
            {isContainerOpened ? (
                <div className="shadow-light rounded-3xl p-4">
                    <TextSubHeading>Experience</TextSubHeading>
                    <div className="my-4 flex flex-col gap-5">
                        {data.map((dt: any, index: number) => (
                            <ExperienceCard
                                key={index}
                                position={dt.job_title}
                                company={dt.company}
                                year={dt.joining_year}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

interface ExperienceCardProps {
    position?: string;
    company?: string;
    year?: string;
}
const ExperienceCard: React.FC<ExperienceCardProps> = ({ position, company, year }) => {
    return (
        <div className="flex gap-3">
            <div className="h-10 w-10 mt-1 rounded-full shadow-light grid place-content-center">
                <BsFillBriefcaseFill className="text-[#015069]" />
            </div>
            <div>
                <p className="font-semibold">{position}</p>
                <div className="mt-1 text-gray-600 text-sm">
                    <p>{company}</p>
                    <p>Joined at: {year}</p>
                </div>
            </div>
        </div>
    );
};

export default JobHistoryContainer;
