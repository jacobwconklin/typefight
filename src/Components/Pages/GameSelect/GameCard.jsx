import './GameCard.scss';
import TypeFightImage from '../../../Assets/GameCards/TypeFight.jpg';

// GameCard to show one game (with picture and description)
const GameCard = (props) => {

    // props.gameTitle must hold the name of the game
    // 

    // map game titles to their images
    const titleToImageMap = {
        TypeFight:TypeFightImage
    };

    return (
        <div className='GameCard'
            style={{backgroundImage:`url(${titleToImageMap[props.game.title]})`, backgroundSize:"cover"}}
        >
            {/* <img src={TypeFight} alt={props.game.title} className='CardImage' /> */}
            <h1>{props.game.title}</h1>
        </div>
    )
}

export default GameCard;