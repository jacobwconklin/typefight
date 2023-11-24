import Avatar from './Avatar';
import './Gameplay.scss';

// Gameplay
const Gameplay = (props) => {

    // hold logic to open and close modal in Textplosion.jsx
    // props.gameStatus holds charsTyped and charsToPop whose ratio determines balloon size, as well as 
    // props.gameStatus.players which holds the array containing all player information

    // Need to show balloon, person in hot seat, and all other players listed as alive in order of position, and
    // then dead. 
    return (
        <div className='Gameplay'>
            <div className='balloonAndPlayers'>
                <div>
                    <div className='balloon'></div>
                </div>
                {
                    // map all alive players in order of their position
                    props?.status?.players?.filter(player => !player.blownUp).sort( (a, b) => a.position - b.position )
                    .map(player => (
                        <Avatar player={player} key={player._id} />
                    ))
                }
                {
                    // THEN map all dead players with order unimportant
                    props?.status?.players?.filter(player => player.blownUp).map(player => (
                        <Avatar player={player} key={player._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Gameplay;