import React, { useState, useContext, useEffect } from "react";
import GameCard from "./GameCard";
import { CurrentUserContext } from "./context/current_user";
function GamesList( {games, playButtonClicked} ) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)



    const gameCardElements = games.map((game) => {
        return <GameCard name={game.name} genre={game.genre} description={game.description} src="" 
            buttonClicked={playButtonClicked}
        />
    })

    return(
        <div>
            {gameCardElements}
        </div>
    )
}

export default GamesList;