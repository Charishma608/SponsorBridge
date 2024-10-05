// Components
import Select from 'components/Select';

// Hooks
import { useAuth } from 'providers/AuthProvider';
import { useDashboardContext } from '../DashboardProvider';
import LoadingScreen from '../LoadingScreen';

const Navbar = () => {
    const { user } = useAuth();
    const { timelineOptions, timeLineSelected, setTimeLineSelected } = useDashboardContext();

    if (user == null) {
        return <LoadingScreen />;
    }

    return (
        <div>
            <div className="flex items-start justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-2xl md:font-semibold">
                    <h3 className="md:font-semibold md:text-primary">Hello,</h3>
                    <p className="md:font-normal font-semibold">
                        {user?.firstname} {user?.lastname}
                    </p>
                </div>
                <div className="hidden md:block">
                    <Select
                        options={timelineOptions}
                        value={timeLineSelected}
                        setValue={setTimeLineSelected}
                        placeHolder=""
                        classWidth="w-[150px]"
                        className="shadow-light border-none rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
