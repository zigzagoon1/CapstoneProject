import React, {useEffect, useState, } from "react";
import GamesList from "./GamesList";
import MemoryGame from "./MemoryGame";
import TicTacToe from "./TicTacToe";
import { useNavigate } from "react-router-dom";


function Games({}) {
    const [gamesList, setGamesList] = useState([]);

    const nav = useNavigate();
    
    useEffect(() => {
        fetch("/games")
        .then(r => r.json())    
        .then((allGames) => {
            setGamesList(allGames);
        })
    }, [])

    function handleGameCardButtonClicked(gameName, button) {
        gameName = gameName.replace(/\s/g, '');
        if (button === 'play') {
            nav(`/games/${gameName}/play`);
        }
        else if (button === 'comments') {
            nav(`/games/${gameName}/comments`)
        }
        else if (button === 'scores') {
            nav(`/games/${gameName}/scores`)
        }
    };

    const gamelistElement = <GamesList games={gamesList} playButtonClicked={handleGameCardButtonClicked}/>
    return (
        
        <div>
            {gamesList === null ? null : gamelistElement}
            
        </div>
    )
}

export default Games;