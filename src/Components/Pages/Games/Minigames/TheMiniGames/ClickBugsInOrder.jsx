// In this minigame have a bunch of bugs "flying" around the screen with numbers spelled out
// the bugs have to be clicked in order by their numbers to eliminate them all
import beetle from '../../../../../Assets/Minigames/ClickBugsInOrder/beetle.svg';
import bee from '../../../../../Assets/Minigames/ClickBugsInOrder/honeybee.svg';
import worm from '../../../../../Assets/Minigames/ClickBugsInOrder/worm.svg';
import ladyBug from '../../../../../Assets/Minigames/ClickBugsInOrder/lady-bug.svg';

import './ClickBugsInOrder.scss';
import { useState } from 'react';

// ClickBugsInOrder
const ClickBugsInOrder = (props) => {

    // TODO handle moving the bugs about, maybe just in css with an animation so they 
    // bounce around in a pattern

    // Array of bugs still in play used to check to make sure bugs are clicked in order
    const [bugs, setBugs] = useState([
        {bug: "beetle"},
        {bug: "bee"},
        {bug: "worm"},
        {bug: "ladyBug"}
        // {bug: beetle, num: 0},
        // {bug: bee, num: 1},
        // {bug: worm, num: 2},
        // {bug: ladyBug, num: 3}
    ]); 

    // I am wary of mapping the bugs as updating the array may ruin all of the other bugs locations unless I just set bugs to 
    // display none rather than removing them from the array... 
    return (
        <div className='ClickBugsInOrder absolute-full'>
            {
                bugs.length === 0 ?
                <div className='completedMessage'>
                    <h1>Nice Job</h1>
                </div>
                :
                <p style={{textAlign: 'center', marginTop: '50px', pointerEvents: 'none'}}>Click on the bugs in order!</p>
            }
            <div className='BugHolder Beetle' id='beetle-bug-holder'
                onClick={() => {
                    // check if at front of array ONLY THEN can it be removed
                    if (bugs[0].bug === "beetle") {
                        setBugs(bugs.slice(1));
                        document.getElementById('beetle-bug-holder').style.display = 'none';
                    }
                }}
            >
                <img className='BugImage' src={beetle} alt='beetle'  />
                <h3>One</h3>
            </div>
            <div className='BugHolder Bee' id='bee-bug-holder'
                onClick={() => {
                    // check if at front of array ONLY THEN can it be removed
                    if (bugs[0].bug === "bee") {
                        setBugs(bugs.slice(1));
                        document.getElementById('bee-bug-holder').style.display = 'none';
                    }
                }}
            >
                <img className='BugImage' src={bee} alt='bee'  />
                <h3>Two</h3>
            </div>
            <div className='BugHolder Worm' id='worm-bug-holder'
                onClick={() => {
                    // check if at front of array ONLY THEN can it be removed
                    if (bugs[0].bug === "worm") {
                        setBugs(bugs.slice(1));
                        document.getElementById('worm-bug-holder').style.display = 'none';
                    }
                }}
            >
                <img className='BugImage' src={worm} alt='worm'  />
                <h3>Three</h3>
            </div>
            <div className='BugHolder LadyBug' id='ladybug-bug-holder'
                onClick={() => {
                    // check if at front of array ONLY THEN can it be removed
                    if (bugs[0].bug === "ladyBug") {
                        // game is completed successfully report it up
                        props.completeMinigame(true);
                        setBugs([]);
                        document.getElementById('ladybug-bug-holder').style.display = 'none';
                    }
                }}
            >
                <img className='BugImage' src={ladyBug} alt='lady bug'  />
                <h3>Four</h3>
            </div>
        </div>
    )
}

export default ClickBugsInOrder;