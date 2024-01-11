import {CurrentUserContext, CurrentUserProvider} from './context/current_user.js'
import {PauseProvider} from './context/paused.js'
import {Routes, Route } from 'react-router-dom'

import React, { useState, useEffect, useContext } from 'react'
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

  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    fetch ("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user);
        })
      }
      else {
        console.log(r)
      }
    })
}, [])


    

  return (
      <PauseProvider>
        <div className='container justify-content-center border rounded bg-light'>
          <h1 className='text-center bg-success'>Zigzag's Games</h1>
          <h5 className='text-center text-danger'>Submit, Play and Review Games!</h5>
           <NavBar />
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:gameName/play" element={<PlayGame  />} />
              {/* <Route path="/users" element={<Members /> } /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/games/:gameName/scores" element={<HighScores />} />
           </Routes>
        </div>
        <div id="phaser-container" className='Phaser'></div>
      </PauseProvider>
  );
}

export default App;
