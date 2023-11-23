
import { Button } from 'antd';
import './Textplosion.scss';
import { useContext, useEffect, useState } from 'react';
import Minigame from '../Minigames/Minigame';
import Gameplay from './Gameplay';
import { SessionContext } from '../../PlayScreen/PlayScreen';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';

// Textplosion
const Textplosion = (props) => {

    // logic to open modal based on if this player is in the hot seat 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    // hold game status and retreive session id
    const [gameStatus, setGameStatus] = useState({});
    const { sessionId } = useContext(SessionContext);

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
                    setGameStatus(data.players);
                    // check for only one living player left to set gameOver
                    if (data.players.filter(player => !player.blownUp).length <= 1) {
                        // end of game reached one player left not blown up
                        setGameOver(true);
                    }
                }
            } catch (error) {
                console.log("Error fetching textplosion game status", error);
            }
        }, 500); // TODO adjust for wanted latency hitting backend for status
  
        //Clearing the interval
        return () => {
            // TODO wipe game here
            clearInterval(interval);
        }
    }, [sessionId]);

    return (
        <div className='Textplosion full-screen'>
            {
                // if game is still going (IE more than one person not blown up show the game screen, )
                // OTHERWISE show the game over screen
                gameOver ? 
                <div className='GAMEOVER TODO SHOULD BE SEPARATE COMPONENT'></div>
                :
                <div className='ActiveGame full-screen'>
                    <Gameplay status={gameStatus} />
                    <Button 
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
                    }
                </div>
            }
        </div>
    )
}

export default Textplosion;