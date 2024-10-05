// Components
import Select from 'components/Select';
import TextHeading from 'components/Texts/TextHeading';
import TextLight from 'components/Texts/TextLight';

// Internal Imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [testSelected, setTestSelected] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!testSelected) return;

        switch (testSelected) {
            case 'Mock Interviews':
                navigate('/mock-interview/departments');
                break;
            case 'Interview Prep Hub':
                navigate('/interview-prep-hub/departments');
                break;
            case 'Communication':
                navigate('/communication');
                break;
            case 'Behaviour':
                navigate('/behaviour');
                break;
            case 'Aptitude':
                navigate('/aptitude?activeTab=all-tests');
                break;
            case 'Coding':
                navigate('/coding-pro');
                break;
            default:
                break;
        }
    }, [testSelected, navigate]);

    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <TextHeading>Reports</TextHeading>
                <TextLight className="mt-20">
                    Unveil the Power of Progress: Discover Your Reports for Growth and Success!
                </TextLight>
            </div>
            <div className="min-w-[180px]">
                <Select
                    placeHolder="Start New Test"
                    options={[
                        'Mock Interviews',
                        'Interview Prep Hub',
                        'Communication',
                        'Behaviour',
                        'Aptitude',
                        'Coding',
                    ]}
                    value={testSelected}
                    setValue={setTestSelected}
                />
            </div>
        </div>
    );
};

export default Navbar;
