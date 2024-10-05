// Components
import FullScreen from 'components/FullScreen';
import TestModule from './TestModule';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

// Providers
import TestProvider from './TestProvider';
import FullScreenDetectorProvider from 'providers/FullScreenDetectorProvider';

const TestPage = () => {
    return (
        <FullScreenDetectorProvider>
            <FullScreen>
                <TestProvider>
                    <OutOfWindowDetector>
                        <TestModule />
                    </OutOfWindowDetector>
                </TestProvider>
            </FullScreen>
        </FullScreenDetectorProvider>
    );
};

export default TestPage;
