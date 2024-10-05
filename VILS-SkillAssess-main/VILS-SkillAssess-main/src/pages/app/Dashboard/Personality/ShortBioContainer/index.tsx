// Components 
import TooltipComp from "components/Tooltip";

interface ShortBioContainerProps {
    bio?: string;
}

const ShortBioContainer: React.FC<ShortBioContainerProps> = ({ bio = '' }) => {
    return (
        <div className="flex-1 border-[1.5px] border-primary rounded-md p-4 flex flex-col gap-2">
            <p className="font-semibold border-b-[1.5px] w-fit border-primary pb-1 flex items-center gap-2">
                Short Bio
                <TooltipComp 
                    label='Short bio offers a brief profile that provides a perceptive summary of your internal characteristics' 
                    position='top' 
                />
            </p>
            <p className="text-sm">{bio}</p>
        </div>
    );
};

export default ShortBioContainer;
