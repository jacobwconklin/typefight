import GameCard from './GameCard';
import './GameSelect.scss';
import ScrollingText from '../../Reusable/ScrollingText';
import running from '../../../Assets/GameCards/QuickKeys/running.svg';
import jogging from '../../../Assets/GameCards/QuickKeys/jogging.svg';
import horse from '../../../Assets/GameCards/QuickKeys/horse-racing.svg';
import car from '../../../Assets/GameCards/QuickKeys/race-2.svg';
import finish from '../../../Assets/GameCards/QuickKeys/finish-race.svg';
import asteroid from '../../../Assets/GameCards/SpacebarInvaders/asteroid.svg';
import earth from '../../../Assets/GameCards/SpacebarInvaders/world-connection.svg';
import ufo from '../../../Assets/GameCards/SpacebarInvaders/flying-saucer.svg';
import { useContext } from 'react';
import { SessionContext } from '../PlayScreen/PlayScreen';
import { getServerBaseUrl, getStandardHeader } from '../../../Utils';

// Dashboard view for users to select a game
const GameSelect = (props) => {

    // comment out to visit game selecte from /games
    const {sessionId} = useContext(SessionContext);

    // tells session that a game has been selected (TODO May want to make only available to hosts)
    const selectGame = async (gameName) => {
        console.log("Game selected: ", gameName);
        const result = await fetch(getServerBaseUrl() + "session/select-game", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId,
                selected_game: gameName
            })
        });
        const data = await result.json();
        console.log(data); // Don't believe I need this data for anything
    }

    // May just make game cards here individually rather than componetizing them if they are each going to be wildly different.
    // (Eventually could have a component for each game's card)


    // TODO include number of players needed for game and disable games that need different number

    return (
        <div className='GameSelect'>
            <ScrollingText />
            <div className='GamesBox'>
                <GameCard game={{title:"TypeFight"}}></GameCard>
                <div className='GameCard' onClick={() => {selectGame("Quick Keys")}}  >
                    <h1>Quick Keys</h1>
                    <h3>Competitive</h3>
                    <div className='CardIcons'>
                        <img  className='CardIcon' style={{translate: '25px 40px'}} src={running} alt='running' />
                        <img  className='CardIcon' style={{translate: '5px 40px'}} src={jogging} alt='jogging'/>
                        <img  className='CardIcon FlipIcon' style={{height: '45px', translate: '-5px 48px'}} src={horse} alt='horse'/>
                        <img  className='CardIcon' style={{translate: '5px 40px', zIndex: 6}} src={car} alt='car'/>
                        <img  className='CardIcon' style={{translate: '-35px 20px', zIndex: 5}} src={finish} alt='finish line'/>
                    </div>
                </div>
                <div className='GameCard' onClick={() => {selectGame("Spacebar Invaders")}}  >
                    <h1>Spacebar Invaders</h1>
                    <h3>Cooperative</h3>
                    <div className='CardIcons'>
                        <img  className='CardIcon FlipIcon' style={{height:'60px', width:'60px', translate: '5px -20px'}} src={asteroid} alt='asteroid'/>
                        <img  className='CardIcon' style={{height:'130px', width:'130px', translate: '0px -30px'}} src={earth} alt='earth' />
                        <img  className='CardIcon' style={{translate: '5px -20px'}} src={ufo} alt='ufo'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSelect;