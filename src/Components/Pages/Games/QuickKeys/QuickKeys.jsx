import { useContext, useEffect, useState } from 'react';
import './QuickKeys.scss';
import SelectPrompt from './SelectPrompt';
import GameResults from './GameResults';
import Gameplay from './Gameplay';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';
import { SessionContext } from '../../PlayScreen/PlayScreen';

// Runs QuickKeys game showing the necessary screens for as long as Quick Keys is the selected
// game. 
const QuickKeys = (props) => {

    // begin pulling quick-keys status for info on game, and for showing screen 
    const [gameStatus, setGameStatus] = useState({});
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const { sessionId, playerId } = useContext(SessionContext);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(async () => {
            try { 
                // fetch session status from backend IF sessionId and playerId exist
                if (playerId && sessionId) {
                    const result = await fetch(getServerBaseUrl() + "quick-keys/status", {
                        method: "POST",
                        headers: getStandardHeader(),
                        body: JSON.stringify({
                            sessionId
                        })
                    });
                    const data = await result.json();
                    setGameStatus(data);
                    // determine if game is over (if all players have 'time' value)
                    let finishedCount = 0;
                    if (data.results) {
                        data.results.forEach(result => {
                            // count each player that has finished
                            if (result.time) finishedCount++;
                        })
                        setGameCompleted(data.results.length === finishedCount);
                    }
                    if (data) {
                        // data.prompt will be the actual String of the prompt or null if selecting a new prompt.
                        setSelectedPrompt(data.prompt);
                    }

                }
            } catch (error) {
                console.log("Error fetching quick keys game status", error);
            }
        }, 1000); // TODO will need to tweak this it should run way more often than once per second but we will start slower
  
        //Clearing the interval
        return () => {
            clearInterval(interval);
        }
    }, [gameStatus, sessionId, playerId]);

    return (
        <div className='QuickKeys full-screen'>
            {
                selectedPrompt ?
                (
                        gameCompleted ? 
                        <GameResults results={gameStatus && gameStatus.results ? gameStatus.results : null}/>
                        :
                        <Gameplay prompt={selectedPrompt} progress={gameStatus && gameStatus.results ? gameStatus.results : null} />
                )
                :
                <SelectPrompt/>
            }
        </div>
    )
}

export default QuickKeys;