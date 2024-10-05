import FullScreen from 'components/FullScreen';
import logo from 'assets/svgs/Logo.svg';
// import Input from 'components/Inputs';
import RegistrationDropDown from 'components/RegistrationDropdown';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAlert } from 'providers/AlertProvider';

// Configs
import axios from 'configs/axios.config';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Input from 'components/Inputs';
import NAInput from 'components/NAInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

const SignupPage = () => {
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
    const [email, setEmail] = useState('');
    const [coupon, setCoupon] = useState('');
    const [password, setPassword] = useState('');
    const [college, setCollege] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    const navigate = useNavigate();
    const { setIsVerified } = useAuth();

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
    const AcademicYearData = ['1', '2', '3', '4', '5'];
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

    for (let i = 1990; i <= currDate.getFullYear(); i++) {
        YearData.push(i.toString());
    }
    for (let i = 1; i <= 31; i++) {
        DateData.push(i.toString());
    }

    const getNumString = (e: number) => {
        if (e < 10) return `0${e}`;
        return `${e}`;
    };

    const degreeDropDownHandler = (e: string) => {
        setDegreeDropdownValue(e);
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
            email &&
            coupon &&
            password &&
            college
            ? true
            : false;
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitHandler = async () => {
        if (!allFieldsFilled()) {
            showAlert('Please fill all the required fields.');
            return;
        }

        if (phNo?.toString().length !== 10) {
            showAlert('Please enter a valid phone number.');
            return;
        }
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address.');
            return;
        }
        let payload: any = {
            coupon_code: coupon as string,
            email: email,
            firstname: fname,
            lastname: lname,
            password: password,
            gender: genderDropdownValue,
            dob: `${dayOfBirth}-${monthOfBirth}-${yearOfBirth}`,
            phone: phNo,
            roll_no: rollNo,
            department: department,
            state: state,
            country: country,
            degree: degreeDropdownValue,
            specialization: specialization,
            joining_year: `${joiningYearDropdownValue}`,
            academic_year: `${academicYearDropdownValue}`,
            college: college,
        };

        try {
            const res = await axios.post(`/student/auth/register`, payload);
            if (res.status === 201) {
                showAlert('Your account has been created please verify it', () => {
                    setIsVerified(false);
                    navigate('/auth');
                });
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message || 'Network issue, please try again later';
            showAlert(errorMessage);
        }
    };

    return (
        <FullScreen>
            <div className="py-8 px-14">
                <div className="">
                    <img src={logo} alt="logo" />
                </div>
                <div className="">
                    <div className="text-2xl font-semibold my-6">Sign Up to VILS BUDDY</div>
                    <div className="text-[#666D89] max-w-[40%]">
                        To access the platform's features, completing the registration form ({' '}
                        <span className="text-red-500"> * </span>
                        fields mandatory) is required.
                    </div>
                </div>
                <div className="my-6 text-primary">Personal Details</div>
                <div className="grid grid-cols-2 border-t-[1px] px-3 py-6  gap-5 ">
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Coupon Code</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            <input
                                type="text"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                onChange={(e) => {
                                    setCoupon(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">College Name</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            <input
                                type="text"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                onChange={(e) => {
                                    setCollege(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Roll Number</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            <input
                                type="text"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                onChange={(e) => {
                                    setRollNo(e.target.value);
                                }}
                            />{' '}
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">First Name</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className="my-2">
                            <input
                                type="text"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                onChange={(e) => {
                                    setFname(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Last Name</div>
                        </div>
                        <div className=" my-2">
                            <input
                                type="text"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                onChange={(e) => {
                                    setLname(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Email Address</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            <input
                                type="email"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Password</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            <Input
                                value={password}
                                setValue={setPassword}
                                className="rounded-none outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                placeholder="******"
                                type="password"
                                eye={true}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Date of Birth</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className="my-2 grid grid-cols-3 gap-2">
                            <div className="">
                                {/* <RegistrationDropDown
                                    label="Day"
                                    data={DateData}
                                    onClickHandler={dayOfBirthrDropDownHandler}
                                ></RegistrationDropDown> */}
                                <DateDropDown
                                    data={DateData}
                                    heading="Day"
                                    valueHeading={dayOfBirth}
                                    onClickHandler={dayOfBirthrDropDownHandler}
                                />
                            </div>
                            <div className="">
                                {/* <RegistrationDropDown
                                    label="Month"
                                    data={MonthData}
                                    onClickHandler={monthOfBirthDropDownHandler}
                                ></RegistrationDropDown> */}
                                <DateDropDown
                                    data={MonthData}
                                    heading="Month"
                                    valueHeading={monthOfBirthName}
                                    onClickHandler={monthOfBirthDropDownHandler}
                                />
                            </div>
                            <div className="">
                                {/* <RegistrationDropDown
                                    label="Year"
                                    data={YearData}
                                    onClickHandler={yearOfBirthDropDownHandler}
                                ></RegistrationDropDown> */}
                                <DateDropDown
                                    data={YearData}
                                    heading="Year"
                                    valueHeading={yearOfBirth}
                                    onClickHandler={yearOfBirthDropDownHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Country</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            <RegistrationDropDown
                                label="Choose Your Country"
                                data={CountriesData}
                                onClickHandler={countryDropDownHandler}
                            ></RegistrationDropDown>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">State</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            {/* <RegistrationDropDown
                                label="Choose Your State"
                                data={StatesData}
                                onClickHandler={stateDropDownHandler}
                            ></RegistrationDropDown> */}
                            <DateDropDown
                                data={StatesData}
                                heading="Choose Your State"
                                valueHeading={state}
                                onClickHandler={stateDropDownHandler}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Phone Number</div>
                            <div className="flex text-red-500">*</div>
                        </div>
                        <div className="my-2">
                            <input
                                type="number"
                                min={0}
                                placeholder="Enter 10 digit Mobile Number"
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
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
                        <div className="flex">
                            <div className="text-[#666D89]">Gender</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            {/* <RegistrationDropDown
                                label="--None--"
                                data={GenderData}
                                onClickHandler={genderDropDownHandler}
                            ></RegistrationDropDown> */}
                            <DateDropDown
                                data={GenderData}
                                heading="--None--"
                                valueHeading={genderDropdownValue}
                                onClickHandler={genderDropDownHandler}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Degree</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className="my-2">
                            {/* <RegistrationDropDown
                                label="Select Your Degree"
                                data={DegreeData}
                                onClickHandler={degreeDropDownHandler}
                            ></RegistrationDropDown> */}
                            <DateDropDown
                                data={DegreeData}
                                heading="Select Your Degree"
                                valueHeading={degreeDropdownValue}
                                onClickHandler={degreeDropDownHandler}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Department</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className=" my-2">
                            {/* <RegistrationDropDown
                                label="Select Your Department"
                                data={DepartmentData}
                                onClickHandler={departmentDropDownHandler}
                            ></RegistrationDropDown> */}
                            <DateDropDown
                                data={DepartmentData}
                                heading="Select Your Department"
                                valueHeading={department}
                                onClickHandler={departmentDropDownHandler}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Specialisation</div>
                        </div>
                        <div className=" my-2">
                            <NAInput
                                className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                value={specialization}
                                setValue={setSpecialization}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex">
                            <div className="text-[#666D89]">Joining Year/ Academic Year</div>
                            <div className="flex text-red-500">* </div>
                        </div>
                        <div className="my-2 grid grid-cols-2 gap-2">
                            <div className="">
                                {/* <RegistrationDropDown
                                    label="Year"
                                    data={YearData}
                                    onClickHandler={joiningYearDropDownHandler}
                                ></RegistrationDropDown> */}
                                <DateDropDown
                                    data={YearData}
                                    heading="Year"
                                    valueHeading={joiningYearDropdownValue}
                                    onClickHandler={joiningYearDropDownHandler}
                                />
                            </div>
                            <div className="">
                                {/* <RegistrationDropDown
                                    label="Academic Year"
                                    data={AcademicYearData}
                                    onClickHandler={academicYearDropDownHandler}
                                ></RegistrationDropDown> */}
                                <DateDropDown
                                    data={AcademicYearData}
                                    heading="Academic Year"
                                    valueHeading={academicYearDropdownValue}
                                    onClickHandler={academicYearDropDownHandler}
                                />
                            </div>
                        </div>
                    </div>

                    {/* {totalSem >= 1 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 1</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem1(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 2 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 2</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem2(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 3 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 3</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem3(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 4 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 4</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem4(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 5 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 5</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem5(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 6 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 6</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem6(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 7 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 7</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <input
                                    type="text"
                                    className="outline-primary w-full px-4 py-2  border-[#DFE4EF] border-2 flex items-center text-sm"
                                    onChange={(e) => {
                                        setSem7(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {totalSem >= 8 && (
                        <div className="">
                            <div className="flex">
                                <div className="text-[#666D89]">Semester 8</div>
                                <div className="flex text-red-500">* </div>
                            </div>
                            <div className=" my-2">
                                <Input
                                    className="rounded-none border-[#DFE4EF] border-2"
                                    onChange={(e) => {
                                        setSem8(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                    )} */}
                    <div className="col-span-2 flex justify-center items-center cursor-pointer">
                        <div
                            className="bg-[#DFE4EF] hover:bg-primary hover:text-white h-[55px] w-[368px] rounded-full text-center flex items-center justify-center"
                            onClick={() => {
                                submitHandler();
                            }}
                        >
                            <div className="">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </FullScreen>
    );
};

export default SignupPage;

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
                        className=" py-1 text-sm cursor-pointer pl-3   "
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
