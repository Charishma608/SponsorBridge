import React, { useState, useEffect, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const handleErrors = (event: ErrorEvent) => {
            console.error('Unhandled error caught by ErrorBoundary:', event.error);
            setHasError(true);
            setError(event?.error?.toString());
        };

        window.addEventListener('error', handleErrors);

        return () => {
            window.removeEventListener('error', handleErrors);
        };
    }, []);

    if (hasError) {
        return (
            <div className="h-screen w-screen overflow-hidden grid place-content-center bg-red-50">
                <div className="text-center m-auto">
                    <h1 className="text-4xl font-semibold text-red-500">
                        Oops! Something went wrong.
                    </h1>
                    <p className="w-[60%] mt-4 m-auto font-inter text-lg">
                        We're sorry, but something unexpected happened. Our team has been notified
                        and is investigating the issue. Kindly refresh the page or try again later.
                    </p>

                    <div className="w-2/3 m-auto mt-10">
                        <p className="line-clamp-1 bg-red-100 rounded-3xl py-2 px-8 font-inter w-fit text-center m-auto">
                            LOG: {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ErrorBoundary;
