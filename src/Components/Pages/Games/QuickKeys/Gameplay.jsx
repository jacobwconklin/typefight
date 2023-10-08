/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from 'react';
import './Gameplay.scss';
import { SessionContext } from '../../PlayScreen/PlayScreen';
import ProfileContainer from '../../../Reusable/ProfileContainer';
import { Input } from 'antd';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';

// Gameplay
const Gameplay = (props) => {

    // props.prompt holds the prompt string to display, 
    // and props.results (may be null) holds the results array where
    // we can see the index each player has reached to place their Icons (eventually)

    const {session, playerId} = useContext(SessionContext);

    const [countdown, setCountdown] = useState("Starting In:");
    const [typingTimestamp, setTypingTimestamp] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [typedText, setTypedText] = useState("");
    // const [nextLetter, setNextLetter] = useState(""); TODO could highlight the next letter to type if that would be useful?
    const [remainingText, setRemainingText] = useState("");
    const [entire_length, setEntire_length] = useState(0);
    const [textInput, setTextInput] = useState("");

    // TODO Start with a 3 2 1 countdown here on mount  
    useEffect(() => {
        setEntire_length(props.prompt ? props.prompt.length : 0);
        setRemainingText(props.prompt ? props.prompt : "");
        setTimeout(() => {
            setCountdown("3");
            setTimeout(() => {
                setCountdown("2");
                setTimeout(() => {
                    setCountdown("1");
                    setTimeout(() => {
                        setCountdown(null);
                        // countdown is finished begin timer
                        setTypingTimestamp(new Date());
                    }, 1000)
                }, 1000)
            }, 1000)
        })
    }, [props.prompt]);

    // essentially handles a correct letter being typed. Updates the model on the back-end and state of front-end
    const updatePlayerProgress = (typed_index) => {
        // TODO for now update backend asynchronously so users don't feel any lag, not sure if this will cause problems
        try {
            fetch(getServerBaseUrl() + "quick-keys/index", {
                method: "POST",
                headers: getStandardHeader(),
                body: JSON.stringify({
                    index: typed_index,
                    playerId
                })
            });
            // IF finished update time too
            setTypedText(typedText + remainingText[0]);
            setRemainingText( !!remainingText ? remainingText.substring(1) : "");
            // check for end finishing typing
            if (typed_index + 1 === entire_length) {
                const finalTimeInMilliseconds = new Date() - typingTimestamp;
                setFinalTime( "" + Math.floor(finalTimeInMilliseconds / 1000) + "." + finalTimeInMilliseconds % 1000);
                // post final time to back-end
                fetch(getServerBaseUrl() + "quick-keys/time", {
                    method: "POST",
                    headers: getStandardHeader(),
                    body: JSON.stringify({
                        time: finalTimeInMilliseconds,
                        playerId
                    })
                });
            }
        } catch(error) {
            console.log("Error updating player progress:", error);
        }
    }




    const [wrongLetter, setWrongLetter] = useState("");
    const [randomFromTop, setRandomFromTop] = useState("0px");
    const [randomFromLeft, setRandomFromLeft] = useState("0px");

    // when an incorrect letter is typed LET THE USER KNOW!
    const typedWrongLetter = (letterTyped) => {
        console.log(wrongLetter);
        let fromLeft = (window.innerWidth - 250);
        if (letterTyped.length > 1) {
            fromLeft = 100;
        }
        setRandomFromTop((Math.random() * (window.innerHeight - 400)) + "px");
        setRandomFromLeft(((Math.random() * fromLeft) + "px"));
        setWrongLetter(letterTyped);
    }

    return (
        <div className='Gameplay '>
            <div className='GameInfo'>
                <h1>Type The Fastest To Win!</h1>
                <div className='PromptDisplay'>
                    {/* <span className='Typed user-font'>{typedText}</span> 
                    TODO Could show this as highlighted if I could get it to scroll but I can't yet */}
                    <span className='Remaining user-font'>{remainingText}</span>
                </div>
                <div className='ProgressDisplay'>
                    {/* Display all player icons  with their color going along the progress bar */}
                    <div className='ProgressBar'>

                    </div>
                </div>
                <div className='TypeHere'>
                    <Input 
                        placeholder='Type Here'
                        style={{height: '70px', fontSize: 'x-large'}}
                        disabled={countdown != null || !!finalTime}
                        value={!!finalTime ? finalTime : textInput}
                        onChange={(e) => {
                            e.preventDefault();
                        }}
                        onKeyDown={(e) => {
                            const key = e.key;
                            // ignore SHIFT
                            if (key === "Shift") {
                                // do nothing
                            }
                            // determine between space, correct letter, wrong letter, and backspace
                            else if (key === remainingText[0] || (key === " " && (remainingText[0] === '\n' || remainingText[0] === '\t'))) {
                                console.log("Got the right letter")
                                setWrongLetter("");
                                // back-end only needs to get updated ont he index reached
                                updatePlayerProgress(typedText.length);
                                // if it was a space and correct reset the input:
                                if (key === " ") {
                                    setTextInput("");
                                } else {
                                    setTextInput(textInput + key);
                                }
                            } else {
                                typedWrongLetter(key === " " ? "SPACE" : key);
                            }
                        }}
                    />
                </div>
            </div>
            <div className='SessionPlayers'>
                {
                    session.players.map(player => (
                        <ProfileContainer
                            alias={player.alias}
                            color={player.color}
                            font={player.font}
                            icon={player.icon}
                        />
                    ))
                }
            </div>
            <div className='WrongLetter'
                style={{color:'red', position:'absolute', width: '100px', height:'100px', fontSize:'5rem',
                left: randomFromLeft , top: randomFromTop,}}            
            >
                <h1>{wrongLetter}</h1>
            </div>
            {
                countdown != null && 
                <div className='Countdown'>
                    <h1>{countdown}</h1>
                </div>
            }
        </div>
    )
}

export default Gameplay;