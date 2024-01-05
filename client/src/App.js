import {CurrentUserProvider} from './context/current_user.js'
import {PauseProvider} from './context/paused.js'
import {Routes, Route } from 'react-router-dom'

import React, { useState, useEffect } from 'react'
import Home from './Home.js'
import NavBar from './NavBar.js'
import Games from './Games.js'
import Signup from './Signup.js';
import Login from './Login.js'
import Account from './Account.js'
import PlayGame from './PlayGame.js'
import GameComments from './GameComments.js'
import HighScores from './HighScores.js'
import PhaserGameConfig from './PhaserGameConfig.js'

function App() {
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    fetch("/games")
    .then(r => r.json())    
    .then((allGames) => {
        setGamesList(allGames);
    })
}, [])
  return (
    <CurrentUserProvider>
      <PauseProvider>
        <div className='container justify-content-center border rounded bg-light'>
          <h1 className='text-center bg-success'>Zigzag's Games</h1>
          <h5 className='text-center text-danger'>Submit, Play and Review Games!</h5>
           <NavBar />
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games games={gamesList}/>} />
              <Route path="/games/:gameName/play" element={<PlayGame games={gamesList} />} />
              {/* <Route path="/users" element={<Members /> } /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/games/:gameName/scores" element={<HighScores />} />
           </Routes>
        </div>
        <div id="phaser-container" className='Phaser'></div>
      </PauseProvider>
</CurrentUserProvider>
  );
}

export default App;
