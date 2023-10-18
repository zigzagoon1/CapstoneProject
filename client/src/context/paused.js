import React, {useState, createContext} from "react";

const PauseContext = createContext();

function PauseProvider({children}) {
    const [paused, setPaused] = useState(true);

    const value = [paused, setPaused];

    return (
        <PauseContext.Provider value={value}>
            {children}
        </PauseContext.Provider>
    )
}

export {PauseContext, PauseProvider}