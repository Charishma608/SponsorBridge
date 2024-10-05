// External Imports
import { FaLaptopCode } from 'react-icons/fa';
import { BsSpeedometer2 } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";

// Components
import Button from 'components/Buttons';

// Utils
import {capitalizeFirstLetter} from "../../../../../utils/helper";

interface AssessmentsCardProps {
    data: any;
    startTestAction: () => void;
    viewReportAction?: () => void;
}

const AssessmentsCard: React.FC<AssessmentsCardProps> = ({
    data,
    startTestAction,
    viewReportAction,
}) => {
    return (
        <div className="shadow-light rounded-md p-4 w-[300px] flex flex-col gap-3">
            <div className="flex gap-3">
                <div
                    className={`h-[60px] w-[60px] rounded-full grid place-content-center border text-2xl bg-[#EBFEFF]`}
                >
                    <FaLaptopCode className="text-[#66B5B6]"/>
                </div>
                <p className="flex-1 font-semibold">{data?.name}</p>
            </div>

            <div className="h-[150px]">
                <p className="text-sm text-justify">{data?.description}</p>
            </div>

            <div className={"flex items-center gap-6 text-sm text-gray-800"}>
                <div className={"flex items-center gap-2"}>
                    <BsSpeedometer2 className={"text-lg"} />
                    <p>Level: {capitalizeFirstLetter(data?.difficulty)}</p>
                </div>
                <div className={"flex items-center gap-2"}>
                    <IoTimerOutline className={"text-lg"} />
                    <p>{data?.duration_in_minutes} Minutes</p>
                </div>
            </div>

            <div className="flex gap-2 items-center mt-4 justify-end">
                {data?.status === 'COMPLETED' && (
                    <Button
                        label="View Report"
                        className="bg-[#DCA11D] flex-1"
                        onClick={viewReportAction}
                    />
                )}
                <Button label="Start Test" className="flex-1" onClick={startTestAction}/>
            </div>
        </div>
    );
};

export default AssessmentsCard;
