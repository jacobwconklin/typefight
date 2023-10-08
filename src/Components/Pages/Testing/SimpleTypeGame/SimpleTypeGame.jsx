import { useEffect, useState } from 'react';
import './SimpleTypeGame.scss';
import { getServerBaseUrl, getStandardHeader, sanitizeString } from '../../../../Utils';

// Hopefully a pre-cursor to more involved games, this is just to establish a proof of concept between front-end, back-end and db
// and create a working game that can hopefully be hosted

// TODO could even have game mode where everyone has to vote on one text and all type it at the same time and they could have little icons that
// move above the letters.

// TODO could have lots of settings to toggle: fonts, color, matching uppercase, removing punctuation / numbers,
// have error letters pop up at all or have them grow until you get the right one, or maybe be permanent? but partly translucent etc. 
const SimpleTypeGame = (props) => {

    // Actual model exists in the database, but split model on typed_index into typed and remaining
    // to display user progress
    const [typedText, setTypedText] = useState("");
    const [remainingText, setRemainingText] = useState("");
    const [entire_length, setEntire_length] = useState(0);
    const [textInput, setTextInput] = useState("");
    const [selectedTextId, setSelectedTextId] = useState(null);
    const [finishedTyping, setFinishedTyping] = useState(false);
    const [typingTimestamp, setTypingTimestamp] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [availableTexts, setAvailableTexts] = useState([]);

    const [wrongLetter, setWrongLetter] = useState("");
    const [randomFromTop, setRandomFromTop] = useState("0px");
    const [randomFromLeft, setRandomFromLeft] = useState("0px");

    // when an incorrect letter is typed LET THE USER KNOW!
    const typedWrongLetter = (letterTyped) => {
        console.log(wrongLetter);
        setRandomFromTop((Math.random() * 500) + "px");
        setRandomFromLeft((Math.random() * 1500) + "px");
        setWrongLetter(letterTyped);
    }

    // pull all available texts from database (could be modified if players select theme or difficulty for race)
    // in future may need this in a useEffect that continually pulls from server if I want to dissallow players from
    // selecting the same text. Alternatively players COULD select the same text if a new copy is made for each player (probably)
    // the best solution. 
    useEffect(() => {
        retrieveAllAvailableTexts();
    }, [])

    const retrieveAllAvailableTexts = async () => {
        try {
            const result = await fetch(getServerBaseUrl() + "text/all", { 
                method: "GET",
                headers: getStandardHeader(),
            })
            const data = await result.json();
            console.log(data);
            setAvailableTexts(data);
        } catch (error) {
            console.log("Error retreiving all available texts", error);
        }
    }

    // TODO Should have separate function for beginning the game (to set timestamps etc)
    // to allow fair multiplayer when all players have chosen texts
    // call when player chooses a text, assign the text to the player and put the player
    const chooseText = async (textId) => {
        try {
            const result = await fetch(getServerBaseUrl() + "text/assign", {
                method: "POST",
                headers: getStandardHeader(),
                body: JSON.stringify({
                    textId,
                    typer:"Playa"
                })
            })
            const data = await result.json();
            console.log(data);
            setRemainingText(sanitizeString(data.entire_text));
            setSelectedTextId(data._id);
            setEntire_length(data.entire_text.length);
            setAvailableTexts([]);
            setTypingTimestamp(new Date());
        } catch (error) {
            alert("Error choosing text");
            console.log(error);
        }
    }

    // essentially handles a correct letter being typed. Updates state of front-end and communicates progress to back-end
    const updatePlayerProgress = (typed_index) => {
        // TODO for now update backend asynchronously so users don't feel any lag, not sure if this will cause problems
        try {
            fetch(getServerBaseUrl() + "text/update", {
                method: "POST",
                headers: getStandardHeader(),
                body: JSON.stringify({
                    typed_index,
                    typer:"Playa"
                })
            })
        } catch(error) {
            console.log("Error updating player progress:", error);
        }

        setTypedText(typedText + remainingText[0]);
        setRemainingText( !!remainingText ? remainingText.substring(1) : []);
        // check for end finishing typing
        if (typed_index + 1 === entire_length) {
            // setWrongLetter("Congratulations you finished typing"); TODO need a congratulatory message 
            setFinishedTyping(true);
            const finalTimeInMilliseconds = new Date() - typingTimestamp;
            setFinalTime( "" + Math.floor(finalTimeInMilliseconds / 1000) + "." + finalTimeInMilliseconds % 1000);
        }
    }

    return (
        <div className='SimpleTypeGame'>
            {/* Before game starts (COMPONETIZE) let player pick a text */}
            {
                !selectedTextId && 
                <div className='SelectText full-size'>
                    {
                        availableTexts.map(text => (
                            <div className='SelectableText'
                                onClick={() => {
                                    // player has chosen this text TODO could add "are you sure"
                                    chooseText(text._id);
                                }}
                            >
                                {/* May want to just show previews and length of entire text so users cant pre-read / type */}
                                <p>{text.entire_text.substring(0, 20)}...</p>
                                <p>This text is {text.entire_text.length} characters long</p>
                            </div>
                        ))
                    }
                </div>
            }
            {
                selectedTextId &&
                <div className='ActiveGame full-size'>
                    {/* Component to display when game begins (need to componetize more) and will dynamically display as many as there
                        are players in a flexbox */}
                    <div className='PlayerColumn'>
                        <div className='WordsToType'
                            style={{ 
                                backgroundColor:"lightblue", border:"1px solid black", borderRadius:"5%", color:'black',
                                width:"80%", margin:"50px", padding:'20px'
                            }}
                        >
                            <h1 style={{textAlign:'center'}}>Type this:</h1>
                            <p>
                                <span style={{color: 'white', backgroundColor:'darkgreen'}}>{typedText}</span>
                                <span style={{color: 'black'}}>{remainingText}</span>
                            </p>
                        </div>
                        <br></br>
                        {/* When finished typing replace input with screen showing time taken to complete and rank ie 1st place, 2nd, etc. */}
                        {
                            finishedTyping ?
                            <div className='FinalResults'>
                                <h2>Final Time: {finalTime} seconds</h2>
                                <h1>You came in: 1st Place!</h1>
                            </div>
                            :
                            <div className='TypeHere'
                                style={{backgroundColor:'black', width:'500px', 
                                    height:'250px', display:'flex', justifyContent:'center', 
                                    alignItems:'center'}}
                            >
                                {
                                    /*
                                        Everytime user presses space reset input field, if they type backspace don't let it do anything
                                        If they type the wrong letter have that letter pop up randomly on the screen for a second
                                    */
                                <input
                                    value={textInput}
                                    style={{fontSize:'x-large', width:"425px", height:'175px', padding:'25px'}}
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
                                >
                                </input>
                                }
                            </div>
                        }
                        <div className='WrongLetters'>
                            {
                                /*
                                wrongLetters.map((letter) => (
                                    <div className='WrongLetter'
                                        style={{color:'red', position:'absolute', width: '30px', height:'30px', 
                                        left: (Math.random() * 900) + "px", top: (Math.random() * 2000) + "px",}}
                                    >
                                        <h1>{letter}</h1>
                                    </div>
                                ))
                                */
                            }
                        </div>
                        <div className='WrongLetter'
                            style={{color:'red', position:'absolute', width: '30px', height:'30px', fontSize:'6rem',
                            left: randomFromLeft , top: randomFromTop,}}            
                        >
                            <h1>{wrongLetter}</h1>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SimpleTypeGame;