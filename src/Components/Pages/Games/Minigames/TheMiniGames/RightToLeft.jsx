import { Input } from "antd";
import { generate } from "random-words";
import { useState } from "react";
import './RightToLeft.scss';

// A Minigame where players have to type words from right to left (Maybe with the word's letters backwards too?)
const RightToLeft = (props) => {

    // Todo should have re-usable timer, on timer complete can return false but for now only can return true to parent component

    const [selectedWords, setSelectedWords] = useState(generate(10));
    const [typedWord, setTypedWord] = useState("");

    return (
        <div className='RightToLeft'>
            <h1>Type from Right to Left</h1>
            <div className='reversedWords'>
                {
                    // Reverse words so they appear backwards
                    selectedWords.map( (word, index) => (
                        <div className="WordAndArrow" key={word}>  
                            <h3 id={word + '-right-to-left'} 
                                style={{ borderBottom: index === selectedWords.length - 1 ? '4px solid green' : 'none'}}
                            >
                                {word.split('').reverse().join('')}
                            </h3>
                            {
                                index === selectedWords.length - 1 &&
                                <h2 className="DirectionArrow">&larr;</h2>
                            }
                        </div>
                    ))
                }
            </div>
            {
                selectedWords.length === 0 && 
                <h1>Well Done!</h1>
            }
            <div className='inputHolder'>
                <Input 
                    className='inputBox'
                    placeholder='Type Here'
                    value={typedWord}
                    onKeyDown={(key) => {if (key.code === 'Enter') setTypedWord('')}}
                    onChange={e => {
                        const cleanedTypedWord = e.target.value.toLowerCase().trim();
                        // Only check if user typed the "Last" word forcing them to do the words in 
                        // reverse order
                        if ( selectedWords[selectedWords.length - 1] === // .split('').reverse().join('') ===
                            cleanedTypedWord ) {
                            if (selectedWords.length === 1) {
                                props.completeMinigame(true);
                            }
                            const selectedWordsCopy = selectedWords;
                            selectedWordsCopy.pop();
                            setSelectedWords(selectedWordsCopy);
                            setTypedWord('');
                        } else {
                            setTypedWord(e.target.value);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default RightToLeft;