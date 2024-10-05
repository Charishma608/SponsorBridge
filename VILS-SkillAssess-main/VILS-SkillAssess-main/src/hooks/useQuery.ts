import { useEffect, useState } from "react";

export default function useQuery(){
    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    useEffect(() => {
        if(window.screen.width < 750) 
            setIsMobile(true);
    }, []);

    return { isMobile };
}