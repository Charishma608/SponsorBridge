interface InsightsCardpProps {
    label: string;
    onClick?: () => void;
}

const InsightsCard: React.FC<InsightsCardpProps> = ({ label = '' }) => {
    return (
        <div className="w-full h-full shadow-light rounded-md p-4 bg-white flex flex-col justify-between text-sm">
            <p className="line-clamp-2">{label}</p>
        </div>
    );
};

export default InsightsCard;
