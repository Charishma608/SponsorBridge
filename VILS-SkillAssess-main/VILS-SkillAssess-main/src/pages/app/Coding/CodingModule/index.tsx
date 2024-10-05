// Components
import TextHeading from 'components/Texts/TextHeading';
import CompanyCard from './CompanyCard';
import LoadingScreen from '.././LoadingScreen';

// Configs
import axios from 'configs/coding.config';

// Internal Imports
import { useState, useEffect, useCallback } from 'react';

const CodingPage = () => {
    const [data, setData] = useState<any>();
    const [isLoading, setLoading] = useState<boolean>(true);

    const fetchCompanies = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/student/company/all');
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    if (isLoading) return <LoadingScreen />;
    return (
        <div className="h-screen overflow-y-scroll p-4 ps-8 flex flex-col gap-4">
            <div>
                <TextHeading>Company Wise Modules</TextHeading>
            </div>
            <div className="flex gap-6 flex-wrap">
                {data?.map((company: any, index: number) => {
                    return (
                        <CompanyCard
                            key={index}
                            icon={company?.icon}
                            label={company?.name}
                            description={company?.description}
                            companyId={company?.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CodingPage;
