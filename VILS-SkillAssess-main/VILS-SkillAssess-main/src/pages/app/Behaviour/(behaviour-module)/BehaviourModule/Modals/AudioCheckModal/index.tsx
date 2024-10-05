// Components
import ModalWrapper from 'components/ModalWrapper';
import Button from 'components/Buttons';

// Assets
import TestAudio from 'assets/audios/audio_check.mp3';

// External Imports
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface AudioCheckModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const AudioCheckModal: React.FC<AudioCheckModalProps> = ({ onCancel, onSuccess }) => {
    return (
        <ModalWrapper>
            <div className="w-[800px] px-6 py-4 pb-6 bg-white rounded-md">
                <div className="flex items-center justify-between pb-2 border-b-[1.5px] border-gray-300">
                    <p className="font-semibold text-lg">Audio Check</p>
                    <IoIosCloseCircleOutline
                        onClick={onCancel}
                        className="cursor-pointer text-xl"
                    />
                </div>
                <div className="flex flex-col gap-6 mt-2 text-sm">
                    <p>
                        This is an opportunity to check that your microphone is working correctly.
                    </p>
                    <div className="flex flex-col gap-2 text-gray-600">
                        <p>
                            1. Make sure you allow the access when the pop up is asking for allowing
                            the microphone.
                        </p>
                        <p>
                            2. Make sure your headset is on, and your microphone is in the downward
                            position near your mouth.
                        </p>
                        <p>
                            3. Now click on the Playback button, You should clearly hear yourself
                            speaking.
                        </p>
                        <p>
                            4. If you cannot hear your voice clearly, then please follow the steps
                            to allow microphone in your browser.
                        </p>
                        <p>
                            5. During the exam, you will not get. Record and Playback button.
                            Recording will automatically start.
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="p-6 bg-gray-200 m-auto w-[400px] text-center">
                        <p className="text-sm">
                            Please hear the entire audio and click{' '}
                            <span className="text-green-500">next</span>
                        </p>
                        <p className="text-xs text-red-500">
                            In case of any issue, check your headphones
                        </p>

                        <div className="mt-4 m-auto w-fit">
                            <audio src={TestAudio} controls />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={onSuccess}
                        label="Next"
                        className="bg-green-600 py-1 w-fit px-8"
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default AudioCheckModal;
