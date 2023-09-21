import { useState } from 'react';
import './Playground.scss';
import { sanitizeString } from '../../../Utils';

// Playground

// TODO could have lots of settings to toggle: fonts, color, matching uppercase, removing punctuation / numbers,
// have error letters pop up at all or have them grow until you get the right one, or maybe be permanent? but partly translucent etc. 
const Playground = (props) => {

    const [typedText, setTypedText] = useState(`typed so far: `);
    const [sampleText, setSampleText] = useState(sanitizeString(`To 
    
    
    the 
      red country and part of the gray 
    country of Oklahoma, the last rains 
    came gently, and they did not cut 
the scarred earth. The plows crossed 
and recrossed the rivulet marks. The last rains lifted the corn quickly and
scattered weed colonies and grass along the sides of the roads so that the gray country and the dark red country
began to disappear under a green cover. In the last part of May the sky grew pale and the clouds that had hung in
high puffs for so long in the spring were dissipated. The sun flared down on the growing corn day after day until a
line of brown spread along the edge of each green bayonet. The clouds appeared, and went away, and in a while
they did not try any more. The weeds grew darker green to protect themselves, and they did not spread any more.
The surface of the earth crusted, a thin hard crust, and as the sky became pale, so the earth became pale, pink in the
red country and white in the gray country.`));
    const [textInput, setTextInput] = useState("");

    const [wrongLetter, setWrongLetter] = useState("");
    const [randomFromTop, setRandomFromTop] = useState("0px");
    const [randomFromLeft, setRandomFromLeft] = useState("0px");

    // when an incorrect letter is typed LET THE USER KNOW!
    const typedWrongLetter = (letterTyped) => {
        console.log(wrongLetter);
        // let newWrongLetters = wrongLetters;
        // newWrongLetters[newWrongLetters.length] = letterTyped
        setRandomFromTop((Math.random() * 500) + "px");
        setRandomFromLeft((Math.random() * 1500) + "px");
        setWrongLetter(letterTyped);
        //setTimeout(() => {
            // if it's the only wrong letter go back to empty array or else copy the array from the second characer onward
            // setWrongLetters(wrongLetters.length > 0 ? wrongLetters.slice(1) : []);
            
        //}, 500);
    }

    return (
        <div className='Playground'>
            <div className='WordsToType'
                style={{ 
                    backgroundColor:"lightblue", border:"1px solid black", borderRadius:"5%", color:'black',
                    width:"80%", margin:"50px", padding:'20px'
                }}
            >
                <h1 style={{textAlign:'center'}}>Type this:</h1>
                <p>
                    <span style={{color: 'white', backgroundColor:'darkgreen'}}>{typedText}</span>
                    <span style={{color: 'black'}}>{sampleText}</span>
                </p>
            </div>
            <br></br>
            <div className='TypeHere'
                style={{backgroundColor:'black', width:'500px', height:'250px', display:'flex', justifyContent:'center', alignItems:'center'}}
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
                        console.log(e);
                        console.log(e.key);
                        const key = e.key;
                        // determine between space, correct letter, wrong letter, and backspace
                        if (key === sampleText[0] || (key === " " && (sampleText[0] === '\n' || sampleText[0] === '\t'))) {
                            console.log("Got the right letter")
                            setWrongLetter("");
                            setTypedText(typedText + sampleText[0]);
                            console.log(sampleText.charCodeAt(0));
                            setSampleText( !!sampleText ? sampleText.substring(1) : []);
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
    )
}

export default Playground;