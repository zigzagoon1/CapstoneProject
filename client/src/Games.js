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

    function handlePlayButtonClicked(gameName) {
        gameName = gameName.replace(/\s/g, '');
        nav(`/games/play/${gameName}`);
    };

    return (
        <div>
            <GamesList games={gamesList} playButtonClicked={handlePlayButtonClicked}/>
        </div>
    )
}

export default Games;