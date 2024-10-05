// Internal Imports
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import RolesCard from './RolesCard';

// Configs
import { axiosV2 } from 'configs/axios.config';

const JobRolesPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const companyId = searchParams.get('companyId') || '';
    const companyName = searchParams.get('companyName') || '';

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roles, setRoles] = useState<any>();

    const fetchRoles = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axiosV2.get(`/mock-interview/company/${companyId}/role/all`);
            if (res.status === 200) {
                setRoles(res?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="flex flex-col gap-4">
            <Navbar />
            <div className="flex gap-6 flex-wrap pb-4 ps-4 md:ps-8 pe-4">
                {roles?.map((role: any, index: number) => {
                    return (
                        <RolesCard
                            roleId={role?.id}
                            companyId={companyId}
                            companyName={companyName}
                            label={role?.name}
                            description={role?.description}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default JobRolesPage;
