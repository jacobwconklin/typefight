import GameCard from './GameCard';
import './GameSelect.scss';

// Dashboard view for users to select a game
const GameSelect = (props) => {

    return (
        <div className='GameSelect'>
            <div className='GamesBox'>
                <GameCard game={{title:"TypeFight"}}></GameCard>
            </div>
        </div>
    )
}

export default GameSelect;