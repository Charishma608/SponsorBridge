import { FaCode } from 'react-icons/fa6';
import { FaHeadset, FaPeopleArrows } from 'react-icons/fa';
import { BsActivity } from 'react-icons/bs';
import { LuBrain } from 'react-icons/lu';
import { TbMathSymbols } from 'react-icons/tb';
import { TbMessageCircleQuestion } from 'react-icons/tb';

import Tab from './Tab';

const SideBar = () => {
    const Tabs = [
        {
            id: 1,
            icon: BsActivity,
            label: 'Overall',
        },
        { id: 2, icon: FaPeopleArrows, label: 'Aptitude' },
        { id: 3, icon: FaHeadset, label: 'Communication' },
        { id: 4, icon: FaCode, label: 'Coding' },
        { id: 5, icon: TbMathSymbols, label: 'Domain Skills' },
        { id: 6, icon: LuBrain, label: 'Behavioural' },
        { id: 7, icon: TbMessageCircleQuestion, label: 'Technical Mock' },
    ];
    return (
        <div className="flex flex-col gap-2 ">
            <div className="mt-5 flex flex-col gap-3  ">
                {Tabs.map((tab) => (
                    <Tab key={tab.id} label={tab.label} icon={tab.icon} />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
