import { Card } from 'antd';
import GameCard from './GameCard';
import './GameSelect.scss';

// Dashboard view for users to select a game
const GameSelect = (props) => {

    return (
        <div className='GameSelect'>
            <div className='GamesBox'>
                <GameCard game={{title:"TypeFight"}}></GameCard>
                <Card>
                    <h1>Quick Keys</h1>
                    <h3>Competitive</h3>
                </Card>
            </div>
        </div>
    )
}

export default GameSelect;