import './SpacebarInvaders.scss';
import { useContext, useEffect, useState } from 'react';
import Gameplay from './Gameplay';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { SessionContext } from '../../PlayScreen/PlayScreen';
import GameOver from './GameOver';

// SpacebarInvaders
const SpacebarInvaders = (props) => {

    // begin pulling quick-keys status for info on game, and for showing screen 
    /* Game staus object looks like:
    {
        enemies: [{
            word: String,
            x: #,
            y: #
        },],
        wave: #,
        health: #
    }
    */
    const [gameStatus, setGameStatus] = useState({});
    const { sessionId } = useContext(SessionContext);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(async () => {
            try { 
                // fetch session status from backend IF sessionId exists
                if (sessionId) {
                    const result = await fetch(getServerBaseUrl() + "spacebar-invaders/status", {
                        method: "POST",
                        headers: getStandardHeader(),
                        body: JSON.stringify({
                            sessionId
                        })
                    });
                    const data = await result.json();
                    // console.log(data);
                    setGameStatus(data);
                    // game is over if health is < 1
                }
            } catch (error) {
                console.log("Error fetching spacebar invaders game status", error);
            }
        }, 1000); // TODO will need to tweak this 
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [gameStatus, sessionId]);

    return (
        <div className='SpacebarInvaders full-screen'>
            {
                // For now ignoring customization screen as an option going straight into game

                gameStatus?.health > 0 ?
                <Gameplay status={gameStatus} />
                : 
                (
                    gameStatus?.health <= 0 ?
                    <GameOver wave={gameStatus.wave} />
                    :
                    <div className='Loading full-screen' style={{backgroundColor: 'black'}}>

                    </div>
                )
            }
        </div>
    )
}

export default SpacebarInvaders;