// External Imports
import { AiFillExperiment } from 'react-icons/ai';

// Components
import Button from 'components/Buttons';

// Internal Imports
import { useNavigate } from 'react-router-dom';

interface NoDataScreenProps {
    description: string;
    helpers?: string;
    path: string;
}

const NoDataScreen: React.FC<NoDataScreenProps> = ({ description, helpers, path }) => {
    const navigate = useNavigate();

    return (
        <div className="h-[100vh] bg-gray-100 rounded-md flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <AiFillExperiment className="text-4xl text-dark" />
                <p className="text-semibold">Oops!</p>
            </div>
            <p className="text-center w-1/2 text-sm">{description}</p>
            <p className="text-center w-2/3 text-sm">{helpers}</p>
            <Button
                className="w-fit px-8 bg-primary-dark py-2"
                label="Get Started"
                onClick={() => {
                    navigate(path);
                }}
            />
        </div>
    );
};

export default NoDataScreen;
