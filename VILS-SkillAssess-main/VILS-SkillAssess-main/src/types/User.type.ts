/**
 * Represents a user with various profile details.
 */
export type User = {
    /** The college the user attended. */
    college?: string | null;
    /** The country of residence of the user. */
    country?: string | null;
    /** The degree pursued by the user. */
    degree?: string | null;
    /** The date of birth of the user. */
    dob?: string | null;
    /** The email address of the user. */
    email?: string | null;
    /** The first name of the user. */
    firstname?: string | null;
    /** The gender of the user. */
    gender?: string | null; // Consider specifying possible values
    /** The last name of the user. */
    lastname?: string | null;
    /** The year of passing out of college by the user. */
    passoutyear?: string | null;
    /** The phone number of the user. */
    phone?: string | null;
    /** The URL of the user's profile photo. */
    photo_url?: string | null;
    /** The specialization chosen by the user. */
    specialization?: string | null;
    /** The state of residence of the user. */
    state?: string | null;
    /* The Roll Number of the user */
    roll_no?: string | null;
    /* The department of the user */
    department?: string | null;
    /* The Joining Year of college of the user */
    joining_year?: string | null;
    /* The Academic Year of college of the user */
    academic_year?: string | null;
};
