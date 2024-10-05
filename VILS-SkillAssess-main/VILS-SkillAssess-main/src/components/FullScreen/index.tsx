interface FullScreenProps {
    children: React.ReactNode;
}

const FullScreen: React.FC<FullScreenProps> = ({ children }) => {
    return (
        <div className="w-screen h-screen overflow-y-scroll bg-white absolute top-0 left-0 z-[200]">
            {children}
        </div>
    );
};

export default FullScreen;
