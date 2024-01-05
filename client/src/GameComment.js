import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { CurrentUserContext } from "./context/current_user";

function GameComment({text, likes, datetime, isAddCommentCard}) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)
    const [commentText, setCommentText] = useState('');
    const handleClick = (e) => {
        const p = document.getElementById('add-comment')
        p.hidden = true;
        const textarea = document.getElementById("comment-input");
        console.log(textarea)
        textarea.hidden = false;
    }

    function handleChange(e) {
        setCommentText(e.target.value)
    }

    function handleLike(e) {

    }

    function handleSubmit() {

    }
    const likeOrLikes = likes === 1 ? "like" : "likes";
    if (likes === undefined || likes === null) {
        likes = 0;
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Card className="row border border-dark d-flex">
                        <Card.Header className="fw-bold col-12">{text === undefined ? null : `${currentUser.username} says:`}</Card.Header>
                            <Card.Body className="col">
                                <p id="add-comment" className="m-auto" onClick={handleClick} >{text === undefined? 'Click here to add a comment' : `${text}`}</p>
                                <textarea id="comment-input" type="text" name="comment-text" onChange={handleChange} hidden={true} value={commentText}></textarea>
                                <Card.Footer>
                                    {isAddCommentCard ? null :   
                                      <div>        
                                        <p className="">{datetime}</p>
                                        <i className="col-1 py-1 far fa-thumbs-up text-center position-relative" onClick={handleLike}></i>
                                        <p className="">{likes} {likeOrLikes}</p>
                                    </div>}
                                </Card.Footer>
                            </Card.Body>
                </Card>
            </form>
        </div>
    )
}

export default GameComment;