import { useNavigate } from 'react-router-dom';
import './Home.scss';

// Home. Let user's select between hosting a game, joining a game, and playing solo offline
// also maybe have some fun animations across the bottom of the screen
const Home = (props) => {

    const navigate = useNavigate();

    return (
        <div className='Home'>
            <div className='PlayOptions'>
                <div className='OptionBox'>
                    <h1 style={{color:'red'}}>Host a Game</h1>
                </div>
                <div className='OptionBox'>
                    <h1 style={{color:'green'}}>Join a Game</h1>
                </div>
                <div className='OptionBox'
                    onClick={() => navigate('/games')}
                >
                    <h1 style={{color:'blue'}}>Play Solo</h1>
                </div>
            </div>
            <div className='OptionBox'
                    onClick={() => navigate('/simple')}
                    style={{textAlign:'center'}}
                >
                    <h1 style={{color:'white'}}>Simply Type</h1>
            </div>
            <div className='FunAnimations'>

            </div>
        </div>
    )
}

export default Home;