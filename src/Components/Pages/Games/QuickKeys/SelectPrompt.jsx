import { useContext, useEffect, useState } from 'react';
import './SelectPrompt.scss';
import { Select } from 'antd';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// SelectPrompt
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
        console.log(data); 
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
            console.log(data); 
            setPrompts(data);
        }
        getAllPrompts();
    }, []);

    // Picks a prompt when clicked by someone
    const pickThisPrompt = async (prompt) => {
        // post prompt to server
        const result = await fetch(getServerBaseUrl() + "quick-keys/prompt", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                promptId: prompt._id,
                sessionId
            })
        });
        const data = await result.json();
        console.log(data); 
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
                            {value: 'Novel', label: 'Novel'},
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
            </div>
            <div className='Prompts'>
                {
                    // todo could set background color based on length or category
                    prompts.map(prompt => (
                        <div className='PromptCard'
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