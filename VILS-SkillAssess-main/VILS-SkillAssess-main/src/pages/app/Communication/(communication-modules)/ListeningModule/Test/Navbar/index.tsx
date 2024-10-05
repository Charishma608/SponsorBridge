// Components
import Button from 'components/Buttons';
import ExitTestModal from '../Modals/ExitTestModal';
import SubmitTestModal from '../Modals/SubmitTestModal';

// Hooks
import { useTestContext } from '../TestProvider';

// Configs
import axiosV1 from 'configs/axios.config';

// Internal Imports
import { useNavigate } from 'react-router-dom';
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

            const response = await axiosV1.post(`/listening/assessment/${testId}/submit`, body);

            if (response.status === 201) {
                handleExitFullScreen();
                navigate(-2);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-[1.5px] border-gray-300 p-2 flex justify-between items-center rounded-md">
            <div className="flex items-center gap-3">
                <p className="text-primary font-semibold ps-2 border-e-[1.5px] border-gray-300 pe-4">
                    Listening Test
                </p>
                <span className="text-sm hidden lg:block">
                    Test Duration ( {data?.duration_in_minutes} Mins )
                </span>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm hidden lg:block text-gray-700 w-[300px] text-end">
                    Remaining Time : {formatTime(timer)}
                </p>
                <div className="flex gap-1">
                    {/* <Button
                        label="Exit Test"
                        className="bg-red-600 w-fit md:rounded-md rounded-full  px-2 lg:px-8"
                        onClick={() => {
                            setExitButtonPressed(true);
                        }}
                    /> */}
                    <Button
                        label="Submit Test"
                        className="bg-green-600 lg:px-8 w-fit  md:rounded-md rounded-full  px-2 "
                        onClick={() => {
                            setSubmitButtonPressed(true);
                        }}
                    />
                </div>
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
    );
};

export default Navbar;
