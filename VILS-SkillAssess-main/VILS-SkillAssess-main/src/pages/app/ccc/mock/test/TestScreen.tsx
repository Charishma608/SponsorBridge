import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';
import { axiosV2 } from 'configs/axios.config';
import Button from 'components/Buttons';
import { useAlert } from 'providers/AlertProvider';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';
import { useNavigate, useLocation } from 'react-router-dom';
// import ModalWrapper from 'components/ModalWrapper';
import { nanoid } from 'nanoid';
import { URL, BUFFER_TIME } from 'configs/socket.config';

function convertTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} mins ${remainingSeconds} seconds`;
}

interface Props{
    data: any;
    testId: string;
}

const VideoScreen = ({data, testId}: Props) => {    
    
    const { showAlert } = useAlert();
    const { handleExitFullScreen } = useFullScreenDetector();
    const WebCamRef = useRef<Webcam>(null);
    const MediaRecorderRef = useRef<MediaRecorder | null>(null);
    const IsInitialMount = useRef(true);

    const [, setRecordedChunks] = useState<[]>([]);
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

    // const [solutions, setSolutions] = useState<{ id: string; video_id: string }[]>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const [currentQuestionId, setCurrentQuestionId] = useState<string>('');

    const TIME_PER_QUESTIONS = data?.duration_in_minutes * 60;
    // const TIME_TO_START = 5; // In Seconds
    // const [startingTimer, setStartingTimer] = useState<number>(TIME_TO_START);
    const [isQuestionTimerActive, setIsQuestionTimerActive] = useState(false);
    const [questionTimer, setQuestionTimer] = useState<number>(TIME_PER_QUESTIONS);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const totalQuestions = data?.questions?.length;
    const [solutions, setSolutions] = useState<{id: string; video_id: string}[]>([]);
    const [stopButtonCounter, setStopButtonCounter] = useState(30);

    const goToNext = useCallback(() => {
        if (currentQuestion >= totalQuestions - 1) return;

        setCurrentQuestion(currentQuestion + 1);
        setRecordingState("IDLE");
        setIsQuestionTimerActive(true);
        // setStartingTimer(TIME_TO_START);
        setStopButtonCounter(30);
        
    }, [currentQuestion, totalQuestions]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const signature = {
        key: searchParams.get('key') as string,
        value: searchParams.get('value') as string,
    }

    const navigate = useNavigate();

    const connectToSocketServer = (id: string) => {
        if (!id) return;
        wsRef.current = new WebSocket(URL + `/${id}`);

        wsRef.current.onopen = () => {
            // console.log('Websocket server connected with id: ', id);
        };

        wsRef.current.onclose = (e) => {};

        wsRef.current.onerror = (e) => {
            console.log('Websocket Server Error', e);
        };
    };

    const disconnectFromServer = () => {
        wsRef.current?.close();
    };

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            if (data.size > 0) {
                setRecordedChunks((prev: any) => prev.concat(data));
                if (wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(data);
                    console.log(data);
                }
            }
        },
        [setRecordedChunks],
    );

    const handleSubmitTest = async () => {
        // const navBackUrl = ref
        //     ? `/${ref}?ref=${referenceBackId}`
        //     : '/dashboard?activeTab=overall&type=communication';

        try {
            setRecordingState('SUBMITTING_TEST');

            const res = await axiosV2.post(`/mock-interview/assessment/${testId}/submit`, solutions);
            if (res.status === 201) {
                window.localStorage.setItem(signature.key, signature.value);
                // showAlert(
                //     'Thank you for submitting your test! Your report will be generated shortly, and we appreciate your patience in awaiting the results',
                //     () => {
                //     },
                // );
                handleExitFullScreen();
                navigate('/ccc');
            }
        } catch (error) {
            console.log(error);
            showAlert(
                'ओह नहीं! 😱 कुछ गलत हो गया। कृपया अधिक विवरण के लिए कंसोल जांचें 🛠️',
            );
        }
    };

    const startRecording = useCallback(async () => {
        const ansId = nanoid();
        setCurrentQuestionId(ansId);
        connectToSocketServer(ansId);

        try {
            MediaRecorderRef.current = new MediaRecorder(WebCamRef.current!.stream!, {
                mimeType: MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm',
            });
            MediaRecorderRef?.current?.addEventListener('dataavailable', handleDataAvailable);
            MediaRecorderRef?.current?.start(BUFFER_TIME);

            setIsCapturing(true);
            setIsQuestionTimerActive(true);
            if (recordingState === 'IDLE') setRecordingState('RECORDING_UNSTOPABLE');
            // else if (recordingState === 'STOPPED') setRecordingState('RECORDING_STOPABLE');

        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleDataAvailable, WebCamRef, MediaRecorderRef]);

    const stopRecording = useCallback(async () => {
        try {
            disconnectFromServer();
            MediaRecorderRef?.current?.stop();

            setIsCapturing(false);
            setRecordingState('STOPPED');
            setIsQuestionTimerActive(false);

            setSolutions((prev) => {
                return [
                    ...prev,
                    {
                        id: data?.questions?.[currentQuestion]?.id,
                        video_id: currentQuestionId
                    }
                ]
            })
            goToNext();

        } catch (error) {
            console.log(error);
        }
    }, [currentQuestion, currentQuestionId, data, goToNext]);

    // useEffect(() => {
    //     let interval: NodeJS.Timeout | undefined;

    //     if (startingTimer >= 1) {
    //         interval = setInterval(() => {
    //             setStartingTimer((prevSeconds) => prevSeconds - 1);
    //         }, 1000);
    //     } else {
    //         startRecording();
    //         clearInterval(interval);
    //     }

    //     return () => {
    //         clearInterval(interval);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [setStartingTimer, startingTimer]);

    useEffect(() => {
        if(recordingState === "IDLE" || !isQuestionTimerActive) return;
        let interval: NodeJS.Timeout | undefined;

        if (questionTimer >= 1) {
            interval = setInterval(() => {
                setQuestionTimer((prevSeconds) => prevSeconds - 1);
                setStopButtonCounter((prev) => prev -1);
            }, 1000);
        } else {
            stopRecording();
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setQuestionTimer, recordingState, isQuestionTimerActive]);

    useEffect(() => {
        if (IsInitialMount.current) {
            IsInitialMount.current = false;
        } else {
            if (!isCapturing) {
            }
        }
    }, [isCapturing]);

    useEffect(() => {
        if(stopButtonCounter === 0){
            setRecordingState('RECORDING_STOPABLE');
        }
    }, [stopButtonCounter])

    return (
        <>
            {/* {startingTimer > 0 && (
                <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden">
                    <ModalWrapper>
                        <div className="flex flex-col inter items-center">
                            <p className="text-white text-2xl">Starting In</p>
                            <p className="text-[10rem] text-white text-center">{startingTimer}</p>
                        </div>
                    </ModalWrapper>
                </div>
            )} */}
            <div className='h-screen w-screen overflow-hidden flex flex-col'>
                <div className='w-full bg-white shadow-xl'>
                    <div className='p-4 border-b flex items-center justify-between'>
                        <h1 className='text-primary font-bold text-xl'>Mock Test</h1>
                        {/* <div className='flex items-center gap-2'>
                            <Button label='Exit' className='bg-red-500' onClick={() => {
                                navigate('/ccc');
                            }} />
                            <Button label='Submit' className='bg-green-500 px-6' onClick={handleSubmitTest}/>
                        </div> */}
                    </div>
                    <div className='p-4 flex items-center justify-between'>
                        <p>Time Remaining: {convertTime(questionTimer)}</p>
                    </div>
                </div>
                <div className='w-full flex-1 p-4 overflow-y-auto'>
                    <p className='text-xl font-bold'>Question {currentQuestion + 1} : </p>
                    <p className='mt-4'>{data?.questions?.[currentQuestion]?.question}</p>
                </div>
                <div className='w-full flex items-end gap-5 p-4 border-t-2'>
                    <div className='flex flex-col gap-4'>
                        {/* {currentQuestion < totalQuestions-1 && <Button onClick={goToNext} label='Next Question' className='rounded-md py-6' />} */}
                        {
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
                        {
                            currentQuestion === totalQuestions-1 && recordingState === "STOPPED" && (
                                <Button label='Submit' className='bg-green-500 px-6' onClick={handleSubmitTest} />
                            )
                        }
                    </div>
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
            </div>
        </>
    );
};

export default VideoScreen;
