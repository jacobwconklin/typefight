import './Gameplay.scss';
import earth from '../../../../Assets/Games/SpacebarInvaders/planet-earth.png';
import singleAsteroid from '../../../../Assets/Games/SpacebarInvaders/asteroid-2.svg';
import rocket from '../../../../Assets/Games/SpacebarInvaders/rocket-emoji.svg';
import explosion from '../../../../Assets/Games/SpacebarInvaders/collision.svg';
import { Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// Gameplay screen for SpacebarInvaders, paints all 
// enemies (in bounds) in active wave, displays message between waves
// when there are no enemies left, shows explosion when earth loses a health,
// shows missle sent from earth to enemy when enemy is destroyed, tell server when 
// player has typed an enemy's word to destroy it (Up to players to coordinate
// shooting different enemies), and so forth
const Gameplay = (props) => {

    // props.status holds the game status,

    // get session Id to destroy enemies in the correct session
    const { sessionId } = useContext(SessionContext);

    // value the user has typed
    const [typedText, setTypedText] = useState("");

    // TODO I should navigate to a system where I track an array of displayed enemies, and once they are no longer in \
    // props.status.enemies I remove them from the array after a delay to destroy them. This way I can just update their positions
    // and hopefully transition that update so they glide and this would allow them to continually rotate. 
    const [displayEnemies, setDisplayEnemies] = useState([]);
    const [updatedLocations, setUpdatedLocations] = useState([]);
    const [waveReset, setWaveReset] = useState(false);
    // track blown up enemies so they don't get shot with missiles again
    const [destroyedEnemyIds, setDestroyedEnemyIds] = useState([]);
    const [betweenWaves, setBetweenWaves] = useState(false);

    // My concern is that changing the array will entirely repaint the enemies so they will jump positions when
    // one is removed. What I could do is just change their translate style based on their html id (the enemy id),
    // and then when they die set their display to none, then refresh the array when a new wave commences. This 
    // seems best in my head I'll have to try it. 
    useEffect(() => {
        if (props?.status?.enemies && props?.status?.enemies.length > 0 && displayEnemies.length === 0) {
            // copy props.status.enemies as new wave begins
            console.log("NEW WAVE setting display enemies");
            setDisplayEnemies(props.status.enemies);
            setUpdatedLocations(props.status.enemies);
            setWaveReset(false);
            setBetweenWaves(false);
        }
        if (props?.status?.enemies && props.status.enemies.length === 0 && displayEnemies.length !== 0 && !waveReset ) {
            // CLEAR DISPLAY ENEMIES WAVE IS OVER
            setWaveReset(true);
            setTimeout(() => {
                // leave time for final missile
                setDisplayEnemies([]);
                setUpdatedLocations([]);
                setDestroyedEnemyIds([]);
                setWaveReset(false);
                setBetweenWaves(true);
            }, 1000);
        } else if (props?.status?.enemies) {
            // update last known locations (used to shoot missiles at)
            // of all enemies in props.status.enemies
            props.status.enemies.filter(enemy => enemy !== null).forEach(enemy => {
                // find match in updated locations
                updatedLocations.forEach((location, index) => {
                    if (location._id === enemy._id) {
                        const newUpdatedLocations = updatedLocations;
                        newUpdatedLocations[index] = enemy;
                        setUpdatedLocations(newUpdatedLocations);
                    }
                });
            })

            // update enemy positions and IF an enemy is in props.status.enemies and NOT in displayEnemies 
            // shoot that enemy with a rocket (unless too close to earth) and set that enemy to display: none after a timeout
            displayEnemies.filter(displayEnemy => displayEnemy !== null).forEach(displayEnemy => {
                let matchFound = false;
                // if displayEnemy still has a match in enemies statused it has not been destroyed and its position must be updated
                props.status.enemies.filter(enemy => enemy != null).forEach(enemy => {
                    if (enemy._id === displayEnemy._id) {
                        // enemy has not been destroyed update its location
                        const displayEnemyElement = document.getElementById(displayEnemy._id);
                        if (displayEnemyElement) {
                            displayEnemyElement.style.translate = `${enemy.x}px ${enemy.y}px`;
                        }
                        matchFound = true;
                    }
                });
                if (!matchFound && !destroyedEnemyIds.includes(displayEnemy._id) ) {
                    // enemy has been destroyed show it and record it in destroyedEnemyIds
                    setDestroyedEnemyIds(destroyedIds => destroyedIds.concat([displayEnemy._id]));
                    // find updatedLocation that matches displayEnemy's id, and use that to shoot the missile at
                    const matchingLocation = updatedLocations.find(location => location._id === displayEnemy._id);
                    shootMissile(matchingLocation);
                    setTimeout(() => {
                        const displayEnemyElement = document.getElementById(displayEnemy._id);
                        if (displayEnemyElement) {
                            displayEnemyElement.style.display = 'none'; 
                        }
                    }, 1000);
                }
            })
        } else {
            console.log("Issue with props.status.enemies in Spacebar Invaders Gameplay");
        }
    }, [setDisplayEnemies, props?.status?.enemies, displayEnemies, destroyedEnemyIds, waveReset, setWaveReset,
        setDestroyedEnemyIds, updatedLocations, setUpdatedLocations, setBetweenWaves]);
    
    const [firedMissiles, setFiredMissiles] = useState([]);

    // When an enemy doesn't appear from one status to the next shoot a missile UNLESS 
    // that enemy is within the set range of pixels of earth then just show an explosion on earch
    // spawn and shoot a missile when an enemy doesn't come back
    // TODO sometimes missiles aren't drawn until they are already on top of enemy, may be better to have an array of missiles
    // as big as the enemy array with display none then change them to display in the useEffect loop before calling shootMissile so they are seen right away
    const shootMissile = ({x, y, word}) => {
        console.log("called shoot missile");
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

    // tell back-end to destroy enemy with matching word
    const destroyEnemy = async (word) => {
        const result = await fetch(getServerBaseUrl() + "spacebar-invaders/destroy", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId,
                word
            })
        });
        const data = await result.json();
        console.log(data);
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
                            // Display all live enemies
                            displayEnemies.filter(enemy => enemy !== null).map(enemy => (
                                <div className='Enemy' 
                                    key={enemy.word}
                                    id={enemy._id}
                                    style={{
                                        translate: `${enemy.x}px ${enemy.y}px`
                                    }}
                                >
                                    <img className='EnemyImage' src={singleAsteroid} alt='Enemy Asteroid' 
                                        // Set spin animation speed randomly, may not want all icons to spin
                                        // ie ufo's probably wont maybe they will just wobble. 
                                        // TODO convert enemy word length to number for spin
                                        style={{animation: `spin ${4}s linear infinite`}} 
                                    />
                                    <p className='EnemyText user-font'>{enemy.word}</p>
                                </div>
                            ))
                        }
                        {
                            // display all missiles
                            firedMissiles.filter(missile => missile !== null).map(missile => (
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
                    <div className='WaveAndHealth'>
                        <h1>Health {props.status?.health}</h1>
                        <h1>Wave {props.status?.wave}</h1>
                    </div>
                        <Input className='TypeInput'
                            placeholder='Type Here'
                            autoFocus
                            value={typedText}
                            onChange={(e) => {
                                e.preventDefault();
                                setTypedText(e.target.value);
                                // if typed word is one of the enemy words destroy the enemy 
                                // TODO if not checking capitalization do that here
                                const trimmed = e.target.value.trim();
                                if (props?.status?.enemies && props.status.enemies.filter(enemy => enemy !== null)
                                        .map(enemy => enemy.word).includes(trimmed)) { 
                                    destroyEnemy(e.target.value);
                                    setTypedText("");
                                }
                            }}
                        />
                        {
                            // TODO figure out why this doesn't work
                            betweenWaves && 
                            <h1 className='CompleteText' >Wave Complete</h1>
                        }
                </div>
            </div>
        </div>
    )
}

export default Gameplay;