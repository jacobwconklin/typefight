import { useContext } from 'react';
import './ViewParty.scss';
import { SessionContext } from '../PlayScreen/PlayScreen';
import ProfileContainer from '../../Reusable/ProfileContainer';
import { Button, Spin } from 'antd';
import { getServerBaseUrl, getStandardHeader } from '../../../Utils';

// ViewParty
const ViewParty = (props) => {

    // props.isHost tells us whether the player is a host and we need to show the join code

    // load for 
    
    const {session, sessionId} = useContext(SessionContext);

    // TODO IF I make it so that players can't join a session that is started I should have a model warning the host before
    // they start it
    const beginSession = async () => {
        await fetch(getServerBaseUrl() + "session/begin", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
        // set started to true, changes to front-end should appear once status is pulled again.
        // data is not really needed
    }

    return (
        <div className='ViewParty'>
            {
                session.players.length > 0 ?
                <div className='SessionLoaded full-size'>
                {
                        props.isHost && 
                        <div className='JoinCodeAndBegin'> 
                            <div className='ShowJoinCode'>
                                <h2>Join Code Is:</h2>
                                <h1>{props.join_code}</h1>
                                {/* Join link doesn't work because it is SPA <h2>Share With This Link:</h2>
                                <p className='JoinLink'>https://typefight.azurewebsites.net/play/join/{props.join_code}</p> */}
                            </div>
                            <Button className='BeginButton'
                                disabled={session.players.length < 2}
                                onClick={beginSession}
                            >
                                Begin
                            </Button>
                        </div>
                }
                <h1>{session.players.length} Player{session.players.length > 1 ? "s Are" : " Is "} In The Session</h1>
                <div className='SessionPlayers'>
                    {
                        session.players.map(player => (
                            <ProfileContainer
                                key={player.alias}
                                alias={player.alias}
                                color={player.color}
                                font={player.font}
                                icon={player.icon}
                            />
                        ))
                    }
                </div>
                </div>
                :
                <div className='SessionLoading full-size'>
                    <br></br>
                    <div style={{height: '50px', padding: '50px'}}></div>
                    <Spin tip="Loading" size="large"></Spin>
                </div>
            }
        </div>
    )
}

export default ViewParty;