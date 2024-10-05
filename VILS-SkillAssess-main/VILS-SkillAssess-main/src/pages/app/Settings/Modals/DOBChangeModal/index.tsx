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

interface DOBChangeModalProps {
    closeAction: () => void;
}

const DOBChangeModal: React.FC<DOBChangeModalProps> = ({ closeAction = () => {} }) => {
    const [dayOfBirth, setDayOfBirth] = useState('');
    const [monthOfBirth, setMonthOfBirth] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const { user } = useAuth();
    const { showAlert } = useAlert();

    var YearData = [];
    var DateData = [];
    var MonthData = [];

    const currDate = new Date();

    for (let i = 1990; i <= currDate.getFullYear(); i++) {
        YearData.push(i.toString());
    }
    for (let i = 1; i <= 31; i++) {
        DateData.push(i.toString());
    }
    for (let i = 1; i <= 12; i++) {
        MonthData.push(i.toString());
    }

    const getNumString = (e: number) => {
        if (e < 10) return `0${e}`;
        return `${e}`;
    };

    const dayOfBirthrDropDownHandler = (e: string) => {
        if (e === '') {
            setDayOfBirth('');
            return;
        }
        const num = parseInt(e, 10);
        if (!isNaN(num)) {
            const f = getNumString(num);
            setDayOfBirth(f);
        }
    };
    const monthOfBirthDropDownHandler = (e: string) => {
        const f = getNumString(parseInt(e, 10));
        setMonthOfBirth(f);
    };
    const yearOfBirthDropDownHandler = (e: string) => {
        setYearOfBirth(e);
    };

    const confirmHandler: React.EventHandler<FormEvent> = async (e) => {
        e.preventDefault();

        if (!dayOfBirth) {
            showAlert('Fill the date');
            return;
        }
        if (!monthOfBirth) {
            showAlert('Fill the month');
            return;
        }
        if (!yearOfBirth) {
            showAlert('Fill the year');
            return;
        }

        try {
            let props = {
                ...user,
                dob: `${dayOfBirth}-${monthOfBirth}-${yearOfBirth}`,
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
                        <TextSubHeading className="text-2xl">Date of Birth</TextSubHeading>
                        <p className="text-sm">Enter Date of Birth</p>
                    </div>
                    <button type="button" className="text-lg" onClick={closeAction}>
                        <IoClose />
                    </button>
                </div>
                <div className="my-6">
                    <div className=" grid grid-cols-3 gap-2">
                        <div className="">
                            <DropDown
                                data={DateData}
                                heading="Day"
                                valueHeading={dayOfBirth}
                                onClickHandler={dayOfBirthrDropDownHandler}
                            />
                        </div>
                        <div className="">
                            <DropDown
                                data={MonthData}
                                heading="Month"
                                valueHeading={monthOfBirth}
                                onClickHandler={monthOfBirthDropDownHandler}
                            />
                        </div>
                        <div className="">
                            <DropDown
                                data={YearData}
                                heading="Year"
                                valueHeading={yearOfBirth}
                                onClickHandler={yearOfBirthDropDownHandler}
                            />
                        </div>
                    </div>
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

export default DOBChangeModal;
