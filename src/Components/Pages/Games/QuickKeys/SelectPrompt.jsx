import { useContext, useEffect, useState } from 'react';
import './SelectPrompt.scss';
import { Button, Select } from 'antd';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// SelectPrompt
// TODO could have settings to toggle: matching uppercase, removing punctuation / numbers,
const SelectPrompt = (props) => {

    const [prompts, setPrompts] = useState([]);
    const [length, setLength] = useState("All");
    const [category, setCategory] = useState("All");

    const {sessionId} = useContext(SessionContext);

    const pullPrompts = async (lengthFilter, categoryFilter) => {
        const result = await fetch(getServerBaseUrl() + "quick-keys/prompts", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                length: lengthFilter === "All" ? "" : lengthFilter,
                category: categoryFilter === "All" ? "" : categoryFilter
            })
        });
        const data = await result.json();
        setPrompts(data);
    }

    useEffect( () => {
        // on Render get ALL Prompts
        const getAllPrompts = async() => {
            const result = await fetch(getServerBaseUrl() + "quick-keys/prompts", {
                method: "POST",
                headers: getStandardHeader(),
            });
            const data = await result.json();
            setPrompts(data);
        }
        getAllPrompts();
    }, []);

    // Picks a prompt when clicked by someone
    const pickThisPrompt = async (prompt) => {
        // post prompt to server
        await fetch(getServerBaseUrl() + "quick-keys/prompt", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                promptId: prompt._id,
                sessionId
            })
        });
    }

    // pick new game
    // set session's selected_game to undefined
    const leaveGame = async () => {
        await fetch(getServerBaseUrl() + "session/leave-game", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
        // delete quick keys game data from database
        await fetch(getServerBaseUrl() + "quick-keys/wipe", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
    }

    return (
        <div className='SelectPrompt'>
            <div className='Filters'>
                <div className='LengthFilter'>
                    <h2>Length</h2>
                    <Select
                        defaultValue="All"
                        options={[
                            {value: 'All', label: 'All'},
                            {value: 'Tweet', label: 'Tweet'},
                            {value: 'Paragraph', label: 'Paragraph'},
                            {value: 'Short Story', label: 'Short Story'},
                        ]}
                        onChange={(newValue) => {
                            setLength(newValue);
                            pullPrompts(newValue, category);
                        }}
                        style={{width: '200px'}}
                    />
                </div>
                <div className='CategoryFilter'>
                    <h2>Category</h2>
                    <Select
                        defaultValue="All"
                        options={[
                            {value: 'All', label: 'All'},
                            {value: 'History', label: 'History'},
                            {value: 'Funny', label: 'Funny'},
                            {value: 'Sci-Fi', label: 'Sci-Fi'},
                        ]}
                        onChange={(newValue) => {
                            setCategory(newValue);
                            pullPrompts(length, newValue);
                        }}
                        style={{width: '200px'}}
                    />
                </div>
                <div className='LeaveButton'>
                    <Button onClick={leaveGame}>
                        Leave Game
                    </Button>
                </div>
            </div>
            <div className='Prompts'>
                {
                    // todo could set background color based on length or category
                    prompts.map(prompt => (
                        <div className='PromptCard'
                            key={prompt.title}
                            onClick={() => {pickThisPrompt(prompt)}}
                        >
                            <h2>{prompt.title}</h2>
                            <h3>{prompt.category} by {prompt.author ? prompt.author : "Unknown"}</h3>
                            <h3>{prompt.prompt.length} Characters</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectPrompt;