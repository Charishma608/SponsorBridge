interface NotEligibleScreenProps {
    message?: string;
}

const NotEligibleScreen: React.FC<NotEligibleScreenProps> = ({ message }) => {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-1">
            <div className="w-2/3">
                <p className="font-semibold text-3xl">🐳 Oops!</p>
                <p className="text-sm my-4">{message}</p>
            </div>
        </div>
    );
};

export default NotEligibleScreen;
