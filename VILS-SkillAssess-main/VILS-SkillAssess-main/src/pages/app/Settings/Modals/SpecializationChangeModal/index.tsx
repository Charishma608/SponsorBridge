// Internal Imports
import { FormEvent, useState } from 'react';

// External Imports
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

// Components
import ModalWrapper from 'components/ModalWrapper';
import TextSubHeading from 'components/Texts/TextSubHeading';
import Input from 'components/Inputs';
import Button from 'components/Buttons';

// Hooks
import { useAuth } from 'providers/AuthProvider';

// configs
import axiosInstance from 'configs/axios.config';
import { useAlert } from 'providers/AlertProvider';
import NAInput from 'components/NAInput';

interface SpecializationChangeModalProps {
    closeAction: () => void;
}

const SpecializationChangeModal: React.FC<SpecializationChangeModalProps> = ({
    closeAction = () => {},
}) => {
    const [specializationName, setSpecializationName] = useState<string>('');
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const confirmHandler: React.EventHandler<FormEvent> = async (e) => {
        e.preventDefault();
        if (!specializationName) {
            showAlert('Fill the value');
            return;
        }

        try {
            let props = {
                ...user,
                specialization: specializationName,
            };

            await axiosInstance.put('/student/update-details', props);
            closeAction();
            window.location.reload();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                showAlert(err.response?.data.message);
            } else {
                showAlert('Something went wrong!');
            }
        }
    };

    return (
        <ModalWrapper>
            <form
                onSubmit={confirmHandler}
                className={`p-4 bg-white rounded-lg w-[400px] transform animate-zoom-in transition-transform duration-300`}
            >
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <TextSubHeading className="text-2xl">Specialization Name</TextSubHeading>
                        <p className="text-sm">Enter Specialization Name</p>
                    </div>
                    <button type="button" className="text-lg" onClick={closeAction}>
                        <IoClose />
                    </button>
                </div>
                <div className="my-6">
                    {/* <Input
                        value={specializationName}
                        setValue={setSpecializationName}
                        className="rounded-lg"
                        placeholder="Machine Learning"
                        type="text"
                        required={true}
                    /> */}
                    <NAInput
                        value={specializationName}
                        setValue={setSpecializationName}
                        placeholder="Machine Learning"
                        required={true}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        label="Cancel"
                        type="button"
                        onClick={closeAction}
                        className="bg-gray-light text-gray-500"
                    />
                    <Button label="Confirm" type="submit" />
                </div>
            </form>
        </ModalWrapper>
    );
};

export default SpecializationChangeModal;
