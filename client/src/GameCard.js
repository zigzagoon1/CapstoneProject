import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

function GameCard({name, genre, description, src, alt, scale, buttonClicked}) {

    const nav = useNavigate();
    function handleClick(e){
        e.preventDefault();
        console.log(e.target.className)
        //TODO: hardcoded, change this to better implementation
        buttonClicked(name, 'play');
    }

    console.log(src)
    return (
        <Card className='game-card bg-info text-white'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <div className='game-card-image'>
                <img src={src} alt={alt} style={{scale: scale}} />
              </div>
            </div>
            <div className='col-md-8'>
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
    

    // return (
    //     <Card className='game-card container-flex rounded bg-info'>
    //         <br></br> <br></br>
    //         <div className='game-card-image '>
    //             <img src={src} alt="Game preview"/>
    //         </div>
    //         <div>
    //             <p className='col fw-bold'>{name}<br></br>Genre: {genre}</p>
    //             <p className='col'>{description}</p>
    //         </div>
    //         <div>
    //             <Button className='play-button' onClick={handleClick}>Play</Button>
    //         </div>
    //         <div>
    //             <Button className='comments-button' onClick={handleClick}>Comments</Button>
    //         </div>
    //     </Card>
    // )
}

export default GameCard;