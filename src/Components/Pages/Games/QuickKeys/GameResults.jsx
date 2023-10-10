import { Button, Table } from 'antd';
import './GameResults.scss';
import { useContext } from 'react';
import { SessionContext } from '../../PlayScreen/PlayScreen';
import ProfileContainer from '../../../Reusable/ProfileContainer';
import { getServerBaseUrl, getStandardHeader } from '../../../../Utils';

// GameResults
const GameResults = (props) => {

    // props.results holds the results array of the game
    // each result object looks like: 
    /*
    {
        index: #,
        time: #,
        player: {
            alias: "john doe",
            icon: "lizard",
            font: "Calibri",
            color: "#FFFFFF"
        }
    }
    */

    const {session, sessionId} = useContext(SessionContext);

    // replay the same game
    // set everyone's time to undefined and indicies to 0
    const rematch = async () => {
        await fetch(getServerBaseUrl() + "quick-keys/rematch", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
    }

    // pick a new prompt
    // set everyone's time to undefined and indicies to 0
    // and set quickkeysgame's prompt to undefined
    const pickNewPrompt = async () => {
        await fetch(getServerBaseUrl() + "quick-keys/new", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
    }

    // pick new game
    // set session's selected_game to undefined
    const pickNewGame = async () => {
        await fetch(getServerBaseUrl() + "session/leave-game", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
        // delete quick keys game data from database
        await fetch(getServerBaseUrl() + "quick-keys/wipe", {
            method: "POST",
            headers: getStandardHeader(),
            body: JSON.stringify({
                sessionId
            })
        });
    }

    // Table information 
    const columns = [
        {
            title: 'Rank',
            dataIndex: 'key',
            rowScope: 'row',
        }, 
        {
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias'
        },
        // TODO not sure if I can plug in jsx into the datasource to plug in icons...
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
        },
    ]

    return (
        <div className='GameResults'>
            <h1>RESULTS ARE IN</h1>
            <Table className='ResultTable' 
                pagination={false}
                columns={columns} 
                dataSource={props.results.sort((a, b) => a.time < b.time ).map((res, index) => (
                    {
                        key: "" + (index + 1),
                        time: ("" + Math.floor(res.time / 1000) + "." + res.time % 1000 + " Seconds"),
                        alias: res.player.alias
                    }
                ))} 
            />
            <div className='ButtonRow'>
                <Button onClick={rematch}>Rematch</Button>
                <Button onClick={pickNewPrompt}>New Prompt</Button>
                <Button onClick={pickNewGame}>New Game</Button>
            </div>
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
        </div>
    )
}

export default GameResults;