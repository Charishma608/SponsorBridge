// External Imports
import { nanoid } from 'nanoid';

// Internal Imports
import { FC, LazyExoticComponent } from 'react';

/**
 * Represents a route in the application.
 */
export type Route = {
    path: string; // The URL path of the route
    element: JSX.Element | LazyExoticComponent<FC> | FC; // The React element associated with the route
    id?: string; // Unique identifier for the route
};

/**
 * Creates a route with an optional generated id.
 *
 * @param route - The route object.
 * @returns A new route with an optional generated id.
 */
export const createRoute = (route: Route): Route => {
    return {
        ...route,
        id: route.id || nanoid(), // If id is not provided, generate a unique id using nanoid
    };
};
