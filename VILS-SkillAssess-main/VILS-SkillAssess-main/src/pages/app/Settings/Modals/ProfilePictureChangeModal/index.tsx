// Internal Imports
import { useRef, useState } from 'react';

// External Imports
import { ImCancelCircle, ImPencil } from 'react-icons/im';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { LiaCloudUploadAltSolid } from 'react-icons/lia';
import axios from 'axios';

// Utils
import { convertToBase64 } from 'utils/helper';

// Components
import ModalWrapper from 'components/ModalWrapper';
import TextSubHeading from 'components/Texts/TextSubHeading';
import TextLight from 'components/Texts/TextLight';
import IconButton from 'components/Buttons/IconButton';
import TakeImage from './TakeImage';

// Configs
import axiosInstance from 'configs/axios.config';

// Hooks
import { useAuth } from 'providers/AuthProvider';
import { useAlert } from 'providers/AlertProvider';

interface ProfilePictureChangeModalProps {
    closeAction: () => void;
}

const ProfilePictureChangeModal: React.FC<ProfilePictureChangeModalProps> = ({ closeAction }) => {
    const [image, setImage] = useState<string | null>(null);
    const [screenState, setScreenState] = useState<
        'UploadOrTake' | 'Uploaded' | 'Taking' | 'Taken'
    >('UploadOrTake');
    const [loading, setLoading] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { updateProfilePicture } = useAuth();

    const handleUploadFromComputer = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleTakeImage = () => {
        setScreenState('Taking');
    };

    const handleRemoveImage = () => {
        setImage(null);
        setScreenState('UploadOrTake');
    };

    const handleFileInputChange = async () => {
        if (fileInputRef.current) {
            if (fileInputRef.current.files && fileInputRef.current.files.length > 0) {
                const file = fileInputRef.current.files[0];

                if (
                    file.type === 'image/jpeg' ||
                    file.type === 'image/png' ||
                    file.type === 'image/jpg'
                ) {
                    try {
                        let base64 = await convertToBase64(fileInputRef.current.files[0]);
                        setImage(base64);
                        setScreenState('Uploaded');
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    showAlert('Invalid format selected! Supported formats are - png, jpg, jpeg');
                }
            }
        }
    };

    const handleSaveImage = async (image: string | null, onResult?: () => void) => {
        if (image) {
            try {
                setLoading(true);
                const response = await axiosInstance.put('/student/upload-profile-photo', {
                    base64_image_url: image?.substring(image.indexOf(',') + 1),
                });

                if (response.status === 201) {
                    setImage(image);
                    updateProfilePicture(image);
                    closeAction();
                }
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    showAlert(err.response?.data.message);
                } else {
                    showAlert('Something went wrong!');
                }
            } finally {
                setLoading(false);
                onResult && onResult();
            }
        }
    };

    return (
        <ModalWrapper>
            {screenState === 'Taken' || screenState === 'Taking' ? (
                <TakeImage
                    closeAction={() => setScreenState('UploadOrTake')}
                    handleSaveImage={handleSaveImage}
                />
            ) : (
                <div className="min-w-[80vw] bg-white px-6 py-4 transform animate-zoom-in transition-transform duration-300 flex flex-col items-center rounded-md">
                    <div className="flex w-full items-center justify-center relative">
                        <TextSubHeading>Change Profile Picture</TextSubHeading>
                        <ImCancelCircle
                            className="text-black w-5 h-5 absolute right-0 cursor-pointer"
                            onClick={closeAction}
                        />
                    </div>
                    <div className="max-w-[45%] mt-2">
                        <TextLight className="text-center">
                            A picture helps people recognize you and lets you know when you're
                            signed in to your account
                        </TextLight>
                    </div>

                    <div className="mt-6">
                        {image ? (
                            <div>
                                <img
                                    src={image}
                                    className="h-[300px] w-[300px] rounded-full shadow-stripe object-cover"
                                    alt="profile"
                                />
                            </div>
                        ) : (
                            <div className="h-[300px] w-[300px] rounded-full shadow-stripe grid place-content-center">
                                <div>
                                    <FaRegUserCircle className="w-[225px] h-[225px]" />
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            multiple={false}
                            ref={fileInputRef}
                            accept="image/png, image/jpeg, image/jpg"
                            hidden
                            onChange={handleFileInputChange}
                        />
                    </div>

                    <div className="flex justify-between mt-6 mb-4 gap-2">
                        {screenState === 'UploadOrTake' ? (
                            <>
                                <IconButton
                                    label="Upload From Computer"
                                    icon={<LiaCloudUploadAltSolid className="w-6 h-6" />}
                                    className="bg-white text-primary-dark border-[1px] border-primary-grey"
                                    iconAligment="left"
                                    onClick={handleUploadFromComputer}
                                />
                                <IconButton
                                    label="Take a Picture"
                                    icon={<MdOutlineAddAPhoto className="w-5 h-5" />}
                                    className="bg-white text-primary-dark border-[1px] border-primary-grey"
                                    iconAligment="left"
                                    onClick={handleTakeImage}
                                />
                            </>
                        ) : screenState === 'Uploaded' ? (
                            <>
                                <IconButton
                                    label="Change"
                                    icon={<ImPencil className="w-5 h-5" />}
                                    className="bg-white text-primary-dark border-[1px] border-primary-grey"
                                    iconAligment="left"
                                    loading={loading}
                                    onClick={() => handleSaveImage(image)}
                                />
                                <IconButton
                                    label="Remove"
                                    icon={<RiDeleteBin6Line className="w-5 h-5" />}
                                    className="bg-white text-primary-dark border-[1px] border-primary-grey"
                                    iconAligment="left"
                                    onClick={handleRemoveImage}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            )}
        </ModalWrapper>
    );
};

export default ProfilePictureChangeModal;
