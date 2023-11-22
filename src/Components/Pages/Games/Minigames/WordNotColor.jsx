// minigame where multiple colors appear as text but with random coloration that doesn't match the color
// in the text. The user has to type the color as written in text not the actual color of the text, so if
// the word blue appears but the letters are the color red, the user must type blue.
import { Input } from 'antd';
import './WordNotColor.scss';
import { useEffect, useState } from 'react';

// WordNotColor
const WordNotColor = (props) => {

    // Todo should have re-usable timer, on timer complete can return false but for now only can return true to parent component

    // useEffect to select the colors on mount
    const [selectedWords, setSelectedWords] = useState([]);
    const [typedWords, setTypedWords] = useState([]);
    const [typedWord, setTypedWord] = useState("");

    useEffect(() => {
        const colorWords = [
            "red", "orange", "yellow", "green", "blue", 
            "indigo", "violet", "purple", "pink", 
            "brown", "black", "white", "gray", 
            "silver", "gold", "maroon", "navy", 
            "cyan", "magenta", "olive", "teal", 
            "peach", "lavender", "turquoise", "beige", 
            "coral", "mint", "charcoal", "salmon", "azure", 
            "rose", "orchid", "amber", "jade", "ruby", 
            "emerald", "sapphire", "pearl", "topaz", "copper", 
            "bronze", "brass", "plum", "lilac", "aqua", 
            "ivory", "champagne", "mauve", "burgundy"
        ];

        setSelectedWords(colorWords.sort(() => Math.random() - 0.5).slice(0, 5));
        // should set colors here so that they don't keep changing

    }, [setSelectedWords]);

    return (
        <div className='WordNotColor'>
            <h1>Type the following words as they are spelled not by their coloring:</h1>
            <div className='colorWords'>
                {
                    // shuffle array of word colors and "grab" a few with splice 
                    // todo set background to be dark if color is to light or only select "dark" 
                    // enough colors. 
                    selectedWords.filter(word => !typedWords.includes(word)).map(colorWord => (
                        <h3 key={colorWord} 
                            style={{ color: `rgb(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200})` }} >
                            {colorWord}
                        </h3>
                    ))
                }
            </div>
            <div className='inputHolder'>
                <Input 
                    className='inputBox'
                    placeholder='Type Here'
                    value={typedWord}
                    onChange={e => {
                        if ( !typedWords.includes(e.target.value.toLowerCase().trim()) && 
                            selectedWords.includes(e.target.value.toLowerCase().trim())) {
                            // put it into typed words and reset typed word to blank
                            const typedWordsCopy = typedWords;
                            typedWordsCopy.push(e.target.value.toLowerCase().trim());
                            if (typedWordsCopy.length === selectedWords.length) {
                                props.completeMinigame(true);
                            }
                            setTypedWords(typedWordsCopy);
                            
                            setTypedWord("");
                        } else {
                            setTypedWord(e.target.value);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default WordNotColor;