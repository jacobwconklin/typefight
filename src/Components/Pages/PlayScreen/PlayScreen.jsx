import React, { useEffect, useState } from 'react';
import './PlayScreen.scss';
import { getServerBaseUrl, getStandardHeader } from '../../../Utils';
import GameSelect from '../GameSelect/GameSelect';
import NewPlayer from '../Users/NewPlayer';
import { useParams } from 'react-router-dom';

// PlayScreen. Once user clicks "host", "join", or "solo", play screen uses conditional 
// rendering to control the user's screen rather than traditional router navigation. Manually
// navigating url or clicking the logo to go back to the home-screen results in leaving the session
// and game TODO add warnings if navigating off PlayScreen
const PlayScreen = (props) => {

    // If sessionId and playerId don't exist and / or session isn't started show NewPlayer screen
    // If no selected game show GameSelect
    // If game is selected show that game

    // type of player either host, join, or solo
    const { type } = useParams();
    
    // session status can be held in state here and continually updated from server as this component
    // won't unmount throughout session
    const [sessionId, setSessionId] = useState(null);
    // TODO could move playerId up to app level context if user logs in to preserve their status
    const [playerId, setPlayerId] = useState(null);

    const [session, setSession] = useState({
        started: false,
        selected_game: null,
        players: [
            {
                alias:"",
                icon:"",
                font:"",
                color:""
            }
        ]
    });
  
    useEffect(() => {
  
        //Implementing the setInterval method
        const interval = setInterval(async () => {
            // fetch session status from backend IF sessionId and playerId exist
            if (playerId && sessionId) {
                const result = await fetch(getServerBaseUrl + "session/status", {
                    method: "POST",
                    headers: getStandardHeader(),
                    body: JSON.stringify({
                        sessionId
                    })
                });
                const data = await result.json();
                console.log(data);
                // TODO determine if there is a need to validate data?
                setSession(data);
            }
        }, 1000); // TODO will need to tweak this it should run way more often than once per second but we will start slower
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [session, sessionId, playerId]);

    return (
        <div className='PlayScreen'>
            <SessionContext.Provider
                values={{sessionId, setSessionId,  playerId, setPlayerId, session}}
            >
                {
                    session.selected_game ? 
                    // display selected game by mapping "selected_game" to JSX component
                    <p>Game On, Game: {session.selected_game}</p>
                    :
                    // else determine if player already created
                    (
                        (playerId && sessionId && session.started) ?
                        <GameSelect />
                        :
                        <NewPlayer type={type}/>
                    )
                }
            </SessionContext.Provider>
        </div>
    )
}


export const SessionContext = React.createContext();

export default PlayScreen;