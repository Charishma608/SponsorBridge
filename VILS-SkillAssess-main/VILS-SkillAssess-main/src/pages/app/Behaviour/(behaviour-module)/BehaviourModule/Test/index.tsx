// Providers
import TestProvider from './TestProvider';

// Components
import Navbar from './Navbar';
import VideoScreen from './VideoScreen';
import QuestionContainer from './QuestionContainer';
import FullScreen from 'components/FullScreen';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

const TestPage = () => {
    return (
        <TestProvider>
            <FullScreen>
                <OutOfWindowDetector>
                    <div className="h-screen w-full flex flex-col p-4 gap-3">
                        <Navbar />
                        <VideoScreen />
                        <QuestionContainer />
                    </div>
                </OutOfWindowDetector>
            </FullScreen>
        </TestProvider>
    );
};

export default TestPage;
