import React, {useEffect, useState} from "react";
import GamesList from "./GamesList";
import MemoryGame from "./MemoryGame";
import TicTacToe from "./TicTacToe";
import { useNavigate } from "react-router-dom";


function Games() {

    const [gamesList, setGamesList] = useState([]);
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("/games")
        .then((r) => r.json())
        .then((games) => {
            console.log(games)
            setGamesList(games)
        })
    }, [])

    const nav = useNavigate();
    
    function handleGameCardButtonClicked(gameName, button) {
        gameName = gameName.replace(/\s/g, '');
        if (button === 'play') {
            nav(`/games/${gameName}/play`, {state: gamesList});
        }
        else if (button === 'scores') {
            nav(`/games/${gameName}/scores`)
        }
    };

    return (
        <div>
            {gamesList === null ? null : <GamesList games={gamesList} playButtonClicked={handleGameCardButtonClicked} />}
            
        </div>
    )
}

export default Games;