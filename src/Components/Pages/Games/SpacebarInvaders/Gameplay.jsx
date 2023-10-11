import './Gameplay.scss';
import earth from '../../../../Assets/Games/SpacebarInvaders/planet-earth.png';
import singleAsteroid from '../../../../Assets/Games/SpacebarInvaders/asteroid-2.svg';
import rocket from '../../../../Assets/Games/SpacebarInvaders/rocket-emoji.svg';
import explosion from '../../../../Assets/Games/SpacebarInvaders/collision.svg';
import { Input } from 'antd';
import { useState } from 'react';
import { v4 } from 'uuid';

// Gameplay screen for SpacebarInvaders, paints all 
// enemies (in bounds) in active wave, displays message between waves
// when there are no enemies left, shows explosion when earth loses a health,
// shows missle sent from earth to enemy when enemy is destroyed, tell server when 
// player has typed an enemy's word to destroy it (Up to players to coordinate
// shooting different enemies), and so forth
const Gameplay = (props) => {

    const tempEnemies = [
        {
            x: -300,
            y: -300,
            word: "NegXNegY"
        },
        {
            x: -300,
            y: 300,
            word: "NegXPosY"
        },
        {
            x: 300,
            y: -300,
            word: "PosXNegY"
        },
        {
            x: 300,
            y: 300,
            word: "PosXPosY"
        },
    ]

    const [firedMissiles, setFiredMissiles] = useState([]);

    // spawn and shoot a missile when an enemy doesn't come back
    const shootMissile = ({x, y, word}) => {
        const missileId = v4();
        setFiredMissiles(missiles => missiles.concat([{x: 0, y: 0, id: missileId, exploded: false }]));
        setTimeout(() => {
            // shoot missile out
            setFiredMissiles(missiles => missiles.map(missile => missile.id === missileId ? {...missile, x, y} : missile));
            setTimeout(() => {
                setFiredMissiles(missiles => missiles.map(missile => missile.id === missileId ? {...missile, exploded: true} : missile));
                // explode missile
                setTimeout(() => {
                    // remove missile
                    setFiredMissiles(missiles => missiles.filter(missile => missile.id !== missileId));
                    // remove enemy from array TODO make sure not to move enemy after it doesn't appear in status
                    // TODO will be in state but DELTE ENEMY with matching x, y, and word values

                }, 400);
            }, 800)
        }, 10);
    }

    return (
        <div className='SpacebarInvadersGameplay full-screen'>
            {/* Will be a fixed size, or even better I do some math to scale everything to the size of the game */}
            <div className='OuterBounds'>            
                <div className='GameElements'>
                    <div className='Holder'>
                        <div className='Radar'></div>
                        {/* TODO may allow customization of planet image */}
                        <img className='Planet' src={earth} alt="Planet Earth"  />
                        {
                            // Display all enemies
                            // Use temporary enemy map for setting up graphics TODO switch to enemy list from server status
                            tempEnemies.map(enemy => (
                                <div className='Enemy' 
                                    key={enemy.word}
                                    style={{
                                        translate: `${enemy.x}px ${enemy.y}px`
                                    }}
                                >
                                    <img className='EnemyImage' src={singleAsteroid} alt='Enemy Asteroid' 
                                        // Set spin animation speed randomly, may not want all icons to spin
                                        // ie ufo's probably wont maybe they will just wobble. 
                                        style={{animation: `spin ${Math.floor(Math.random() * 3) + 2}s linear infinite`}}
                                    />
                                    <p className='EnemyText user-font'>{enemy.word}</p>
                                </div>
                            ))
                        }
                        {
                            // display all missiles
                            firedMissiles.map(missile => (
                                <div className='Missile'
                                    key={missile.id}
                                    style={{translate: `${missile.x}px ${missile.y}px`}}
                                >
                                    <img className='MissileImage' src={missile.exploded ? explosion : rocket } alt='Missile' 
                                        style={{transform: `rotateZ(${missile.x !== 0 && missile.y !== 0 ?  
                                            Math.atan(missile.y / (missile.x === 0 ? missile.x : missile.x + 0.01)) + 
                                            (missile.x > 0 ? 0.7 : Math.PI + 0.7) : -0.77}rad)`}}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='TypeHolder'>
                <div className='TypeHere'>
                        <Input className='TypeInput'
                            placeholder='Type Here'
                        />
                        <button
                            onClick={() => {
                                shootMissile({x: 300, y: -300, word: "Yolo"})
                            }}
                        >
                            Spawn Missile </button>
                </div>
            </div>
        </div>
    )
}

export default Gameplay;