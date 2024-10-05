// External Imports
import { FaUserAlt } from 'react-icons/fa';
import { GrLinkNext } from 'react-icons/gr';
import Webcam from 'react-webcam';

// Internal Imports
import { useCallback, useEffect, useRef, useState } from 'react';

// Configs
import axios from 'configs/axios.config';

// Hooks
import { useTestContext } from '../TestProvider';
import { useAlert } from 'providers/AlertProvider';

// Components
import Button from 'components/Buttons';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalWrapper from 'components/ModalWrapper';
import { BUFFER_TIME, URL } from 'configs/socket.config';
import { nanoid } from 'nanoid';

const VideoScreen: React.FC = () => {
    const {
        startTimer,
        stopTimer,
        timer,
        timePerQuestion,
        handleGoToNextQuestion,
        totalQuestion,
        currentQuestionIndex,
        currentQuestionData,
        setTimer,
        testId,
    } = useTestContext();
    const { handleExitFullScreen } = useFullScreenDetector();
    const navigate = useNavigate();
    const WebCamRef = useRef<Webcam>(null);
    const AudioRecorderRef = useRef<MediaRecorder | null>(null);
    const MediaRecorderRef = useRef<MediaRecorder | null>(null);
    const IsInitialMount = useRef(true);
    const wsRef = useRef<WebSocket | null>(null);
    const [currentQuestionId, setCurrentQuestionId] = useState<string>('');

    const [recordedChunks, setRecordedChunks] = useState<[]>([]);
    const [isCapturing, setIsCapturing] = useState<boolean>(false);
    const [recordingState, setRecordingState] = useState<
        | 'IDLE'
        | 'RECORDING_STOPABLE'
        | 'RECORDING_UNSTOPABLE'
        | 'STOPPED'
        | 'SAVING'
        | 'SAVED'
        | 'TIME_OVER'
        | 'SUBMITTING_TEST'
    >('IDLE');
    const [solutions, setSolutions] = useState<{ id: string; video_id: string }[]>([]);
    const TIME_TO_START = 5; // In Seconds
    const [startingTimer, setStartingTimer] = useState<number>(TIME_TO_START);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const referenceBackId = searchParams.get('referenceBackId');

    const { showAlert } = useAlert();

    const connectToSocketServer = (id: string) => {
        if (!id) return;
        wsRef.current = new WebSocket(URL + `/${id}`);

        wsRef.current.onopen = () => {};

        wsRef.current.onclose = (e) => {};

        wsRef.current.onerror = (e) => {
            console.log('Websocket Server Error', e);
        };
    };

    const disconnectFromServer = () => {
        wsRef.current?.close();
    };

    const goToIdleState = useCallback(() => {
        setRecordingState('IDLE');
        stopTimer();
        setTimer(timePerQuestion);
    }, [stopTimer, setTimer, timePerQuestion]);

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            if (data.size > 0) {
                setRecordedChunks((prev: any) => prev.concat(data));
                if (wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(data);
                }
            }
        },
        [setRecordedChunks],
    );

    const handleSetAnswers = useCallback(async () => {
        if (recordedChunks.length) {
            disconnectFromServer();
            setRecordingState('SAVING');

            try {
                const currentSolution = {
                    id: currentQuestionData?.id,
                    video_id: currentQuestionId,
                };

                setSolutions((prev) => {
                    prev.push(currentSolution);
                    return prev;
                });
                handleGoToNextQuestion();
                goToIdleState();
            } catch (error) {
                console.log(error);
                showAlert('Some error has been occured, please try again.');
                goToIdleState();
            }
        }
    }, [
        currentQuestionData?.id,
        currentQuestionId,
        goToIdleState,
        handleGoToNextQuestion,
        recordedChunks.length,
        showAlert,
    ]);

    const handleSubmitTest = async () => {
        const navBackUrl = '/gap-analysis';

        if (solutions.length === 0) {
            showAlert(
                'You have not answered anything, your response for this test will not be generated.',
                () => {
                    handleExitFullScreen();
                    navigate(-3);
                },
            );
            return;
        }

        try {
            setRecordingState('SUBMITTING_TEST');

            const body = {
                time_used: '00:05:08',
                questions: solutions,
            };

            const res = await axios.post(`/speaking/assessment/${testId}/submit`, body);
            if (res.status === 201) {
                showAlert(
                    'Thank you for submitting your test! Your report will be generated shortly, and we appreciate your patience in awaiting the results',
                    () => {
                        handleExitFullScreen();
                        navigate(-3);
                    },
                );
            }
        } catch (error) {
            console.log(error);
            showAlert('SOME ERROR HAS BEEN ENCOUNTERED. PLEASE CHECK THE CONSOLE');
        }
    };

    const startRecording = useCallback(async () => {
        const ansId = nanoid();
        setCurrentQuestionId(ansId);
        connectToSocketServer(ansId);

        try {
            MediaRecorderRef.current = new MediaRecorder(WebCamRef.current!.stream!, {
                mimeType: 'video/webm',
            });
            MediaRecorderRef?.current?.addEventListener('dataavailable', handleDataAvailable);
            MediaRecorderRef?.current?.start(BUFFER_TIME);

            setIsCapturing(true);
            if (recordingState === 'IDLE') setRecordingState('RECORDING_UNSTOPABLE');
            else if (recordingState === 'STOPPED') setRecordingState('RECORDING_STOPABLE');
            startTimer();
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleDataAvailable, WebCamRef, MediaRecorderRef, startTimer]);

    const stopRecording = useCallback(async () => {
        try {
            disconnectFromServer();
            MediaRecorderRef?.current?.stop();
            if (AudioRecorderRef && AudioRecorderRef.current) {
                AudioRecorderRef.current.stop();
            }
            setIsCapturing(false);
            setRecordingState('STOPPED');
            stopTimer();
        } catch (error) {
            console.log(error);
        }
    }, [MediaRecorderRef, stopTimer]);

    useEffect(() => {
        if (currentQuestionIndex === totalQuestion) return;
        setStartingTimer(TIME_TO_START);
    }, [currentQuestionIndex, totalQuestion]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (startingTimer >= 1) {
            interval = setInterval(() => {
                setStartingTimer((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            startRecording();
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setStartingTimer, startingTimer]);

    useEffect(() => {
        if (timer === 0) {
            stopRecording();
            setTimer((prevSeconds) => prevSeconds - 1);
            setRecordingState('TIME_OVER');
            showAlert('Aha, Times up!!, Please click Save & Next to continue');
        } else if (timer + 10 === timePerQuestion) {
            setRecordingState('RECORDING_STOPABLE');
        }
    }, [timer, timePerQuestion, stopRecording, showAlert, setTimer]);

    useEffect(() => {
        if (IsInitialMount.current) {
            IsInitialMount.current = false;
        } else {
            if (!isCapturing) {
            }
        }
    }, [isCapturing]);

    return (
        <>
            {startingTimer > 0 && currentQuestionIndex < totalQuestion && (
                <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden">
                    <ModalWrapper>
                        <div className="flex flex-col inter items-center">
                            <p className="text-white text-2xl">Starting In</p>
                            <p className="text-[10rem] text-white text-center">{startingTimer}</p>
                        </div>
                    </ModalWrapper>
                </div>
            )}
            <div className="md:border-[1.5px]  border-gray-300 md:h-2/3 rounded-md md:overflow-hidden flex  flex-col md:flex-row bg-gray-50 relative">
                {/* Mobile view for video starts */}
                <div className="w-full md:hidden flex items-end gap-5 p-4 border-t-2">
                    {totalQuestion > currentQuestionIndex &&
                        recordingState !== 'TIME_OVER' &&
                        recordingState !== 'STOPPED' && (
                            <Button
                                label={
                                    recordingState === 'IDLE'
                                        ? 'Start Answering'
                                        : recordingState === 'SAVING'
                                        ? 'Saving your response ...'
                                        : 'Stop Answering'
                                }
                                className={`py-2 px-8 ${
                                    recordingState === 'IDLE'
                                        ? 'bg-primary'
                                        : recordingState === 'SAVING'
                                        ? 'bg-primary'
                                        : 'bg-red-600'
                                } rounded-md ${
                                    recordingState === 'RECORDING_UNSTOPABLE'
                                        ? 'cursor-not-allowed bg-slate-400'
                                        : 'cursor-pointer'
                                }`}
                                onClick={() => {
                                    if (recordingState === 'IDLE') {
                                        startRecording();
                                    } else if (recordingState === 'RECORDING_STOPABLE') {
                                        stopRecording();
                                    }
                                }}
                            />
                        )}
                    {(recordingState === 'STOPPED' || recordingState === 'TIME_OVER') &&
                        totalQuestion > currentQuestionIndex && (
                            <button
                                className="py-2 px-8 bg-primary rounded-md flex items-center gap-2"
                                onClick={async () => {
                                    setRecordedChunks([]);
                                    await handleSetAnswers();
                                }}
                            >
                                <p className="text-nowrap">Save & Next</p> <GrLinkNext />
                            </button>
                        )}
                    {/* {recordingState === 'IDLE' && totalQuestion > currentQuestionIndex && (
                    <button
                        className="py-2 px-8 bg-primary-skip rounded-md flex items-center gap-4"
                        onClick={async () => {
                            setRecordedChunks([]);
                            setTimer(timePerQuestion);
                            handleGoToNextQuestion();
                        }}
                    >
                        Skip
                    </button>
                )} */}
                    {totalQuestion === currentQuestionIndex &&
                        recordingState !== 'RECORDING_STOPABLE' &&
                        recordingState !== 'RECORDING_UNSTOPABLE' &&
                        recordingState !== 'SAVING' && (
                            <Button
                                className="py-2 px-8 bg-primary rounded-md flex items-center gap-4"
                                onClick={handleSubmitTest}
                                label="Submit Test"
                                loading={recordingState === 'SUBMITTING_TEST'}
                            />
                        )}
                    <div>
                        <Webcam
                            ref={WebCamRef}
                            className="w-full h-full object-cover rounded-2xl shadow-xl"
                            audio={true}
                            muted={true}
                            audioConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                        />
                    </div>
                </div>
                {/* Mobile view for video end */}

                <div className="md:border-r-[0.75px] hidden md:block mb-10 md:mb-0  border-[0.75px] md:border-0 rounded-xl md:rounded-none border-gray-400 flex-1">
                    <Webcam
                        ref={WebCamRef}
                        className="w-full md:h-full object-cover"
                        audio={true}
                        muted={true}
                        audioConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }}
                    />
                </div>
                <div className="border-l-[0.75px] border-gray-400 hidden md:flex-1 md:grid place-content-center">
                    <FaUserAlt className="text-7xl text-gray-500" />
                </div>

                <div className="left-1/2 md:bottom-2 text-sm text-white hidden md:flex gap-3 md:-translate-x-1/2 md:absolute font-inter">
                    {totalQuestion > currentQuestionIndex &&
                        recordingState !== 'TIME_OVER' &&
                        recordingState !== 'STOPPED' && (
                            <Button
                                label={
                                    recordingState === 'IDLE'
                                        ? 'Start Answering'
                                        : recordingState === 'SAVING'
                                        ? 'Saving your response ...'
                                        : 'Stop Answering'
                                }
                                className={`py-2 px-8 ${
                                    recordingState === 'IDLE'
                                        ? 'bg-primary'
                                        : recordingState === 'SAVING'
                                        ? 'bg-primary'
                                        : 'bg-red-600'
                                } rounded-md ${
                                    recordingState === 'RECORDING_UNSTOPABLE'
                                        ? 'cursor-not-allowed bg-slate-400'
                                        : 'cursor-pointer'
                                }`}
                                onClick={() => {
                                    if (recordingState === 'IDLE') {
                                        startRecording();
                                    } else if (recordingState === 'RECORDING_STOPABLE') {
                                        stopRecording();
                                    }
                                }}
                            />
                        )}
                    {(recordingState === 'STOPPED' || recordingState === 'TIME_OVER') &&
                        totalQuestion > currentQuestionIndex && (
                            <button
                                className="py-2 px-8 bg-primary rounded-md flex items-center gap-2"
                                onClick={async () => {
                                    setRecordedChunks([]);
                                    await handleSetAnswers();
                                }}
                            >
                                <p className="text-nowrap">Save & Next</p> <GrLinkNext />
                            </button>
                        )}
                    {/* {recordingState === 'IDLE' && totalQuestion > currentQuestionIndex && (
                    <button
                        className="py-2 px-8 bg-primary-skip rounded-md flex items-center gap-4"
                        onClick={async () => {
                            setRecordedChunks([]);
                            setTimer(timePerQuestion);
                            handleGoToNextQuestion();
                        }}
                    >
                        Skip
                    </button>
                )} */}
                    {totalQuestion === currentQuestionIndex &&
                        recordingState !== 'RECORDING_STOPABLE' &&
                        recordingState !== 'RECORDING_UNSTOPABLE' &&
                        recordingState !== 'SAVING' && (
                            <Button
                                className="py-2 px-8 bg-primary rounded-md flex items-center gap-4"
                                onClick={handleSubmitTest}
                                label="Submit Test"
                                loading={recordingState === 'SUBMITTING_TEST'}
                            />
                        )}
                </div>
            </div>
        </>
    );
};

export default VideoScreen;
