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

    // TODO these need a lot of work they really bug out the back-end

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

    const playAgain = async () => {
        // delete SpacebarInvaders game data from database
        await fetch(getServerBaseUrl() + "spacebar-invaders/wipe", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
        // await fetch(getServerBaseUrl() + "session/leave-game", {
        //     method: "POST",
        //     headers: getStandardHeader(),
        //     body: JSON.stringify({
        //         sessionId
        //     })
        // });
        await fetch(getServerBaseUrl() + "session/select-game", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId,
                selected_game: "Spacebar Invaders"
            })
        });
    }


    // TODO would be fun to set the background image dynamically based on how many waves they reached with different 
    // catastrophic images that are progressively less bad
    return (
        <div className='GameOver'>
            <div className='GameOverMessage'>
                <h1>You Reached Wave {props.wave}</h1>
                <div className='GameOverButtons'>
                    <Button
                        onClick={playAgain}
                    >
                        Play Again
                    </Button>
                    <Button
                        onClick={pickNewGame}
                    >
                        New Game
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GameOver;