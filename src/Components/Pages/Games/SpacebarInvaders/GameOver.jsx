import { Button } from 'antd';
import './GameOver.scss';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { useContext } from 'react';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// GameOver screen for SpacebarInvaders, show the wave reached, the time spent
// playing maybe, the number of characters typed correctly + incorrectly, etc.
// give buttons to play again or select a new game
const GameOver = (props) => {

    const { sessionId } = useContext(SessionContext);

    // pick new game
    // set session's selected_game to undefined
    const pickNewGame = async () => {
        // delete SpacebarInvaders game data from database
        await fetch(getServerBaseUrl() + "spacebar-invaders/wipe", {
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
        <div className='GameOver'>
            <p>GGs You reached wave: {props.wave}</p>
            <div className='GameOverButtons'>
                <Button>
                    Play Again
                </Button>
                <Button
                    onClick={pickNewGame}
                >
                    New Game
                </Button>
            </div>
        </div>
    )
}

export default GameOver;