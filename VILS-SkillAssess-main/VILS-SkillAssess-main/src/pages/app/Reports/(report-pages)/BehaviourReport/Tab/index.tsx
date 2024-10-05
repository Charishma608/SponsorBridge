interface TabProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive = false, onClick = () => {} }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full rounded-3xl py-2 text-sm px-6 border-primary border-[1.3px] shadow-stripe ${
                isActive ? 'bg-primary text-white' : 'text-black'
            }`}
        >
            <p className="w-fit">{label}</p>
        </button>
    );
};

export default Tab;
