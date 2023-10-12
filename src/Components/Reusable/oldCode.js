// old code that I just want to keep for a bit in case I re-use it, not just hoarding unnecessarily
/*

// used to hold the Ids of enemies to see what enemies are destroyed between updates
    const [oldEnemies, setOldEnemies] = useState([]);
    const [tempDeadEnemies, setTempDeadEnemies] = useState([]);
    // check for enemies that are no longer around, shoot them with missile or just
    // blow up earth if they reached earth then remove them
    useEffect(() => {
        if (props?.status?.enemies && props.status.enemies.length < oldEnemies.length) {
            // Enemy has been destroyed or reached planet. Find the enemy that died and shoot it / show explosion
            // TODO if reduce doesn't cooperate just map and map dead enemies to null and then filter out nulls and then
            // set old enemies.
            try {
                setOldEnemies(oldEnemies => oldEnemies.filter(oldEnemy => oldEnemy !== null).filter( oldEnemy => {
                    const newEnemies = props.status.enemies;
                    console.log("New enemies array is: ", newEnemies);
                    console.log("old enemy is: ", oldEnemy);
                    const newEnemy = newEnemies.filter(enemy => enemy !== null).find(newE => newE._id === oldEnemy._id);
                    if (newEnemy) {
                        // need to update enemy object
                        return true;
                    } else {
                        // put enemy in temporary display array taking it out after a second (when missile will have hit it)
                        setTempDeadEnemies(deadEnemies => deadEnemies.concat([oldEnemy]));
                        setTimeout(() => {
                            setTempDeadEnemies(deadEnemies => deadEnemies.filter(enemy => enemy._id !== oldEnemy._id));
                        }, 1000);
                        // TODO just show explosion if too close to earth and health lost
                        console.log("going to call shoot missile");
                        shootMissile(oldEnemy);
                        return false;
                    }
                }).map(oldEnemyWithNewCounterpart => {
                    return props.status.enemies.filter(enemy => enemy !== null).find(newE => newE._id === oldEnemyWithNewCounterpart._id);
                }));
            } catch (error) {
                console.log("Error setting old enemies: ", error);
            }
        } else if (props?.status?.enemies) {
            // set oldEnemies to reflect latest enemy positions and ids
            setOldEnemies(props.status.enemies);
        }
    }, [oldEnemies, setOldEnemies, props?.status?.enemies, setTempDeadEnemies]);

    // const tempEnemies = [
    //     {
    //         x: -300,
    //         y: -300,
    //         word: "NegXNegY"
    //     },
    //     {
    //         x: -300,
    //         y: 300,
    //         word: "NegXPosY"
    //     },
    //     {
    //         x: 300,
    //         y: -300,
    //         word: "PosXNegY"
    //     },
    //     {
    //         x: 300,
    //         y: 300,
    //         word: "PosXPosY"
    //     },
    // ]

    {
                            // Display all live enemies
                            props?.status?.enemies && props.status.enemies.filter(enemy => enemy !== null).map(enemy => (
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
                            // Display all dead enemies
                            tempDeadEnemies.filter(enemy => enemy !== null).map(enemy => (
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















*/