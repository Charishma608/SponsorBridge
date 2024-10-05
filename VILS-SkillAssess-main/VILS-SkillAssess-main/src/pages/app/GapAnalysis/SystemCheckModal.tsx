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

interface SystemCheckModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const SystemCheckModal: React.FC<SystemCheckModalProps> = ({ onSuccess, onCancel }) => {
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

    const isProceedDisabled =
        micLoading || camLoading || micPermission === false || cameraPermission === false;

    return (
        <>
            <style>
                {`
                    .backdrop-blur {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100vh;
                        background: rgba(0, 0, 0, 0.7);
                        display: grid;
                        place-content: center;
                        backdrop-filter: blur(10px);
                        z-index: 50;
                    }
                    .modal-container {
                        background: white;
                        margin: auto;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        width: 100%;
                        max-width: 600px; /* Set maximum width for laptops */
                        height: auto; /* Allow height to adjust based on content */
                        max-height: 95vh; /* Set maximum height for the modal */
                        overflow-y: auto; /* Enable scrolling if content exceeds max height */
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: Add some shadow for depth */
                    }
                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .modal-title {
                        font-weight: 600;
                        text-align: center;
                        width: 100%;
                    }
                    .camera-permission {
                        background: #d1d5db;
                        border-radius: 0.375rem;
                        height: 225px; /* Height for the camera preview area */
                        display: grid;
                        place-content: center;
                        text-align: center;
                    }
                    .audio-control {
                        margin-top: 1rem;
                    }
                    .microphone-status {
                        margin-top: 0.5rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    @media (max-width: 640px) {
                        .modal-container {
                            padding: 0.5rem;
                            width: 90%; /* Adjust width for smaller screens */
                            max-width: 350px; /* Smaller max-width for mobile */
                        }
                        .camera-permission {
                            height: 200px; /* Adjust height for mobile */
                        }
                    }
                `}
            </style>

            <div className="backdrop-blur">
                <div className="modal-container">
                    <div className="modal-header">
                        <p className="modal-title">Check your video and sound devices</p>
                        <IoIosCloseCircleOutline
                            onClick={onCancel}
                            className="cursor-pointer text-xl z-10"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="camera-permission">
                            {camLoading || cameraPermission === null || !cameraPermission ? (
                                <p className="text-sm">Allow Camera Permissions to Continue</p>
                            ) : (
                                <Webcam className="h-[225px] m-auto" />
                            )}
                        </div>
                        <p className="text-xs mt-2 text-justify">
                            Make sure camera and video permissions are enabled for the browser.
                        </p>
                        <p className="text-xs mt-2 text-justify">
                            For optimal test accuracy, use an ear/headphone or sit within 30cm of the
                            microphone of your system in a quiet environment with minimal background
                            noise.
                        </p>
                    </div>
                    <div className="mt-2 audio-control">
                        <div className="flex items-center gap-2 text-gray-700">
                            <HiSpeakerWave />
                            <p className="text-xs">Can you hear the audio?</p>
                        </div>
                        <audio src={TestAudio} controls className="mt-2" />
                    </div>
                    <div className="mt-4 text-xs microphone-status">
                        {micLoading ? (
                            <p className="text-gray-700">Please allow Microphone in order to continue ...</p>
                        ) : (
                            <div className="flex items-center gap-2">
                                {micPermission ? <p>Microphone is detected</p> : <p>Microphone is not detected</p>}
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
                    <div className="mt-2">
                        <Button
                            label="Proceed"
                            className="py-2 w-2/3 m-auto"
                            onClick={onSuccess}
                            disabled={isProceedDisabled}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SystemCheckModal;
