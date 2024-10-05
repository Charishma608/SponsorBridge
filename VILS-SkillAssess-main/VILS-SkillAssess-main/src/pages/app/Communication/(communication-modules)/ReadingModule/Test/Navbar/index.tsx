// Components
import ExitTestModal from '../Modals/ExitTestModal';
import SubmitTestModal from '../Modals/SubmitTestModal';
import Button from 'components/Buttons';

// Hooks
import { useTestContext } from '../TestProvider';
import { useAlert } from 'providers/AlertProvider';

// Configs
import axiosV1 from 'configs/axios.config';

// Internal Imports
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

const Navbar = () => {
    const { timer, testId, solutions, startTimer, exitButtonPressed, setExitButtonPressed } =
        useTestContext();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
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
            const formattedTime = formatTime(40 * 60 - timer, 'HH-MM-SS');
            const body = {
                time_used: formattedTime,
                questions: solutions,
            };

            const response = await axiosV1.post(`/reading/assessment/${testId}/submit`, body);

            if (response.status === 201) {
                const navBackUrl = '/gap-analysis';

                setSubmitButtonPressed(false);
                showAlert(
                    'Thank you for submitting your test! Your report will be generated shortly, and we appreciate your patience in awaiting the results',
                    () => {
                        handleExitFullScreen();
                        navigate(-2);
                    },
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="border-[1.5px] flex-col sm:flex-row border-gray-300 p-2 flex sm:justify-between sm:items-center rounded-md">
                <div className="flex items-center gap-3">
                    <p className="text-primary font-semibold ps-2 md:border-e-[1.5px] border-gray-300 pe-4">
                        Reading Test
                    </p>
                    <span className="hidden md:block text-sm">Test Duration ( 14 Mins )</span>
                    <div className="flex flex-1 gap-1 md:hidden justify-end  ">
                        {/* <Button
                            label="Exit Test"
                            className="rounded-full w-fit px-2 lg:px-8 bg-red-600"
                            onClick={() => {
                                setExitButtonPressed(true);
                            }}
                        /> */}
                        <Button
                            label="Submit Test"
                            className="bg-green-600 px-2 lg:px-8 w-fit rounded-full"
                            onClick={() => {
                                setSubmitButtonPressed(true);
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <p className="ps-2 sm:ps-0 text-sm text-gray-700 w-[300px] sm:text-end">
                        Remaining Time : {formatTime(timer)}
                    </p>
                    <div className="hidden md:flex gap-1 ">
                        {/* <Button
                            label="Exit Test"
                            className="rounded-md w-fit px-2 lg:px-8 bg-red-600"
                            onClick={() => {
                                setExitButtonPressed(true);
                            }}
                        /> */}
                        <Button
                            label="Submit Test"
                            className="bg-green-600 px-2 lg:px-8 w-fit rounded-md"
                            onClick={() => {
                                setSubmitButtonPressed(true);
                            }}
                        />
                    </div>
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
        </>
    );
};

export default Navbar;
