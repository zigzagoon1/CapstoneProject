import React, { useEffect, useState } from "react";
import GameComment from "./GameComment";

function GameComments({game}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(game.comments)
    }, [])

    return(
        <div>
            <GameComment isAddCommentCard={true}/> 
            {comments === undefined ? null : comments.map((comment) => {return <GameComment /> })}
        </div>
    )
}


export default GameComments;