import { useNavigate } from 'react-router-dom';
import './Home.scss';
// import { useContext, useEffect } from 'react';
// import { BackgroundAudioContext } from '../../../App';

// Home. Let user's select between hosting a game, joining a game, and playing solo offline
// also maybe have some fun animations across the bottom of the screen
const Home = (props) => {

    const navigate = useNavigate();

    // set color of (logo for now) scrolling text dynamically based on what user hovers over
    var r = document.querySelector(':root');

    // const { setBackgroundMusic, backgroundMusic } = useContext(BackgroundAudioContext);

    // useEffect(() => {
    //     // on mount re-set audio 
    //     setTimeout(() => {
    //         setBackgroundMusic('home');
    //     }, 1000);
    // }, [setBackgroundMusic]);

    return (
        <div className='Home full-screen' >
            <div className='FadeInGradient full-screen' style={{backgroundImage: 'radial-gradient(rgba(0, 0, 0, 10), red)'}} id="red-fig" />
            <div className='FadeInGradient full-screen' style={{backgroundImage: 'radial-gradient(gray, green)'}} id="green-fig" />
            <div className='FadeInGradient full-screen' style={{backgroundImage: 'radial-gradient(gray, blue)'}} id="blue-fig" />
            <div className='PlayOptions'>
                <div className='OptionBox'
                    onClick={() =>{ 
                        navigate('/play/host');
                    }}
                    onMouseEnter={() => {
                        r.style.setProperty('--title-color', 'red');
                        document.getElementById("red-fig").style.opacity = '20%'
                    }}
                    onMouseLeave={() => {
                        r.style.setProperty('--title-color', 'white');
                        document.getElementById("red-fig").style.opacity = '0%'
                    }}
                >
                    <h1 style={{color:'red'}}>Host a Game</h1>
                </div>
                <div className='OptionBox'
                    onClick={() => navigate('/play/join')}
                    onMouseEnter={() => {
                        r.style.setProperty('--title-color', 'green');
                        document.getElementById("green-fig").style.opacity = '25%'
                    }}
                    onMouseLeave={() => {
                        r.style.setProperty('--title-color', 'white');
                        document.getElementById("green-fig").style.opacity = '0%'
                    }}
                >
                    <h1 style={{color:'green'}}>Join a Game</h1>
                </div>
                <div className='OptionBox'
                    onClick={() => navigate('/play/solo')}
                    onMouseEnter={() => {
                        r.style.setProperty('--title-color', 'blue');
                        document.getElementById("blue-fig").style.opacity = '20%'
                    }}
                    onMouseLeave={() => {
                        r.style.setProperty('--title-color', 'white');
                        document.getElementById("blue-fig").style.opacity = '0%'
                    }}
                >
                    <h1 style={{color:'blue'}}>Play Solo</h1>
                </div>
            </div>
            <div className='FunAnimations' id='funimation'>

            </div>
        </div>
    )
}

export default Home;