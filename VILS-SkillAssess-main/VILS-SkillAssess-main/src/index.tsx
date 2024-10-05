/* Internal Imports */
import ReactDOM from 'react-dom/client';

/* External Imports */
import 'rc-tooltip/assets/bootstrap_white.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter as Router } from 'react-router-dom';

/* Components */
import App from './App';
import 'styles/index.css';
// import reportWebVitals from './reportWebVitals';
import AlertProvider from 'providers/AlertProvider';
import { AuthProvider } from 'providers/AuthProvider';
import { LayoutProvider } from 'providers/LayoutProvider';
// import DeviceNotSupported from 'pages/app/DeviceNotSupported';

// Error Handlers
import ErrorBoundary from 'errorHandling';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ErrorBoundary>
        <Router basename="/skill">
            <AuthProvider>
                <AlertProvider>
                    <LayoutProvider>
                        {/* {window.screen.width < 750 ? <DeviceNotSupported /> : <App />} */}
                        <App />
                    </LayoutProvider>
                </AlertProvider>
            </AuthProvider>
        </Router>
    </ErrorBoundary>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
