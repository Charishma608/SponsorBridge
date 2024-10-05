interface ModalWrapperProps {
    children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
    return (
        <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full h-full z-50 grid place-content-center">
            <div>{children}</div>
        </div>
    );
};

export default ModalWrapper;
