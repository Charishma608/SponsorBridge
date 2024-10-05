import FullScreen from 'components/FullScreen';
import GapAnalysisProvider from './GapAnalysisProvider';
import MainContent from './MainContent';

const GapAnalysis = () => {
    return (
        <GapAnalysisProvider>
            <FullScreen>
                <MainContent />
            </FullScreen>
        </GapAnalysisProvider>
    );
};

export default GapAnalysis;
