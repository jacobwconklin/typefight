import { Button } from 'antd';
import './GameOver.scss';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { useContext } from 'react';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// GameOver
const GameOver = (props) => {

    const { sessionId } = useContext(SessionContext);

    return (
        <div className='TextplosionGameOver'>
            <h1>The Winner is: </h1>
            <h1>{props.status.players.find(player => !player.blownUp).alias}</h1>
            <Button 
                onClick={ async () => {
                    await fetch(getServerBaseUrl() + "session/leave-game", {
                        method: "POST",
                        headers: getStandardHeader(),
                        body: JSON.stringify({
                            sessionId
                        })
                    });
                }}
            >New Game</Button>
        </div>
    )
}

export default GameOver;