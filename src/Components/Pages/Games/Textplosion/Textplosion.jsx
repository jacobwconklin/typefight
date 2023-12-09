
import { Input } from 'antd';
import './Textplosion.scss';
import { useContext, useEffect, useState } from 'react';
import Minigame from '../Minigames/Minigame';
import Gameplay from './Gameplay';
import { SessionContext } from '../../PlayScreen/PlayScreen';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { generate } from "random-words";
import GameOver from './GameOver';
// const { generate } = await import("random-words");

// Textplosion
const Textplosion = (props) => {

    // logic to open modal based on if this player is in the hot seat 
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [isInHotSeat, setIsInHotSeat] = useState(false);
    const [playerFont, setPlayerFont] = useState(null);
    const [wordToPump, setWordToPump] = useState(generate()); // start with random word
    const [typedPumpWord, setTypedPumpWord] = useState("");

    // hold game status and retreive session id
    const [gameStatus, setGameStatus] = useState({});
    const { sessionId, playerId } = useContext(SessionContext);

    // useEffect to status Textplosion game and pass list of players (including their positions)
    // down to gameplay
    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(async () => {
            try { 
                // fetch session status from backend IF sessionId exists
                if (sessionId) {
                    const result = await fetch(getServerBaseUrl() + "textplosion/status", {
                        method: "POST",
                        headers: getStandardHeader(),
                        body: JSON.stringify({
                            sessionId
                        })
                    });
                    const data = await result.json();
                    setGameStatus(data);
                    // check for only one living player left to set gameOver
                    if (data.players && data.players.filter(player => !player.blownUp).length <= 1) {
                        // end of game reached one player left not blown up
                        setGameOver(true);
                    }
                    // check for current player identifiable via (and remember it is stored as field playerId not _id)
                    // to see if the current player is in the hot seat (if not blownUp and at position 0)
                    const matchingPlayer = data.players.find(player => player.playerId === playerId);
                    if (matchingPlayer) {
                        // set font only once
                        setPlayerFont(matchingPlayer.font);
                        // only set it if it changes
                        if (isInHotSeat !== (!matchingPlayer.blownUp && matchingPlayer.position === 0)) {
                            // has changed, if player was in hotseat previously re-focus on input
                            if (isInHotSeat) {
                                setTimeout(() => {
                                    document.getElementById("pump-input").focus();
                                }, 100);
                            }
                            // apply change (either now in or no longer in hot seat)
                            setIsInHotSeat(!matchingPlayer.blownUp && matchingPlayer.position === 0);
                        }
                    }
                }
            } catch (error) {
                console.log("Error fetching textplosion game status", error);
            }
        }, 1000); // TODO adjust for wanted latency hitting backend for status
  
        //Clearing the interval
        return () => {
            clearInterval(interval);
        }
    }, [sessionId, playerId, isInHotSeat]);

    // Create function to handle return value from minigame, when 'true' is returned because the player successfully completed the minigame
    // allow the player to escape
    const completeMinigame = async (succeeded) => {
        if (succeeded) {
            await fetch(getServerBaseUrl() + "textplosion/escape", {
                method: "POST",
                headers: getStandardHeader(),
                body: JSON.stringify({
                    sessionId
                })
            });
            console.log("attempted escape");
        }
    }

    return (
        <div className='Textplosion full-screen'>
            {
                // if game is still going (IE more than one person not blown up show the game screen, )
                // OTHERWISE show the game over screen
                gameOver ? 
                <GameOver status={gameStatus} />
                :
                <div className='ActiveGame full-screen'>
                    <Gameplay status={gameStatus} />
                    {
                        // IF current player is NOT in hotseat give them a box with random words and 
                        // an input box to pump, otherwise give them a screen to play minigames
                        // TODO would prefer for the minigame to pop up as a modal rather than drop down on the 
                        // screen but haven't gotten to that yet
                        isInHotSeat ?
                        <div className='HotSeatScreen'>
                            <h1>You're in the hot seat! complete a minigame to escape</h1>
                            <div className='MinigameHolder'>
                                <Minigame completeMinigame={completeMinigame} />
                            </div>
                            <div></div>
                        </div>
                        :
                        <div className='PumpScreen'>
                            <h1>type the words below to pump the balloon:</h1>
                            <div className='PumpInputBox'>
                                <h2 style={{fontFamily: ('\'' + playerFont + '\'')}}>
                                    {wordToPump}
                                </h2>
                                <Input
                                    autoFocus
                                    className='PumpInput'
                                    id='pump-input'
                                    placeholder='Type Here'
                                    value={typedPumpWord}
                                    onKeyDown={(key) => {if (key.code === 'Enter') setTypedPumpWord('')}}
                                    onChange={e => {
                                        if ( e.target.value === wordToPump ) {
                                            // perform fetch to let backend know to pump
                                            fetch(getServerBaseUrl() + "textplosion/pump", {
                                                method: "POST",
                                                headers: getStandardHeader(),
                                                body: JSON.stringify({
                                                    sessionId,
                                                    word: wordToPump
                                                })
                                            });
                                            console.log("attempted pump");
                                            setTypedPumpWord("");
                                            setWordToPump(generate());
                                        } else {
                                            setTypedPumpWord(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <div></div>
                        </div>
                    }
                    {/* <Button 
                        onClick={() => {
                            // open modal, will make my own rather than antD
                            setModalIsOpen(currValue => !currValue);
                        }}
                    >
                        modal
                    </Button>
                    {
                        // play a minigame IF our player is in the hot-seat and they haven't won the minigame yet
                        // on completing minigame show message in modal until our player leaves hotseat (balloon may explode during this idk)
                        modalIsOpen && 
                        <div className='MinigameHolder'>
                            <Minigame />
                        </div>
                    } */}
                </div>
            }
        </div>
    )
}

export default Textplosion;