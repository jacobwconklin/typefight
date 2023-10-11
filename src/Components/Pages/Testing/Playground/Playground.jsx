import Gameplay from '../../Games/SpacebarInvaders/Gameplay';
import './Playground.scss';

// Playground
// have error letters pop up at all or have them grow until you get the right one, or maybe be permanent? but partly translucent etc. 
const Playground = (props) => {
    

    return (
        <div className='Playground'>
            <Gameplay></Gameplay>
        </div>
    )
}

export default Playground;