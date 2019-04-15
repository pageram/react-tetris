import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { resolveGame, generateRows, drawScreen, hiddenRowCount, DOWN } from './Game'
import Screen from './app/Screen'
import keydown from 'react-keydown'
import { setInterval } from 'timers';

class App extends Component {
    constructor(props) {
        super(props)

        this.height = 20 + hiddenRowCount
        this.width = 10
        this.middle = Math.floor(this.width / 2)
        this.interval = 1000 // in ms

        this.state = {
            rows: generateRows(this.height, this.width),
            piece: null,
            score: 0,
            isGameOver: false
        }

        this.runGame = this.runGame.bind(this)

        setInterval(() => {
            this.runGame(DOWN)
        }, this.interval)
    }

    componentWillReceiveProps({ keydown }) {
        if (keydown.event !== null) {
            this.runGame(keydown.event.code)
        }
    }

    runGame(action) {
        if (!this.state.isGameOver) {
            const { piece, rows, score, isGameOver } = resolveGame(action, this.state.rows, this.state.piece, this.middle, this.state.score)

            this.setState({
                rows: rows,
                piece: piece,
                score: score,
                isGameOver: isGameOver
            })
        }
    }

    render() {
        const { piece, rows, score, isGameOver } = this.state
        const screen = drawScreen(rows, piece)

        return (
            <>
                {
                    isGameOver ? <h1>Game Over!</h1> : <Screen screen={screen} score={score} />
                }
            </>
        )
    }
}

const app = keydown('down', 'left', 'right', 'space')(App)
export default hot(module)(app)