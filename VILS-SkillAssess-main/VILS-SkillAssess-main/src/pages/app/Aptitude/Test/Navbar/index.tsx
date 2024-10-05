// Internal Imports
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import ExitTestModal from '../Modals/ExitTestModal';
import SubmitTestModal from '../Modals/SubmitTestModal';
import Button from 'components/Buttons';

// Configs
import axios from 'configs/axios.config';

// Hooks
import { useTestContext } from '../TestProvider';
import { useAlert } from 'providers/AlertProvider';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

const Navbar = () => {
    const {
        exitButtonPressed,
        setExitButtonPressed,
        testId,
        timePerQuestion,
        timer,
        data,
        solutions,
    } = useTestContext();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { handleExitFullScreen } = useFullScreenDetector();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const referenceBackId = searchParams.get('referenceBackId');

    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);

    const handleSubmitTest = useCallback(async () => {
        let payload: any = {
            total_time_used: timePerQuestion - timer,
            test_name: data?.title,
            number_of_questions: data?.number_of_questions,
            questions: solutions,
        };

        try {
            const res = await axios.post(`/aptitude/${testId}/submit-test`, payload);
            if (res.status === 201) {
                const navBackUrl = '/gap-analysis';

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
    }, [
        testId,
        timePerQuestion,
        timer,
        data,
        solutions,
        showAlert,
        handleExitFullScreen,
        navigate,
        ref,
        referenceBackId,
    ]);
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
        if (timer === 0) {
            handleSubmitTest();
        }
    }, [timer, handleSubmitTest]);

    return (
        <>
            <div className="w-full border-[1.5px] border-gray-300 rounded-md p-2 md:flex items-center justify-between hidden">
                <div className="flex gap-2 items-end">
                    <p className="text-primary font-semibold ps-2 border-e-[1.5px] border-gray-300 pe-4">
                        Aptitude Test
                    </p>
                    <p className="text-sm">Test Duration (25 Mins)</p>
                </div>
                <div className="flex gap-2">
                    {/* <Button
                        onClick={() => {
                            setExitButtonPressed(true);
                        }}
                        label="Exit Test"
                        className="rounded-md w-fit px-2 lg:px-8 bg-red-600"
                    /> */}
                    <Button
                        label="Submit Test"
                        className="rounded-md w-fit px-2 lg:px-8"
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
                        onSuccess={handleSubmitTest}
                    />
                )}
            </div>
            <div className="w-full border-[1.5px] gap-2 border-gray-300 rounded-md p-2 flex flex-col items-center justify-between md:hidden">
                <div className="flex  justify-between items-center w-full">
                    <p className="text-primary font-semibold ps-2  pe-4">Aptitude Test</p>
                    {/* <p className="text-sm">Test Duration (25 Mins)</p> */}
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                setExitButtonPressed(true);
                            }}
                            label="Exit Test"
                            className="rounded-none w-fit  text-xs md:text-sm  lg:px-8 bg-red-600"
                        />
                        <Button
                            label="Submit Test"
                            className="rounded-none w-fit text-xs md:text-sm lg:px-8"
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
                            onSuccess={handleSubmitTest}
                        />
                    )}
                </div>
                <div className="flex flex-col  items-center w-full p-2 mt-3">
                    <div className="text-sm">Test Duration (25 Mins)</div>

                    <div className="text-sm">Time Remaining : {formatTime(timer)}</div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
