// Types
import { Route, createRoute } from 'types/Route.type';

// Utility functions
import { lazyLoadComponent } from 'utils/helper';

// Components
import RegisterStudentDetails from 'pages/app/RegisterStudentDetails';

/**
 * Collection of routes for the main application.
 * These routes are used for navigating within the app.
 */
export const AppRoutes: Route[] = [
    /*============================= DASHBOARD ROUTES ============================= */
    createRoute({
        path: '/',
        element: lazyLoadComponent('pages/app/GapAnalysis'),
    }),
    createRoute({
        path: '/dashboard',
        element: lazyLoadComponent('pages/app/GapAnalysis'),
    }),

    /*============================= MENTORS ROUTES ============================= */
    createRoute({
        path: '/one-on-one-mentor',
        element: lazyLoadComponent('pages/app/1on1Mentor'),
    }),
    createRoute({
        path: '/one-on-one-mentor/mentor-profile',
        element: lazyLoadComponent('pages/app/1on1Mentor/MentorProfile'),
    }),

    /*============================= REPORTS ROUTES ============================= */
    createRoute({
        path: '/reports',
        element: lazyLoadComponent('pages/app/Reports'),
    }),
    createRoute({
        path: '/reports/reading-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/ReadingReport'),
    }),
    createRoute({
        path: '/reports/listening-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/ListeningReport'),
    }),
    createRoute({
        path: '/reports/writing-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/WritingReport'),
    }),
    createRoute({
        path: '/reports/speaking-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/SpeakingReport'),
    }),
    createRoute({
        path: '/reports/behaviour-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/BehaviourReport'),
    }),
    createRoute({
        path: '/reports/mock-interview-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/MockInterviewReport'),
    }),
    createRoute({
        path: '/reports/hr-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/HRReport'),
    }),
    createRoute({
        path: '/reports/gap-analysis',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/GapAnalysis'),
    }),

    createRoute({
        path: '/reports/interview-prep-hub-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/InterviewPrepHubReport'),
    }),
    createRoute({
        path: '/reports/aptitude-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/AptitudeReport'),
    }),
    createRoute({
        path: '/reports/coding-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/CodingReport'),
    }),
    createRoute({
        path: '/reports/grammar-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/GrammarReport'),
    }),
    createRoute({
        path: '/reports/vocabulary-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/VocabularyReport'),
    }),
    createRoute({
        path: '/reports/tech-mcqs-report',
        element: lazyLoadComponent('pages/app/Reports/(report-pages)/TechMCQsReport'),
    }),

    /*============================= COMMUNICATION ROUTES ============================= */
    createRoute({
        path: '/communication',
        element: lazyLoadComponent('pages/app/Communication'),
    }),
    createRoute({
        path: '/communication/reading-module',
        element: lazyLoadComponent('pages/app/Communication/(communication-modules)/ReadingModule'),
    }),
    createRoute({
        path: '/communication/reading-module/test',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/ReadingModule/Test',
        ),
    }),
    createRoute({
        path: '/communication/writing-module',
        element: lazyLoadComponent('pages/app/Communication/(communication-modules)/WritingModule'),
    }),
    createRoute({
        path: '/communication/writing-module/test',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/WritingModule/Test',
        ),
    }),
    createRoute({
        path: '/communication/listening-module',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/ListeningModule',
        ),
    }),
    createRoute({
        path: '/communication/grammar-module',
        element: lazyLoadComponent('pages/app/Communication/(communication-modules)/GrammarModule'),
    }),
    createRoute({
        path: '/communication/grammar-module/level',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/GrammarModule/Level',
        ),
    }),
    createRoute({
        path: '/communication/grammar-module/level/assessment',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/GrammarModule/Level/Assessments',
        ),
    }),
    createRoute({
        path: '/communication/grammar-module/level/assessment/test',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/GrammarModule/Level/Assessments/Test',
        ),
    }),
    createRoute({
        path: '/communication/vocabulary-module',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/VocabularyModule',
        ),
    }),
    createRoute({
        path: '/communication/vocabulary-module/level',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/VocabularyModule/Level',
        ),
    }),
    createRoute({
        path: '/communication/vocabulary-module/level/assessment',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/VocabularyModule/Level/Assessments',
        ),
    }),
    createRoute({
        path: '/communication/vocabulary-module/level/assessment/test',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/VocabularyModule/Level/Assessments/Test',
        ),
    }),
    createRoute({
        path: '/communication/listening-module/test',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/ListeningModule/Test',
        ),
    }),
    createRoute({
        path: '/communication/speaking-module',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/SpeakingModule',
        ),
    }),
    createRoute({
        path: '/communication/speaking-module/test',
        element: lazyLoadComponent(
            'pages/app/Communication/(communication-modules)/SpeakingModule/Test',
        ),
    }),

    /*============================= GAP ANALYSIS ROUTES ============================= */
    createRoute({
        path: '/gap-analysis/',
        element: lazyLoadComponent('pages/app/GapAnalysis'),
    }),
    createRoute({
        path: '/gap-analysis/tests',
        element: lazyLoadComponent('pages/app/GapAnalysis/Tests'),
    }),
    createRoute({
        path: '/gap-analysis/tests/:id',
        element: lazyLoadComponent('pages/app/(college-customs)/vaani'),
    }),

    /*============================= COLLEGE CUSTOMS ROUTES ============================= */

    // createRoute({
    //     path: '/srkr',
    //     element: lazyLoadComponent('pages/app/(college-customs)/SRKR'),
    // }),

    // createRoute({
    //     path: '/skill-test',
    //     element: lazyLoadComponent('pages/app/(college-customs)/KLU'),
    // }),

    // createRoute({
    //     path: '/vaani',
    //     element: lazyLoadComponent('pages/app/(college-customs)/vaani'),
    // }),

    // createRoute({
    //     path: '/freshers',
    //     element: lazyLoadComponent('pages/app/(college-customs)/Freshers'),
    // }),

    // createRoute({
    //     path: '/tcs',
    //     element: lazyLoadComponent('pages/app/(college-customs)/tcs'),
    // }),
    // createRoute({
    //     path: '/tcs/round-2',
    //     element: lazyLoadComponent('pages/app/(college-customs)/tcs/round-2'),
    // }),
    // createRoute({
    //     path: '/tcs/round-3',
    //     element: lazyLoadComponent('pages/app/(college-customs)/tcs/round-3'),
    // }),

    // createRoute({
    //     path: '/mpsd',
    //     element: lazyLoadComponent('pages/app/(college-customs)/MPSD'),
    // }),
    // createRoute({
    //     path: '/ccc',
    //     element: lazyLoadComponent('pages/app/(college-customs)/ccc'),
    // }),
    // createRoute({
    //     path: '/ccc/reading/test',
    //     element: lazyLoadComponent('pages/app/ccc/reading/test'),
    // }),
    // createRoute({
    //     path: '/ccc/mock/test',
    //     element: lazyLoadComponent('pages/app/ccc/mock/test'),
    // }),

    /*============================= APTITUDE ROUTES ============================= */
    createRoute({
        path: '/aptitude',
        element: lazyLoadComponent('pages/app/Aptitude'),
    }),
    createRoute({
        path: '/aptitude/study-material',
        element: lazyLoadComponent('pages/app/Aptitude/StudyMaterial'),
    }),
    createRoute({
        path: '/aptitude/test',
        element: lazyLoadComponent('pages/app/Aptitude/Test'),
    }),

    /*============================= MOCK INTERVIEW ROUTES ============================= */
    createRoute({
        path: '/mock-interview/departments',
        element: lazyLoadComponent('pages/app/MockInterview'),
    }),
    createRoute({
        path: '/mock-interview/departments/company',
        element: lazyLoadComponent('pages/app/MockInterview/Company'),
    }),
    createRoute({
        path: '/mock-interview/departments/company/job-roles',
        element: lazyLoadComponent('pages/app/MockInterview/Company/JobRoles'),
    }),
    createRoute({
        path: '/mock-interview/departments/company/job-roles/assessments',
        element: lazyLoadComponent('pages/app/MockInterview/Company/JobRoles/Assessments'),
    }),
    createRoute({
        path: '/mock-interview/test',
        element: lazyLoadComponent('pages/app/MockInterview/Test'),
    }),

    /*============================= HR INTERVIEW ROUTES ============================= */
    createRoute({
        path: '/hr/departments',
        element: lazyLoadComponent('pages/app/HR'),
    }),
    createRoute({
        path: '/hr/departments/company',
        element: lazyLoadComponent('pages/app/HR/Company'),
    }),
    createRoute({
        path: '/hr/departments/company/job-roles',
        element: lazyLoadComponent('pages/app/HR/Company/JobRoles'),
    }),
    createRoute({
        path: '/hr/departments/company/job-roles/assessments',
        element: lazyLoadComponent('pages/app/HR/Company/JobRoles/Assessments'),
    }),
    createRoute({
        path: '/hr/test',
        element: lazyLoadComponent('pages/app/HR/Test'),
    }),

    /*============================= INTERVIEW-PREP-HUB ROUTES ============================= */
    createRoute({
        path: '/interview-prep-hub/departments',
        element: lazyLoadComponent('pages/app/InterviewPrepHub'),
    }),
    createRoute({
        path: '/interview-prep-hub/departments/department',
        element: lazyLoadComponent('pages/app/InterviewPrepHub/Department'),
    }),
    createRoute({
        path: '/interview-prep-hub/departments/department/department-modules',
        element: lazyLoadComponent('pages/app/InterviewPrepHub/Department/DepartmentModules'),
    }),
    createRoute({
        path: '/interview-prep-hub/test',
        element: lazyLoadComponent('pages/app/InterviewPrepHub/Test'),
    }),

    /*============================= BEHAVIOUR ROUTES ============================= */
    createRoute({
        path: '/behaviour',
        element: lazyLoadComponent('pages/app/Behaviour'),
    }),
    createRoute({
        path: '/behaviour/behaviour-module',
        element: lazyLoadComponent('pages/app/Behaviour/(behaviour-module)/BehaviourModule'),
    }),
    createRoute({
        path: '/behaviour/behaviour-module/test',
        element: lazyLoadComponent('pages/app/Behaviour/(behaviour-module)/BehaviourModule/Test'),
    }),
    createRoute({
        path: '/behaviour/dass-module',
        element: lazyLoadComponent('pages/app/Behaviour/(behaviour-module)/DassModule'),
    }),
    createRoute({
        path: '/behaviour/dass-module/test',
        element: lazyLoadComponent('pages/app/Behaviour/(behaviour-module)/DassModule/Test'),
    }),

    /*============================= SETTINGS ROUTES ============================= */
    createRoute({
        path: '/settings',
        element: lazyLoadComponent('pages/app/Settings'),
    }),

    /*============================= CODING ROUTES ============================= */
    createRoute({
        path: '/coding-pro',
        element: lazyLoadComponent('pages/app/Coding'),
    }),
    createRoute({
        path: '/coding/assessments',
        element: lazyLoadComponent('pages/app/Coding/Assessments'),
    }),
    createRoute({
        path: '/coding/test',
        element: lazyLoadComponent('pages/app/Coding/Test'),
    }),

    /*============================= REGISTER STUDENT DETAILS ROUTES ============================= */

    createRoute({
        path: '/register-student-details',
        element: RegisterStudentDetails,
    }),

    /* ================== */
    createRoute({
        path: '/test/technical-mcq',
        element: lazyLoadComponent('pages/app/test/technical-mcq'),
    }),
];
