import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function GameCard({name, genre, description, src, alt, buttonClicked}) {

    function handleClick(e){
        e.preventDefault();
        //TODO: hardcoded, change this to better implementation
        buttonClicked(name, 'play');
    }

    
    return (
        <Card className='game-card bg-info text-white'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <div className='game-card-image'>
                <img className='game-preview col-10' src={src} alt={alt}/>
              </div>
            </div>
            <div className='col-md-8 col-6'>
              <div className='card-body'>
                <h5 className='card-title fw-bold'>{name}</h5>
                <p className='card-text'>
                  <small className='text-muted'>{genre}</small>
                </p>
                <p className='card-text'>{description}</p>
                <Button className='play-button col-3' onClick={handleClick}>
                  Play
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
}

export default GameCard;