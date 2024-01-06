import React, { useContext, useState, } from "react";
import { Button, Card } from "react-bootstrap";
import { CurrentUserContext } from "./context/current_user";

function GameComment({id, user_id, text, likes, datetime, isAddCommentCard, addCommentToGame}) {
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
        e.preventDefault();
        const newCommentInfo = {
            text: commentText,
            likes: 0,
            datetime: datetime,
        }
        addCommentToGame(newCommentInfo);
    }


    const likeOrLikes = likes === 1 ? "like" : "likes";
    if (likes === undefined || likes === null) {
        likes = 0;
    }
    return (
        <div>
            <form onSubmit={handleAddCommentSubmit}>
                <Card className="row border border-dark d-flex">
                        <Card.Header id="username" className="fw-bold col-12" value={text === undefined ? null : `${currentUser.username} says:`}></Card.Header>
                            <Card.Body className="col">
                                <p id={`${id}`} className="m-auto" onClick={handleClick} >{text === undefined? 'Click here to add a comment' : `${text}`}</p>
                                <textarea id={`${id}-2`} type="text" name="comment-text" onChange={handleChange} hidden={true} value={commentText}></textarea>
                                <Card.Footer>
                                    {isAddCommentCard ? 
                                    <Button type="submit" className="col-2 border-dark bg-light text-black text-dark p-1">Add Comment</Button> :   
                                      <div>        
                                        <p className="col-sm-4 col-8 m-0">{datetime}</p>
                                        <i className="col-1 py-1 far fa-thumbs-up text-center position-relative" onClick={handleLike}></i>
                                        <p className="col-2 m-0">{likes} {likeOrLikes}</p>  
                                    </div>}
                                    {!isAddCommentCard ? currentUser.id === user_id ?
                                    <Button>Edit Comment</Button> : null : null}
                                </Card.Footer>
                            </Card.Body>
                </Card>
            </form>
        </div>
    )
}

export default GameComment;