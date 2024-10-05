// Internal Imports
import { useState } from 'react';

// External Imports
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoSchoolSharp } from 'react-icons/io5';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';

interface EducationContainerProps {
    data?: any;
}

const EducationContainer: React.FC<EducationContainerProps> = ({ data }) => {
    const [isContainerOpened, setIsContainerOpened] = useState(true);

    const handleContainerVisibility = () => {
        setIsContainerOpened((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <div className="shadow-light rounded-3xl py-2 px-4 flex justify-between">
                <p>Education</p>
                <button onClick={handleContainerVisibility}>
                    {isContainerOpened ? <FaAngleUp /> : <FaAngleDown />}
                </button>
            </div>
            {isContainerOpened ? (
                <div className="shadow-light rounded-3xl p-4">
                    <TextSubHeading>Education</TextSubHeading>
                    <div className="my-4 flex flex-col gap-5">
                        {data.map((dt: any, index: number) => (
                            <EducationCard
                                key={index}
                                college={dt.collage}
                                stream={dt.stream}
                                year={dt.year}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

interface EducationCardProps {
    college?: string;
    stream?: string;
    year?: string;
}
const EducationCard: React.FC<EducationCardProps> = ({ college, stream, year }) => {
    return (
        <div className="flex gap-3">
            <div className="h-10 min-w-10 mt-1 rounded-full shadow-light grid place-content-center">
                <IoSchoolSharp className="text-[#015069]" />
            </div>
            <div>
                <p className="font-semibold">{stream}</p>
                <div className="mt-1 text-gray-600 text-sm">
                    <p>{college}</p>
                    <p>Joined at: {year}</p>
                </div>
            </div>
        </div>
    );
};
export default EducationContainer;
