// Assets
import Logo from 'assets/svgs/Logo.svg';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import Button from 'components/Buttons';

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

    return (
        <div className="w-screen h-screen px-[10%] m-auto pb-5 overflow-scroll">
            <div className="flex items-center justify-between py-4">
                <TextSubHeading className="text-primary">Instructions</TextSubHeading>
                <img src={Logo} alt="logo" className="h-10" />
            </div>
            <div className="bg-blue-50 p-4">
                <p className="text-sm">
                    This test has various number questions to practice on. All the best!
                </p>
            </div>
            <div className="flex flex-col gap-4 my-4 h-[70vh] overflow-y-scroll scroll">
                <div className="flex flex-col gap-2 py-4 border-b-[1.5px] border-gray-300">
                    <p className="font-semibold">Welcome to the InterviewPrep Hub section</p>
                    <p className="text-sm">
                        This test evaluates your technical expertise by assessing your proficiency
                        in specific skills or knowledge related to a particular subject or field.
                        Please read the following instructions carefully before you begin.
                    </p>
                </div>
                <div className="flex flex-col gap-2 pb-4 border-b">
                    <p className="font-semibold">Test Details</p>
                    <p className="text-sm">
                        This section consists of 10 questions. Pay close attention to the questions,
                        as your responses will be based on them.
                    </p>
                </div>
                <div className="flex flex-col gap-2 pb-4 border-b">
                    <p className="font-semibold">Time Allotment</p>
                    <p className="text-sm">
                        You are allocated a total of 65 seconds to answer each question. It is
                        crucial to manage your time effectively to comprehend and answer the
                        questions within the given timeframe.
                    </p>
                </div>
                <div className="flex flex-col gap-2 pb-4 border-b">
                    <p className="font-semibold">Metrics Evaluated</p>
                    <p className="text-sm">
                        This section assesses your technical and communicational proficiency, and
                        also measures your interview analysis.
                    </p>
                </div>
                <div className="flex flex-col gap-4 pb-4 border-b">
                    <p className="font-semibold">Retake and Test Completion</p>
                    <div className="flex flex-col gap-3">
                        <p>
                            <span className="font-semibold">A. Exiting : </span>
                            <span className="text-sm">
                                You have the choice to exit the test at any point during the
                                assessment.
                            </span>
                        </p>
                        <p>
                            <span className="font-semibold">B. Retake Option : </span>
                            <span className="text-sm">
                                You also have the option to retake the test, regardless of any
                                previous attempts. The latest score will be considered for
                                evaluation.
                            </span>
                        </p>
                    </div>
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
                        {/* <p className="ps-4">Ping : {PING} Seconds</p> */}
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
