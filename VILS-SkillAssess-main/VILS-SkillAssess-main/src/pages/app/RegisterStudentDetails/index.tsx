import FullScreen from 'components/FullScreen';
import logo from 'assets/svgs/Logo.svg';
// import Input from 'components/Inputs';
import RegistrationDropDown from 'components/RegistrationDropdown';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAlert } from 'providers/AlertProvider';

// Configs
import axios from 'configs/axios.config';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import NAInput from 'components/NAInput';

const RegisterStudentDetails = () => {
    const { showAlert } = useAlert();
    const [rollNo, setRollNo] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phNo, setPhNo] = useState('');
    const [department, setDepartment] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [degreeDropdownValue, setDegreeDropdownValue] = useState('');
    const [genderDropdownValue, setGenderDropdownValue] = useState('');
    const [joiningYearDropdownValue, setJoiningYearDropdownValue] = useState('');
    const [academicYearDropdownValue, setAcademicYearDropdownValue] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState('');
    const [monthOfBirth, setMonthOfBirth] = useState('');
    const [monthOfBirthName, setMonthOfBirthName] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [college, setCollege] = useState('');
    // const [totalSem, setTotalSem] = useState(0);
    // const [sem1, setSem1] = useState<number>();
    // const [sem2, setSem2] = useState<number>();
    // const [sem3, setSem3] = useState<number>();
    // const [sem4, setSem4] = useState<number>();
    // const [sem5, setSem5] = useState<number>();
    // const [sem6, setSem6] = useState<number>();
    // const [sem7, setSem7] = useState<number>();
    // const [sem8, setSem8] = useState<number>();
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    var YearData = [];
    var DateData = [];
    var MonthData = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const GenderData = ['Male', 'Female'];
    const DegreeData = ['BTech/BE', 'MTech/ME'];
    const [AcademicYearData, setAcademicYearData] = useState(['1', '2', '3', '4']);

    const DepartmentData = [
        'AI&DS',
        'CS&IT',
        'ECE',
        'EEE',
        'ME',
        'IOT',
        'CSEH',
        'BT',
        'CE',
        'CSER',
        'ECS',
        'Automobile Engineering',
    ];
    const CountriesData = ['India'];
    const StatesData = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttarakhand',
        'Uttar Pradesh',
        'West Bengal',
    ];
    const currDate = new Date();

    for (let i = 1990; i <= currDate.getFullYear(); i++) {
        YearData.push(i.toString());
    }
    for (let i = 1; i <= 31; i++) {
        DateData.push(i.toString());
    }

    let monthMap = new Map();
    monthMap.set('Jan', '1');
    monthMap.set('Feb', '2');
    monthMap.set('Mar', '3');
    monthMap.set('Apr', '4');
    monthMap.set('May', '5');
    monthMap.set('Jun', '6');
    monthMap.set('Jul', '7');
    monthMap.set('Aug', '8');
    monthMap.set('Sep', '9');
    monthMap.set('Oct', '10');
    monthMap.set('Nov', '11');
    monthMap.set('Dec', '12');

    const getNumString = (e: number) => {
        if (e < 10) return `0${e}`;
        return `${e}`;
    };

    const degreeDropDownHandler = (e: string) => {
        // ['BTech/BE', 'MTech/ME'];
        setDegreeDropdownValue(e);
        if (e === 'BTech/BE') {
            setAcademicYearData(['1', '2', '3', '4']);
        }
        if (e === 'MTech/ME') setAcademicYearData(['1', '2']);
    };
    const departmentDropDownHandler = (e: string) => {
        setDepartment(e);
    };
    const genderDropDownHandler = (e: string) => {
        setGenderDropdownValue(e);
    };
    const countryDropDownHandler = (e: string) => {
        setCountry(e);
    };
    const stateDropDownHandler = (e: string) => {
        setState(e);
    };
    const joiningYearDropDownHandler = (e: string) => {
        setJoiningYearDropdownValue(e);
    };
    const academicYearDropDownHandler = (e: string) => {
        // const sem = parseInt(e, 10);
        setAcademicYearDropdownValue(e);
        // setTotalSem(sem * 2);
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
        const f = getNumString(parseInt(monthMap.get(e), 10));
        setMonthOfBirth(f);
        setMonthOfBirthName(e);
    };
    const yearOfBirthDropDownHandler = (e: string) => {
        setYearOfBirth(e);
    };

    const allFieldsFilled = () => {
        return rollNo &&
            fname &&
            phNo &&
            department &&
            degreeDropdownValue &&
            genderDropdownValue &&
            joiningYearDropdownValue &&
            academicYearDropdownValue &&
            dayOfBirth &&
            monthOfBirth &&
            yearOfBirth &&
            country &&
            state &&
            college
            ? true
            : false;
    };

    // const isValidEmail = (email: string) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    const submitHandler = async () => {
        if (!allFieldsFilled()) {
            showAlert('Please fill all the required fields.');
            return;
        }

        if (phNo?.toString().length !== 10) {
            showAlert('Please enter a valid phone number.');
            return;
        }
        // if (!isValidEmail(email)) {
        //     showAlert('Please enter a valid email address.');
        //     return;
        // }
        let payload: any = {
            firstname: fname,
            lastname: lname,
            gender: genderDropdownValue,
            dob: `${dayOfBirth}-${monthOfBirth}-${yearOfBirth}`,
            phone: phNo,
            roll_no: rollNo,
            department: department,
            state: state,
            country: country,
            degree: degreeDropdownValue,
            specialization: specialization,
            joining_year: joiningYearDropdownValue,
            academic_year: academicYearDropdownValue,
            college: college,
        };

        try {
            const res = await axios.put(`/student/update-details`, payload);
            if (res.status === 201) {
                showAlert('Thank you for submitting your student details', () => {
                    Cookies.set('__REGISTRATION_COMPLETED__', 'yes');
                    window.location.pathname = '/';
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FullScreen>
    <div className="py-6 px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="flex justify-center md:justify-start">
            <img src={logo} alt="logo" className="w-20 sm:w-24 md:w-auto" />
        </div>
        <div className="mt-4 sm:mt-6">
            <div className="text-2xl font-semibold my-4 sm:my-6 text-center md:text-left">Register to VILS BUDDY</div>
            <div className="text-[#666D89] max-w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%] text-center md:text-left">
                To access the platform's features, completing the registration form (<span className="text-red-500"> * </span> fields mandatory) is required.
            </div>
        </div>
        <div className="my-4 sm:my-6 text-primary text-center md:text-left">Personal Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t-[1px] px-3 py-6 gap-5">
            
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Roll Number</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <input
                        type="text"
                        className="outline-primary w-full px-4 py-2 border-[#DFE4EF] border-2 text-sm"
                        onChange={(e) => setRollNo(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">College Name</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <input
                        type="text"
                        className="outline-primary w-full px-4 py-2 border-[#DFE4EF] border-2 text-sm"
                        onChange={(e) => setCollege(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">First Name</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <input
                        type="text"
                        className="outline-primary w-full px-4 py-2 border-[#DFE4EF] border-2 text-sm"
                        onChange={(e) => setFname(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Last Name</div>
                </div>
                <div className="my-2">
                    <input
                        type="text"
                        className="outline-primary w-full px-4 py-2 border-[#DFE4EF] border-2 text-sm"
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Date of Birth</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2 grid grid-cols-3 gap-2">
                    <DateDropDown
                        data={DateData}
                        heading="Day"
                        valueHeading={dayOfBirth}
                        onClickHandler={dayOfBirthrDropDownHandler}
                    />
                    <DateDropDown
                        data={MonthData}
                        heading="Month"
                        valueHeading={monthOfBirthName}
                        onClickHandler={monthOfBirthDropDownHandler}
                    />
                    <DateDropDown
                        data={YearData}
                        heading="Year"
                        valueHeading={yearOfBirth}
                        onClickHandler={yearOfBirthDropDownHandler}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Country</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <RegistrationDropDown
                        label="Choose Your Country"
                        data={CountriesData}
                        onClickHandler={countryDropDownHandler}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">State</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <DateDropDown
                        data={StatesData}
                        heading="Choose Your State"
                        valueHeading={state}
                        onClickHandler={stateDropDownHandler}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Phone Number</div>
                    <div className="flex text-red-500">*</div>
                </div>
                <div className="my-2">
                    <input
                        type="number"
                        min={0}
                        placeholder="Enter 10 digit Mobile Number"
                        className="outline-primary w-full px-4 py-2 border-[#DFE4EF] border-2 text-sm"
                        onChange={(e) => {
                            if (e.target.value?.toString().length <= 10) {
                                setPhNo(e.target.value);
                            }
                        }}
                        value={phNo}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Gender</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <DateDropDown
                        data={GenderData}
                        heading="--None--"
                        valueHeading={genderDropdownValue}
                        onClickHandler={genderDropDownHandler}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Degree</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <DateDropDown
                        data={DegreeData}
                        heading="Select Your Degree"
                        valueHeading={degreeDropdownValue}
                        onClickHandler={degreeDropDownHandler}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Department</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2">
                    <DateDropDown
                        data={DepartmentData}
                        heading="Select Your Department"
                        valueHeading={department}
                        onClickHandler={departmentDropDownHandler}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Specialisation</div>
                </div>
                <div className="my-2">
                    <NAInput
                        className="outline-primary w-full px-4 py-2 border-[#DFE4EF] border-2 text-sm"
                        value={specialization}
                        setValue={setSpecialization}
                    />
                </div>
            </div>
            <div className="">
                <div className="flex justify-between md:justify-start">
                    <div className="text-[#666D89]">Joining Year/ Academic Year</div>
                    <div className="flex text-red-500">* </div>
                </div>
                <div className="my-2 grid grid-cols-2 gap-2">
                    <DateDropDown
                        data={YearData}
                        heading="Year"
                        valueHeading={joiningYearDropdownValue}
                        onClickHandler={joiningYearDropDownHandler}
                    />
                    <DateDropDown
                        data={AcademicYearData}
                        heading="Academic Year"
                        valueHeading={academicYearDropdownValue}
                        onClickHandler={academicYearDropDownHandler}
                    />
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center items-center cursor-pointer">
                <div
                    className="bg-[#DFE4EF] hover:bg-primary hover:text-white h-[55px] w-full md:w-[368px] rounded-full text-center flex items-center justify-center"
                    onClick={() => submitHandler()}
                >
                    <div>Submit</div>
                </div>
            </div>
        </div>
    </div>
</FullScreen>


    );
};

export default RegisterStudentDetails;

interface DateDropDownProps {
    data?: any[];
    valueHeading?: string;
    heading: string;
    onClickHandler: (e: string) => void;
}

const DateDropDown: React.FC<DateDropDownProps> = ({
    data,
    heading,
    onClickHandler,
    valueHeading,
}) => {
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (inputValue === '') {
            setFilteredData(data);
        } else {
            const lowerCaseInput = inputValue.toLowerCase();
            setFilteredData(data?.filter((d) => d.toLowerCase().includes(lowerCaseInput)));
        }
    }, [inputValue, data, heading]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const handleSelect = (e: string) => {
        onClickHandler(e);
        setInputValue('');
        setToggleDropDown(false);
    };
    return (
        <div className=" text-sm border-[#DFE4EF] border-2 relative">
            <div
                className={`flex flex-wrap items-center justify-between gap-3 cursor-pointer px-4 py-2`}
                onClick={() => setToggleDropDown(!toggleDropDown)}
            >
                <div className="flex flex-wrap items-center gap-2 justify-end">
                    {valueHeading ? <p>{valueHeading}</p> : <p className="">{heading}</p>}
                </div>
                {!toggleDropDown ? <FaChevronDown /> : <FaChevronUp />}
            </div>
            <div className="absolute z-20 w-full">
                <div
                    className={`${
                        toggleDropDown
                            ? 'h-full  text-sm border-x-[1.5px] border-t-[1.5px] border-[#DFE4EF] '
                            : 'h-0'
                    } transition-all duration-100 overflow-hidden text-xs  `}
                >
                    <input
                        className=" py-1 text-sm cursor-pointer pl-3   w-full"
                        value={inputValue}
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div
                    className={`${
                        toggleDropDown
                            ? 'max-h-28  text-sm border-t-[1.5px] border-[#DFE4EF] '
                            : 'h-0'
                    } transition-all duration-100 overflow-hidden text-xs  overflow-y-scroll  bg-white `}
                >
                    {filteredData?.map((e) => {
                        return (
                            <div
                                className="px-3 py-1 text-sm cursor-pointer border-[1px] border-[#DFE4EF]"
                                onClick={() => {
                                    handleSelect(e);
                                }}
                            >
                                {e}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};