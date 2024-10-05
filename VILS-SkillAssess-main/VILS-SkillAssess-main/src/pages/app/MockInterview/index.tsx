// Internal Imports
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import LoadingScreen from './LoadingScreen';
import TextHeading from 'components/Texts/TextHeading';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Configs
import { axiosV2 } from 'configs/axios.config';
import BackButton from 'components/Buttons/BackButton';

const cache = {
    data: null,
};

const MockInterviewPage = () => {
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
            const res = await axiosV2.get('/mock-interview/department/all');
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
        <div className="p-4 ps-4 md:ps-8 flex flex-col gap-4 w-full ">
            {/* <div>
                <TextHeading>Mock Interviews</TextHeading>
            </div> */}
            <div className="flex items-center gap-4 ">
                <BackButton className="md:hidden" />
                <TextHeading>Mock Interviews</TextHeading>
            </div>
            <div>
                <div>
                    <TextSubHeading className="text-sm md:text-base">
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
            className="rounded-md shadow-light w-full mx-2 md:mx-0 md:w-[30%] overflow-hidden cursor-pointer"
            onClick={() => {
                navigate({
                    pathname: '/mock-interview/departments/company',
                    search: new URLSearchParams({
                        id: data?.id,
                        name: data?.name,
                    }).toString(),
                });
            }}
        >
            <div
                className={`border-l-8 p-4 h-full flex items-center justify-between`}
                style={{ borderColor: color }}
            >
                <p className="font-semibold">{data?.name}</p>
                <span className="text-4xl md:hidden">&gt;</span>
            </div>
        </div>
    );
};

export default MockInterviewPage;
