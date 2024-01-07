import React, { useEffect, useState, useContext } from "react";
import GameComment from "./GameComment";
import { CurrentUserContext } from "./context/current_user";

function GameComments({game, users}) {
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

    useEffect(() => {
        fetch(`/comments`)
        .then((r => r.json()))
        .then((comments) => {
            setComments(comments);
        })
    }, [])

    

    function addCommentToGame(commentInfo){
        commentInfo = {
            ...commentInfo,
            user_id: currentUser.id,
            game_id: game.id,
        }
        fetch(`/comments`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentInfo)
        })
        .then((r) => r.json())
        .then((comment) => {
            setComments({...comments, comment})
        })
    }

    function handleDelete(id) {
        fetch(`/comments/${id}`, {
            method: "DELETE"
        })
        fetch("/comments")
        .then((r) => r.json())
        .then((updatedComments) => {
            setComments(updatedComments)
        })
    }

    function handleEdit(id) {

    }


    return(
        <div>
            {comments === undefined || comments === null || comments[0] === null ? null : comments.map((comment)=> {
                const commentUser = users.find((user) => user.id === comment.user_id)
                const username = commentUser.username
                const userID = commentUser.id
                return <GameComment key={comment.id} id={comment.id} user_id={userID}  username={username}
             text={comment.text} likes={comment.likes} datetime={comment.datetime} onEdit={handleEdit} onDelete={handleDelete}/> })}
            <GameComment isAddCommentCard={true} addCommentToGame={addCommentToGame}/> 
        </div>
    )
}


export default GameComments;