import { useState } from 'react';
import './PickAttributes.scss';
import ProfileContainer from '../../Reusable/ProfileContainer';

// PickAttributes presents reusable component to allow user to pick their alias, 
// icon, font, and color for hosts, joining players, and solo players.
const PickAttributes = (props) => {

    // TODO could immediately send player name up to header as they type it might be cool
    // would entail putting the name into context, but that is worth doing as name, playerId, and sessionId can
    // all go into that context
    const [alias, setAlias] = useState("");

    return (
        <div className='PickAttributes'>
            <ProfileContainer alias={alias} />
            <div className='Alias'>
                <h1>Enter Your Alias:</h1>
                <input
                    className='AliasInput'
                    type="text"
                    onChange={e => {
                            e.preventDefault();
                            // TODO replace spaces with _
                            setAlias(e.target.value);
                        }}
                    placeholder='Funny Name Here'
                />
            </div>
            <div className='Icon'>
                <p>Pick an icon</p>
            </div>
            <div className='Color'>
                <p>Pick a color</p>
            </div>
            <div className='Icon'>
                <p>Pick a font</p>
            </div>
        </div>
    )
}

export default PickAttributes;