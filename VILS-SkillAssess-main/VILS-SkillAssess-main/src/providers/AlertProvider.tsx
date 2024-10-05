import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';
import Button from 'components/Buttons';

interface AlertContextProps {
    showAlert: (text: string, action?: () => void) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

// Hook to use the alert context
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AuthProvider');
    }
    return context;
};

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>(
        'This is an important alert, please look into it closely! Please click on the OK button!',
    );
    const callBack = useRef<() => void>(() => {});

    const showAlert = (text: string, action: () => void = () => {}) => {
        setMessage(text);
        setVisible(true);
        callBack.current = action;
    };

    const handleOk = () => {
        setVisible(false);
        callBack?.current?.();
        callBack.current = () => {};
    };

    const outerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setVisible(false);
        callBack?.current?.();
        callBack.current = () => {};
    };

    const alertContextValue: AlertContextProps = {
        showAlert,
    };

    return (
        <div>
            {visible ? (
                <div
                    onClick={outerClick}
                    className="absolute w-screen h-screen z-[500] top-0 left-0"
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="rounded-lg p-6 absolute top-1/4 md:max-w-[500px] max-w-[95vw] animate-flow-in transition-transform border shadow-2xl bg-white left-1/2 -translate-x-1/2 flex flex-col gap-6 z-10"
                    >
                        <p className="text-md font-inter">{message}</p>
                        <div className="flex justify-end">
                            <Button
                                label="OK"
                                onClick={handleOk}
                                className="w-min px-8 py-2 font-inter"
                            />
                        </div>
                    </div>
                </div>
            ) : null}
            <AlertContext.Provider value={alertContextValue}>{children}</AlertContext.Provider>
        </div>
    );
};

export default AlertProvider;
