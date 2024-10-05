// Internal Imports
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import RolesCard from './RolesCard';

// Configs
import { axiosV2 } from 'configs/axios.config';

const DepartmentPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const departmentId = searchParams.get('id') || '';
    const departmentName = searchParams.get('name') || '';

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roles, setRoles] = useState<any>();

    const fetchRoles = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axiosV2.get(`/practice-test/department/${departmentId}/role/all`);
            if (res.status === 200) {
                setRoles(res?.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [departmentId]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="flex flex-col gap-4 p-4 ps-8">
            <Navbar />
            <div className="flex gap-6 flex-wrap">
                {roles?.map((role: any, index: number) => {
                    return (
                        <RolesCard
                            roleId={role?.id}
                            departmentId={departmentId}
                            departmentName={departmentName}
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

export default DepartmentPage;
