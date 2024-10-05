// Components
import ModalWrapper from 'components/ModalWrapper';
import Button from 'components/Buttons';

// Internal Imports
import { useState, useCallback, useEffect } from 'react';

// External Imports
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { HiSpeakerWave } from 'react-icons/hi2';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import Webcam from 'react-webcam';

// Assets
import TestAudio from 'assets/audios/audio_check.mp3';

interface AudioVideoCheckModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const AudioVideoCheckModal: React.FC<AudioVideoCheckModalProps> = ({ onSuccess, onCancel }) => {
    const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
    const [micPermission, setMicPermission] = useState<boolean | null>(null);
    const [camLoading, setCamLoading] = useState(true);
    const [micLoading, setMicLoading] = useState(true);

    const requestCameraPermission = useCallback(async () => {
        setCamLoading(true);
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraPermission(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            setCameraPermission(false);
        } finally {
            setCamLoading(false);
        }
    }, []);

    const requestMicPermission = async () => {
        setMicLoading(true);
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicPermission(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setMicPermission(false);
        } finally {
            setMicLoading(false);
        }
    };

    useEffect(() => {
        requestCameraPermission();
        requestMicPermission();
    }, [requestCameraPermission]);

    return (
        <div className="absolute h-screen w-screen overflow-hidden top-0 left-0 inter">
            <ModalWrapper>
                <div className="bg-white mx-auto  rounded-md pt-3 md:pt-0 p-2 w-[80%] h-[550px] md:h-[628px] overflow-hidden overflow-y-scroll sm:p-4 sm:w-[500px]">
                    <div className="flex items-center justify-end relative">
                        <p className="font-semibold absolute left-1/2 text-center w-[90%] md:w-full -translate-x-1/2">
                            Check your video and sound devices
                        </p>
                        <IoIosCloseCircleOutline
                            onClick={onCancel}
                            className="cursor-pointer text-xl z-20"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="bg-slate-300 rounded-md">
                            {camLoading || !cameraPermission ? (
                                <div className="h-[250px] grid place-content-center text-center">
                                    <p className="text-sm">Allow Camera Permissions to Continue</p>
                                </div>
                            ) : (
                                <Webcam className="h-[250px] m-auto" />
                            )}
                        </div>
                        <p className="text-sm mt-2 text-center">
                            Make sure camera and video permissions are enabled for the browser.
                        </p>
                        <p className="text-sm mt-2 text-center">
                            For optimal test accuracy, use an ear/headphone or sit within 30cm of
                            the microphone of your system in a quiet environment with minimal
                            background noise.
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-gray-700">
                            <HiSpeakerWave />
                            <p className="text-sm">Can you hear the audio?</p>
                        </div>
                        <audio src={TestAudio} controls className="mt-2" />
                    </div>
                    <div className="mt-6 text-sm text-center">
                        {micLoading ? (
                            <p className="text-gray-700">Please allow in order to continue ...</p>
                        ) : (
                            <div className="flex items-center gap-2 justify-center">
                                {micPermission ? (
                                    <p>Microphone is detected</p>
                                ) : (
                                    <p>Microphone is not detected</p>
                                )}
                                {micPermission ? (
                                    <div className="h-5 w-5 bg-primary grid place-content-center text-white text-xs rounded-full">
                                        <FaCheck />
                                    </div>
                                ) : (
                                    <div className="h-5 w-5 bg-primary grid place-content-center text-white text-xs rounded-full">
                                        <RxCross2 />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="mt-8">
                        <Button label="Proceed" className="py-2 w-1/2 m-auto" onClick={onSuccess} />
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};

export default AudioVideoCheckModal;
