// Internal Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Assets
import Image14 from 'assets/images/image14.png';

// Components
import Button from 'components/Buttons';
import Input from 'components/Inputs';

// Configs
import axios from 'configs/axios.config';

// Utils
import { isValidEmail } from 'utils/validators';

//icons
import { FaArrowLeft } from 'react-icons/fa';

//providers
import { useAlert } from 'providers/AlertProvider';
import { useAuth } from 'providers/AuthProvider';

const VerifyEmail = () => {
    const [isVerify, setIsVerify] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const { setIsVerified } = useAuth();
    const sendOtpHandler = async () => {
        if (!isValidEmail(email)) {
            showAlert('Enter a valid Email');
            return;
        }
        try {
            const res = await axios.post('/student/verification/send-otp', {
                email: email,
            });
            if (res.status === 201) setIsVerify(true);
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || 'Network issue, please try again later';
            showAlert(errorMessage);
        }
    };
    const verifyOtp = async () => {
        if (verifyCode.length !== 6) {
            showAlert('Incorrect length OTP');
            return;
        }
        try {
            const res = await axios.post('/student/verification/check-otp', {
                email: email,
                code: verifyCode,
            });
            if (res.status === 200) {
                showAlert('Your accout is verified please log in');
                setIsVerified(true);
                navigate('/');
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || 'Network issue, please try again later';
            showAlert(errorMessage);
        }
    };
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden">
                <img src={Image14} alt="bg-14" className="w-screen h-screen object-cover" />
            </div>
            <div className="absolute h-screen w-screen opacity-90 bg-black grid place-items-center"></div>
            <div className="absolute h-screen w-screen grid place-items-center">
                {!isVerify && (
                    <div className="bg-white rounded-md w-[450px] min-h-[100px] px-4 py-6">
                        <div className="my-4">
                            To send OTP to your email please write your email below
                        </div>
                        <div className="mb-4">
                            <Input
                                placeholder="john@vils.ai"
                                className="outline-green-600"
                                value={email}
                                setValue={setEmail}
                            />
                        </div>
                        <div className="">
                            <Button
                                label="Send OTP"
                                className={`w-1/3 m-auto bg-green-600 hover:bg-green-700`}
                                onClick={sendOtpHandler}
                            />
                        </div>
                    </div>
                )}
                {isVerify && (
                    <div className="bg-white rounded-md w-[450px] min-h-[100px] px-4 py-6">
                        <FaArrowLeft
                            onClick={() => {
                                setIsVerify(false);
                            }}
                        />
                        <div className="my-4">
                            You have been sent an OTP on your email please fill it below
                        </div>
                        <div className="mb-4">
                            <Input
                                className="outline-green-600"
                                value={verifyCode}
                                setValue={setVerifyCode}
                            />
                        </div>
                        <div className="">
                            <Button
                                label="Submit OTP"
                                className={`w-1/3 m-auto bg-green-600 hover:bg-green-700`}
                                onClick={verifyOtp}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
