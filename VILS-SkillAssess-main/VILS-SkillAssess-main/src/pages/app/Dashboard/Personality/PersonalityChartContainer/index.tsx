// Components 
import TooltipComp from 'components/Tooltip';

// Constants
import { PERSONALITY_LOGOS } from 'constants/index';

interface PersonalityChartContainerProps {
    personality: string;
}

const PersonalityChartContainer: React.FC<PersonalityChartContainerProps> = ({
    personality = '',
}) => {
    const putArticle = (personality: string) => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        const firstLetter = personality[0];
        if (vowels.includes(firstLetter?.toLowerCase())) return 'an';
        return 'a';
    };

    return (
        <div className="flex-1 border-[1.5px] border-primary rounded-md p-4 flex flex-col gap-2">
            <p className="font-semibold border-b-[1.5px] w-fit border-primary pb-1 flex items-center gap-2">
                Personality Type
                <TooltipComp   
                    label='Explore more about your personality type like whether you resonate more with being an organizer or an influencer' 
                    position='top' 
                />
            </p>
            <div>
                <p className="text-sm">
                    Your personality seems to be {putArticle(personality)} {personality}.
                </p>
                <div className="m-auto w-fit mt-3">
                    <img
                        src={PERSONALITY_LOGOS[personality]}
                        className="h-[250px]"
                        alt="personality-chart"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalityChartContainer;
