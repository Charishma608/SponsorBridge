// Providers
import HRReportProvider from './HRReportProvider';

import MainContent from './MainContent';

const HRReport = () => {
    return (
        <HRReportProvider>
            <MainContent />
        </HRReportProvider>
    );
};

export default HRReport;
