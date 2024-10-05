// Hooks
import { useCoding } from 'providers/CodingProvider';

// Components
import LoginPage from '../LoginPage';
import FullScreen from 'components/FullScreen';
import CodingModule from '../CodingModule';
import LoadingScreen from '../LoadingScreen';

const CodingLayout = () => {
    const { isAuthenticated, isLoading } = useCoding();

    if (isLoading) return <LoadingScreen />
    if (isAuthenticated) return <CodingModule />;
    return (
        <FullScreen>
            <LoginPage />
        </FullScreen>
    );
};

export default CodingLayout;