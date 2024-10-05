// Internal Imports
import { useState } from 'react';

// Components
import Select from 'components/Select';
import TextSubHeading from 'components/Texts/TextSubHeading';
import LineChart from './LineChart';
import PieChart from './PieChart';

interface CompanyWiseAnalyticsProps {
    data?: any;
    loading?: boolean;
}
const CompanyWiseAnalytics: React.FC<CompanyWiseAnalyticsProps> = ({ data, loading = false }) => {
    const ROLES = data ? Object.keys(data) : [];
    const [roleSelected, setRoleSelected] = useState<string>(ROLES[0]);

    return (
        <div className="my-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <TextSubHeading className="font-semibold">
                    Company wise Confidence Analysis
                </TextSubHeading>
                <div className="flex items-center gap-2">
                    <p className="min-w-[150px] text-end">Select Company</p>

                    <Select options={ROLES} value={roleSelected} setValue={setRoleSelected} />
                </div>
            </div>
            <div className="flex items-start justify-between gap-4 h-[400px]">
                <div className="flex-1 h-full flex flex-col justify-between gap-2 border-[1.5px] border-primary rounded-md p-4">
                    <p className="text-sm pb-[3px] border-b-[1.5px] border-primary w-fit">
                        Number of tests taken in each role
                    </p>
                    <PieChart data={data} />
                </div>

                <div className="h-full w-1/2 border-[1.5px] border-primary rounded-md p-4">
                    <LineChart data={data?.[roleSelected]?.reports} />
                </div>
            </div>
        </div>
    );
};

export default CompanyWiseAnalytics;
