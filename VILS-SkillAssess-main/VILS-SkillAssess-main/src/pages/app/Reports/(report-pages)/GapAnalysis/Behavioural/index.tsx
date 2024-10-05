import TextSubHeading from 'components/Texts/TextSubHeading';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineBarChart } from 'react-icons/md';
import PersonalityType from './PersonalityType';
import Competencies from './Competencies';
const Behavioural = () => {
    const [leftActive, setLeftActive] = useState(true);

    return (
        <div className="max-h-[87vh] overflow-hidden overflow-y-scroll">
            <div className="">
                <TextSubHeading className="text-primary text-left">Domain Skills</TextSubHeading>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
                <div className="w-[400px] bg-[#F6F8FE] rounded-full flex ">
                    <div
                        className={`p-4 gap-1 flex rounded-full items-center ${
                            leftActive ? 'bg-white text-primary border-2' : ''
                        } w-[200px]`}
                        onClick={() => setLeftActive(true)}
                    >
                        <FaUser />
                        <div className="">Personality Type</div>
                    </div>
                    <div
                        className={`p-4 gap-2 flex rounded-full items-center  ${
                            !leftActive ? 'bg-white text-primary border-2' : ''
                        } w-[200px]`}
                        onClick={() => setLeftActive(false)}
                    >
                        <MdOutlineBarChart size={25} />
                        <div className="">Competencies</div>
                    </div>
                </div>
            </div>
            {leftActive && <PersonalityType />}
            {!leftActive && <Competencies />}
        </div>
    );
};

export default Behavioural;
