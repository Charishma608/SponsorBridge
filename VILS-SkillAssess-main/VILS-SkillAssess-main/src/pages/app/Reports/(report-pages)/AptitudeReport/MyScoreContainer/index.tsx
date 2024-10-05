// Components
import PieChart from '../PieChart';

interface MyScoreContainerProps {
    data?: any;
}

const MyScoreContainer: React.FC<MyScoreContainerProps> = ({ data }) => {
    const COLORS = ['#3EB96F', '#FF7D7D', '#FBA834'];
    const Labels = ['Correct Answers', 'Incorrect Answers', 'Not Attempted'];

    return (
        <div className="shadow-light rounded-md p-4 h-full">
            <h3 className="font-semibold text-primary">My Score</h3>
            <div className="flex min-h-[250px] mt-4">
                <PieChart
                    data={{
                        'Correct Answers': data?.correct_answers,
                        'Incorrect Answers': data?.incorrect_answers,
                        'Not Attempted': data?.not_attempted,
                    }}
                    colors={COLORS}
                />
            </div>
            <div className="flex justify-center items-start gap-3 font-inter">
                {Labels.map((label, index) => {
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className={`h-3 w-3 rounded-full`}
                                style={{
                                    background: COLORS[index],
                                }}
                            />
                            <p
                                style={{
                                    color: COLORS[index],
                                }}
                                className="text-sm"
                            >
                                {label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyScoreContainer;
