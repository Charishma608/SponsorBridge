import Comp from './comp';
import TestProvider from './provider';
import FullScreen from 'components/FullScreen';

export default function Test() {
    return (
        <TestProvider>
            <FullScreen>
                <Comp />
            </FullScreen>
        </TestProvider>
    );
}
