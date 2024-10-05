// Components
import ModalWrapper from 'components/ModalWrapper';
import Button from 'components/Buttons';

// External Imports
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaCheckCircle, FaLaptop, FaChrome } from 'react-icons/fa';

interface ReminderModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ onSuccess, onCancel }) => {
    return (
        <ModalWrapper>
            <div className="w-[400px] h-[550px] md:h-[628px] overflow-hidden overflow-y-scroll sm:p-4 sm:w-[500px] px-6 py-2 pb-6 bg-white rounded-md">
                <div className="mt-6 flex justify-between">
                    <div className="text-center w-full flex items-start justify-between border-b-[1.5px] pb-2">
                        <p className="font-semibold">Reminder</p>
                        <IoIosCloseCircleOutline
                            className="text-xl cursor-pointer"
                            onClick={onCancel}
                        />
                    </div>
                </div>
                <div className="mt-8 m-auto flex gap-6">
                    <div className="flex flex-col gap-6 w-1/2 text-xs text-gray-700">
                        <p>
                            This platform is designed to provide practice to improve communication
                            skills.
                        </p>
                        <p>
                            This test can be accessed on your desktop & laptop. Please note that
                            this product may{' '}
                            <span className="text-red-500">
                                not be compatible with your mobile device
                            </span>
                            .
                        </p>
                        <p>
                            We recommend our users to give the tests on
                            <span className="text-red-500"> Google Chrome browser only</span>.
                        </p>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <div className="flex justify-between items-center pb-1 border-b-[1.5px]">
                            <div>
                                <p className="text-sm">Cookies</p>
                                <p className="text-xs text-gray-700">Enabled</p>
                            </div>
                            <FaCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <div className="flex justify-between items-center py-1 border-b-[1.5px]">
                            <div>
                                <p className="text-sm">Resolution (Laptop)</p>
                                <p className="text-xs text-gray-700">1366*768</p>
                            </div>
                            <FaLaptop className="text-xl" />
                        </div>
                        <div className="flex justify-between items-center py-1 border-b-[1.5px]">
                            <div>
                                <p className="text-sm">Recommended (Browser)</p>
                                <p className="text-xs text-gray-700">Google Chrome</p>
                            </div>
                            <FaChrome className="text-xl text-primary" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <Button
                        label="Proceed"
                        className="w-fit bg-green-600 px-6 py-1"
                        onClick={onSuccess}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ReminderModal;
