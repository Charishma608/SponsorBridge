// Components
import ExitTestModal from '../Modals/ExitTestModal';
import SubmitTestModal from '../Modals/SubmitTestModal';
import Button from 'components/Buttons';

// Hooks
import { useTestContext } from '../TestProvider';

// Configs
import axios from 'configs/axios.config';

// Internal Imports
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Utils
import { countWords } from 'utils/textUtils';
import { useAlert } from 'providers/AlertProvider';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

const Navbar = () => {
    const {
        data,
        timer,
        testId,
        idMap,
        solutions,
        startTimer,
        exitButtonPressed,
        setExitButtonPressed,
    } = useTestContext();
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
            const payload: any = {
                tasks: [],
            };

            const tasks = Object.keys(solutions);
            for (let i = 0; i < tasks.length; i++) {
                payload.tasks.push(solutions[tasks[i]]);
            }

            const response = await axios.post(`/writing/assessment/${testId}/submit`, payload);

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
            <div className="border-[1.5px] flex-col sm:flex-row border-gray-300 p-2 flex sm:justify-between sm:items-center rounded-md">
                <div className="flex items-center gap-3">
                    <p className="text-primary font-semibold ps-2 border-e-[1.5px] border-gray-300 pe-4">
                        Writing Test
                    </p>
                    <span className="text-sm">
                        Test Duration ( {data?.duration_in_minutes} Mins )
                    </span>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <p className="ps-2 sm:ps-0 text-sm text-gray-700 w-[300px] sm:text-end">
                        Remaining Time : {formatTime(timer)}
                    </p>
                    <div className="flex gap-1">
                        {/* <Button
                            label="Exit Test"
                            className="bg-red-600 px-2 lg:px-8 w-fit rounded-md"
                            onClick={() => {
                                setExitButtonPressed(true);
                            }}
                        /> */}
                        <Button
                            label="Submit Test"
                            className="bg-green-600 px-2 lg:px-8 w-fit rounded-md"
                            onClick={() => {
                                const answersCountTask1 = solutions?.[idMap?.['task-1']]
                                    ? countWords(solutions?.[idMap?.['task-1']]?.answer)
                                    : null;
                                const answersCountTask2 = solutions?.[idMap?.['task-2']]
                                    ? countWords(solutions?.[idMap?.['task-2']]?.answer)
                                    : null;

                                if (answersCountTask1 === null && answersCountTask2 === null) {
                                    showAlert(
                                        'You should answer at least one question before submitting.',
                                    );
                                    return;
                                }

                                if (
                                    answersCountTask1 != null &&
                                    answersCountTask2 != null &&
                                    answersCountTask1 > 150 &&
                                    (answersCountTask2 < 250 || answersCountTask2 > 300)
                                ) {
                                    showAlert(
                                        'You should write the answer within 150 words for Task 1 and a minimum of 250 words and a maximum of 300 words for Task 2.',
                                    );
                                    return;
                                } else if (answersCountTask1 != null && answersCountTask1 > 150) {
                                    showAlert(
                                        'You should write the answer within 150 words for Task 1.',
                                    );
                                    return;
                                } else if (
                                    answersCountTask2 != null &&
                                    (answersCountTask2 < 250 || answersCountTask2 > 300)
                                ) {
                                    showAlert(
                                        'You should write atleast a minimum of 250 words and a maximum of 300 words for Task 2.',
                                    );
                                    return;
                                }

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
