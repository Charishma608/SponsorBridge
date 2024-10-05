import { useAuth } from 'providers/AuthProvider';
import CollegeTestCard from './CollegeTestCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModalWrapper from 'components/ModalWrapper';
import { RxCross2 } from 'react-icons/rx';
import axiosInstance from 'configs/axios.config';
import cookies from 'js-cookie';
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';

const GapAnalysis = () => {
    const { setIsAuthenticated } = useAuth();
    const location = useLocation();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const companyId = urlParams.get('companyId');

    const handleLogout = async () => {
        const res = await axiosInstance.post('/student/auth/logout');
        if (res.status === 200) {
            const allCookies = cookies.get();
            for (const cookieName in allCookies) {
                cookies.remove(cookieName);
            }

            localStorage.clear();

            setIsAuthenticated(false);
        }
    };

    const [g, setG] = useState<any[]>();
    useEffect(() => {
        async function f() {
            try {
                const res = await axiosInstance.get(
                    `/gap-analysis/company/${companyId}/assessment/all`,
                );
                const cards: any[] = [];
                res?.data?.map((e: any) => {
                    const cardData = {
                        id: e?.id,
                        name: e?.name,
                        description: e?.description,
                        buttonColor: 'bg-primary',
                        themeColor: 'border-l-primary',
                        disabled: false,
                        path: e?.name,
                    };
                    cards.push(cardData);
                    return cardData;
                });
                setG(cards);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        f();
    }, [location.state]);
    const [logoutScreen, setLogoutScreen] = useState(false);

    return (
        <div className="p-4  md:ps-8 flex flex-col gap-4">
            {logoutScreen && (
                <ModalWrapper>
                    <div className=" bg-white w-[50vw] rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex-1 text-center font-medium">
                                <p>Logout </p>
                            </div>
                            <div>
                                <RxCross2 onClick={() => setLogoutScreen(false)} />
                            </div>
                        </div>
                        <div className="mt-10 text-center">Do you really want to logout?</div>
                        <div className="mt-6 mb-3 text-center">
                            <button
                                className="w-[80%] text-lg p-3 bg-red-500 text-white rounded-full"
                                onClick={handleLogout}
                            >
                                Yes
                            </button>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={() => setLogoutScreen(false)}
                                className="w-[80%] text-lg p-3 bg-slate-500 text-white rounded-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </ModalWrapper>
            )}

            <div className="flex flex-col mt-[5%]">
                <div className="flex items-center">
                    <BackButton />
                    <TextHeading> &nbsp; Go Back</TextHeading>
                </div>
                <div className="flex flex-wrap gap-2 inter p-auto mt-[2%]">
                    {g?.map((test) => (
                        <CollegeTestCard
                            key={test.id}
                            id={test.id}
                            name={test.name}
                            description={test.description}
                            path={test.path}
                            buttonColor={test.buttonColor}
                            themeColor={test.themeColor}
                            disabled={test.disabled}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GapAnalysis;
