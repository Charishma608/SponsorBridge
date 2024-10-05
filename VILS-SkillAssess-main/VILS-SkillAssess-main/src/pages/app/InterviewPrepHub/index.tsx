// Internal Imports
import { useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

// Components
import LoadingScreen from './LoadingScreen';
import TextHeading from 'components/Texts/TextHeading';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Configs
import { axiosV2 } from 'configs/axios.config';

const cache = {
    data: null,
};

const InterviewPrepHubPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [departments, setDepartments] = useState<any>();

    const CARDS_COLORS = [
        '#037AD6',
        '#39D38966',
        '#FF0606',
        '#FF6060',
        '#FF904066',
        '#3EA3B966',
        '#3EA3B966',
        '#3EA3B966',
        '#AEE1FF',
        '#8FB94B',
        '#FF904066',
        '#CE7A63',
    ];

    const fetchDepartments = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axiosV2.get('/practice-test/department/all');
            if (res.status === 200) {
                setDepartments(res.data);
                cache.data = res.data;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!cache.data) {
            fetchDepartments();
        } else {
            setDepartments(cache.data);
        }
    }, [fetchDepartments]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="p-4 ps-8 flex flex-col gap-4">
            <div>
                <TextHeading>InterviewPrep Hub</TextHeading>
            </div>
            <div>
                <div>
                    <TextSubHeading>
                        Select which department fits best according to your curriculum
                    </TextSubHeading>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {departments?.map((department: any, index: number) => {
                    return (
                        <DepartmentCard
                            key={index}
                            data={department}
                            color={CARDS_COLORS[index % CARDS_COLORS.length]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

interface DepartmentCardProps {
    data: any;
    color?: string;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ data, color }) => {
    const navigate = useNavigate();

    return (
        <div
            className="rounded-md shadow-light w-[30%] overflow-hidden cursor-pointer"
            onClick={() => {
                navigate({
                    pathname: '/interview-prep-hub/departments/department',
                    search: new URLSearchParams({
                        id: data?.id,
                        name: data?.name,
                    }).toString(),
                });
            }}
        >
            <div className={`border-l-8 p-4 h-full`} style={{ borderColor: color }}>
                <p className="font-semibold">{data?.name}</p>
            </div>
        </div>
    );
};

export default InterviewPrepHubPage;
