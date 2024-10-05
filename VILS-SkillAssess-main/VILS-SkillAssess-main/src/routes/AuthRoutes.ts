// Types
import { Route, createRoute } from 'types/Route.type';

// Utility functions
import { lazyLoadComponent } from 'utils/helper';

// Pages
import LoginPage from 'pages/auth/Login';

/**
 * Collection of authentication-related routes.
 * These routes are used for user authentication and authorization.
 */
export const AuthRoutes: Route[] = [
    /*============================= INDEX ROUTE ============================= */
    // createRoute({
    //     path: '/auth',
    //     element: lazyLoadComponent('pages/auth'),
    // }),

    /*============================= LOGIN ROUTES ============================= */
    createRoute({
        path: '/auth/login',
        element: LoginPage,
    }),

    /*============================= SIGNUP ROUTES ============================= */
    createRoute({
        path: '/auth/signup',
        element: lazyLoadComponent('pages/auth/Signup'),
    }),
    createRoute({
        path: '/auth/signup/verify-email',
        element: lazyLoadComponent('pages/auth/Signup/VerifyEmail'),
    }),
    createRoute({
        path: '/auth/signup/success',
        element: lazyLoadComponent('pages/auth/Signup/Success'),
    }),

    /*============================= FORGET PASSWORD ROUTES ============================= */
    createRoute({
        path: '/auth/forget-password',
        element: lazyLoadComponent('pages/auth/ForgetPassword'),
    }),

    /*============================= ERROR [404] ROUTES ============================= */
    createRoute({
        path: '*',
        element: lazyLoadComponent('pages/auth/404'),
    }),
];
