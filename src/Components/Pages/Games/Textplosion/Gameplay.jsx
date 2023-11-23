import './Gameplay.scss';

// Gameplay
const Gameplay = (props) => {

    // hold logic to open and close modal in Textplosion.jsx

    // Need to show balloon, person in hot seat, and all other players listed as alive in order of position, and
    // then dead. 
    return (
        <div className='Gameplay'>
            <div className='balloonAndPlayers'>
                <div>
                    <div className='balloon'></div>
                </div>
                <div className='hotSeat'>

                </div>
                {
                    // all other players pumping
                    // map here
                }
                <div className='pumper'>

                </div>
                <div className='pumper'>

                </div>
                
                <div className='pumper dead'>

                </div>
            </div>
        </div>
    )
}

export default Gameplay;