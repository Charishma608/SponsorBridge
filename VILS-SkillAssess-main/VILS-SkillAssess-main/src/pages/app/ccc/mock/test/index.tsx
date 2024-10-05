import { useEffect, useState } from 'react';
import TestScreen from './TestScreen';
import Button from 'components/Buttons';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';
import InternetSpeedCheckerProvider, {
    useInternetSpeedChecker,
} from 'providers/InternetSpeedCheckerProvider';
import { axiosV2 } from 'configs/axios.config';

export default function CCCReadingTest() {
    return (
        <InternetSpeedCheckerProvider>
            <Controller />
        </InternetSpeedCheckerProvider>
    );
}

export function Controller() {
    const [instructionsRead, setInstructionsRead] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const testId = 'mock-interview-assessment-sfwytfkrg-dufgyg-e36aa-aj-fjghg-sidhfj';

    const fetchTestInfo = async () => {
        try {
            const res = await axiosV2.get(`/mock-interview/assessment/${testId}/question/all`);
            if (res.status === 200) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTestInfo();
    }, []);

    if (!instructionsRead) return <InstructionsScreen setInstructionsRead={setInstructionsRead} />;
    return <TestScreen data={data} testId={testId} />;
}

interface InstructionsProps {
    setInstructionsRead: React.Dispatch<React.SetStateAction<boolean>>;
}
export function InstructionsScreen({ setInstructionsRead }: InstructionsProps) {
    const { handleGoToFullScreen } = useFullScreenDetector();
    const [ok, setOk] = useState<boolean>(false);

    const { speed } = useInternetSpeedChecker();

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <div className="w-full py-3 shadow-lg px-4">
                <h2 className="font-bold text-3xl py-2 text-primary">
                    {' '}
                    Mock Interview Instructions:
                </h2>
            </div>
            <div className="w-full flex-1 overflow-y-auto flex flex-col gap-4 px-4 py-4">
                <div className="p-3 bg-primary/20">Important things to keep in mind!</div>
                <div>
                    <p>
                        There are a total of 14 questions, and each question is for 1 minute maximum
                    </p>
                    <p>You will have to answer at least 40 secs for each question</p>
                    <p className="font-semibold mt-4">
                        There are no right or wrong answers to these questions. Speak out your
                        thoughts
                    </p>
                    <p className="font-semibold mt-4">
                        The results will be accurate if you are yourself during the test
                    </p>
                    <div className="flex flex-col text-primary mt-4 font-semibold gap-1">
                        <p>Your current internet speed: {speed?.toFixed(2)} Mbps</p>
                        <p>Minimum required speed: 512kbps </p>
                    </div>
                </div>
            </div>
            <div className="w-full py-4 px-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input
                        className="h-4 w-4"
                        checked={ok}
                        type="checkbox"
                        onChange={() => {
                            setOk((prev) => !prev);
                        }}
                    />
                    <p className="font-semibold">I understand</p>
                </div>
                <Button
                    label="Proceed"
                    onClick={() => {
                        if (!ok) return;
                        handleGoToFullScreen();
                        setInstructionsRead(true);
                    }}
                    className={`px-8 w-fit ${
                        ok ? 'bg-primary' : 'bg-slate-500 cursor-not-allowed'
                    }`}
                />
            </div>
        </div>
    );
}
