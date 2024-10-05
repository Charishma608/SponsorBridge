// Internal Imports
import { lazy, LazyExoticComponent } from 'react';

// External Imports
import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Lazy loads a component based on the provided component path.
 *
 * @param componentPath - The path to the component file.
 * @returns Lazily imported component.
 */
export const lazyLoadComponent = (componentPath: string): LazyExoticComponent<any> => {
    return lazy(() => import(/* webpackChunkName: "[request]" */ `../${componentPath}`));
};

/**
 * Combines multiple class names using both clsx and Tailwind CSS's twMerge.
 * @param {...ClassValue[]} inputs - Variable number of class names or class condition objects.
 * @returns {string} - A string containing the merged class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
    // Merge class names using clsx
    const mergedClassNames = clsx(inputs);

    // Further merge class names using Tailwind CSS's twMerge
    return twMerge(mergedClassNames);
};

/**
 * Converts an input file to the base64 string format
 * @param file - a file object
 * @returns - returns a promise with the base64 string as an input to the resolve method
 */
export const convertToBase64 = (file: Blob): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.result instanceof ArrayBuffer) {
                reject('Recieved Type ArrayBuffer instead of base64 string!');
                return;
            }

            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

/**
 * Formats a given date string into a human-readable format.
 * @param inputDate The input date string to be formatted.
 * @returns A formatted date and time string in the format: "Day Month Year at Hour:Minute AM/PM".
 * If the input date is invalid, returns "Invalid date".
 */
export const formatDate = (inputDate: string): string => {
    // Parse the input date and time
    const inputDateTime = new Date(inputDate);

    // Check if the inputDate is a valid date
    if (isNaN(inputDateTime.getTime())) {
        return 'Invalid date';
    }

    // Define month names
    const monthNames: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Get date components
    const day: number = inputDateTime.getDate();
    const month: string = monthNames[inputDateTime.getMonth()];
    const year: number = inputDateTime.getFullYear();
    const hours: number = inputDateTime.getHours();
    const minutes: number = inputDateTime.getMinutes();

    // Format the time in AM/PM format
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: number = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Create the formatted date and time string
    const formattedDateTime: string = `${day} ${month} ${year} at ${formattedHours}:${String(
        minutes,
    ).padStart(2, '0')} ${ampm}`;

    return formattedDateTime;
};

export function capitalizeFirstLetter(str: string) {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

export const convertBlobArrayToBase64 = (data: Blob[]) => {
    const blob = new Blob(data, {
        type: 'video/webm',
    });

    const reader = new FileReader();

    reader.onload = async () => {
        try {
            const base64URL = (reader?.result as string)?.split(',')[1];
            return {
                status: 'OK',
                data: base64URL,
                error: null,
            };
        } catch (error) {
            return {
                status: 'ERROR',
                data: null,
                error,
            };
        }
    };

    return reader.readAsDataURL(blob);
};

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
