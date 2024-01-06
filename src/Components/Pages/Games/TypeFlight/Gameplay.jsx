import './Gameplay.scss';
// import checkerboard from '../../../../Assets/Games/TypeFlight/diagonal-checkerboard.png';
import bomb from '../../../../Assets/Games/TypeFlight/bomb.svg';
import gravestone from '../../../../Assets/Games/TypeFlight/gravestone.png';
import allIcons from '../../../../Utils';

// Gameplay
const Gameplay = (props) => {

    return (
        <div className='TypeFlightGameplay'>
            {
                // create empty array the size of the grid and iterate through it to fill each grid-item
                props?.gameArray.map((val, index) => (
                    <div  className='Tile' key={index}>
                        
                        {/* 
                        
                        THIS May be the way to go for events, or even setting the background image of a tile
                        like backgroundColor: 'rgba(0, 0, 0, 0.5)' but I think icons are better than backgrounds
                        could grab event-tile by number and id and change src and display to block
                        
                        <img 
                            id={'typeflight-tile-number-' + index}
                            className='TileIcon' 
                            src={checkerboard} 
                            alt='tile background' 
                            style={{opacity: '20%'}} 
                        /> */}
                        <img id={'event-tile-number-' + index} style={{display: 'none'}} 
                            className='TileIcon EventTile' src={bomb} alt='event' />
                        {
                            val?.deadPlayer &&
                            <div className='PlayerIconHolder TileIcon'>
                                <img className='GraveStone TileIcon' src={gravestone} alt='Grave Stone' />
                            </div>
                        }
                        {
                            val?.event && 
                            <img className='TileIcon EventTile' src={bomb} alt='event' />
                        }
                        {
                            // place user's matching player in position instead of any other player if they are there
                            index === props?.playerPosition && props?.matchingPlayer?.isAlive &&
                            <div className='PlayerIconHolder TileIcon'>
                                <img 
                                    style={{backgroundColor: props.matchingPlayer?.color,
                                        // could make a useEffect that sets a state variable in case they change their screen size
                                        // but that is overkill for now
                                        width: (window.innerWidth - 200) > window.innerHeight ? 'auto' : 'calc(100% - 13px)',
                                        height: (window.innerWidth - 200) > window.innerHeight ? 'calc(100% - 13px)' : 'auto',
                                        zIndex: val?.player?.onTop ? 3 : 2
                                    }} 
                                    src={allIcons.find(icon => icon.title === props.matchingPlayer?.icon).src} 
                                    alt="Player Icon" 
                                    className='PlayerIcon'
                                />
                            </div>
                        }
                        {
                            index !== props?.playerPosition && val?.player &&
                            <div className='PlayerIconHolder TileIcon'>
                                <img 
                                    style={{backgroundColor: val.player.color,
                                        // could make a useEffect that sets a state variable in case they change their screen size
                                        // but that is overkill for now
                                        width: (window.innerWidth - 200) > window.innerHeight ? 'auto' : 'calc(100% - 13px)',
                                        height: (window.innerWidth - 200) > window.innerHeight ? 'calc(100% - 13px)' : 'auto',
                                        zIndex: val?.player?.onTop ? 3 : 2
                                    }} 
                                    src={allIcons.find(icon => icon.title === val.player.icon).src} 
                                    alt="Player Icon" 
                                    className='PlayerIcon'
                                />
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Gameplay;