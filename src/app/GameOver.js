import React from 'react'

const GameOver = props => {
    return (
        <div>
            <h1>Game Over!</h1>
            <h3>{'Highest score: ' + props.hiScore}</h3>
            <h3>{'Your score: ' + props.score}</h3>
            <div>
                <button type="button" onClick={e => props.refreshGame()}>Reset Game</button>
            </div>
        </div>
    )
}

export default GameOver;