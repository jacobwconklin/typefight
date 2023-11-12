import React, { useContext, useEffect, useState } from 'react';
import './PlayScreen.scss';
import { getServerBaseUrl, getStandardHeader } from '../../../Utils';
import GameSelect from '../GameSelect/GameSelect';
import NewPlayer from '../Users/NewPlayer';
import { useParams } from 'react-router-dom';
import QuickKeys from '../Games/QuickKeys/QuickKeys';
import SpacebarInvaders from '../Games/SpacebarInvaders/SpacebarInvaders';
import { BackgroundAudioContext } from '../../../App';

// PlayScreen. Once user clicks "host", "join", or "solo", play screen uses conditional 
// rendering to control the user's screen rather than traditional router navigation. Manually
// navigating url or clicking the logo to go back to the home-screen results in leaving the session
// and game TODO add warnings if navigating off PlayScreen
const PlayScreen = (props) => {

    // If sessionId and playerId don't exist and / or session isn't started show NewPlayer screen
    // If no selected game show GameSelect
    // If game is selected show that game

    // type of player either host, join, or solo
    const { type, code } = useParams();
    
    // session status can be held in state here and continually updated from server as this component
    // won't unmount throughout session
    const [sessionId, setSessionId] = useState(null);
    // TODO could move playerId up to app level context if user logs in to preserve their status
    const [playerId, setPlayerId] = useState(null);

    const [session, setSession] = useState({
        started: false,
        selected_game: null,
        players: []
    });

    const {backgroundMusic, setBackgroundMusic} = useContext(BackgroundAudioContext);
  
    useEffect(() => {
  
        //Implementing the setInterval method
        const interval = setInterval(async () => {
            try { 
                // fetch session status from backend IF sessionId and playerId exist
                if (playerId && sessionId) {
                    const result = await fetch(getServerBaseUrl() + "session/status", {
                        method: "POST",
                        headers: getStandardHeader(),
                        body: JSON.stringify({
                            sessionId
                        })
                    });
                    const data = await result.json();
                    // TODO determine if there is a need to validate data?
                    setSession(data);
                    // set background music audio based on game being played
                    if (!data?.selected_game && backgroundMusic !== "home") {
                        setBackgroundMusic("home");
                    } else if (data?.selected_game === "Quick Keys" && backgroundMusic !== "quickKeys") {
                        setBackgroundMusic("quickKeys");
                    } else if (data?.selected_game === "Spacebar Invaders" && backgroundMusic !== "spacebarInvaders") {
                        setBackgroundMusic("spacebarInvaders");
                    }
                }
            } catch (error) {
                console.log("Error fetching session status");
            }
        }, 1500); // TODO will need to tweak this it should run way more often than once per second but we will start slower
  
        //Clearing the interval
        return () => {
            clearInterval(interval);
        }
    }, [session, sessionId, playerId, backgroundMusic, setBackgroundMusic]);

    // trying this to get it to run ONLY when playscreen dismounts
    // DID not work, happens more often than just dismount
    // useLayoutEffect(() => () => {
    //     console.log("RUNNING USELAYOUTEFFECT IN PLAYSCREEN, SHOULD ONLY HAPPEN ON DISMOUNT");
    //     // remove player from session           
    //     // need to make sure it only happens on dismount
    //     fetch(getServerBaseUrl() + "session/exit", {
    //         method: "POST",
    //         headers: getStandardHeader(),
    //         body: JSON.stringify({
    //             sessionId,
    //             playerId
    //         })
    //     });
    //   }, [sessionId, playerId])

    return (
        <div className='PlayScreen'>
            <SessionContext.Provider
                value={{sessionId, setSessionId,  playerId, setPlayerId, session}}
            >
                {
                    session.selected_game ? 
                    // display selected game by mapping "selected_game" to JSX component
                    (
                        session.selected_game === "Quick Keys" ? 
                        <QuickKeys />
                        :
                        (
                            session.selected_game === "Spacebar Invaders" ? 
                            <SpacebarInvaders />
                            :
                            <p>game not supported</p>
                        )
                    )
                    :
                    // else determine if player already created
                    (
                        (playerId && sessionId && session.started) ?
                        <GameSelect />
                        :
                        <NewPlayer type={type} code={code}/>
                    )
                }
            </SessionContext.Provider>
        </div>
    )
}


export const SessionContext = React.createContext();

export default PlayScreen;