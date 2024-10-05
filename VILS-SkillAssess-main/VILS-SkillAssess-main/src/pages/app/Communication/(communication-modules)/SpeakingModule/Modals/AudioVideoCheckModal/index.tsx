// Components
import ModalWrapper from 'components/ModalWrapper';
import Button from 'components/Buttons';

// Internal Imports
import React, { useState, useCallback, useEffect } from 'react';

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
        <ModalWrapper>
            <div className="bg-white mx-auto  rounded-md p-2 w-[80%] h-[550px] md:h-[628px] overflow-hidden overflow-y-scroll sm:p-4 sm:w-[500px]">
                <div className="flex items-center justify-end relative">
                    <p className="font-semibold absolute left-1/2 text-center w-full -translate-x-1/2">
                        Check your video and sound devices
                    </p>
                    <IoIosCloseCircleOutline
                        onClick={onCancel}
                        className="cursor-pointer text-xl z-10"
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
                    <p className="text-sm mt-2 text-justify">
                        Make sure camera and video permissions are enabled for the browser.
                    </p>
                    <p className="text-sm mt-2 text-justify">
                        For optimal test accuracy, use an ear/headphone or sit within 30cm of the
                        microphone of your system in a quiet environment with minimal background
                        noise.
                    </p>
                </div>
                <div className="mt-4">
                    <div className="flex items-center gap-2 text-gray-700">
                        <HiSpeakerWave />
                        <p className="text-sm">Can you hear the audio?</p>
                    </div>
                    <audio src={TestAudio} controls className="mt-2" />
                </div>
                <div className="mt-6 text-sm">
                    {micLoading ? (
                        <p className="text-gray-700">Please allow in order to continue ...</p>
                    ) : (
                        <div className="flex items-center gap-2">
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
                                <div className="h-5 w-5 bg-red-500 grid place-content-center text-white text-xs rounded-full">
                                    <RxCross2 />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <Button label="Proceed" className="py-2 w-2/3 m-auto" onClick={onSuccess} />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default AudioVideoCheckModal;
