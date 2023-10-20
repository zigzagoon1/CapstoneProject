import React, {useEffect, useState, } from "react";
import GamesList from "./GamesList";
import MemoryGame from "./games/MemoryGame";
import TicTacToe from "./games/TicTacToe";
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

    function handleGameCardButtonClicked(gameName, play) {
        gameName = gameName.replace(/\s/g, '');
        if (play) {
            nav(`/games/play/${gameName}`);
        }
        else {
            nav(`/games/${gameName}/comments`)
        }
    };

    return (
        <div>
            <GamesList games={gamesList} playButtonClicked={handleGameCardButtonClicked}/>
        </div>
    )
}

export default Games;