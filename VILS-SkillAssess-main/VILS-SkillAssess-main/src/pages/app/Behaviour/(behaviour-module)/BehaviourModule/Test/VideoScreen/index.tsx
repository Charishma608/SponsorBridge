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

// Components
import Button from 'components/Buttons';
import { useAlert } from 'providers/AlertProvider';

const VideoScreen: React.FC = () => {
    const {
        startTimer,
        stopTimer,
        timer,
        timePerQuestion,
        handleGoToNextQuestion,
        totalQuestion,
        currentQuestionIndex,
        setTimer,
        testId,
    } = useTestContext();

    const WebCamRef = useRef<Webcam>(null);
    const MediaRecorderRef = useRef<MediaRecorder | null>(null);
    const IsInitialMount = useRef(true);

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
    const { showAlert } = useAlert();
    const [solutions, setSolutions] = useState<{ response_url: string; time_used: string }[]>([]);

    const goToIdleState = useCallback(() => {
        setRecordingState('IDLE');
        stopTimer();
        setTimer(timePerQuestion);
    }, [stopTimer, setTimer, timePerQuestion]);

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            if (data.size > 0) {
                setRecordedChunks((prev: any) => prev.concat(data));
            }
        },
        [setRecordedChunks],
    );

    const handleSetAnswers = async () => {
        if (recordedChunks.length) {
            setRecordingState('SAVING');
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const base64URL = (reader?.result as string)?.split(',')[1];
                    const res = await axios.post('/upload-video', {
                        base64_webm_video: base64URL,
                    });
                    if (res.status === 201) {
                        const currentSolution = {
                            response_url: res.data.video_url,
                            time_used: '00:05:08',
                        };
                        setSolutions((prev) => {
                            prev.push(currentSolution);
                            return prev;
                        });
                        handleGoToNextQuestion();
                    } else {
                        showAlert('Some error has been occured, please try again.');
                        console.log(res);
                        goToIdleState();
                    }
                } catch (error) {
                    console.log(error);
                    showAlert('Some error has been occured, please try again.');
                    goToIdleState();
                }
            };
            reader.readAsDataURL(blob);
        }
    };

    const handleSubmitTest = async () => {
        if (solutions.length === 0) {
            showAlert('Please answer atleast one question before submitting the test.');
            return;
        }

        try {
            setRecordingState('SUBMITTING_TEST');
            const body = {
                questions: solutions,
            };
            const res = await axios.post(`/practice-test/${testId}/submit-test`, body);
            if (res.status === 201) {
                showAlert(
                    'Thank you for submitting your test! Your report will be generated shortly, and we appreciate your patience in awaiting the results',
                    () => {
                        window.location.reload();
                    },
                );
            }
        } catch (error) {
            console.log(error);
            showAlert('SOME ERROR HAS BEEN ENCOUNTERED. PLEASE CHECK THE CONSOLE');
        }
    };

    const startRecording = useCallback(async () => {
        try {
            MediaRecorderRef.current = new MediaRecorder(WebCamRef.current!.stream!, {
                mimeType: 'video/webm',
            });
            MediaRecorderRef?.current?.addEventListener('dataavailable', handleDataAvailable);
            MediaRecorderRef?.current?.start();
            setIsCapturing(true);
            setRecordingState('RECORDING_UNSTOPABLE');
            startTimer();
        } catch (error) {
            console.log(error);
        }
    }, [handleDataAvailable, WebCamRef, MediaRecorderRef, startTimer]);

    const stopRecording = useCallback(async () => {
        try {
            MediaRecorderRef?.current?.stop();
            setIsCapturing(false);
            setRecordingState('STOPPED');
            stopTimer();
        } catch (error) {
            console.log(error);
        }
    }, [MediaRecorderRef, stopTimer]);

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
        <div className="border-[1.5px] border-gray-300 h-2/3 rounded-md overflow-hidden flex bg-gray-50 relative">
            <div className="border-r-[0.75px] border-gray-400 flex-1">
                <Webcam
                    ref={WebCamRef}
                    className="w-full h-full object-cover"
                    audio={true}
                    muted={true}
                    audioConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }}
                />
            </div>
            <div className="border-l-[0.75px] border-gray-400 flex-1 grid place-content-center">
                <FaUserAlt className="text-7xl text-gray-500" />
            </div>

            <div className="left-1/2 bottom-2 text-sm text-white flex gap-3 -translate-x-1/2 absolute font-inter">
                {totalQuestion > currentQuestionIndex && recordingState !== 'TIME_OVER' && (
                    <Button
                        label={
                            recordingState === 'IDLE' || recordingState === 'STOPPED'
                                ? 'Start Answering'
                                : recordingState === 'SAVING'
                                ? 'Saving your response ...'
                                : 'Stop Answering'
                        }
                        className={`py-2 px-8 ${
                            recordingState === 'IDLE' || recordingState === 'STOPPED'
                                ? 'bg-primary'
                                : recordingState === 'SAVING'
                                ? 'bg-primary'
                                : 'bg-red-600'
                        } rounded-md ${
                            recordingState === 'RECORDING_UNSTOPABLE'
                                ? 'cursor-not-allowed bg-slate-400'
                                : 'cursor-pointer'
                        }`}
                        // dull = {recordingState === "RECORDING_UNSTOPABLE" ? true: false}
                        onClick={() => {
                            if (recordingState === 'IDLE' || recordingState === 'STOPPED') {
                                startRecording();
                            } else if (recordingState === 'RECORDING_STOPABLE') {
                                stopRecording();
                            }
                        }}
                    />
                )}
                {totalQuestion - 1 === currentQuestionIndex && recordingState === 'STOPPED' && (
                    <button
                        className="py-2 px-8 bg-primary rounded-md flex items-center gap-2"
                        onClick={async () => {
                            if (currentQuestionIndex === totalQuestion - 1) {
                                await handleSetAnswers();
                            } else {
                                handleGoToNextQuestion();
                            }
                        }}
                    >
                        <p className="text-nowrap">Save & Next</p> <GrLinkNext />
                    </button>
                )}
                {totalQuestion - 1 > currentQuestionIndex && (
                    <button
                        className="py-2 px-8 bg-primary rounded-md flex items-center gap-2"
                        onClick={handleGoToNextQuestion}
                    >
                        <p className="text-nowrap">Next Q</p> <GrLinkNext />
                    </button>
                )}
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
    );
};

export default VideoScreen;
