import { Button } from 'antd';
import './ProfileContainer.scss';
import { useEffect, useState } from 'react';
import allIcons from '../../Utils';
import useSound from 'use-sound';
import ding from '../../Assets/Sounds/Effects/quick-ding.mp3';
const hexToRgb = require('hex-to-rgb');

// ProfileContainer gives a view of a user profile, identifies a player on the screen
const ProfileContainer = (props) => {


    // displays the 4 identifying attributes of a player: 
    // alias
    // icon 
    // font (may not display to other players but maybe I will put their name in that font)
    // color - could surround icon and entire container may have low opacity hint of this color potentially

    const [fadedBackgroundColor, setFadedBackgroundColor] = useState('rgb(255, 255, 255, 0.20)');

    // make a ding when icon clicked
    const [playDing] = useSound(ding);

    useEffect(() => {
        const getFadedBackgroundColor = () => {
            const rgb = hexToRgb(props.color);
            return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.25)`;
        }

        setFadedBackgroundColor(getFadedBackgroundColor());
    }, [props.color, setFadedBackgroundColor]);

    // todo make it so that when profile icons are clicked tiny icons are emitted or something

    return (
        <div className='ProfileContainer' style={{fontFamily: ('\'' + props.font + '\'')}} >
            <div className='ExtraColor' style={{backgroundColor: fadedBackgroundColor}}>
                <div className='Content'>
                    <Button className='IconButton' style={{backgroundColor: props.color}}
                        onClick={playDing}
                    >
                        <img src={allIcons.find(icon => icon.title === props.icon).src} alt={props.icon} className='IconImage' />
                    </Button>
                    <p className='PlayerName'>
                        {props.alias ? props.alias : "Your_Name_Here"} 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileContainer;