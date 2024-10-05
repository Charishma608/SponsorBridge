// Components
import ModalWrapper from 'components/ModalWrapper';

// Assets
import DeviceNotSupportedImage from 'assets/images/DeviceNotSupported.png';

const DeviceNotSupported = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <ModalWrapper>
                <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden bg-white p-4">
                    <img src={DeviceNotSupportedImage} alt="device-not-supported" />
                    <p className="text-center font-semibold">
                        VILS Buddy cannot be used on your screen. Please use Laptop or Tablet for
                        better experience.
                    </p>
                </div>
            </ModalWrapper>
        </div>
    );
};

export default DeviceNotSupported;
