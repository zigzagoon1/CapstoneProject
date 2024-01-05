import React, {useEffect, useState, } from "react";
import GamesList from "./GamesList";
import MemoryGame from "./MemoryGame";
import TicTacToe from "./TicTacToe";
import { useNavigate } from "react-router-dom";


function Games({games}) {

    const nav = useNavigate();
    


    function handleGameCardButtonClicked(gameName, button) {
        gameName = gameName.replace(/\s/g, '');
        if (button === 'play') {
            nav(`/games/${gameName}/play`);
        }
        else if (button === 'scores') {
            nav(`/games/${gameName}/scores`)
        }
    };

    const gamelistElement = <GamesList games={games} playButtonClicked={handleGameCardButtonClicked}/>
    return (
        
        <div>
            {games === null ? null : gamelistElement}
            
        </div>
    )
}

export default Games;