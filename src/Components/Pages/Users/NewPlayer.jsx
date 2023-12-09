import { useContext, useState } from 'react';
import './NewPlayer.scss';
import PickAttributes from './PickAttributes';
import { SessionContext } from '../PlayScreen/PlayScreen';
import { Button, Input } from 'antd';
import ViewParty from './ViewParty';
import { getServerBaseUrl, getStandardHeader } from '../../../Utils';

// NewPlayer screen for hosts, joiners, and solo players to pick their attributes and 
// enter a join code (in the case of joining players)
// hold users on view Party screen until host begins session (started)
const NewPlayer = (props) => {

    const [join_code, setJoin_code] = useState(props.code ? props.code : "");
    const [playerInfo, setPlayerInfo] = useState(null); // will have alias, color, icon (title), and font
    
    // get status as join / host / solo  fom url params
    const playerType = props.type;

    const getBackgroundColor = () => {
        if (playerType === 'join') {
            return '#81997B';
        } else if (playerType === 'host') {
            return '#C38A8A';
        } else {
            return '#6976BB';
        }
    }
    
    const {playerId, setPlayerId, sessionId, setSessionId} = useContext(SessionContext);

    // submit button disabled until user entered a join code if they are a joining player
    const submit = async () => {
        // make sure join code is valid and player successfully enters game
        // need to recieve back sessionId and playerId and put them into context
        const result = await fetch(getServerBaseUrl() + "users/" + playerType, {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                ...playerInfo,
                join_code
            })
        })
        const data = await result.json();
        setPlayerId(data.player._id);
        setSessionId(data.session._id);
        // Also save player and session into local storage so navigating home and closing the tab can handle 
        // wiping the current game and exiting a player from the session
        localStorage.player = data.player._id;
        localStorage.session = data.session._id;
        if (data.session.join_code) {
            setJoin_code(data.session.join_code);
        }
    }

    const savePlayer = (newPlayerInfo) => {
        setPlayerInfo(newPlayerInfo)
    }

    return (
        <div className='NewPlayer full-screen' 
            style={{backgroundColor: getBackgroundColor()}}
        >
            {
                // if player already has playerId and sessionId show them the party screen, otherwise
                // have them pick their attributes and submit to set their player
                (playerId && sessionId) ?
                <ViewParty isHost={playerType === 'host'} join_code={join_code}/>
                :
                <div className='CreatePlayer'>
                    <PickAttributes savePlayer={savePlayer}/>
                    <br></br>
                    {
                        playerType === "join" ? 
                        <div className='JoinAndSubmit'>
                            <div className='JoinCode'>
                                <h2>join code:</h2>
                                <Input
                                    defaultValue={props.code ? props.code : ""}
                                    type="text"
                                    maxLength={8}
                                    onChange={e => {
                                        e.preventDefault();
                                        setJoin_code(e.target.value.trim()); 
                                    }}
                                    placeholder='abcdefgh' 
                                />
                            </div> 
                            <Button    
                                className='SubmitButton'
                                disabled={!playerInfo || !playerInfo.alias || !join_code} 
                                onClick={submit}
                            > 
                                Submit
                            </Button>
                        </div>
                        :
                        <Button 
                            className='SubmitButton'
                            disabled={!playerInfo || !playerInfo.alias} 
                            onClick={submit}
                        > 
                            Submit
                        </Button>
                    }
                </div>
            }
        </div>
    )
}

export default NewPlayer;