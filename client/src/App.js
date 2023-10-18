import React from 'react'
import Home from './Home.js'
import NavBar from './NavBar.js'
import Games from './Games.js'
import Members from './Members.js'
import {CurrentUserProvider} from './context/current_user.js'
import {PauseProvider} from './context/paused.js'
import {Routes, Route } from 'react-router-dom'


function App() {
  return (
    <CurrentUserProvider>
      <PauseProvider>
        <div className='container justify-content-center border rounded bg-light'>
          <h1 className='text-center bg-success'>Zigzag's Games</h1>
          <h5 className='text-center text-danger'>Submit, Play and Review Games!</h5>
           <NavBar />
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/users" element={<Members /> } />
           </Routes>
        </div>
      </PauseProvider>
</CurrentUserProvider>
  );
}

export default App;
