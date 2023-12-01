import Avatar from './Avatar';
import './Gameplay.scss';
//import balloon from '../../../../Assets/Games/Textplosion/balloon-realistic.svg';
import balloon from '../../../../Assets/Games/Textplosion/balloon-realistic.png';
import { useEffect, useState } from 'react';
import explosion from '../../../../Assets/Games/SpacebarInvaders/collision.svg';

// Gameplay
const Gameplay = (props) => {

    // hold logic to open and close modal in Textplosion.jsx
    // props.gameStatus holds charsTyped and charsToPop whose ratio determines balloon size, as well as 
    // props.gameStatus.players which holds the array containing all player information

    // Need to show balloon, person in hot seat, and all other players listed as alive in order of position, and
    // then dead. 

    // have balloon expand to the right and downward so that it fills up the screen? or have it expand uniformly side to side and 
    // upwards going off screen or lifting up screen?
    const maxIncrease = 150;
    const [canExplode, setCanExplode] = useState(false);

    // make explosion effect only once per charsTyped returning to 0
    useEffect(() => {
        if (props?.status?.game?.charsTyped && props?.status?.game?.charsTyped !== 0) {
            // prime balloon to be able to explode
            console.log('priming explosive');
            setCanExplode(true);
        } else if (canExplode && props?.status?.game?.charsTyped === 0) {
            // perform explosion here
            // first hide balloon
            // then spawn explosion img
            console.log('performing explosion');
            document.getElementById('textplosion-balloon').style.display = 'none';
            let spawnImage = document.createElement('img');
            spawnImage.src = explosion;
            spawnImage.className = "BalloonExplosion";
            document.getElementById('textplosion-gameplay-component').appendChild(spawnImage);
            setTimeout(() => {
                spawnImage.remove();
                document.getElementById('textplosion-balloon').style.display = 'block';
            }, 500);
        }
    }, [props?.status?.game?.charsTyped, canExplode])

    return (
        <div className='Gameplay' id='textplosion-gameplay-component'>
            <img className='balloon' src={balloon}  alt='balloon' id='textplosion-balloon'
                style={{
                    width: `${100 + (props?.status?.game?.charsTyped ? (maxIncrease * (props?.status?.game?.charsTyped / props?.status?.game?.charsToPop)) : 0)}px`,
                    height: `${100 + (props?.status?.game?.charsTyped ? (maxIncrease * (props?.status?.game?.charsTyped / props?.status?.game?.charsToPop)) : 0)}px`,
                }}
            />
            <div className='AllPlayers'>
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