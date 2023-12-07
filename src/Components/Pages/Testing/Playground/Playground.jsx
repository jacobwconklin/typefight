// import Gameplay from '../../Games/SpacebarInvaders/Gameplay';
// import Minigame from '../../Games/Minigames/Minigame';
// import Textplosion from '../../Games/Textplosion/Textplosion';
// import Minigame from '../../Games/Minigames/Minigame';
import { useState } from 'react';
import './Playground.scss';
import { Input } from 'antd';
import tile from '../../../../Assets/Games/TypeFlight/dashboard-tile-solid.svg';
import brick from '../../../../Assets/Games/TypeFlight/brick.png';
import checkerboard from '../../../../Assets/Games/TypeFlight/diagonal-checkerboard.png';
import tiles from '../../../../Assets/Games/TypeFlight/uneven-tiles.png';
import bomb from '../../../../Assets/Games/TypeFlight/bomb.svg';
import { generate } from 'random-words';
import arrowFourWay from '../../../../Assets/Games/TypeFlight/arrow-four-way.svg';

// Playground
// have error letters pop up at all or have them grow until you get the right one, or maybe be permanent? but partly translucent etc. 
const Playground = (props) => {

    // Only need 1 int to track person's location
    const [dudePosition, setDudePosition] = useState(55);
    const [textInput, setTextInput] = useState("");
    const [upWord, setUpWord] = useState(generate());
    const [leftWord, setLeftWord] = useState(generate());
    const [rightWord, setRightWord] = useState(generate());
    const [downWord, setDownWord] = useState(generate());
    const [eventPosition, setEventPosition] = useState(63);
    

    return (
        <div className='Playground'>
            {/* <div className='MinigameBox'>
                <Minigame />
            </div> */}
            <div className='TestTypeFlightGrid'>
                <div className='Controls'>
                    <h3>Type to Move</h3>
                    <div className='TypeFlightInput'>
                        <Input placeholder='Type Here'
                            autoFocus
                            value={textInput}
                            onChange={(e) => {
                                // check if value equals any of the 4 directions
                                const cleanedTypedWord = e.target.value.trim().toLowerCase();
                                if ( cleanedTypedWord === upWord ) {
                                    // move dude "Up" which is just - 10 if there is a row above the player or it wraps to 
                                    // 90 + current value if not
                                    if (dudePosition >= 10) {
                                        setDudePosition(currValue => currValue - 10);
                                    }  else {
                                        setDudePosition(currValue => currValue + 90);
                                    }
                                    // either way reset upWord and clear textInput
                                    setUpWord(generate());
                                    setTextInput("");
                                } else if ( cleanedTypedWord === leftWord ) {
                                    // move dude "LEFT" which is just - 1 UNLESS player is at a number that ends with 0 
                                    // in which case add 9
                                    if (dudePosition % 10 === 0) {
                                        setDudePosition(currValue => currValue + 9);
                                    } else {
                                        setDudePosition(currValue => currValue - 1);
                                    }
                                    // either way reset leftWord and clear textInput
                                    setLeftWord(generate());
                                    setTextInput("");
                                } else if ( cleanedTypedWord === rightWord ) {
                                    // move dude "Right" which is just + 1 UNLESS player is at a number that ends with 9 
                                    // in which case subtract 9
                                    if (dudePosition % 10 === 9) {
                                        setDudePosition(currValue => currValue - 9);
                                    } else {
                                        setDudePosition(currValue => currValue + 1);
                                    }
                                    // either way reset rightWord and clear textInput
                                    setRightWord(generate());
                                    setTextInput("");
                                } else if ( cleanedTypedWord === downWord ) {
                                    // move dude "Down" which is just + 10 if there is a row below the player or it wraps to 
                                    // 90 - current value if not
                                    if (dudePosition >= 90) {
                                        setDudePosition(currValue => currValue - 90);
                                    }  else {
                                        setDudePosition(currValue => currValue + 10);
                                    }
                                    // either way reset downWord and clear textInput
                                    setDownWord(generate());
                                    setTextInput("");
                                } else {
                                    setTextInput(e.target.value);
                                }
                            }}
                            onKeyDown={(e) => {
                                const key = e.key;
                                // Enter key clears input
                                if (key === 'Enter') {
                                    setTextInput('');
                                }
                            }}
                        />
                    </div>
                    <div className='Direction title-font'>
                        UP
                    </div>
                    <div className='RandomWord'>
                        {upWord}
                    </div>
                    <div className='LeftAndRight'>
                        <div className='LeftSection'>
                            <div className='Direction title-font'>
                                LEFT
                            </div>
                            <div className='RandomWord'>
                                {leftWord}
                            </div>
                        </div>
                        <img className='ArrowIcon' src={arrowFourWay} alt='Arrows pointing up, left, right, and down' />
                        <div className='RightSection'>
                            <div className='Direction title-font'>
                                RIGHT
                            </div>
                            <div className='RandomWord'>
                                {rightWord}
                            </div>
                        </div>
                    </div>
                    <div className='Direction title-font'>
                        DOWN
                    </div>
                    <div className='RandomWord'>
                        {downWord}
                    </div>
                    <div>
                        Timer:
                    </div>
                </div>
                {
                    // create empty array the size of the grid and iterate through it to fill each grid-item
                    Array.apply(null, Array(100)).map((val, index) => (
                        <div  className='Tile'>
                            
                            {/* <img 
                                id={'typeflight-tile-number-' + index}
                                className='TileIcon' 
                                src={checkerboard} 
                                alt='tile background' 
                                style={{opacity: '20%'}} 
                            /> */}
                            {
                                index === eventPosition && 
                                <img className='tileIcon EventTile' src={bomb} alt='event' />
                            }
                            {
                                index === dudePosition && 
                                <img className='TileIcon' src={tile} alt='player'/>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Playground;