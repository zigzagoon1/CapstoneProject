import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PhaserGameConfig from "./PhaserGameConfig";
import GameComments from './GameComments'

function PlayGame() {
  const gameParams = useParams();
  const gameName = gameParams.gameName;
  const games = useLocation();
  const [gameComponent, setGameComponent] = useState(null);
  const [users, setUsers] = useState([])

  const thisGame = games.state.find((game) => game.name === gameName);

  useEffect(() => {
    import(`./${gameName}`).then((component) => {
        if (component && component.default) {
        setGameComponent(component.default)
        }
        else {
            setGameComponent(() => <div>Game Component Not Found</div>)
        }
    }).catch((error) => {
        setGameComponent(() => <div>Error Loading Game Component</div>)
    })

    fetch("/users")
    .then((r) => r.json())
    .then((users) => {
      setUsers(users);
    })
  }, [])


  if (!gameComponent) {
    return(<div>Loading...</div>)
  }
    return (
        <div>
            <PhaserGameConfig gameType={gameName}/>
            <GameComments game={thisGame} users={users}/>
        </div>
    )
}

export default PlayGame;
