// Internal Imports
import { useState } from 'react';

// Assets
import Logo from 'assets/svgs/Logo.svg';

// Components
import FullScreen from 'components/FullScreen';
import TextHeading from 'components/Texts/TextHeading';
import Input from 'components/Inputs';
import Button from 'components/Buttons';

// Hooks
import { useCoding } from 'providers/CodingProvider';

const LoginPage = () => {
    const [password, setPassword] = useState<string>('');
    const { isLoading, loginHandler } = useCoding();

    return (
        <FullScreen>
            <div className="h-full w-full flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    <img src={Logo} alt="logo" className="h-12" />
                    <div>
                        <TextHeading>
                            Welcome to <span className="text-black"> {'< Coding Pro />'} </span>
                        </TextHeading>
                        <p className="text-gray-600 text-sm mt-1">
                            Your one stop solution to crack any Coding OA and to land your dream job
                        </p>
                    </div>
                </div>

                <div>
                    <Input
                        placeholder="Re-enter your password"
                        className="rounded-md w-[400px]"
                        value={password}
                        setValue={setPassword}
                        type="password"
                        eye
                    />
                    <div className="mt-2 flex items-center justify-center">
                        <p className="font-semibold text-primary text-sm cursor-pointer">
                            Forget Password ?
                        </p>
                    </div>
                </div>

                <Button
                    label="Log In"
                    className="w-[200px]"
                    onClick={() => {
                        loginHandler(password);
                    }}
                    loading={isLoading}
                />
            </div>
        </FullScreen>
    );
};

export default LoginPage;
