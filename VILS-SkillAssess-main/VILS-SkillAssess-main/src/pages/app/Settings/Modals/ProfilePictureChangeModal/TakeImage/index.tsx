// Internal Imports 
import { useRef, useState } from "react";

// External Imports 
import Webcam from "react-webcam";
import { IoMdArrowBack } from "react-icons/io";

// Components 
import Button from "components/Buttons";

interface TakeImageProps {
    closeAction: () => void;
    handleSaveImage: (image: string | null, onResult?: () => void) => void;
}

const TakeImage: React.FC<TakeImageProps> = ({closeAction, handleSaveImage}) => {
    const [screenState, setScreenState] = useState<"Taking" | "Taken">("Taking");
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const cameraRef = useRef<Webcam>(null);


    const handleCapture = () => {
        if (cameraRef.current) {    
            const capturedImageSrc = cameraRef.current.getScreenshot();
            setImageSrc(capturedImageSrc);
            setScreenState("Taken");
        }   
    }

    const handleCancel = () => {
        setScreenState("Taking");
        setImageSrc(null);
    }

    const handleSave = () => {
        setLoading(true);
        handleSaveImage(imageSrc, () => {setLoading(false)});
    }

    return (
        <div className="w-[720px] h-[90vh] bg-[#212124] transform animate-zoom-in transition-transform duration-300 flex flex-col items-center rounded-md relative">
            <div className="absolute px-4 pt-4 left-0 top-0">
                <IoMdArrowBack className="text-white w-6 h-6 cursor-pointer" onClick={closeAction} />
            </div>

            <div className="w-[440px] h-full relative flex justify-center">
                <Webcam
                    audio = {false}
                    mirrored = {true}
                    ref = {cameraRef}
                    screenshotFormat="image/jpeg"
                    className="h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full" style = {{background: "radial-gradient(circle at center, transparent 220px, rgba(0, 0, 0, 0.5) 50%)"}}>
                </div>
                {
                    screenState === "Taking"
                    ?
                    <div className="absolute bottom-3 text-white">
                        <button className="bg-[#40485c] px-4 py-1 rounded-md" onClick={handleCapture}>
                            Next
                        </button>
                    </div>
                    :
                    <div className="absolute bottom-0 bg-[#212124] min-h-[35%] w-full py-3">
                        <p className="text-white text-center text-lg">Your new Profile Picture</p>
                        <img src={imageSrc!} alt="profilePic" className="w-[120px] h-[120px] rounded-full object-cover mx-auto mt-3" />
                        <div className="flex mt-6 gap-2">
                            <Button label="Cancel" onClick={handleCancel} className="bg-transparent text-[#ff9040] w-[40%]" />
                            <Button label="Save as Profile Picture" loading={loading} onClick={handleSave} className="bg-primary-dark" />
                        </div>
                    </div>
                }
            </div>

        </div>
    )
};

export default TakeImage;