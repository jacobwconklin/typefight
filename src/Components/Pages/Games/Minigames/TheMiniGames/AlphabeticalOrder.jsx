import { Input } from "antd";
import { generate } from "random-words";
import { useState } from "react";
import './AlphabeticalOrder.scss';

// A Minigame where players have find then type the words in Alphabetical Order
const AlphabeticalOrder = (props) => {

    // Todo should have re-usable timer, on timer complete can return false but for now only can return true to parent component

    const [selectedWords, setSelectedWords] = useState(generate(8));
    const [typedWord, setTypedWord] = useState("");

    return (
        <div className='AlphabeticalOrder'>
            <h1>Find and Type the Words in Alphabetical Order</h1>
            <div className='RandomWords'>
                {
                    // Reverse words so they appear backwards
                    selectedWords.map( (word) => (
                        <div className="WordAndArrow" key={word}>  
                            <h3 id={word + '-alphabetical-order'} >
                                {word}
                            </h3>
                        </div>
                    ))
                }
            </div>
            {
                selectedWords.length === 0 && 
                <h1>Way to Go!</h1>
            }
            <div className='inputHolder'>
                <Input 
                    className='inputBox'
                    placeholder='Type Here'
                    value={typedWord}
                    onKeyDown={(key) => {if (key.code === 'Enter') setTypedWord('')}}
                    onChange={e => {
                        const cleanedTypedWord = e.target.value.toLowerCase().trim();
                        // Only check if user typed the first word in alphabetical order, then make sure to remove only
                        // that word from the selectedWords array
                        if ( [...selectedWords].sort()[0] === 
                            cleanedTypedWord ) {
                            if (selectedWords.length === 1) {
                                props.completeMinigame(true);
                            }
                            const selectedWordsCopy = selectedWords;
                            selectedWordsCopy.splice(selectedWordsCopy.findIndex(selectedWord => selectedWord === cleanedTypedWord), 1);
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

export default AlphabeticalOrder;