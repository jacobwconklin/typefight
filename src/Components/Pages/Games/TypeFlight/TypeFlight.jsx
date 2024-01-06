import { useContext, useEffect, useState } from 'react';
import './TypeFlight.scss';
import Controls from './Controls';
import Gameplay from './Gameplay';
import { SessionContext } from '../../PlayScreen/PlayScreen';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import GameOver from './GameOver';
import { getEventArea } from './getEventAreas';

// TypeFlight game where users type words corresponding to a direction (either up, left, right, or down) to run around a 10 x 10 grid
// avoiding deadly events, like bombs, lasers, etc. One example of how one specific event could occur would be a warning first appears
// on a specific tile, then after a delay (maybe 3 seconds) that tile and the 9 tiles around it are "blown up" and any player on any of
// them loses. Other players that move to where a friend died could type out a long phrase to re-vive that player and help each other 
// continue. Other events may destory all of the tiles in a row or column or diagonal, or other shapes or individual tiles.
// "warnings" will just be icons displayed before the impacts with specific colors to indicate the coming threat. Users have to 
// divide time between the words they need to type and the grid. Events come increasingly quickly and player revive phrases get 
// longer until no players are left. A timer running through the duration is the score in this cooperative effort. 
const TypeFlight = (props) => {

    const [playerPosition, setPlayerPosition] = useState(null);
    const [gameArray, setGameArray] = useState(Array.apply({}, Array(100)));
    // Game Status JUST to be used for startTimeAbsolute and endTimeAbsolute
    const [gameStatus, setGameStatus] = useState(null);
    const [matchingPlayer, setMatchingPlayer] = useState({isAlive: true});
    const [playerToRevive, setPlayerToRevive] = useState(null);

    // get playerId and sessionId from context
    const { sessionId, playerId } = useContext(SessionContext);

    // This useEffect builds the game array (all 100 tiles) with event and player locations
    // based on the status retreived
    useEffect(() => {

        //Implementing the setInterval method
        const interval = setInterval(async () => {
            try { 
                // fetch session status from backend IF sessionId exists
                if (sessionId) {
                    const result = await fetch(getServerBaseUrl() + "typeflight/status", {
                        method: "POST",
                        headers: getStandardHeader(),
                        body: JSON.stringify({
                            sessionId
                        })
                    });
                    const data = await result.json();
                    // "game over" reached when game contains value for endTimeAbsolute 
                    setGameStatus(data.game);

                    const newGameArray = Array.apply({}, Array(100));

                    // go through events and add them to the gameArray
                    data.events.forEach(event => {
                        // TODO could add all events to each index in array if I have an event array and then map through them layering them 
                        // all on top of each other in gameplay, but that can come later
                        if (event.activated) {
                            // Go ahead and add event to all affected squares if activated here?
                            const eventArea = getEventArea(event.position, event.type);
                            for (const property in eventArea) {
                                newGameArray[eventArea[property]] = newGameArray[eventArea[property]] 
                                    ? newGameArray[eventArea[property]]["event"] = 
                                        {...newGameArray[eventArea[property]], event} : {event} 
                            }
                        } else {
                            newGameArray[event.position] = newGameArray[event.position] 
                                ? newGameArray[event.position]["event"] = {...newGameArray[event.position], event} : {event}; 
                        }
                    });

                    // go through players and add them to gameArray
                    data.players.forEach(player => {
                        if (player.isAlive && !player.playerId === playerId) {
                            // add living player IF not the matching player (want to do them based just on playerPosition)
                            newGameArray[player.position] = newGameArray[player.position] 
                            ? newGameArray[player.position]["player"] = {...newGameArray[player.position], player} : {player};
                        } else if (!player.isAlive) {
                            // add gravestone
                            newGameArray[player.position] = newGameArray[player.position] 
                            ? newGameArray[player.position]["deadPlayer"] 
                            = {...newGameArray[player.position], deadPlayer: player} : {deadPlayer: player};
                        }
                    });

                    // check for current player identifiable via (and remember it is stored as field playerId not _id)
                    const matchingPlayer = data.players.find(player => player.playerId === playerId);
                    // set player position to their given first position

                    // TODO may want to move matchingPlayer based on playerPosition so that it happens immediately when people perform a move
                    // rather than waiting on move request to go to the server and then status to come back.

                    if (matchingPlayer && playerPosition === null) {
                        setPlayerPosition(matchingPlayer.position);
                    }
                    if (matchingPlayer) {
                        // save matching player's information
                        setMatchingPlayer(matchingPlayer);

                        // check if user's player is on top of a dead player they can revive
                        // but don't re-set the value if it's already set to the same player
                        if ( newGameArray[matchingPlayer.position]["deadPlayer"] && 
                            (playerToRevive == null || 
                                playerToRevive.playerId !== newGameArray[matchingPlayer.position]["deadPlayer"].playerId ) ) {
                            setPlayerToRevive(newGameArray[matchingPlayer.position]["deadPlayer"]);
                        }   
                    }
                    setGameArray(newGameArray);
                }
            } catch (error) {
                console.log("Error fetching textplosion game status", error);
            }
        }, 1000); // TODO adjust for wanted latency hitting backend for status
  
        //Clearing the interval
        return () => {
            clearInterval(interval);
        }
    }, [playerPosition, playerId, sessionId, setPlayerToRevive, playerToRevive]);

    return (
        <div className='TypeFlight'>
            {
                gameStatus?.endTimeAbsolute && 
                < GameOver gameStatus={gameStatus} />
            }
            {
                !gameStatus?.endTimeAbsolute && 
                <Controls 
                    playerPosition={playerPosition} 
                    setPlayerPosition={setPlayerPosition} 
                    matchingPlayer={matchingPlayer} 
                    playerToRevive={playerToRevive}
                    gameStatus={gameStatus}    
                />
            }
            {
                !gameStatus?.endTimeAbsolute && 
                <Gameplay 
                    gameArray={gameArray} 
                    matchingPlayer={matchingPlayer} 
                    playerPosition={playerPosition}
                />
            }
        </div>
    )
}

export default TypeFlight;