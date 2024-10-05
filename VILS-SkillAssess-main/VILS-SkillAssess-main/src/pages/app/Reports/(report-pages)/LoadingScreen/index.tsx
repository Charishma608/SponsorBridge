// Components
import Loader from 'components/Loaders';
import TextLight from 'components/Texts/TextLight';

const LoadingScreen = () => {
    return (
        <div className="h-[40vh] grid place-content-center">
            <div className="flex items-center gap-2">
                <Loader />
                <TextLight>Loading ...</TextLight>
            </div>
        </div>
    );
};

export default LoadingScreen;
