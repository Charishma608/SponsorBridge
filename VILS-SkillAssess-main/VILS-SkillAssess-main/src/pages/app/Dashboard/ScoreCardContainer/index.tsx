// Internal Imports
import { useState, useEffect, useCallback } from 'react';

// Configs
import axios from 'configs/axios.config';

// Assets
import Personality from 'assets/svgs/dashboard/personality.svg';
import TestsTaken from 'assets/svgs/dashboard/tests_taken.svg';
import AvailableTest from 'assets/svgs/dashboard/available_tests.svg';
import MentorsAvailed from 'assets/svgs/dashboard/1on1_mentors_availed.svg';
import { cn } from 'utils/helper';

// Components
import LoadingScreen from './LoadingScreen';

const cache = {
    data: null,
};

const ScoreCardContainer = () => {
    const [scores, setScores] = useState({
        total_available_tests: 'Coming soon',
        mentor_sessions_availed: 'Coming soon',
        personality: 'Coming soon',
        tests_taken: 'Coming soon',
    });
    const [isloading, setIsLoading] = useState<boolean>(false);

    const fetchScores = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('/dashboard/load-test-analytics');
            if (res.status === 200) {
                setScores(res.data);
                cache.data = res.data;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cache.data) {
            setScores(cache.data);
        } else {
            fetchScores();
        }
    }, [fetchScores]);

    if (isloading) {
        return <LoadingScreen />;
    }
    return (
        <div className="flex  gap-2 lg:gap-4 overflow-x-auto horizontal-scroll">
            <ScoreCard
                icon={Personality}
                label="Personality"
                value={scores?.personality}
                className="hidden md:flex"
            />
            <ScoreCard icon={TestsTaken} label="Tests Taken" value={scores?.tests_taken} />
            <ScoreCard
                icon={AvailableTest}
                label="Tests Available"
                value={scores?.total_available_tests}
            />
            <ScoreCard
                icon={MentorsAvailed}
                label="1 on 1 Mentor Sessions Availed"
                value={scores?.mentor_sessions_availed}
                className="md:flex hidden"
            />
        </div>
    );
};

interface ScoreCardProps {
    icon: string;
    label: string;
    value: string;
    className?: string;
}
export const ScoreCard: React.FC<ScoreCardProps> = ({
    icon,
    label = '',
    value = '',
    className,
}) => {
    return (
        <div
            className={cn(
                'flex gap-2 py-2 px-2 lg:px-4 min-w-[160px] items-center bg-[#f7fafd] rounded-lg',
                className,
            )}
        >
            <div>
                <img
                    src={icon}
                    alt={label}
                    className="h-8 w-8 sm:h-10 sm:w-10 lg:min-w-10 md:min-w-4"
                />
            </div>
            <div className="flex flex-col gap-1 flex-grow">
                <p className="font-semibold text-sm lg:text-md md:text-sm">{label}</p>
                <p className="text-xs lg:text-sm">{value}</p>
            </div>
        </div>
    );
};

export default ScoreCardContainer;
