// Minigame window to be deployed in Modal for players to play a minigame. can return stats about
// the game such as if the user succeeds, fails, how long they took, etc. Grabs a random minigame
// out of all of the ones created inspired by Wario Ware. 
// TODO should have ordering of minigames so they don't repeat (but still want them to be random) 
// so maybe have two arrays: played and not played games and when played gets empty put all of the
// played games back and shuffle them. 
import './Minigame.scss';
import ClickBugsInOrder from './TheMiniGames/ClickBugsInOrder';
import WordNotColor from './TheMiniGames/WordNotColor';

// Minigame
const Minigame = (props) => {

    // when a minigame is completed either true is returned (for success) or false 
    // is returned (for failure / timeout). 
    const completeMinigame = (succeeded) => {
        // TODO if succeeded DONE with minigame (unless multiple are required) 
        // if failed may need to repeat that or just report it to the parent, should have
        // setting for if minigame is played UNTIL success or not
        console.log("Minigame completed succesfully?: ", succeeded);
        // IF the parent wants the result pass it up
        if (props.completeMinigame) {
            props.completeMinigame(succeeded);
        }

        // this will cause additional minigames to be played until one is successful if chosen by the parent
        // TODO will be more relevant with timed minigames
        if (!succeeded && props.loopUntilSuccess) {
            // TODO will need a useEffect to set the selected minigame into state so that it can be changed here
            // and updated reactively. 
        }
    }


    const allMinigames = [
        <WordNotColor completeMinigame={completeMinigame} />,
        <ClickBugsInOrder completeMinigame={completeMinigame} />
    ]

    // grab random minigame from list
    const getOneMinigame = () => {
        return allMinigames[~~(Math.random() * allMinigames.length)];
    }

    return (
        <div className='Minigame full-size'>
            {
                getOneMinigame()
            }
        </div>
    )
}

export default Minigame;