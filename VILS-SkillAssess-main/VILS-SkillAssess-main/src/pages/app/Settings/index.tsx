// Internal Imports
import { useState } from 'react';

// External Imports
import { MdOutlineEdit } from 'react-icons/md';

// Components
import TextSubHeading from 'components/Texts/TextSubHeading';
import Navbar from './Navbar';
import IconButton from 'components/Buttons/IconButton';
import { FaRegUserCircle } from 'react-icons/fa';
import TextLight from 'components/Texts/TextLight';
import DetailsCard from './DetailsCard';
import { useAuth } from 'providers/AuthProvider';
import FirstNameChangeModal from './Modals/FirstNameChangeModal';
import LastNameChangeModal from './Modals/LastNameChangeModal';
import DegreeChangeModal from './Modals/DegreeChangeModal';
import SpecializationChangeModal from './Modals/SpecializationChangeModal';
import ProfilePictureChangeModal from './Modals/ProfilePictureChangeModal';
import PasswordChangeModal from './Modals/PasswordChangeModal';
import PhoneChangeModal from './Modals/PhoneChangeModal';
import RollNumberChangeModal from './Modals/RollNumberChangeModal';
import DepartmentChangeModal from './Modals/DepartmentChangeModal';
import GenderChangeModal from './Modals/GenderChangeModal';
import CountryChangeModal from './Modals/CountryChangeModal';
import StateChangeModal from './Modals/StateChangeModal';
import DOBChangeModal from './Modals/DOBChangeModal';
import JoiningYearChangeModal from './Modals/JoiningYearChangeModal';
import AcademicYearChangeModal from './Modals/AcademicYearChangeModal';
import CollegeChangeModal from './Modals/CollegeChangeModal';

const SettingsPage = () => {
    const [modalComponent, setModalComponent] = useState<React.ReactNode | null>(null);
    const [isModalOpenned, setIsModalOpenned] = useState<boolean>(false);

    const { user } = useAuth();
    console.log(user);

    const closeModal = () => {
        setIsModalOpenned(false);
    };

    const openModal = () => {
        setIsModalOpenned(true);
    };

    return (
        <div className="p-4 pb-4 ps-8 pt-6">
            {isModalOpenned ? modalComponent : null}
            <div className="h-full flex flex-col gap-4">
                <div>
                    <Navbar />
                </div>
                <div className="flex items-center justify-between">
                    <TextSubHeading>Profile</TextSubHeading>
                </div>
                <div className="flex items-center justify-between border-light rounded-xl p-4 bg-white">
                    <div className="flex gap-4 items-center">
                        {user?.photo_url ? (
                            <div>
                                <img
                                    src={user.photo_url}
                                    className="h-[120px] w-[120px] rounded-full shadow-stripe object-cover"
                                    alt="profile"
                                />
                            </div>
                        ) : (
                            <div className="h-[120px] w-[120px] rounded-full shadow-stripe grid place-content-center">
                                <div>
                                    <FaRegUserCircle className="text-5xl" />
                                </div>
                            </div>
                        )}
                        <div>
                            <p className="text-primary text-lg font-semibold">
                                {user?.firstname} {user?.lastname}
                            </p>
                            <div className="flex flex-col gap-1">
                                <TextLight>{user?.college}</TextLight>
                                <TextLight>{user?.email}</TextLight>
                            </div>
                        </div>
                    </div>
                    <IconButton
                        icon={<MdOutlineEdit className="w-5 h-5" />}
                        label="Edit"
                        onClick={() => {
                            setModalComponent(
                                <ProfilePictureChangeModal closeAction={closeModal} />,
                            );
                            openModal();
                        }}
                        className="bg-white text-black border-2 border-primary"
                    />
                </div>
                <div className="border-light overflow-hidden rounded-xl bg-white">
                    <DetailsCard
                        title="First Name"
                        value={user?.firstname ? user.firstname : 'Avinash'}
                        onClick={() => {
                            setModalComponent(<FirstNameChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Last Name"
                        value={user?.lastname ? user.lastname : 'Kumar'}
                        onClick={() => {
                            setModalComponent(<LastNameChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="College"
                        value={user?.college ? user.college : 'Add your College here'}
                        className=""
                        onClick={() => {
                            setModalComponent(<CollegeChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Degree"
                        value={user?.degree ? user.degree : 'Add your Degree here'}
                        onClick={() => {
                            setModalComponent(<DegreeChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Specialization"
                        value={
                            user?.specialization
                                ? user.specialization
                                : 'Add your Specialization here'
                        }
                        onClick={() => {
                            setModalComponent(
                                <SpecializationChangeModal closeAction={closeModal} />,
                            );
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Password"
                        value={'Update your Password here'}
                        onClick={() => {
                            setModalComponent(<PasswordChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Phone Number"
                        value={user?.phone ? user.phone : 'Add your Phone Number here'}
                        onClick={() => {
                            setModalComponent(<PhoneChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Roll Number"
                        value={user?.roll_no ? user.roll_no : 'Add your Roll Number here'}
                        onClick={() => {
                            setModalComponent(<RollNumberChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Department"
                        value={user?.department ? user.department : 'Add your Department here'}
                        onClick={() => {
                            setModalComponent(<DepartmentChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Gender"
                        value={user?.gender ? user.gender : 'Add your Gender here'}
                        onClick={() => {
                            setModalComponent(<GenderChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Country"
                        value={user?.country ? user.country : 'Add your Country here'}
                        onClick={() => {
                            setModalComponent(<CountryChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="State"
                        value={user?.state ? user.state : 'Add your State here'}
                        onClick={() => {
                            setModalComponent(<StateChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Date of Birth"
                        value={user?.dob ? user.dob : 'Add your Date of Birth here'}
                        onClick={() => {
                            setModalComponent(<DOBChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Joining Year"
                        value={
                            user?.joining_year ? user.joining_year : 'Add your Joining Year here'
                        }
                        onClick={() => {
                            setModalComponent(<JoiningYearChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                    <DetailsCard
                        title="Academic Year"
                        value={
                            user?.academic_year ? user.academic_year : 'Add your Academic Year here'
                        }
                        onClick={() => {
                            setModalComponent(<AcademicYearChangeModal closeAction={closeModal} />);
                            openModal();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
