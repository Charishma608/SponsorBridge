interface NotEligibleScreenProps {
    message?: string;
}

const NotEligibleScreen: React.FC<NotEligibleScreenProps> = ({ message }) => {
    return (
        <div className="w-full h-screen flex justify-center items-center flex-col gap-1">
            <p className="font-semibold">Oops!</p>
            <p className="text-sm">{message}</p>
        </div>
    );
};

export default NotEligibleScreen;
