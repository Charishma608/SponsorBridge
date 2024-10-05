// Assets
import Image14 from 'assets/images/image14.png';
import Logo from 'assets/svgs/Logo.svg';

// Components
import Input from 'components/Inputs';
import Button from 'components/Buttons';
import TextHeading from 'components/Texts/TextHeading';

// Configs
import axios from 'configs/axios.config';
import codingAxios from 'configs/coding.config';

// Internal Imports
import { useState } from 'react';

// Utils
import { isValidEmail } from 'utils/validators';

// External Imports
import cookies from 'js-cookie';

// Hooks
import { useAuth } from 'providers/AuthProvider';

// Constants
import { LOG_STATUS } from 'constants/index';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'providers/AlertProvider';
import useQuery from 'hooks/useQuery';

const LoginPage = () => {
    const { isMobile } = useQuery();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const { setIsAuthenticated, setIsVerified } = useAuth();

    const handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        if (!email || !password) {
            setError('Enter all the necessary fields to proceed');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Enter a valid email');
            return;
        }
        try {
            setLoading(true);
            setError('');
            const response = await axios.post('/student/auth/login', {//login api fr all 3 products
                email,
                password,
            });

            if (response.status === 200) {
                const res = await codingAxios.post(`/auth/student/login`, {
                    email,
                    password,
                });
                if (res.status === 206) {
                    cookies.set('__SKILLASSESS_LOG_STATUS__', LOG_STATUS, {
                        expires: 1,
                        secure: true,
                    });
                    setIsAuthenticated(true);
                    if (response?.data?.is_registered) {//correct this thing
                        cookies.set('__REGISTRATION_COMPLETED__', 'yes');
                    } else {
                        // cookies.remove('__REGISTRATION_COMPLETED__', { path: '/' });
                        cookies.set('__REGISTRATION_COMPLETED__', 'no');
                    }
                }
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || 'Network issue, please try again later';

            if (error?.response?.status === 401) {
                setIsVerified(false);
                showAlert('Your Account is not verified please verify it!');
                navigate('/auth');
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden">
                <img src={Image14} alt="bg-14" className="w-screen h-screen object-cover" />
            </div>
            <div className="absolute h-screen w-screen opacity-90 bg-black grid place-items-center"></div>
            <div className="absolute h-screen w-screen grid place-items-center">
                <form
                    onSubmit={handleLogin}
                    className="bg-white  rounded-xl md:rounded-md w-[95%] md:w-[450px] min-h-[100px] px-4 py-6"
                >
                    <div className="flex items-start justify-between">
                        <TextHeading className="text-black text-sm md:text-2xl font-semibold">
                            Login to VILS SkillAssess
                        </TextHeading>
                        {!isMobile && <img src={Logo} alt="logo" className="h-10" />}
                    </div>

                    <div className="my-4 flex flex-col gap-4">
                        <div>
                            <p className="p-1 text-sm">Enter Mail Id</p>
                            <Input
                                placeholder="john@vils.ai"
                                className="outline-green-600"
                                value={email}
                                setValue={setEmail}
                            />
                        </div>
                        <div>
                            <p className="p-1 text-sm">Enter Password</p>
                            <Input
                                placeholder="************"
                                className="outline-green-600"
                                type="password"
                                eye={true}
                                value={password}
                                setValue={setPassword}
                            />
                        </div>
                    </div>

                    <p className="text-sm text-center text-red-500 my-2">{error}</p>

                    <Button
                        label="Login"
                        type="submit"
                        className="bg-green-600 hover:bg-green-700"
                        loading={loading}
                        loaderLargeArcColor="text-white"
                        loaderSmallArcColor="fill-green-600"
                    />

                    <div className="mt-2">
                        <p className="text-sm flex items-center justify-center gap-1">
                            Didn’t have an account?{' '}
                            <span
                                className="underline text-gray-600 cursor-not-allowed"
                                onClick={() => {
                                    // navigate('/auth/signup')
                                }}
                            >
                                Sign Up
                            </span>
                        </p>
                    </div>
                    {/* <div className="flex gap-2 mt-3 items-center justify-center">
                        <div className="pt-2">Forgot your password?</div>
                        <div
                            className="cursor-pointer text-primary underline pt-2"
                            onClick={() => {
                                navigate('/auth/forget-password');
                            }}
                        >
                            Forget Password
                        </div>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
