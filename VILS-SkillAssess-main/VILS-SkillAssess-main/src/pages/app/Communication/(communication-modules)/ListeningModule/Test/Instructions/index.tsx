// Assets
import Logo from 'assets/svgs/Logo.svg';
import { useEffect, useCallback } from 'react';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import Button from 'components/Buttons';
import axiosInstance from 'configs/axios.config';

// Hooks
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';
import { useState } from 'react';
import { useInternetSpeedChecker } from 'providers/InternetSpeedCheckerProvider';

interface InstructionsPageProps {
    setInstructionRead: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionsPage: React.FC<InstructionsPageProps> = ({ setInstructionRead }) => {
    const { handleGoToFullScreen } = useFullScreenDetector();
    const { speed } = useInternetSpeedChecker();
    const [ok, setOk] = useState<boolean>(false);
    const [data, setData] = useState<any[]>();
    const url = window.location.href;
    const urlParams = new URL(url);
    const instructionId = urlParams.searchParams.get('iId');
    const fetchTest = useCallback(async () => {
        try {
            const res = await axiosInstance(`/instruction/ASSESSMENT/${instructionId}/details`);

            setData(res?.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, [instructionId]);

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

    return (
        <div className="w-screen h-[100vh] px-[10%] m-auto ">
            <div className="flex items-center justify-between py-4">
                <TextSubHeading className="text-primary">Instructions</TextSubHeading>
                <img src={Logo} alt="logo" className="h-10" />
            </div>
            <div className="bg-blue-50 p-4">
                <p className="text-sm">
                    This test has various number questions to practice on. All the best!
                </p>
            </div>
            <div className="flex flex-col gap-4 my-4 h-[60vh] overflow-y-scroll scroll">
                <div className="flex flex-col gap-2 py-4 border-b-[1.5px] border-gray-300">
                    {data?.map((item, index) => (
                        <div className="flex flex-col gap-2 py-4 border-b-[1.5px] border-gray-300">
                            <p className="font-semibold">{item.heading}</p>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Important Notic :</p>
                    <p className="font-semibold">
                        To ensure an accurate evaluation, we recommend an internet speed of at least{' '}
                        512 Kbps . Slower connections may cause interruptions and could result in
                        the cancellation of the interview, potentially affecting the accuracy of
                        your report. If you agree to this requirement, please then 'Proceed'.
                    </p>

                    <div className="flex items-center text-primary mt-4 font-semibold divide-x-2">
                        <p className="pe-4">Your current Speed : {speed?.toFixed(2)} Mbps</p>
                        <p className="ps-4">Minimum required speed : 512kbps </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            className="h-4 w-4"
                            checked={ok}
                            type="checkbox"
                            onChange={() => {
                                setOk((prev) => !prev);
                            }}
                        />
                        <p className="font-semibold">I Understand</p>
                    </div>
                </div>
                <p className="font-semibold">
                    Note : If you encounter any technical issues, please reach out to our support
                    team.
                </p>
            </div>
            <div className="my-4 flex justify-end">
                <Button
                    label="Proceed"
                    onClick={() => {
                        if (!ok) return;
                        handleGoToFullScreen();
                        setInstructionRead(true);
                    }}
                    className={`px-8 w-fit ${
                        ok ? 'bg-primary' : 'bg-slate-500 cursor-not-allowed'
                    }`}
                />
            </div>
        </div>
    );
};

export default InstructionsPage;
