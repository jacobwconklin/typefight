import { useState } from 'react';
import './PickAttributes.scss';
import ProfileContainer from '../../Reusable/ProfileContainer';
import allIcons from '../../../Utils';
import { Button, Input, ColorPicker, Dropdown } from 'antd';

// PickAttributes presents reusable component to allow user to pick their alias, 
// icon, font, and color for hosts, joining players, and solo players.
const PickAttributes = (props) => {

    // TODO could immediately send player name up to header as they type it might be cool
    // would entail putting the name into context, but that is worth doing as name, playerId, and sessionId can
    // all go into that context
    const [alias, setAlias] = useState("");
    const [font, setFont] = useState("Calibri");
    const [icon, setIcon] = useState(allIcons[Math.floor(Math.random(0) * allIcons.length)]); // maybe start with a random icon?
    const [color, setColor] = useState("#FFFFFF");

    const availableFonts = [
        { key: 0, label: 'Calibri'},
        { key: 1, label: 'Times New Roman'},
        { key: 2, label: 'Roboto'},
        { key: 3, label: 'Comic sans'},
        { key: 4, label: 'Comic sans'},
        { key: 5, label: 'Comic sans'},
        { key: 6, label: 'Comic sans'},
        { key: 7, label: 'Comic sans'},
        { key: 8, label: 'Comic sans'},
        { key: 9, label: 'Comic sans'},
        { key: 10, label: 'Comic sans'}, ];

    const selectFont = ({ key }) => {
        updateFont(availableFonts[key].label);
    }

    // setters that also pass the information up to NewPlayer parent
    const updateAlias = (newAlias) => {
        props.savePlayer({alias: newAlias, color, font, icon: icon.title});
        setAlias(newAlias);
    }

    const updateColor = (newColor) => {
        props.savePlayer({alias, color: newColor, font, icon: icon.title});
        setColor(newColor);
    }

    const updateFont = (newFont) => {
        props.savePlayer({alias, color, font: newFont, icon: icon.title});
        setFont(newFont);
    }

    const updateIcon = (newIcon) => {
        props.savePlayer({alias, color, font, icon: newIcon.title});
        setIcon(newIcon);
    }

    return (
        <div className='PickAttributes'>
            <ProfileContainer alias={alias} color={color} font={font} icon={icon.title} />
            <div className='AliasColorAndFont'>
                <div className='Alias'>
                    <h1>Enter Your Alias</h1>
                    <Input
                        className='AliasInput'
                        type="text"
                        maxLength={20}
                        onChange={e => {
                                e.preventDefault();
                                // TODO replace spaces with _ ? Makes wrapping words uglier
                                updateAlias(e.target.value); // .replace(/ /g,"_"));
                            }}
                        placeholder='Funny Name Here'
                    />
                </div>
                <div className='Color'>
                    <h1>Pick A Color</h1>
                    <ColorPicker size="medium" showText trigger="hover" disabledAlpha defaultValue={'#FFFFFF'}
                        onChange={(value, hex) => {
                             updateColor(hex);
                        }}
                    />
                </div>
                <div className='Font'>
                    <h1>Select Your Font</h1>
                    <Dropdown menu={{ items:availableFonts, onClick:selectFont }} placement='bottomLeft' className='FontDropdown'>
                        <Button>{font}</Button>
                    </Dropdown>
                </div>
            </div>
            <br></br>
            <div className='Icons'>
                <h1>Choose Your Icon</h1>
                <div className='IconBox'>
                    {
                        allIcons.map(icon => (
                            <Button className='IconButton' variant="light" key={icon.title} onClick={() => {updateIcon(icon)}}>
                                <img className='IconImage' src={icon.src} alt={icon.title + ' icon'} />
                            </Button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PickAttributes;