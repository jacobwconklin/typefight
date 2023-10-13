import './App.scss';
import NavHeader from './Components/Navigation/NavHeader';
import SideBar from './Components/Navigation/SideBar';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import React, { useState } from 'react';
import homeTheme from './Assets/Sounds/Themes/battle-station.mp3';
import quickKeysTheme from './Assets/Sounds/Themes/JazzyBg.mp3';
import spacebarInvadersTheme from './Assets/Sounds/Themes/insurrection.mp3';
import ReactAudioPlayer from 'react-audio-player';

// Moving BrowserRouter up allows useNavigate to be used in the header


const App = () => {
  
  const nameToMusicMap = {
    home: homeTheme,
    quickKeys: quickKeysTheme,
    spacebarInvaders: spacebarInvadersTheme
  }

  // react-audio-player provides background music with the selected theme stored in state here
  // wrap audio in context to be changeable throughout application.
  const [backgroundMusic, setBackgroundMusic] = useState("");
  const [musicMuted, setMusicMuted] = useState(true);

  return (
    <div className="App">
      <ReactAudioPlayer className='AudioPlayer'
        src={ !!backgroundMusic ? nameToMusicMap[backgroundMusic] : null} 
        muted={musicMuted} 
        loop={true}
        autoPlay={true} 
        />
      <BrowserRouter>
        <BackgroundAudioContext.Provider
          value={{setBackgroundMusic, backgroundMusic, setMusicMuted, musicMuted}}
        >
          <NavHeader />
          <div className='BelowHeader'>
            <div className='SideAndRouter full-size'>
              <SideBar />
                <Router />
              </div>
          </div>
        </BackgroundAudioContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export const BackgroundAudioContext = React.createContext();

export default App;
