import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function GameCard({name, genre, description, src, playButtonClicked}) {

    const nav = useNavigate();
    function handleClick(e){
        e.preventDefault();
        playButtonClicked(name);
    }

    return (
        <Card className='game-card container-flex border-dark rounded bg-light'>
            <br></br> <br></br>
            <div className='game-card-image '>
                <img src={src} alt="Game preview"/>
            </div>
            <div>
                <p className='col fw-bold'>{name}<br></br>Genre: {genre}</p>
                <p className='col'>{description}</p>
            </div>
            <div>
                <Button className='btn' onClick={handleClick}>Play</Button>
            </div>
        </Card>
    )
}

export default GameCard;