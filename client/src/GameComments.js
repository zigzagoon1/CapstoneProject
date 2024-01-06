import React, { useEffect, useState, useContext } from "react";
import GameComment from "./GameComment";
import { CurrentUserContext } from "./context/current_user";

function GameComments({game}) {
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

    useEffect(() => {
        //setComments(game.comments)
        fetch(`/comments`)
        .then((r => r.json()))
        .then((comments) => {
            setComments(comments);
        })
    }, [])

    function addCommentToGame(commentInfo){
        console.log(currentUser.id)
        commentInfo = {
            ...commentInfo,
            user_id: currentUser.id,
            game_id: game.id
        }
        fetch(`/comments`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentInfo)
        })
        .then((r) => r.json())
        .then((game) => {
            console.log(game);
        })
    }
    return(
        <div>
            {comments === undefined ? null : comments.map((comment)=> {return <GameComment key={comment.id} id={comment.id} user_id={comment.user_id} text={comment.text} likes={comment.likes} datetime={comment.datetime}/> })}
            <GameComment isAddCommentCard={true} addCommentToGame={addCommentToGame}/> 
        </div>
    )
}


export default GameComments;