import { Link } from 'react-router-dom';
import './NavHeader.scss';
import chat from '../../Assets/Site/chat.svg';
import volumeOn from '../../Assets/Site/volume-on.svg';
import volumeMute from '../../Assets/Site/volume-mute.svg';
import keyboard from '../../Assets/Site/keyboard.svg';
import { useContext } from 'react';
import { BackgroundAudioContext } from '../../App';

// NavHeader
const NavHeader = (props) => {

    const { musicMuted, setMusicMuted, backgroundMusic, setBackgroundMusic } = useContext(BackgroundAudioContext);

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
                <Link to={"/"} className='Title title-font'>TypeFight</Link>
            </div>
            <div className='PlayerNavIcon'>

            </div>
        </div>
    )
}

export default NavHeader;