import './TypeFlight.scss';

// TypeFlight game where users type words corresponding to a direction (either up, left, right, or down) to run around a 10 x 10 grid
// avoiding deadly events, like bombs, lasers, etc. One example of how one specific event could occur would be a warning first appears
// on a specific tile, then after a delay (maybe 3 seconds) that tile and the 9 tiles around it are "blown up" and any player on any of
// them loses. Other players that move to where a friend died could type out a long phrase to re-vive that player and help each other 
// continue. Other events may destory all of the tiles in a row or column or diagonal, or other shapes or individual tiles.
// "warnings" will just be icons displayed before the impacts with specific colors to indicate the coming threat. Users have to 
// divide time between the words they need to type and the grid. Events come increasingly quickly and player revive phrases get 
// longer until no players are left. A timer running through the duration is the score in this cooperative effort. 
const TypeFlight = (props) => {

    return (
        <div className='TypeFlight'>
            
        </div>
    )
}

export default TypeFlight;