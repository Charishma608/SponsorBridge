// Internal Imports
import { useNavigate } from 'react-router-dom';

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
            <div className="w-[40vw] bg-white p-[10%] rounded-md flex flex-col items-center justify-center gap-2">
                <TextSubHeading>Would you like to leave the test now ?</TextSubHeading>
                <p className="text-gray-800 text-center text-sm">
                    Please note that your answers will not be stored
                </p>
                <div className="mt-4 flex flex-col md:flex-row gap-2">
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
                            navigate('/communication/grammar-module');
                        }}
                        className="px-8 py-1 bg-red-500 lg:w-[150px]"
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ExitTestModal;
