interface ToastWrapperProps {
    visible: boolean;
    children: React.ReactNode;
}

const ToastWrapper: React.FC<ToastWrapperProps> = ({ visible, children }) => {
    return (
        <div
            className={`text-sm ${
                visible ? 'animate-enter' : 'animate-leave'
            } bg-white z-[500] shadow-stripe w-[400px] rounded-md p-4`}
        >
            {children}
        </div>
    );
};

export default ToastWrapper;
