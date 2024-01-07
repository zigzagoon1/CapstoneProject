import React, { useContext, useState, } from "react";
import { Button, Card } from "react-bootstrap";
import { CurrentUserContext } from "./context/current_user";

function GameComment({id, user_id, username, text, likes, datetime, isAddCommentCard, addCommentToGame, onEdit, onDelete}) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [commentText, setCommentText] = useState('');
    const handleClick = (e) => {
        if (isAddCommentCard) {
            const p = document.getElementById(`${id}`)
            p.hidden = true;
            const textarea = document.getElementById(`${id}-2`);
            textarea.hidden = false;
        }
    }

    const addCommentButton = 
    <Button className="col-4 bg-dark ">
        Add Comment
    </Button>

    function handleChange(e) {
        setCommentText(e.target.value)
    }
    function handleLike(e) {

    }

    function handleAddCommentSubmit(e) {
        e.preventDefault();

        const dateObject = new Date();

        let month;
        switch (dateObject.getMonth()) {
            default:  month = null;
                break;
            case 0: month = "January"
                break;
            case 1: month = "February"
                break;
            case 2: month = "March"
                break;
            case 3: month = "April"
                break;
            case 4: month = "May"
                break;
            case 5: month = "June"
                break;
            case 6: month = "July"
                break;
            case 7: month = "August"
                break;
            case 8: month = "September"
                break;
            case 9: month = "October"
                break;
            case 10: month = "November"
                break;
            case 11: month = "December"
                break;
        }

        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        const date = `${month} ${day}, ${year}`;
        const time = " at " + dateObject.getHours() + ":" + dateObject.getMinutes();

        const datetime = date + time;
        const newCommentInfo = {
            text: commentText,
            likes: 0,
            datetime: datetime,
        }
        addCommentToGame(newCommentInfo);
        const textarea = document.getElementById(`${id}-2`);
        textarea.hidden = true;
        const p = document.getElementById(`${id}`);
        p.hidden = false;
        const form = document.getElementById(`${id}-form`)
        form.reset();
    }

    function handleEdit(e) {

    }

    function handleDelete() {
        onDelete(id);
    }

    const likeOrLikes = likes === 1 ? "like" : "likes";
    if (likes === undefined || likes === null) {
        likes = 0;
    }
    return (
        <div>
            <form id={`${id}-form`} className="container-fluid" onSubmit={handleAddCommentSubmit}>
                <Card className="row border border-dark d-flex">
                        <Card.Header id="username" className="fw-bold col-12">{username ? `${username} says:` : "New comment"}</Card.Header>
                            <Card.Body className="col">
                                <p id={`${id}`} className="" onClick={handleClick} >{text === undefined ? 'Click here to add a comment' : `${text}`}</p>
                                <textarea id={`${id}-2`} type="text" name="comment-text" onChange={handleChange} hidden={true} value={commentText}></textarea>
                                <Card.Footer className="row">
                                    {isAddCommentCard ? 
                                    <Button type="submit" className="col-2 border-dark bg-light text-black text-dark p-0 m-1 border-2"> Add Comment </Button> :   
                                      <div className="row"> 
                                         <i className="col-1 py-1 far fa-thumbs-up position-absolute" onClick={handleLike}></i>
                                         <p className="col-3 m-0 px-5">{likes} {likeOrLikes}</p>      
                                         <p className="col-sm-4 col-4 m-auto px-0 mx-0">{datetime}</p>
                                    </div>}
                                </Card.Footer>
                                {!isAddCommentCard ? currentUser.id === user_id ?
                                    <div className="row">
                                        <Button onClick={handleEdit} className="col-2 p-0 bg-light text-dark border-dark border-2 m-2 my-3">Edit Comment</Button> 
                                        <Button onClick={handleDelete}className="col-3 p-0 bg-light text-dark border-dark border-2 m-2 my-3">Delete Comment</Button>
                                    </div>: null : null}
                            </Card.Body>
                </Card>
            </form>
        </div>
    )
}

export default GameComment;