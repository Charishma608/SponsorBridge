// Internal Imports
import { useNavigate } from 'react-router-dom';

// Components
import TextLight from 'components/Texts/TextLight';

// External Imports
import { IoIosArrowRoundBack } from 'react-icons/io';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-[50vh] grid place-content-center">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl text-primary font-bold">404</h1>
                <div className="text-center flex flex-col gap-2">
                    <TextLight>
                        Uh! oh, the page you are looking for doesn't exists or might be removed.
                    </TextLight>
                    <button onClick={handleGoBack}>
                        <TextLight className="w-fit m-auto flex items-center gap-1 cursor-pointer">
                            <IoIosArrowRoundBack className="text-2xl" />
                            Go Back
                        </TextLight>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
