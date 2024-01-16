import React, { useContext, useState, } from "react";
import { Button, Card } from "react-bootstrap";
import { CurrentUserContext } from "./context/current_user";

function GameComment({id, user_id, username, text, serverLikes, datetime, isAddCommentCard, addCommentToGame, onEdit, onDelete}) {
    if (!serverLikes) {
        serverLikes = 0;
    }
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [likes, setLikes] = useState(serverLikes);
    const [commentText, setCommentText] = useState(text);
    const [firstClick, setFirstClick] = useState(true);
    const [isEditingComment, setIsEditingComment] = useState(false);

    const handleAddCommentClick = (e) => {
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


    function handleSaveComment(e) {
        if (e.target.id === 'thumbs-up') {
            if (firstClick) {
                setLikes(likes + 1);
                setFirstClick(false);
            }
            else if (!firstClick) {
                setLikes(likes - 1);
                setFirstClick(true);
            }
        }
        let numLikes = likes;
        //if likes not serverlikes, do likes
        if (firstClick && currentUser) {
            numLikes += 1;
            setFirstClick(false);
        }
        else if (!firstClick) {
            numLikes = serverLikes - 1;
            if (numLikes < 0) {
                numLikes = 0;
            }
            setFirstClick(true);
        }
        console.log(commentText);
        const newComment = {
            "text": commentText,
            "likes": likes,
        }
        if (isEditingComment) {
        handleEdit()
        }
        onEdit(newComment, id)
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
        setIsEditingComment(!isEditingComment);
        const p = document.getElementById(`${id}`);
        const textarea = document.getElementById(`${id}-2`);

        if (isEditingComment) {
            p.hidden = false;
            p.innerText = commentText;
            textarea.hidden = true;
        }
        else {
            p.hidden = true;
            textarea.hidden = false;
        }
    }
    

    function handleDelete(e) {
        onDelete(id);
    }

    const likeOrLikes = serverLikes === 1 ? "like" : "likes";
    if (serverLikes === undefined || serverLikes === null) {
        serverLikes = 0;
    }
    return (
        <div>
            <form id={`${id}-form`} className="container-fluid" onSubmit={handleAddCommentSubmit}>
                <Card className="row border border-dark d-flex">
                        <Card.Header id="username" className="fw-bold col-12">{username ? `${username} says:` : "New comment"}</Card.Header>
                            <Card.Body className="col">
                                <p id={`${id}`} className="" onClick={handleAddCommentClick} >{text === undefined ? 'Click here to add a comment' : `${commentText}`}</p>
                                <textarea id={`${id}-2`} type="text" name="comment-text" onChange={handleChange} hidden={true} value={commentText}></textarea>
                                <Card.Footer className="row">
                                    {isAddCommentCard ? 
                                    <Button type="submit" className="col-2 border-dark bg-light text-black text-dark p-0 m-1 border-2"> Add Comment </Button> :   
                                      <div className="row"> 
                                         <i id="thumbs-up" className="col-1 py-1 far fa-thumbs-up position-absolute" onClick={handleSaveComment}></i>
                                         <p className="col-3 m-0 px-5">{likes} {likeOrLikes}</p>      
                                         <p className="col-sm-4 col-4 m-auto px-0 mx-0">{datetime}</p>
                                    </div>}
                                </Card.Footer>
                                {!isAddCommentCard ? currentUser ? currentUser.id === user_id ?
                                    <div className="row">
                                        <Button onClick={isEditingComment? handleSaveComment : handleEdit} className="col-2 p-0 bg-light text-dark border-dark border-2 m-2 my-3">{isEditingComment ? "Save Comment" : "Edit Comment"}</Button> 
                                        <Button onClick={handleDelete}className="col-3 p-0 bg-light text-dark border-dark border-2 m-2 my-3">Delete Comment</Button>
                                    </div>: null : null : null}
                            </Card.Body>
                </Card>
            </form>
        </div>
    )
}

export default GameComment;