import './ProfileContainer.scss';

// ProfileContainer gives a view of a user profile, identifies a player on the screen
const ProfileContainer = (props) => {

    // displays the 4 identifying attributes of a player: 
    // alias
    // icon
    // font (may not display to other players but maybe I will put their name in that font)
    // color - could surround icon and entire container may have low opacity hint of this color potentially

    return (
        <div className='ProfileContainer'>
            <div className='PlayerIcon'>
                <h1 className='TempFakeIcon'>:P</h1>
            </div>
            <p className='PlayerName'>
                {props.alias ? props.alias : "Your_Codename_Here"} 
            </p>
        </div>
    )
}

export default ProfileContainer;