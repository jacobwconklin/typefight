import { Button } from 'antd';
import './GameOver.scss';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { useContext } from 'react';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// GameOver
const GameOver = (props) => {

    // TODO would be fun to have more stats aka deaths per player, revives per player, chars typed per player, and so on

    const { sessionId } = useContext(SessionContext);

    const pickNewGame = async () => {
        await fetch(getServerBaseUrl() + "typeflight/wipe", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
        
        await fetch(getServerBaseUrl() + "session/leave-game", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
    }

    return (
        <div className='TypeFlightGameOver'>
            <h1>You Survived { (props?.gameStatus?.endTimeAbsolute - props?.gameStatus?.startTimeAbsolute) / 1000} Seconds</h1>
            <h1>{props?.status?.players?.find(player => !player.blownUp)?.alias}</h1>
            <Button 
                onClick={ () => pickNewGame()}
            >New Game</Button>
        </div>
    )
}

export default GameOver;