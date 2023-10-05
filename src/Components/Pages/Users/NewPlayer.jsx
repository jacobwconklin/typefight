import { useContext } from 'react';
import './NewPlayer.scss';
import PickAttributes from './PickAttributes';
import { SessionContext } from '../PlayScreen/PlayScreen';

// NewPlayer screen for hosts, joiners, and solo players to pick their attributes and 
// enter a join code (in the case of joining players)
// hold users on view Party screen until host begins session (started)
const NewPlayer = (props) => {
    
    // get status as join / host / solo  fom url params
    const playerType = props.type;
    
    const {playerId, sessionId, session} = useContext(SessionContext);

    return (
        <div className='NewPlayer'>
            <h1>{playerType}</h1>
            {
                // if player already has playerId and sessionId show them the party screen, otherwise
                // have them pick their attributes and submit to set their player
                (playerId && sessionId) ?
                <p>Show Whole Party: {String(session)}</p>
                :
                <div className='CreatePlayer'>
                    {
                        playerType === "join" && <p>Put in join code!</p>
                    }
                    <PickAttributes />
                </div>
            }
        </div>
    )
}

export default NewPlayer;