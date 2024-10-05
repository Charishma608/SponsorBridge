// Assets
import Analyst from 'assets/svgs/personalityTypes/Analyst.svg';
import Collaborator from 'assets/svgs/personalityTypes/Collaborator.svg';
import Decider from 'assets/svgs/personalityTypes/Decider.svg';
import Enterpriser from 'assets/svgs/personalityTypes/Enterpriser.svg';
import Executor from 'assets/svgs/personalityTypes/Executor.svg';
import Experimenter from 'assets/svgs/personalityTypes/Experimenter.svg';
import Influencer from 'assets/svgs/personalityTypes/Influencer.svg';
import MutiTasker from 'assets/svgs/personalityTypes/MutiTasker.svg';
import Organizer from 'assets/svgs/personalityTypes/Organizer.svg';
import Strategist from 'assets/svgs/personalityTypes/Strategist.svg';
import Supporter from 'assets/svgs/personalityTypes/Supporter.svg';

interface PersonalityLogos {
    [key: string]: string;
}

export const PERSONALITY_LOGOS: PersonalityLogos = {
    Analyst,
    Collaborator,
    Decider,
    Enterpriser,
    Executor,
    Experimenter,
    Influencer,
    MutiTasker,
    Organizer,
    Strategist,
    Supporter,
};

interface WritingStyles {
    [key: string]: string;
}
// Writing Styles
export const WRITING_STYLES: WritingStyles = {
    Persuasive:
        "In persuasive writing, the author endeavors to convince or persuade the audience to adopt a particular viewpoint or take specific actions. This style often involves presenting arguments, supporting evidence, and appealing to the reader's emotions to influence their beliefs or decisions",
    Expository:
        'In expository writing, the writer aims to explain, inform, or clarify a subject or topic to the reader. It involves providing facts, details, and a clear analysis without expressing personal opinions or trying to persuade the reader.',
    Descriptive:
        'Descriptive writing focuses on vividly portraying a person, place, object, or experience using sensory details, vivid language, and imagery. The writer aims to create a vivid mental picture for the reader, allowing them to immerse themselves in the description.',
    Narrative:
        'Narrative writing tells a story or recounts a series of events. It often includes characters, a plot, setting, and a point of view. The goal is to engage the reader emotionally and take them on a journey through the narrative.',
};

// Tone Pace
interface TonePace {
    [key: string]: number;
}

export const TONE_PACE: TonePace = {
    TOO_SLOW: 25,
    NORMAL: 50,
    TOO_FAST: 75,
};

export const COLORS: string[] = [
    '#93C6E7',
    '#AEE2FF',
    '#FF9B9B',
    '#ED9ED6',
    '#DED0B6',
    '#80BCBD',
    '#89CFF3',
    '#99A8F888',
    '#F3EDC8',
    '#87C4FF',
    '#9BE8D8',
    '#FFCF81',
    '#FFD59E',
];

export const MENTOR_BOOKING_FORM: string =
    'https://docs.google.com/forms/d/e/1FAIpQLSfYYZY-xaJFcHFRyV5aEQ_JCeC7xVbLgqN3o1CTbLAXTUiYyw/viewform';

export const VILS_SUPPORT_MAIL: string = 'support@vils.ai';

export const LOG_STATUS: string =
    '8bKcy2BsBFwqgG2S2NU6BGdJGDEMvgWuydOOTAh0C9iQuFdoxP5QKmxCtZOFCsuggy8Um9a5jrsytLOaZO4AmC8Vn4qgFwi44G9x';

interface TraitsTip {
    [key: string]: string;
}

export const TRAITS_TIPS: TraitsTip = {
    'Big 5':
        'Evaluates your nature like how open-minded, organized, outgoing, agreeable, and calm you are',
    Values: 'Assesses how you prioritize and assign value to various aspects of your life significantly influences decision-making, motivation, and overall well-being',
    'Dark Triad':
        'Evaluates your personality traits for heightened self-awareness, paving the way for personal growth and informed decision-making',
};

interface AptitudeDetailedReport {
    [key: string]: string;
}

export const APTITUDE_DETAILED_REPORT: AptitudeDetailedReport = {
    'Numerical Aptitude':
        'Assesses your numerical aptitude, evaluating your proficiency in mathematical reasoning and problem-solving',
    'Verbal Aptitude': 'Examines your proficiency in language comprehension and expression',
    'Verbal Ability':
        'Evaluates your verbal ability and linguistic proficiency by measuring your comprehension and reasoning skills in language-based contexts',
    'Logical Reasoning':
        'Analyzes your logical reasoning, gauging your ability to think critically and solve complex problems',
    'Verbal Reasoning':
        'Analyzes your verbal reasoning, assessing your language comprehension and critical thinking skills, laying the groundwork for effective communication',
    'Critical Thinking':
        'Examines your logical reasoning, evaluating your aptitude for analytical problem-solving and proficiency in addressing complex issues',
    'Quantitative Aptitude':
        'Examines your quantitative skills, measuring your proficiency in working with numerical data',
    'Mechanical Aptitude':
        'Assesses your mechanical aptitude, evaluating your ability to understand and solve problems related to mechanical concepts',
};
