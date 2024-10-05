// Components
import Button from 'components/Buttons';
import ExitTestModal from '../Modals/ExitTestModal';

// Hooks
import { useTestContext } from '../TestProvider';

const Navbar = () => {
    const { timer, exitButtonPressed, setExitButtonPressed } = useTestContext();

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const remainingSecs = seconds % 60;

        const minsString = mins > 0 ? `${mins} Min${mins !== 1 ? 's' : ''}` : '';
        const secsString =
            remainingSecs > 0 ? `${remainingSecs} Sec${remainingSecs !== 1 ? 's' : ''}` : '';

        return `${minsString}${mins > 0 && remainingSecs > 0 ? ' ' : ''}${secsString}`;
    };

    return (
        <div className="border-[1.5px] flex-col sm:flex-row border-gray-300  p-2 flex sm:justify-between sm:items-center rounded-md">
            <div className="flex items-center gap-3">
                <p className="text-primary font-semibold ps-2 border-e-[1.5px] border-gray-300 pe-4">
                    HR Assessment
                </p>
                <p className="text-sm font-inter">
                    You have been alloted 65 seconds to answer each question
                </p>
            </div>
            <div className="flex items-center mt-3 sm:mt-0 gap-4">
                <p className="text-sm text-gray-700 w-[300px] text-end">
                    Remaining Time : {timer > 0 ? formatTime(timer) : '😕 Aha, Times Up!!'}
                </p>
                {/* <Button
                    label="Exit Test"
                    className="bg-red-600 px-2 lg:px-8 w-fit rounded-md"
                    onClick={() => {
                        setExitButtonPressed(true);
                    }}
                /> */}
            </div>
            {exitButtonPressed && <ExitTestModal />}
        </div>
    );
};

export default Navbar;
