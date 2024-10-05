// Components
import Button from 'components/Buttons';
import ExitTestModal from '../Modals/ExitTestModal';
import SubmitTestModal from '../Modals/SubmitTestModal';

// Hooks
import { useTestContext } from '../TestProvider';

// Configs
import axiosV1 from 'configs/axios.config';

// Internal Imports
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

const Navbar = () => {
    const {
        data,
        timer,
        testId,
        solutions,
        startTimer,
        exitButtonPressed,
        setExitButtonPressed,
        stopTimer,
    } = useTestContext();
    const navigate = useNavigate();
    const { handleExitFullScreen } = useFullScreenDetector();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const referenceBackId = searchParams.get('referenceBackId');

    const [submitButtonPressed, setSubmitButtonPressed] = useState<boolean>(false);

    const formatTime = (seconds: number, format: string = 'Mins-Secs') => {
        if (format === 'Mins-Secs') {
            const mins = Math.floor(seconds / 60);
            const remainingSecs = seconds % 60;

            const minsString = mins > 0 ? `${mins} Min${mins !== 1 ? 's' : ''}` : '';
            const secsString =
                remainingSecs > 0 ? `${remainingSecs} Sec${remainingSecs !== 1 ? 's' : ''}` : '';

            return `${minsString}${mins > 0 && remainingSecs > 0 ? ' ' : ''}${secsString}`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const sec = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                sec,
            ).padStart(2, '0')}`;
        }
    };

    useEffect(() => {
        startTimer();
    }, [startTimer]);

    const handleSubmit = async () => {
        try {
            stopTimer();
            const formattedTime = formatTime(data.duration_in_minutes * 60 - timer, 'HH-MM-SS');
            const body = {
                time_taken: formattedTime,
                questions: solutions,
            };

            const response = await axiosV1.post(`/vocabulary/assessment/${testId}/Submit`, body);

            if (response.status === 201) {
                const navBackUrl = '/gap-analysis';

                handleExitFullScreen();
                navigate(-2);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="border-b-2 p-2 px-4 border-2 rounded-md hidden md:flex items-center justify-between">
                <p className="text-primary font-semibold">Vocabulary Test</p>
                <div className="flex gap-1">
                    {/* <Button
                        label="Exit Test"
                        className="bg-red-600 px-8 w-fit rounded-md"
                        onClick={() => {
                            setExitButtonPressed(true);
                        }}
                    /> */}
                    <Button
                        label="Submit Test"
                        className="bg-green-600 px-8 w-fit rounded-md"
                        onClick={() => {
                            setSubmitButtonPressed(true);
                        }}
                    />
                </div>
                {exitButtonPressed && <ExitTestModal />}
                {submitButtonPressed && (
                    <SubmitTestModal
                        onCancel={() => {
                            setSubmitButtonPressed(false);
                        }}
                        onSuccess={handleSubmit}
                    />
                )}
            </div>
            <div className="md:hidden">
                <div className="border-b-2 p-2 px-4 border-2 gap-2  rounded-md md:hidden flex items-center justify-between">
                    <p className="text-primary font-semibold">Vocabulary Test</p>
                    <div className="flex gap-1">
                        {/* <Button
                            label="Exit Test"
                            className="bg-red-600 text-xs md:text-sm  lg:px-2 w-fit rounded-md"
                            onClick={() => {
                                setExitButtonPressed(true);
                            }}
                        /> */}
                        <Button
                            label="Submit Test"
                            className="bg-green-600 text-xs md:text-sm  lg:px-2 w-fit rounded-md"
                            onClick={() => {
                                setSubmitButtonPressed(true);
                            }}
                        />
                    </div>
                    {exitButtonPressed && <ExitTestModal />}
                    {submitButtonPressed && (
                        <SubmitTestModal
                            onCancel={() => {
                                setSubmitButtonPressed(false);
                            }}
                            onSuccess={handleSubmit}
                        />
                    )}
                </div>
                <div className="flex justify-between items-center w-full p-2 mt-3">
                    {/* <div className="text-sm">Test Duration (25 Mins)</div> */}

                    <div className="text-sm">Time Remaining : {formatTime(timer)}</div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
