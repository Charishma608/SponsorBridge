// External Imports
import { nanoid } from 'nanoid';

/**
 * Represents a tab in the sidebar of the application.
 */
export type Tab = {
    icon?: any;
    id?: string; // Unique identifier for the route
    path: string; // The URL path of the route
    label: string;
    iconClassName?: string;
};

/**
 * Creates a tab with an optional generated id.
 *
 * @param tab - The tab object.
 * @returns A new tab with an optional generated id.
 */
export const createTab = (tab: Tab): Tab => {
    return {
        ...tab,
        id: tab.id || nanoid(), // If id is not provided, generate a unique id using nanoid
    };
};
