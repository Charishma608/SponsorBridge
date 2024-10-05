// Internal Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import ModalWrapper from '../ModalWrapper';
import TextHeading from '../Texts/TextHeading';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

interface OutOfWindowDetectorProps {
    children: React.ReactNode;
}

const OutOfWindowDetector: React.FC<OutOfWindowDetectorProps> = ({ children }) => {
    const TOTAL_CHANCES = 3;
    const [outOfWindowCount, setOutOfWindowCount] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(5);
    const navigate = useNavigate();
    const { handleExitFullScreen } = useFullScreenDetector();

    useEffect(() => {
        if (outOfWindowCount === TOTAL_CHANCES) {
            if (seconds > 0) {
                const intervalId = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }, 1000);

                // Cleanup: Clear the interval when the component is unmounted
                return () => clearInterval(intervalId);
            } else {
                handleExitFullScreen();
                navigate('/dashboard');
            }
        }
    }, [seconds, outOfWindowCount, navigate, handleExitFullScreen]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setOutOfWindowCount((count) => count + 1);
                setShowModal(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            // Cleanup: Remove the event listener when the component is unmounted
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [outOfWindowCount]);

    return (
        <div>
            {showModal ? (
                <ModalWrapper>
                    <div className="max-w-[40vw] bg-white rounded-md p-10 flex flex-col items-center justify-center gap-4">
                        <div>
                            <TextHeading className="text-red-500">Warning</TextHeading>
                        </div>
                        <div>
                            <p className="text-sm text-center">
                                Quick reminder: Tab switching is not allowed during the test. You
                                have a maximum of {TOTAL_CHANCES} chances for emergencies
                            </p>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-center">
                                {TOTAL_CHANCES - outOfWindowCount}{' '}
                                {TOTAL_CHANCES - outOfWindowCount > 1 ? 'chances' : 'chance'} left
                            </p>
                            <p
                                onClick={() => {
                                    if (outOfWindowCount < TOTAL_CHANCES) {
                                        setShowModal(false);
                                    }
                                }}
                                className="cursor-pointer mt-4 text-gray-700 text-center"
                            >
                                {outOfWindowCount < TOTAL_CHANCES
                                    ? 'Close'
                                    : `Redirecting you to the dashboard in ${seconds} ...`}
                            </p>
                        </div>
                    </div>
                </ModalWrapper>
            ) : null}
            {children}
        </div>
    );
};

export default OutOfWindowDetector;
