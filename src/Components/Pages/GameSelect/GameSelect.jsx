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
import airPump from '../../../Assets/GameCards/Textplosion/air-pump.svg';
import basicBalloon from '../../../Assets/GameCards/Textplosion/basic-balloon.svg';
import dynamite from '../../../Assets/GameCards/Textplosion/dynamite.svg';
import handsUp from '../../../Assets/GameCards/Textplosion/hands-up.svg';

import bombEmoji from '../../../Assets/GameCards/TypeFlight/bomb.svg';
import fireEmoji from '../../../Assets/GameCards/TypeFlight/fire-emoji.svg';
import jetpack from '../../../Assets/GameCards/TypeFlight/jetpack.svg';
import lightning from '../../../Assets/GameCards/TypeFlight/lightning-bolt.svg';
import smileSunglassesEmoji from '../../../Assets/GameCards/TypeFlight/smiling-face-with-sunglasses.svg';

import { useContext } from 'react';
import { SessionContext } from '../PlayScreen/PlayScreen';
import { getServerBaseUrl, getStandardHeader } from '../../../Utils';

// Dashboard view for users to select a game
const GameSelect = (props) => {

    // comment out to visit game selecte from /games
    const {sessionId, session} = useContext(SessionContext);

    // tells session that a game has been selected (TODO May want to make only available to hosts)
    const selectGame = async (gameName) => {
        // save current game into local storage so that game can be wiped if one player navigates home
        // or closes browser
        localStorage.game = gameName;
        await fetch(getServerBaseUrl() + "session/select-game", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId,
                selected_game: gameName
            })
        });
    }

    // May just make game cards here individually rather than componetizing them if they are each going to be wildly different.
    // (Eventually could have a component for each game's card)


    // TODO include number of players needed for game and disable games that need different number

    return (
        <div className='GameSelect'>
            <ScrollingText />
            <div className='GamesBox'>
                <GameCard game={{title:"TypeFight"}}></GameCard>
                <div className='GameCard' onClick={() => {selectGame("quick-keys")}}  >
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
                <div className='GameCard' onClick={() => {selectGame("spacebar-invaders")}}  >
                    <h1>Spacebar Invaders</h1>
                    <h3>Cooperative</h3>
                    <div className='CardIcons'>
                        <img  className='CardIcon FlipIcon' style={{height:'60px', width:'60px', translate: '5px -20px'}} src={asteroid} alt='asteroid'/>
                        <img  className='CardIcon' style={{height:'130px', width:'130px', translate: '0px -30px'}} src={earth} alt='earth' />
                        <img  className='CardIcon' style={{translate: '5px -20px'}} src={ufo} alt='ufo'/>
                    </div>
                </div>
                <div className={session?.players?.length > 1 ? 'GameCard' : 'GameCard DisabledCard'} onClick={() => {
                    if (session?.players?.length > 1) {
                        selectGame("textplosion");
                    }
                }}>
                    <h1>Textplosion</h1>
                    <h3>{session?.players?.length > 1 ? 'Competitive' :  '2+ Players Required'}</h3>
                    <div className='CardIcons'>
                        <img  className='CardIcon' style={{height:'90px', width:'90px', translate: '8px 8px'}} src={basicBalloon} alt='balloon'/>
                        <img  className='CardIcon' style={{height:'45px', width:'45px', translate: '-57px 18px'}} src={dynamite} alt='dynamite' />
                        <img  className='CardIcon' style={{height:'60px', width:'60px', translate: '40px 20px'}} src={handsUp} alt='person'/>
                        <img  className='CardIcon' style={{height:'40px', width:'40px', translate: '-40px 39px'}} src={airPump} alt='pump'/>
                    </div>
                </div>
                <div className='GameCard' onClick={() => {selectGame("typeflight")}}  >
                    <h1>Type Flight</h1>
                    <h3>Cooperative</h3>
                    <div className='CardIcons'>
                        <img  className='CardIcon' style={{height:'60px', width:'60px', translate: '70px 30px'}} src={fireEmoji} alt='fire' />
                        <img  className='CardIcon' style={{height:'130px', width:'130px', translate: '-20px 40px'}} src={bombEmoji} alt='bomb' />
                        <img  className='CardIcon' style={{height:'70px', width:'70px', translate: '-20px 20px'}} src={jetpack} alt='jetpack' />
                        <img  className='CardIcon' style={{height:'120px', width:'120px', translate: '-15px -10px'}} src={lightning} alt='lightning' />
                        <img  className='CardIcon' style={{height:'35px', width:'35px', translate: '-192px 30px'}} src={smileSunglassesEmoji} alt='smile sunglasses' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSelect;