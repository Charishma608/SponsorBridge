import { createContext, useContext, useState } from "react";

export const initialState = {
    srkr: {
        id: "srkr",
        path: "/srkr",
        name: "Assetsense Mock Test 2024",
        description: "This coding assessment evaluates key areas such as programming skills, problem-solving aptitude, and coding behavior. Buddy provides a comprehensive status report on each candidate, helping to identify coding strengths and areas for improvement.",
        sets: {
            coding: [
                {
                    id: "question-1",
                    solved: false
                },
                {
                    id: "question-2",
                    solved: false
                },
            ]
        }
    }
};

interface GapAnalysisContextProps{
    state: typeof initialState;
    setState: React.Dispatch<React.SetStateAction<typeof initialState>>;
}
export const GapAnalysisContext = createContext<GapAnalysisContextProps | null>(null);

export function useGapAnalysis() {
    const context = useContext(GapAnalysisContext);
    if(!context){
        throw new Error("useGapAnalysis can only be used inside GapAnalysisProvider");
    }

    return context;
}

export default function GapAnalysisProvider({children}: {children: React.ReactNode}){

    const [state, setState] = useState<typeof initialState>(initialState)

    return(
        <GapAnalysisContext.Provider value={{
            state,
            setState
        }}>
            {children}
        </GapAnalysisContext.Provider>
    )
}