// Internal Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import Image14 from 'assets/images/image14.png';
import Logo from 'assets/svgs/Logo.svg';

// Components
import Button from 'components/Buttons';
import Select from 'components/Select';
import { useAuth } from 'providers/AuthProvider';
import useQuery from 'hooks/useQuery';

const AuthPage = () => {
    const {isMobile} = useQuery();
    const navigate = useNavigate();
    const userTypes: string[] = ['Student', 'Placement Cell'];
    const tabs: string[] = ['Login', 'Signup'];

    const { isVerified } = useAuth();

    const [userType, setUserType] = useState<string>('Student');
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);

    const handleStart = () => {
        if (activeTab === 'Login') {
            if (userType === 'Student') {
                navigate('/auth/login');
            } else if (userType === 'Placement Cell') {
                window.location.href = 'http://164.52.214.13:3006';
            }
        } else if (activeTab === 'Signup') {
            if (userType === 'Student') {
                navigate('/auth/signup');
            }
        }
    };

    return (
        <div className="relative">
            {/* Backgound */}
            <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden">
                <img src={Image14} alt="bg-14" className="w-screen h-screen object-cover" />
            </div>
            <div className="absolute h-screen w-screen opacity-90 bg-black grid place-items-center"></div>

            {/* Modal */}
            <div className="absolute h-screen w-screen grid place-items-center mx-auto  md:mx-0">
                <div className="bg-white  rounded-xl md:rounded-md md:w-[450px] min-h-[100px] px-4 py-6">
                    <div className="flex items-start justify-end">
                        {!isMobile && <img src={Logo} alt="logo" className="h-10 mb-4" />}
                    </div>
                    <div className="mb-8 flex flex-col items-center gap-4">
                        <p className="font-semibold">Select whether you want to login or sign up</p>
                        <div className="flex items-center justify-center">
                            {tabs.map((tab, index) => (
                                <Tab
                                    label={tab}
                                    key={index}
                                    isActive={activeTab === tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="my-8 flex flex-col items-center gap-2">
                        <p className="font-semibold">Describe yourself</p>
                        <Select
                            value={userType}
                            options={userTypes}
                            setValue={setUserType}
                            classWidth="w-2/3"
                        />
                    </div>
                    <Button
                        label="Start"
                        className={`w-1/3 m-auto ${
                            activeTab === 'Signup'
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-green-600 hover:bg-green-700'
                        }`}
                        onClick={handleStart}
                    />
                    <div className="flex items-center justify-end mt-3">
                        {!isVerified && (
                            <div
                                className="cursor-pointer text-primary underline pt-2"
                                onClick={() => navigate('/auth/signup/verify-email')}
                            >
                                Verify Account
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface TabProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label = '', isActive = false, onClick = () => {} }) => {
    return (
        <div
            className={`pb-2 border-b-[1.5px] ${isActive ? 'border-[#5380A0]' : 'border-gray-400'}`}
        >
            <div
                className={`rounded-3xl text-sm text-center py-2 px-4 w-[120px] cursor-pointer ${
                    isActive ? 'bg-[#5380A0] text-white' : 'text-black'
                }`}
                onClick={onClick}
            >
                <p>{label}</p>
            </div>
        </div>
    );
};

export default AuthPage;
