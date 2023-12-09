import { useLocation, useNavigate } from 'react-router-dom';
import './NavHeader.scss';
import chat from '../../Assets/Site/chat.svg';
import volumeOn from '../../Assets/Site/volume-on.svg';
import volumeMute from '../../Assets/Site/volume-mute.svg';
import keyboard from '../../Assets/Site/keyboard.svg';
import { useContext, useState } from 'react';
import { BackgroundAudioContext } from '../../App';
import { Button } from 'antd';
import { wipePlayer } from '../../Utils';

// NavHeader
const NavHeader = (props) => {
    
    // useLocation gives information about the current route 
    const location = useLocation();
    // the pathname is everything in the current url following the domain name
    const { pathname } = location; 
    // allows navigating back home
    const navigate = useNavigate();

    const { musicMuted, setMusicMuted, backgroundMusic, setBackgroundMusic } = useContext(BackgroundAudioContext);

    // open modal to warn users before they return home
    const [returnHomeModalIsOpen, setReturnHomeModalIsOpen] = useState(false);

    return (
        <div className='NavHeader'>
            <div className='NavBarButtons'>
                <div className='NavBarButton'>
                    <img src={chat} alt='Chat Icon' />
                </div>
                <div className='NavBarButton'
                    onClick={() => {
                        setMusicMuted(!musicMuted);
                        if (!backgroundMusic) {
                            setBackgroundMusic('home');
                        }
                    }}
                >
                    {
                        musicMuted ?
                        <img src={volumeMute} alt='Volume Muted' />
                        :
                        <img src={volumeOn} alt='Volume On' />
                    }
                </div>
                <div className='NavBarButton'
                    onClick={() => {
                        props.setKeyboardVisible(keyboardVisible => !keyboardVisible);
                    }}
                >
                    <img src={keyboard} alt='keyboard' />
                </div>
            </div>
            {/* Maybe put all player icons in the header... would need to push a context out of player icons or something */}
            <div className='TypeFight'>
                <div  className='Title title-font'
                    onClick={() => {
                        // IF user is on home screen do nothing, otherwise ask them if they want to return home (so they
                        // don't accidentally leave mid session) with a modal and then handle wiping that player if they do
                        if (pathname !== "/") {
                            setReturnHomeModalIsOpen(true);
                        }
                    }}
                >
                    TypeFight
                </div>
            </div>
            <div className='PlayerNavIcon'>

            </div>
            {
                returnHomeModalIsOpen &&
                <div className='ReturnHomeModalHolder'
                    onClick={() => setReturnHomeModalIsOpen(false)}
                >
                    <div className='ReturnHomeModal'>
                        <h1 className='title-font'> Return Home? </h1>
                        <p>This will abandon any game and session you are in.</p>
                        <br />
                        <div className='ReturnHomeButtons'>
                            <Button
                                onClick={ async () => {
                                    // need to navigate, alert the back-end that the player left, 
                                    // and close the modal 
                                    navigate("/");
                                    // Hit wipe endpoints here. Use
                                    // local storage if play screen and games write into it the info needed to 
                                    // wipe a player from a game and session 
                                    wipePlayer();
                                    setReturnHomeModalIsOpen(false);
                                }}
                            >
                                Go Home
                            </Button>
                            <Button
                                type="primary"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NavHeader;