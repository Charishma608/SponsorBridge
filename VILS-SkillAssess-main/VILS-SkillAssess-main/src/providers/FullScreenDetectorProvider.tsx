import Button from 'components/Buttons';
import FullScreen from 'components/FullScreen';
import { useNavigate } from 'react-router-dom';
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import screenfull from 'screenfull';

type IFullScreenState = 'INIT' | 'FULLSCREEN_OPENED' | 'FULLSCREEN_CLOSED' | 'EXIT';

interface FullScreenDetectorContextProps {
    fullscreenState: IFullScreenState;
    handleGoToFullScreen: () => void;
    handleExitFullScreen: () => void;
}

const FullScreenDetectorContext = createContext<FullScreenDetectorContextProps | undefined>(
    undefined,
);

// Hook to use the alert context
export const useFullScreenDetector = () => {
    const context = useContext(FullScreenDetectorContext);
    if (!context) {
        // throw new Error('useFullScreenDetector must be used within an FullScreenDetectorProvider');
        return {
            fullscreenState: 'INIT',
            handleExitFullScreen: () => {},
            handleGoToFullScreen: () => {},
        };
    }
    return context;
};

const FullScreenDetectorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const TOTAL_CHANCES = 3;
    const REDIRECTION_TIME = 5;
    const navigate = useNavigate();

    const [fullscreenState, setFullscreenState] = useState<IFullScreenState>('INIT');
    const [outOfWindowCount, setOutOfWindowCount] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(REDIRECTION_TIME);

    const handleGoToFullScreen = () => {
        try {
            if (screenfull.isEnabled) {
                screenfull.request();
                setFullscreenState('FULLSCREEN_OPENED');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleExitFullScreen = () => {
        try {
            if (screenfull.isEnabled) {
                screenfull.exit();
                setFullscreenState('EXIT');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFullScreenChange = useCallback(() => {
        // Check if the fullscreen element is not the element we expect
        if (document.fullscreenElement === null) {
            // If it is not, then we are not in fullscreen mode
            setFullscreenState('FULLSCREEN_CLOSED');
            setOutOfWindowCount((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        // Add event listener for fullscreenchange event
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [handleFullScreenChange]);

    useEffect(() => {
        if (outOfWindowCount === TOTAL_CHANCES) {
            if (seconds > 0) {
                const intervalId = setInterval(() => {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }, 1000);

                // Cleanup: Clear the interval when the component is unmounted
                return () => clearInterval(intervalId);
            } else {
                navigate('/gap-analysis');
            }
        }
    }, [seconds, outOfWindowCount, navigate]);

    return (
        <FullScreenDetectorContext.Provider
            value={{
                fullscreenState,
                handleGoToFullScreen,
                handleExitFullScreen,
            }}
        >
            <div className={fullscreenState === 'FULLSCREEN_CLOSED' ? 'block' : 'hidden'}>
                <FullScreen>
                    <div className="h-full grid place-content-center font-inter">
                        <div className="flex flex-col items-center gap-6">
                            <h2 className="text-3xl font-bold font-sans text-red-600">
                                Attention: Fullscreen Mode Required
                            </h2>
                            <div className="flex flex-col gap-3 text-center w-1/2">
                                <p>
                                    We've noticed that you've exited fullscreen mode, which is
                                    essential for an optimal testing experience. To ensure the
                                    integrity of the assessment, we kindly request that you return
                                    to fullscreen mode promptly.
                                </p>
                                <p className="font-semibold">
                                    You have {TOTAL_CHANCES - outOfWindowCount}{' '}
                                    {TOTAL_CHANCES - outOfWindowCount > 1
                                        ? 'more chances'
                                        : 'more chance'}{' '}
                                    left
                                </p>
                            </div>

                            <Button
                                className="w-fit px-8 font-inter text-md"
                                onClick={handleGoToFullScreen}
                                label="Go back to Fullscreen Mode"
                                disabled={TOTAL_CHANCES === outOfWindowCount}
                            />

                            {outOfWindowCount === TOTAL_CHANCES ? (
                                <p>{`Redirecting you to the dashboard in ${seconds} ...`}</p>
                            ) : null}
                        </div>
                    </div>
                </FullScreen>
            </div>
            <div className={fullscreenState === 'FULLSCREEN_CLOSED' ? 'hidden' : 'block'}>
                {children}
            </div>
        </FullScreenDetectorContext.Provider>
    );
};

export default FullScreenDetectorProvider;
