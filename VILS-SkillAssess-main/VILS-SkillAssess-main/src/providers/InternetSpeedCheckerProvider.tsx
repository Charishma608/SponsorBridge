import { createContext, useState, useEffect, useContext } from "react";

export const MINIMUM_SPEED_REQUIRED = 512; // In Kbs
export const PING = 5; // In Seconds

export type IInternetSpeedCheckerStatus = "IDEAL" | "CONNECTING" | "CONNECTED" | "ERROR";

export interface IInternetSpeedCheckerContext {
    speed: number | null;
    status: IInternetSpeedCheckerStatus;
}

export const InternetSpeedCheckerContext = createContext<IInternetSpeedCheckerContext | null>(null);

// Custom hook to use the InternetSpeedCheckerContext
export const useInternetSpeedChecker = () => {
    const context = useContext(InternetSpeedCheckerContext);
    if (!context) {
        throw new Error("useInternetSpeedChecker must be used within an InternetSpeedCheckerProvider");
    }
    return context;
};


// Speed test function
const testInternetSpeed = async (): Promise<{ speed: number }> => {
    
    const INTERNET_SPEED_CHECKER_ASSET_LINK: string = "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg";
    const INTERNET_SPEED_CHECKER_ASSET_SIZE = (1805 * 8); // In Kb(s)
    
    const startTime = new Date().getTime();

    // Fetch the asset
    const response = await fetch(INTERNET_SPEED_CHECKER_ASSET_LINK, {
        method: 'GET',
        cache: 'no-cache', // Ensure we don't get a cached result
    });

    if (!response.ok) {
        throw new Error('Failed to download the asset.');
    }

    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // Time in seconds

    // Calculate the download speed in bits per second (Mbps)
    const speed = INTERNET_SPEED_CHECKER_ASSET_SIZE / (duration * 1024);
    return { speed };
};

// Provider component
export default function InternetSpeedCheckerProvider({ children }: { children: React.ReactNode }) {
    const [speed, setSpeed] = useState<number | null>(null);
    const [status, setStatus] = useState<IInternetSpeedCheckerStatus>("IDEAL");

    const checkSpeed = async () => {
        setStatus("CONNECTING");
        try {
            const { speed } = await testInternetSpeed();
            setSpeed(speed);
            setStatus("CONNECTED");
        } catch (error) {
            setStatus("ERROR");
            setSpeed(null);
        }
    };

    useEffect(() => {
        // Initial speed check
        checkSpeed();

        // Set interval to check speed every 60 seconds (or any other interval)
        const intervalId = setInterval(checkSpeed, PING * 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <InternetSpeedCheckerContext.Provider value={{ speed, status }}>
            {children}
        </InternetSpeedCheckerContext.Provider>
    );
}
