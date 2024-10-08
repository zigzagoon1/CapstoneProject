import React, { useState, useContext, useEffect } from "react";
import GameCard from "./GameCard";
import { CurrentUserContext } from "./context/current_user";
function GamesList( {games, playButtonClicked} ) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [images, setImages] = useState([]);

    console.log(games)

    return(
        <div>
            {games ? games.map((game) => {
                game.name = game.name.replace(/\s/g, '');
                const gamePreview = `/images/${game.name}Preview.png`;
                console.log(gamePreview);
                return <GameCard key={game.id} name={game.name} genre={game.genre} description={game.description} src={gamePreview} alt={""} scale={""} 
                buttonClicked={playButtonClicked} />
            }) : null}
        </div>
    )
}

export default GamesList;