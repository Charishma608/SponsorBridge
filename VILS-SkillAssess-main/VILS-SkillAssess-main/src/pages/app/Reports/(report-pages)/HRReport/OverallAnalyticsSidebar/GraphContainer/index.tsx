// Components
import { useHRReportsContext } from '../../HRReportProvider';
import CompetencyChart from '../CompetencyChart';

const GraphContainer = () => {
    // "hr_competency_analysis": {
    //         "adaptability": 68,
    //         "learning_ability_initiative": 72,
    //         "teamwork": 71,
    //         "professionalism": 70,
    //         "leadership": 68,
    //         "creativity_innovation": 78,
    //         "motivation": 70,
    //         "positive_attitude": 57,
    //         "problem_solving": 79,
    //         "detail_oriented": 67
    //     }

    const { data } = useHRReportsContext();
    return (
        <div className="flex">
            <div className="flex-1 p-4 pt-0">
                <div>
                    <CompetencyChart
                        data={[
                            {
                                label: 'Team Work',
                                value: data?.overall_result?.hr_competency_analysis?.teamwork,
                            },
                            {
                                label: 'Leadership',
                                value: data?.overall_result?.hr_competency_analysis?.leadership,
                            },
                            {
                                label: 'Innovation',
                                value: data?.overall_result?.hr_competency_analysis
                                    ?.creativity_innovation,
                            },
                            {
                                label: 'Motivation',
                                value: data?.overall_result?.hr_competency_analysis?.motivation,
                            },
                            {
                                label: 'Positive Attitude',
                                value: data?.overall_result?.hr_competency_analysis?.positive_attitude,
                            },
                            {
                                label: 'Problem Solving',
                                value: data?.overall_result?.hr_competency_analysis?.problem_solving,
                            },
                            {
                                label: 'Detail-Oriented',
                                value: data?.overall_result?.hr_competency_analysis?.detail_oriented,
                            },
                            {
                                label: 'Adatability',
                                value: data?.overall_result?.hr_competency_analysis?.adaptability,
                            },
                            {
                                label: 'Learning Ability',
                                value: data?.overall_result?.hr_competency_analysis
                                    ?.learning_ability_initiative,
                            },
                            {
                                label: 'Professionalism',
                                value: data?.overall_result?.hr_competency_analysis?.professionalism,
                            },
                        ]}
                        fill="#3EA3B9"
                        stroke="#3EA3B9"
                        tooltipBorder="#3EA3B9"
                        tooltipColor="#3EA3B9"
                    />
                </div>
            </div>
        </div>
    );
};

export default GraphContainer;
