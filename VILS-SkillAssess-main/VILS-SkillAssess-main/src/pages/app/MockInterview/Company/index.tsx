// Internal Imports
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import CompanyCard from './CompanyCard';

// Configs
import { axiosV2 } from 'configs/axios.config';

const CompanyPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const departmentId = searchParams.get('id') || '';

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [companies, setCompanies] = useState<any>();

    const fetchRoles = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axiosV2.get(`/mock-interview/department/${departmentId}/company/all`);
            if (res.status === 200) {
                setCompanies(res.data);
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
        <div className="flex flex-col gap-4 p-4 ps-4 md:ps-8">
            <Navbar />
            <div className="flex gap-6 flex-wrap">
                {companies?.map((company: any, index: number) => {
                    return (
                        <CompanyCard
                            icon={company?.icon}
                            label={company?.name}
                            description={company?.description}
                            companyId={company?.id}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CompanyPage;
