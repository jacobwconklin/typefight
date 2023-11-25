import { Button } from 'antd';
import './Avatar.scss';
import allIcons from '../../../../Utils';

// Avatar for each player in the Textplosion game 
const Avatar = (props) => {

    // props.player should hold all information about the player
    // if props.player.blownUp, the player should show up as a ghost
    console.log(props);

    // can differentiate / add icons (ie pump, or hot seat) based on props.player.blownUp and props.player.position
    // TODO ideally would create pixel art gifs for this of characters pumping

    return (
        <div className='Avatar' style={{border: (props.player.blownUp ? '2px solid black' : (props.player.position === 0 ? '1px solid red' : 'none')), 
            backgroundColor: props.player.blownUp ? 'black' : 'white',
        }}>
            <p className='PlayerName' style={{fontFamily: ('\'' + props.player.font + '\''), 
                color: props.player.blownUp ? 'white' : 'black',
            }} >
            {props.player.alias} 
            </p>
            <Button className='IconButton' style={{backgroundColor: props.player.color}}>
                <img src={allIcons.find(icon => icon.title === props.player.icon).src} alt={props.player.icon} className='IconImage' />
            </Button>
        </div>
    )
}

export default Avatar;