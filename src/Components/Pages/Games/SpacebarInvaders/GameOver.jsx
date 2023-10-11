import { Button } from 'antd';
import './GameOver.scss';

// GameOver screen for SpacebarInvaders, show the wave reached, the time spent
// playing maybe, the number of characters typed correctly + incorrectly, etc.
// give buttons to play again or select a new game
const GameOver = (props) => {

    return (
        <div className='GameOver'>
            <p>GGs</p>
            <div className='GameOverButtons'>
                <Button>
                    Play Again
                </Button>
                <Button>
                    New Game
                </Button>
            </div>
        </div>
    )
}

export default GameOver;