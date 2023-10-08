import './GameResults.scss';

// GameResults
const GameResults = (props) => {

    return (
        <div className='GameResults'>
            {
                // TODO put into table
                props.results && 
                props.results.sort().map(result => (
                    <div style={{padding: '50px'}}>
                        <span>Alias: {result.player.alias} </span>
                        <span>Time: {"" + Math.floor(result.time / 1000) + "." + result.time % 1000 + " Seconds"} </span>
                    </div>
                ))
            }
        </div>
    )
}

export default GameResults;