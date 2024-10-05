// Components
import Navbar from './Navbar';
import NavigationTab from './NavigationTab';
import QuestionContainer from './QuestionContainer';
import FullScreen from 'components/FullScreen';
import OutOfWindowDetector from 'components/OutOfWindowDetector';

// Providers
import TestProvider from './TestProvider';

const TestPage = () => {
    return (
        <TestProvider>
            <FullScreen>
                <OutOfWindowDetector>
                    <div className="flex h-screen w-full p-4 gap-3">
                        <div className="h-full flex-1 flex flex-col gap-3">
                            <Navbar />
                            <QuestionContainer />
                        </div>
                        <NavigationTab />
                    </div>
                </OutOfWindowDetector>
            </FullScreen>
        </TestProvider>
    );
};

export default TestPage;
