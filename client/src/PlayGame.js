import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PlayGame() {
  //const nav = useNavigate();
  const game = useParams();
  const gameName = game.gameName;
  const [gameComponent, setGameComponent] = useState(null);


  useEffect(() => {
    import(`./games/${gameName}`).then((component) => {
        if (component && component.default) {
        setGameComponent(component.default)
        }
        else {
            setGameComponent(() => <div>Game Component Not Found</div>)
        }
    }).catch((error) => {
        setGameComponent(() => <div>Error Loading Game Component</div>)
    })
  }, [gameName])

  if (!gameComponent) {
    return(<div>Loading...</div>)
  }
    return (
        <div>
            {gameComponent}
        </div>
    )
}

export default PlayGame;
