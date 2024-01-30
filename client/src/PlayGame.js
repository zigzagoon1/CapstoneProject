import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import PhaserGameConfig from "./PhaserGameConfig";
import GameComments from './GameComments'
import { CurrentUserContext } from "./context/current_user";
import EventEmitterSingleton from "./EventEmitter";

function PlayGame() {
  const gameParams = useParams();
  const gameName = gameParams.gameName;
  const games = useLocation();
  const [gameComponent, setGameComponent] = useState(null);
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const thisGame = games.state.find((game) => game.name === gameName);


  function handleGamePlayed() {
    console.log("event captured")
    if (currentUser && currentUser.profile) {
      
      fetch(`/users/${currentUser.id}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentUser.profile,
          games_played: currentUser.profile.games_played + 1,
        })
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((updatedProfile) => {
            console.log(updatedProfile.games_played)
            const userNew = {...currentUser, profile: {...currentUser.profile, games_played: updatedProfile.games_played}}
            setCurrentUser(userNew)
          })
        }
      })
      console.log(currentUser.games_played)
    }
  }

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
            <PhaserGameConfig gameType={gameName} onGamePlayed={handleGamePlayed}/>
            <GameComments game={thisGame} users={users}/>
        </div>
    )
}

export default PlayGame;
