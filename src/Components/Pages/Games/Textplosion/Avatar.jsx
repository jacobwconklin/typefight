import { Button } from 'antd';
import './Avatar.scss';
import allIcons from '../../../../Utils';
import hotSeat from '../../../../Assets/Games/Textplosion/black-chair.svg';
import airPump from '../../../../Assets/Games/Textplosion/air-pump.svg';
import skull from '../../../../Assets/Games/Textplosion/skull-and-crossbones.svg';

// Avatar for each player in the Textplosion game 
const Avatar = (props) => {

    // props.player should hold all information about the player
    // if props.player.blownUp, the player should show up as a ghost

    // can differentiate / add icons (ie pump, or hot seat) based on props.player.blownUp and props.player.position
    // TODO ideally would create pixel art gifs for this of characters pumping

    return (
        <div className='Avatar' >
            {
                // If player is dead they stay to the right and just keep pumping as a ghost
                props.player.blownUp ?
                <div className='GhostPlayer'>
                    <div className='PlayerName' 
                        style={{fontFamily: ('\'' + props.player.font + '\''), 
                            color: 'white',
                        }} 
                    >
                        {props.player.alias} 
                    </div>
                    <img src={skull} alt={'skull'} className='Skull' />
                    {/* <Button className='IconButton' style={{backgroundColor: 'white'}}>
                        <img src={skull} alt={'skull'} className='Skull' />
                    </Button> */}
                    <img className='AirPump' src={airPump} alt='air pump' />
                </div>
                :
                (
                    // else check if player is in hot-seat or not
                    props.player.position === 0 ?
                    <div className='HotSeatPlayer'>
                        <div className='PlayerName' 
                            style={{fontFamily: ('\'' + props.player.font + '\''), 
                                color: 'black',
                            }} 
                        >
                            {props.player.alias} 
                        </div>
                        <img className='HotSeat' src={hotSeat} alt='chair' />
                        <Button className='IconButton' style={{backgroundColor: props.player.color}}>
                            <img src={allIcons.find(icon => icon.title === props.player.icon).src} alt={props.player.icon} className='IconImage' />
                        </Button>
                    </div>
                    :
                    <div className='PumpingPlayer'>
                        <div className='PlayerName' 
                            style={{fontFamily: ('\'' + props.player.font + '\''), 
                                color: 'black',
                            }} 
                        >
                            {props.player.alias} 
                        </div>
                        <Button className='IconButton' style={{backgroundColor: props.player.color}}>
                            <img src={allIcons.find(icon => icon.title === props.player.icon).src} alt={props.player.icon} className='IconImage' />
                        </Button>
                        <img className='AirPump' src={airPump} alt='air pump' />
                    </div>
                )
            }
        </div>
    )
}

export default Avatar;