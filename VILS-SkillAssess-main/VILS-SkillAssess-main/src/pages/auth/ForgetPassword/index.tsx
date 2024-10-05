// Internal Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import Image14 from 'assets/images/image14.png';

// Components
import Input from 'components/Inputs';
import Button from 'components/Buttons';

//providers
import { useAlert } from 'providers/AlertProvider';

// Configs
import axios from 'configs/axios.config';
import { isValidEmail } from 'utils/validators';

const ForgetPasswordPage = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const sendHandler = async () => {
        if (!isValidEmail(email)) {
            showAlert('Use a valid Email');
            return;
        }
        try {
            const res = await axios.post('/student/auth/forget-password', {
                email: email,
            });
            if (res.status === 200) {
                setMessage(res?.data?.message);
                setShowMessage(true);
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || 'Network issue, please try again later';
            showAlert(errorMessage);
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
            <div className="absolute h-screen w-screen grid place-items-center">
                <div className="bg-white rounded-md w-[450px] min-h-[100px] px-4 py-6">
                    {showMessage ? (
                        <>
                            <div className="my-3">{message}</div>
                            <Button
                                label="Ok"
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 my-3"
                                onClick={() => {
                                    setShowMessage(false);
                                    setEmail('');
                                    navigate('/');
                                }}
                                loaderLargeArcColor="text-white"
                                loaderSmallArcColor="fill-green-600"
                            />
                        </>
                    ) : (
                        <>
                            <div className="text-2xl font-medium mb-5">Forget Password</div>
                            <div className="mb-3">Enter your email</div>
                            <Input
                                placeholder="john@vils.ai"
                                className="outline-green-600 rounded-none"
                                value={email}
                                setValue={setEmail}
                            />
                            <Button
                                label="Send"
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 my-3"
                                onClick={sendHandler}
                                loaderLargeArcColor="text-white"
                                loaderSmallArcColor="fill-green-600"
                            />
                        </>
                    )}
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

export default ForgetPasswordPage;
