import React, {useState, createContext} from "react";

const CurrentUserContext = createContext();

function CurrentUserProvider({children}) {
    const [currentUser, setCurrentUser] = useState();

    const value = [currentUser, setCurrentUser];

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export {CurrentUserContext, CurrentUserProvider}