/* eslint-disable no-restricted-globals */
import './Gameplay.scss';
import earth from '../../../../Assets/Games/SpacebarInvaders/planet-earth.png';
import asteroid from '../../../../Assets/Games/SpacebarInvaders/asteroid.svg';
import asteroid2 from '../../../../Assets/Games/SpacebarInvaders/asteroid-2.svg';
import asteroid3 from '../../../../Assets/Games/SpacebarInvaders/asteroid-3.svg';
import asteroid4 from '../../../../Assets/Games/SpacebarInvaders/asteroid-4.svg';
import satellite from '../../../../Assets/Games/SpacebarInvaders/satellite.svg';
import satellite2 from '../../../../Assets/Games/SpacebarInvaders/satellite-2.svg';
import satellite3 from '../../../../Assets/Games/SpacebarInvaders/satellite-3.svg';
import satellite4 from '../../../../Assets/Games/SpacebarInvaders/satellite-4.svg';
import ufo from '../../../../Assets/Games/SpacebarInvaders/ufo-1.svg';
import ufo2 from '../../../../Assets/Games/SpacebarInvaders/ufo-2.svg';
import spacebarInvaderAlien from '../../../../Assets/Games/SpacebarInvaders/spaceInvaderAlien.svg';
import rocket from '../../../../Assets/Games/SpacebarInvaders/rocket-emoji.svg';
import explosion from '../../../../Assets/Games/SpacebarInvaders/collision.svg';
import { Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
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

    // TODO add sound effects for blowing up anything / earth getting hit


    // TODO I should navigate to a system where I track an array of displayed enemies, and once they are no longer in \
    // props.status.enemies I remove them from the array after a delay to destroy them. This way I can just update their positions
    // and hopefully transition that update so they glide and this would allow them to continually rotate. 
    const [displayEnemies, setDisplayEnemies] = useState([]);
    const [updatedLocations, setUpdatedLocations] = useState([]);
    const [waveReset, setWaveReset] = useState(false);
    // track blown up enemies so they don't get shot with missiles again
    const [destroyedEnemyIds, setDestroyedEnemyIds] = useState([]);
    const [betweenWaves, setBetweenWaves] = useState(false);

    // support various screen sizes finding the largest square area that will fit the screen (or small if none will).
    // TODO or just dynamically re-shape box based on largest square that will fit, will also need to adjust changes to enemy
    // translations to be proportionate to size of box. 
    // const [screenSize, setScreenSize] = useState("normal");

    // My concern is that changing the array will entirely repaint the enemies so they will jump positions when
    // one is removed. What I could do is just change their translate style based on their html id (the enemy id),
    // and then when they die set their display to none, then refresh the array when a new wave commences. This 
    // seems best in my head I'll have to try it. 
    useEffect(() => {

        // getters to allow more variation between icons seen
        const asteroidIcons = [asteroid, asteroid2, asteroid3, asteroid4];
        const satelliteIcons = [satellite, satellite2, satellite3, satellite4];
        const ufoIcons = [ufo, ufo2];

        const getAsteroid = () => {
            // apparently ~~ rounds down wow
            // Made it deterministic by getting the src only once when enemies are introduced
            return asteroidIcons[~~(asteroidIcons.length * Math.random())];
        }
    
        const getSatellite = () => {
            return satelliteIcons[~~(satelliteIcons.length * Math.random())];
        }
    
        const getUfo = () => {
            // only give spacebar invader alien 1 in 10 times
            if (Math.random() * 10 > 9) {
                return spacebarInvaderAlien
            } else {
                return ufoIcons[~~(ufoIcons.length * Math.random())];
            }
        }
    
        const getEnemyImage = (word) => {
            if (word.length < 6) {
                return getAsteroid();
            } else if (word.length < 10) {
                return getSatellite();
            } else {
                return getUfo();
            }
        }

        if (props?.status?.enemies && props?.status?.enemies.length > 0 && displayEnemies.length === 0) {
            // copy props.status.enemies as new wave begins
            setDisplayEnemies(
                // as soon as new enemies are given assign each enemy their random src svg file matching their length
                // and their random spin speed
                props.status.enemies.map(enemy => ({...enemy, src: getEnemyImage(enemy.word), spinSpeed: (~~(Math.random * 2) + 2)}))
                
            );
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
                            // convert x and y based on screen size
                            if (screen.width > 800 && screen.height > 1000) {
                                displayEnemyElement.style.translate = `${enemy.x}px ${enemy.y}px`;
                            } else if (screen.width > 550 && screen.height > 750) {
                                displayEnemyElement.style.translate = `${~~(enemy.x * 0.67)}px ${~~(enemy.y * 0.67)}px`;
                            } else {
                                displayEnemyElement.style.translate = `${~~(enemy.x * 0.33)}px ${~~(enemy.y * 0.33)}px`;
                            }
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

    // When an enemy doesn't appear from one status to the next shoot a missile UNLESS 
    // that enemy is within the set range of pixels of earth then just show an explosion on earch
    // spawn and shoot a missile when an enemy doesn't come back
    // TODO sometimes missiles aren't drawn until they are already on top of enemy, may be better to have an array of missiles
    // as big as the enemy array with display none then change them to display in the useEffect loop before calling shootMissile so they are seen right away
    const shootMissile = ({x, y}) => {

        // spawn a new img element onto the dom, after a manual amount of time move that img to the 
        // location of the asteroid and change it's source to the explosion, then remove it from the dom
        let spawnImage = document.createElement('img');
        spawnImage.src = rocket;
        spawnImage.className = "Missile";
        document.getElementById('Holder').appendChild(spawnImage);
        // spin missile to face direction it will launch in
        spawnImage.style.transform = `rotateZ(${x !== 0 && y !== 0 ?  
            Math.atan(y / (x === 0 ? x : x + 0.01)) + 
            (x > 0 ? 0.7 : Math.PI + 0.7) : -0.77}rad)`;
        setTimeout(() => {
            // move missile based on screen size 
            if (screen.width > 800 && screen.height > 1000) {
                spawnImage.style.translate = `${x}px ${y}px`
            } else if (screen.width > 550 && screen.height > 750) {
                spawnImage.style.translate = `${~~(x * 0.67)}px ${~~(y * 0.67)}px`
            } else {
                spawnImage.style.translate = `${~~(x * 0.33)}px ${~(y * 0.33)}px`
            }
            setTimeout(() => {
                // change missile to explosion
                spawnImage.src = explosion;
                setTimeout(() =>{
                    // remove explosion
                    spawnImage.remove();
                }, 800); // time that explosion lasts on screen
            }, 800) // duration should match transition time period in scss, this is the flight time of the missile
        }, 200); // time before missile begins to move (can be short)
    }

    // tell back-end to destroy enemy with matching word
    const destroyEnemy = async (word) => {
        await fetch(getServerBaseUrl() + "spacebar-invaders/destroy", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId,
                word
            })
        });
    }

    return (
        <div className='SpacebarInvadersGameplay full-screen'>
            {/* Will be a fixed size, or even better I do some math to scale everything to the size of the game */}
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
                            onKeyDown={(key) => {if (key.code === 'Enter') setTypedText('')}}
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
            <div className='OuterBounds'>            
                <div className='GameElements'
                    // Set width and height of GameElements dynamically based on screen size, can also set icon sizes
                >
                    <div className='Holder' id='Holder'>
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
                                    <img className='EnemyImage' 
                                        src={enemy.src} 
                                        alt='Enemy Asteroid' 
                                        // Set spin animation speed randomly, may not want all icons to spin
                                        // ie ufo's probably wont maybe they will just wobble. 
                                        // TODO convert enemy word length to number for spin
                                        style={{animation: `spin ${enemy.spinSpeed}s linear infinite`}} 
                                    />
                                    <p className='EnemyText user-font'>{enemy.word}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gameplay;