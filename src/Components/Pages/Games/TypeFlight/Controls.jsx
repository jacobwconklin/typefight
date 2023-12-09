

import { Input } from 'antd';
import './Controls.scss';
import { generate } from 'random-words';
import { useContext, useState } from 'react';
import arrowFourWay from '../../../../Assets/Games/TypeFlight/arrow-four-way.svg';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// Controls
const Controls = (props) => {

    // Only need 1 int to track player's location
    const [textInput, setTextInput] = useState("");
    const [upWord, setUpWord] = useState(generate());
    const [leftWord, setLeftWord] = useState(generate());
    const [rightWord, setRightWord] = useState(generate());
    const [downWord, setDownWord] = useState(generate());

    const { playerId, sessionId } = useContext(SessionContext);

    // call to hit move endpoint on successfully typing a direction's word
    const move = (newPosition) => {
        props.setPlayerPosition(newPosition);
        // now tell backend
        try {
            fetch(getServerBaseUrl() + "typeflight/move", {
                method: "POST",
                headers: getStandardHeader(),
                body: JSON.stringify({
                    position: newPosition,
                    playerId,
                    sessionId
                })
            });
        } catch(error) {
            console.log("Error updating player position in typeflight:", error);
        }
    }

    return (
        <div className='Controls'>
            <h3>Type to Move</h3>
            <div className='TypeFlightInput'>
                <Input placeholder='Type Here'
                    autoFocus
                    value={textInput}
                    disabled={!props?.playerIsAlive}
                    onChange={(e) => {
                        // check if value equals any of the 4 directions
                        const cleanedTypedWord = e.target.value.trim().toLowerCase();
                        if ( cleanedTypedWord === upWord ) {
                            // move player "Up" which is just - 10 if there is a row above the player or it wraps to 
                            // 90 + current value if not
                            if (props?.playerPosition >= 10) {
                                move(props?.playerPosition - 10);
                            }  else {
                                move(props?.playerPosition + 90);
                            }
                            // either way reset upWord and clear textInput
                            setUpWord(generate());
                            setTextInput("");
                        } else if ( cleanedTypedWord === leftWord ) {
                            // move player "LEFT" which is just - 1 UNLESS player is at a number that ends with 0 
                            // in which case add 9
                            if (props?.playerPosition % 10 === 0) {
                                move(props?.playerPosition + 9);
                            } else {
                                move(props?.playerPosition - 1);
                            }
                            // either way reset leftWord and clear textInput
                            setLeftWord(generate());
                            setTextInput("");
                        } else if ( cleanedTypedWord === rightWord ) {
                            // move player "Right" which is just + 1 UNLESS player is at a number that ends with 9 
                            // in which case subtract 9
                            if (props?.playerPosition % 10 === 9) {
                                move(props?.playerPosition - 9);
                            } else {
                                move(props?.playerPosition + 1);
                            }
                            // either way reset rightWord and clear textInput
                            setRightWord(generate());
                            setTextInput("");
                        } else if ( cleanedTypedWord === downWord ) {
                            // move player "Down" which is just + 10 if there is a row below the player or it wraps to 
                            // 90 - current value if not
                            if (props?.playerPosition >= 90) {
                                move(props?.playerPosition - 90);
                            }  else {
                                move(props?.playerPosition + 10);
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
                Time: {(Date.now() - props?.gameStatus?.startTimeAbsolute) / 1000}s
            </div>
        </div>
    )
}

export default Controls;