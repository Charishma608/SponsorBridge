// Components 
import TooltipComp from "components/Tooltip";

interface StengthsContainerProps {
    strengths: string[];
    intrigues: string[];
}

const StengthsContainer: React.FC<StengthsContainerProps> = ({
    strengths = [],
    intrigues = [],
}) => {
    return (
        <div className="flex-1 border-[1.5px] border-primary rounded-md p-4 flex gap-2">
            <div className="flex-1 flex flex-col gap-2">
                <p className="font-semibold border-b-[1.5px] w-fit border-primary pb-1 flex items-center gap-2">
                    Strengths
                    <TooltipComp 
                        label='Discover more about your untapped or new strengths' 
                        position='top' 
                    />
                </p>
                <ul className="flex flex-col gap-4">
                    {strengths.map((strength, index) => {
                        return (
                            <li key={index} className="text-sm">
                                {index + 1}. {strength}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <p className="font-semibold border-b-[1.5px] w-fit border-primary pb-1 flex items-center gap-2">
                    Intrigues
                    <TooltipComp 
                        label='Discover more about your untapped or new interests' 
                        position='top' 
                    />
                </p>
                <ul className="flex flex-col gap-4">
                    {intrigues.map((intrigue, index) => {
                        return (
                            <li key={index} className="text-sm">
                                {index + 1}. {intrigue}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <p className="text-sm">{}</p>
        </div>
    );
};

export default StengthsContainer;
