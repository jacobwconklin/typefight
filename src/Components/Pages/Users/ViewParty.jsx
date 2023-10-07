import { useContext } from 'react';
import './ViewParty.scss';
import { SessionContext } from '../PlayScreen/PlayScreen';
import ProfileContainer from '../../Reusable/ProfileContainer';
import { Button, Spin } from 'antd';

// ViewParty
const ViewParty = (props) => {

    // props.isHost tells us whether the player is a host and we need to show the join code

    // load for 
    
    const {session} = useContext(SessionContext);

    console.log("session has the info: ", session);

    // TODO IF I make it so that players can't join a session that is started I should have a model warning the host before
    // they start it
    const beginSession = async () => {
        // await 
    }

    return (
        <div className='ViewParty'>
            {
                session.players.length > 0 ?
                <div className='SessionLoaded full-size'>
                {
                        props.isHost && 
                    <div className='ShowJoinCode'>
                        <h2>Join Code Is:</h2>
                        <h1>{props.join_code}</h1>
                        <h2>Share With This Link:</h2>
                        <p className='JoinLink'>https://typefight.azurewebsites.net/play/join/{props.join_code}</p>
                    </div>
                }
                <h1>{session.players.length} Player{session.players.length > 1 ? "s Are" : " Is "} In The Session</h1>
                <div className='SessionPlayers'>
                    {
                        session.players.map(player => (
                            <ProfileContainer
                                alias={player.alias}
                                color={player.color}
                                font={player.font}
                                icon={player.icon}
                            />
                        ))
                    }
                </div>
                {
                    props.isHost && 
                    <Button
                        disabled={session.players.length < 2}
                        onClick={beginSession}
                    >
                        Begin
                    </Button>
                }
                </div>
                :
                <div className='SessionLoading full-size'>
                    <Spin tip="Loading" size="large"></Spin>
                </div>
            }
        </div>
    )
}

export default ViewParty;