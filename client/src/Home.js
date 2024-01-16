import React, { useContext } from "react";
import { CurrentUserContext } from "./context/current_user";
// Eventually add functionality to fetch newest/most popular games
function Home() {
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser)
    return (
        <div className="text-center">
            {currentUser[0] ? `Hello, ${currentUser[0].name}! How are you today?` : "Please go to the Account tab to sign-up or login!"}
        </div>
    )
}

export default Home;