// Internal Imports
import { FormEvent, useState } from 'react';

// External Imports
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

// Components
import ModalWrapper from 'components/ModalWrapper';
import TextSubHeading from 'components/Texts/TextSubHeading';
import Button from 'components/Buttons';
import DropDown from '../../Dropdown';

// Hooks
import { useAuth } from 'providers/AuthProvider';

// configs
import axiosInstance from 'configs/axios.config';
import { useAlert } from 'providers/AlertProvider';

interface AcademicYearChangeModalProps {
    closeAction: () => void;
}

const AcademicYearChangeModal: React.FC<AcademicYearChangeModalProps> = ({
    closeAction = () => {},
}) => {
    const [academicYearDropdownValue, setAcademicYearDropdownValue] = useState('');
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const AcademicYearData = ['1', '2', '3', '4', '5'];

    const academicYearDropDownHandler = (e: string) => {
        setAcademicYearDropdownValue(e);
    };

    const confirmHandler: React.EventHandler<FormEvent> = async (e) => {
        e.preventDefault();

        if (!academicYearDropdownValue) {
            showAlert('Fill the value');
            return;
        }

        try {
            let props = {
                ...user,
                academic_year: academicYearDropdownValue,
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
                        <TextSubHeading className="text-2xl">Academic Year</TextSubHeading>
                        <p className="text-sm">Enter Academic Year</p>
                    </div>
                    <button type="button" className="text-lg" onClick={closeAction}>
                        <IoClose />
                    </button>
                </div>
                <div className="my-6">
                    <DropDown
                        data={AcademicYearData}
                        heading="Select Your Academic Year"
                        valueHeading={academicYearDropdownValue}
                        onClickHandler={academicYearDropDownHandler}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        label="Cancel"
                        onClick={closeAction}
                        className="bg-gray-light text-gray-500"
                    />
                    <Button type="submit" label="Confirm" />
                </div>
            </form>
        </ModalWrapper>
    );
};

export default AcademicYearChangeModal;
