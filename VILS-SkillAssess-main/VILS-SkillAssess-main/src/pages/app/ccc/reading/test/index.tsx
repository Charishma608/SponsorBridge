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
    const testId = 'mock-interview-assessment-jgh48g-5e0b-4440-912d-fe56ef3e36aa-aj-fjghg-sidhfj';

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
            {/* <div className="w-full py-3 shadow-lg px-4">
                <h2 className="font-bold text-3xl py-2 text-primary">भाषा अध्ययन के निर्देश:</h2>
            </div>
            <div className="w-full flex-1 overflow-y-auto flex flex-col gap-4 px-4 py-4">
                <div className="p-3 bg-primary/20">याद रखने के लिए महत्वपूर्ण बातें!</div>
                <div>
                    <p>आपका वीडियो और ऑडियो रिकॉर्ड किया जाएगा। सुनिश्चित करें कि सिस्टम सेटिंग्स सही से सेट की गई हैं।</p>
                    <p>पाठ को अपनी सामान्य गति से और जोर से पढ़ें।</p>
                    <p className="font-semibold mt-4">लंबे विराम से बचें। अगर किसी शब्द को न पढ़ सकें, तो रुकें नहीं, बस आगे बढ़ें।</p>
                    <p className="font-semibold mt-4">इस खंड के लिए कुल समय 2 मिनट है।</p>
                    <div className="flex flex-col text-primary mt-4 font-semibold gap-1">
                        <p>आपकी वर्तमान स्पीड: {speed?.toFixed(2)} Mbps</p>
                        <p>न्यूनतम आवश्यक स्पीड : 512kbps </p>
                    </div>
                </div>
            </div> */}
            <div className="w-full py-3 shadow-lg px-4">
                <h2 className="font-bold text-3xl py-2 text-primary">Reading Instructions:</h2>
            </div>
            <div className="w-full flex-1 overflow-y-auto flex flex-col gap-4 px-4 py-4">
                <div className="p-3 bg-primary/20">Important things to keep in mind!</div>
                <div>
                    <p>
                        Your video and audio will be recorded for the section, Make sure you have
                        enabled system settings before you proceed further.
                    </p>
                    <p>Read out the passage out loud at your regular reading pace.</p>
                    <p className="font-semibold mt-4">
                        Don't take unnecessary long pauses and stop at it if you can't read the
                        word, just move on to the next word and continue reading.
                    </p>
                    <p className="font-semibold mt-4">
                        Total time for this section is only 2 mins at max.
                    </p>
                    <div className="flex flex-col text-primary mt-4 font-semibold gap-1">
                        <p>your current internet speed: {speed?.toFixed(2)} Mbps</p>
                        <p>minimum required speed : 512kbps </p>
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
                    {/* <p className="font-semibold">मैं समझता हूँ</p> */}
                    <p className="font-semibold">I Understand</p>
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
