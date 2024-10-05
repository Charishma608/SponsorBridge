// Components
import InsightsCard from 'components/Cards/InsightCard';
import TextSubHeading from 'components/Texts/TextSubHeading';
import TooltipComp from 'components/Tooltip';

interface InsightsContainerProps {
    insights: string[] | null;
}

const InsightsContainer: React.FC<InsightsContainerProps> = ({ insights = [] }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className='flex items-center gap-2'>
                <TextSubHeading>Insights</TextSubHeading>
                <TooltipComp 
                    label='Evaluates and provides score by assessing your fluency, words per minute (WPM), and the use of filler words while answering questions, providing a detailed understanding of your verbal proficiency' 
                    position='rightBottom' 
                />
            </div>
            {!insights ? (
                <div>
                    <p className="text-sm">No insights to show. Please take some test.</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {insights.map((insight, index) => (
                        <div key={index}>
                            <InsightsCard label={insight} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InsightsContainer;
