// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import TooltipComp from 'components/Tooltip';
import TraitsCard from './TraitsCard';

interface TraitsContainerProps {
    data?: any;
}
const TraitsContainer: React.FC<TraitsContainerProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <TextSubHeading>Personality Traits</TextSubHeading>
                <TooltipComp
                    label="Personality traits are utilized to depict your enduring characteristics, which influence your behavior, emotions and thoughts. These traits are derived from models like the Big Five, Values and then Dark Triad, helping you gain insights into your habitual behaviors and attitudes, enhancing your self-awareness and assessment"
                    position="right"
                />
            </div>
            <div className="flex gap-3 flex-wrap">
                {data?.map((dt: any, index: number) => (
                    <TraitsCard data={dt} key={index} />
                ))}
            </div>
        </div>
    );
};

export default TraitsContainer;
