// import Gameplay from '../../Games/SpacebarInvaders/Gameplay';
// import Minigame from '../../Games/Minigames/Minigame';
// import Textplosion from '../../Games/Textplosion/Textplosion';
// import Minigame from '../../Games/Minigames/Minigame';
import TypeFlight from '../../Games/TypeFlight/TypeFlight';
import './Playground.scss';

// Playground
// have error letters pop up at all or have them grow until you get the right one, or maybe be permanent? but partly translucent etc. 
const Playground = (props) => {

    return (
        <div className='Playground'>
            {/* <div className='MinigameBox'>
                <Minigame />
            </div> */}
            <TypeFlight />
        </div>
    )
}

export default Playground;