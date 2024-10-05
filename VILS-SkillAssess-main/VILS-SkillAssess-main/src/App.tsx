// Internal Imports
import { ComponentType, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import { AppRoutes } from 'routes/AppRoutes';
import { AuthRoutes } from 'routes/AuthRoutes';

// Components
import Layout from 'layout';
import Loader from 'components/Loaders';
import TextLight from 'components/Texts/TextLight';

// Hooks
import { useAuth } from 'providers/AuthProvider';

/**
 * Main application component responsible for rendering routes based on user authentication status.
 */
const App = () => {
    // Authentication status provided by the AuthProvider
    const { isAuthenticated, isLoading } = useAuth();

    // Determine which set of routes to render based on authentication status
    const Routings = isAuthenticated ? AppRoutes : AuthRoutes;

    if (isLoading) return null;
    return (
        <Layout>
            <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                    {Routings.map(({ id, element, path }) => {
                        const Comp = element as ComponentType;
                        return <Route path={path} element={<Comp />} key={id} />;
                    })}
                </Routes>
            </Suspense>
        </Layout>
    );
};

const SuspenseFallback: React.FC<{}> = () => {
    return (
        <div className="h-[90vh] w-full grid place-content-center">
            <div className="flex gap-2 items-center">
                <Loader />
                <TextLight>Loading ...</TextLight>
            </div>
        </div>
    );
};

export default App;
