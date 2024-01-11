import React, { useEffect, useState, useContext } from "react";
import GameComment from "./GameComment";
import { CurrentUserContext } from "./context/current_user";

function GameComments({game, users}) {
    const [gameComments, setGameComments] = useState([]);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    
    useEffect(() => {
        fetch(`/games/${game.id}/comments`)
        .then((r => r.json()))
        .then((comments) => {
            // comments.sort((a, b) => {a.datetime - b.datetime})
            setGameComments(comments);
        })
    }, [])

    function addCommentToGame(commentInfo){
        console.log(commentInfo)
        //game/id/comments
        fetch(`/games/${game.id}/comments`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentInfo)
        })
        .then((r) => r.json())
        .then((comment) => {
            setGameComments([...gameComments, comment])
        })
    }

    function handleDelete(id) {
        fetch(`/games/${game.id}/comments/${id}`, {
            method: "DELETE"
        }).then((r) => {
            if (r.status !== 204) {
                return r.json()
            }
            else{
                fetch(`/games/${game.id}/comments`)
                .then((r) => r.json())
                .then((updatedComments) => {
                    console.log(updatedComments)
                    setGameComments(updatedComments)
                })
            }
        })
    }

    //TODO: handle error with catch or conditional
    //TODO: update game object rather than comments array
    function handleEdit(newComment, id) {
        console.log(newComment)
        fetch(`/games/${game.id}/comments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment)
        }).then((r) => r.json())
        .then((updatedComment) => {
        })
    }


    return(
        <div>
            {gameComments.map((comment)=> {
                const commentUser = users.find((user) => user.id === comment.user_id)
                const username = commentUser.username
                const userID = commentUser.id
                const gameCommentId = game.comments.find(x => x.datetime === comment.datetime).id;
                return <GameComment key={comment.id} id={gameCommentId} user_id={userID}  username={username}
             text={comment.text} likes={comment.likes} datetime={comment.datetime} onEdit={handleEdit} onDelete={handleDelete}/> })}
            <GameComment isAddCommentCard={true} addCommentToGame={addCommentToGame}/> 
        </div>
    )
}


export default GameComments;