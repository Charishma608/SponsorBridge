// Internal Imports
import { useNavigate } from 'react-router-dom';

// External Imports
import { RxCrossCircled } from 'react-icons/rx';

// Components
import Button from 'components/Buttons';
import ModalWrapper from 'components/ModalWrapper';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Hooks
import { useTestContext } from '../../TestProvider';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

const ExitTestModal = () => {
    const { setExitButtonPressed } = useTestContext();
    const navigate = useNavigate();
    const { handleExitFullScreen } = useFullScreenDetector();

    return (
        <ModalWrapper>
            <div className="relative w-[40vw] bg-white p-[11%] rounded-md flex flex-col items-center justify-center gap-2">
                <div className="absolute right-3 top-3">
                    <button
                        onClick={() => {
                            setExitButtonPressed(false);
                        }}
                    >
                        <RxCrossCircled className="font-semibold text-xl" />
                    </button>
                </div>
                <TextSubHeading>Would you like to leave the test now ?</TextSubHeading>
                <p className="text-gray-800 text-center text-sm">
                    Please note that if you exit the test your response will not get stored
                </p>
                <div className="mt-4 flex  md:flex-row flex-col gap-2">
                    <Button
                        label="Cancel"
                        onClick={() => {
                            setExitButtonPressed(false);
                        }}
                        className="px-8 py-1 bg-red-50 text-black lg:w-[150px]"
                    />
                    <Button
                        label="Exit"
                        onClick={() => {
                            handleExitFullScreen();
                            navigate('/communication/reading-module');
                        }}
                        className="px-8 py-1 bg-red-500 lg:w-[150px]"
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ExitTestModal;
