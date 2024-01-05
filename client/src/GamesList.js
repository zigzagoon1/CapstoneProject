import React, { useState, useContext, useEffect } from "react";
import GameCard from "./GameCard";
import { CurrentUserContext } from "./context/current_user";
function GamesList( {games, playButtonClicked} ) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("/images")
        .then((r => r.json()))
        .then((allImages) => {
            setImages(allImages);
        })
    }, [])



    const gameCardElements = games.map((game) => {
        game.name = game.name.replace(/\s/g, '');
        const gamePreview = images.find(image => image.src.includes(`${game.name}Preview`));
        if (gamePreview !== undefined) {
            return <GameCard key={game.id} name={game.name} genre={game.genre} description={game.description} src={gamePreview.src} alt={""} scale={""} 
            buttonClicked={playButtonClicked} />
        }
        // else {
        //     return <GameCard key={game.id} name={game.name} genre={game.genre} description={game.description}  
        //     buttonClicked={playButtonClicked} />
        // }
        
    })

    return(
        <div>
        {gameCardElements}
        </div>
    )
}

export default GamesList;