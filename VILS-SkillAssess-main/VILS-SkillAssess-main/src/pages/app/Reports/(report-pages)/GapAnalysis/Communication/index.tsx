import TextSubHeading from 'components/Texts/TextSubHeading';
import ScoreCard from './ScoreCard';
import { useState } from 'react';
import { cn } from 'utils/helper';
import Reading from './Reading';
import Speaking from './Speaking';

const Communication = () => {
    const Tabs = ['Listening', 'Writing', 'Speaking', 'Reading'];
    const [activeTab, setActiveTab] = useState<string>(Tabs[0]);
    const passage = [
        'It is a myth that creative people are born with their talents: gifts from God or nature. Creative genius is, in fact, latent within many of us, without our realizing. But how far do we need to travel to find the path to creativity? For many people, a long way. In our everyday lives, we have to perform many acts out of habit to survive, like opening the door, shaving, getting dressed, walking to work, and so on. If this were not the case, we would, in all probability, become mentally unhinged. So strongly ingrained are our habits, though this varies from person to person, that sometimes when a conscious effort is made to be creative, automatic response takes over. We may try, for example, to walk to work following a different route, but end up on our usual path. By then it is too late to go back and change our minds. Another day, perhaps. The same applies to all other areas of our lives. When we are solving problems, for example, we may seek different answers, but, often as not, find ourselves walking along the same well-trodden paths.',
        'It is a myth that creative people are born with their talents: gifts from God or nature. Creative genius is, in fact, latent within many of us, without our realizing. But how far do we need to travel to find the path to creativity? For many people, a long way. In our everyday lives, we have to perform many acts out of habit to survive, like opening the door, shaving, getting dressed, walking to work, and so on. If this were not the case, we would, in all probability, become mentally unhinged. So strongly ingrained are our habits, though this varies from person to person, that sometimes when a conscious effort is made to be creative, automatic response takes over. We may try, for example, to walk to work following a different route, but end up on our usual path. By then it is too late to go back and change our minds. Another day, perhaps. The same applies to all other areas of our lives. When we are solving problems, for example, we may seek different answers, but, often as not, find ourselves walking along the same well-trodden paths.',
    ];
    const ReadingQuestionData = [
        {
            quesNo: '1',
            ques: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
            options: [
                {
                    alphabet: 'a',
                    value: 'Work closely',
                },
                {
                    alphabet: 'b',
                    value: 'Work Cautiosly',
                },
                {
                    alphabet: 'c',
                    value: 'Work clearly',
                },
                {
                    alphabet: 'd',
                    value: 'Work clearly',
                },
            ],
            choosenOption: 'a',
            rightOption: 'b',
            explanation:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
        },
        {
            quesNo: '2',
            ques: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
            options: [
                {
                    alphabet: 'a',
                    value: 'Work closely',
                },
                {
                    alphabet: 'b',
                    value: 'Work Cautiosly',
                },
                {
                    alphabet: 'c',
                    value: 'Work clearly',
                },
                {
                    alphabet: 'd',
                    value: 'Work clearly',
                },
            ],
            choosenOption: 'b',
            rightOption: 'b',
            explanation:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, illum. Nobis doloremque ducimus molestiae unde sunt quae perspiciatis. Cupiditate quis voluptas odio nemo dolorem cumque tenetur magnam, ad doloribus accusantium!',
        },
    ];

    const speakingAnswer = [
        'The most challenging software for me is specifically to be specifically Telluride is Figma. Yeah. Figma and Adobe Illustrator, which is, uh, they are quite nuance and all the constraints and, uh spill small, small things that needs to be learned up. Yeah. This question, it almost took three to four months to complete a entire software of the Adobe Illustrator.',
        'The most challenging software for me is specifically to be specifically Telluride is Figma. Yeah. Figma and Adobe Illustrator, which is, uh, they are quite nuance and all the constraints and, uh spill small, small things that needs to be learned up. Yeah. This question, it almost took three to four months to complete a entire software of the Adobe Illustrator.',
        'The most challenging software for me is specifically to be specifically Telluride is Figma. Yeah. Figma and Adobe Illustrator, which is, uh, they are quite nuance and all the constraints and, uh spill small, small things that needs to be learned up. Yeah. This question, it almost took three to four months to complete a entire software of the Adobe Illustrator.',
    ];

    const speakingCorrectedAnswer = [
        'Therefore, to develop a method or system to control the effect of hate speech on society, researchers have focused on understanding and recognising hate speech content. A hate speech diffu- ion model predcts how a given hate message can cause damage, how many people it will reach out to, who will share it, and whether it is going to be viral, etc.',
        'Therefore, to develop a method or system to control the effect of hate speech on society, researchers have focused on understanding and recognising hate speech content. A hate speech diffu- ion model predcts how a given hate message can cause damage, how many people it will reach out to, who will share it, and whether it is going to be viral, etc.',
    ];

    const onTabClickHandler = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <div className="max-h-[87vh] overflow-hidden overflow-y-scroll pr-2">
            <div className="">
                <TextSubHeading className="text-primary text-left">Communication</TextSubHeading>
            </div>
            <div className="flex gap-5 items-center my-5">
                <ScoreCard answered={2} label="Writing" questions={3} score={68} skipped={1} />
                <ScoreCard answered={2} label="Reading" questions={3} score={78} skipped={1} />
                <ScoreCard answered={2} label="Speaking" questions={3} score={88} skipped={1} />
            </div>
            <div className="rounded-3xl shadow-stripe overflow-hidden flex justify-between my-6">
                {Tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab}
                        isActive={activeTab === tab}
                        onClick={() => {
                            onTabClickHandler(tab);
                        }}
                        className="flex-1"
                    />
                ))}
            </div>
            <div className="">
                {activeTab === 'Reading' && (
                    <Reading passage={passage} questions={ReadingQuestionData} />
                )}
                {activeTab === 'Speaking' && (
                    <Speaking
                        question={[
                            'I actually yet learning it to be specifically tell you regarding that, probably regarding Figma. Yeah, It’s quite, uh, easier than comparing to the illustrator, which is a vast software for the graphic designers and all those kind of stuff. But, uh, for me, I’m specified with the specialized with the UX design and yeah, so, uh, I felt, uh, quite a difficulty with the illustrator when comparing to the figma. For me, the most difficult software is, uh, is, um, yeah of illustrator, figma.',
                        ]}
                        answer={speakingAnswer}
                        correctedAnswer={speakingCorrectedAnswer}
                        IELTSVersion={[
                            'Therefore, to devise a method or system to control the consequences of hate speech on society, researchers have focused on comprehending and recognizing hate speech content. A hate speech diffusion model predicts how a given hate message can cause harm, how many people it will reach out to, who will share it, and whether it is going to be viral, etc',
                        ]}
                    />
                )}
            </div>
        </div>
    );
};

export default Communication;

interface TabProps {
    label: string;
    onClick?: () => void;
    className?: string;
    isActive?: boolean;
    withFlex?: boolean;
}

const Tab: React.FC<TabProps> = ({
    label = '',
    onClick = () => {},
    isActive = false,
    className = '',
}) => {
    return (
        <button
            className={cn(
                `z-10 w-[200px] py-2 text-center text-sm rounded-3xl cursor-pointer ${
                    isActive ? 'bg-primary text-white' : 'bg-white text-black'
                }`,
                className,
            )}
            onClick={onClick}
        >
            <p>{label}</p>
        </button>
    );
};
