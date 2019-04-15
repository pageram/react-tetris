import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { resolveGame, generateRows, drawScreen, hiddenRowCount } from './Game'
import Screen from './app/Screen'
import keydown from 'react-keydown'

class App extends Component {
    constructor(props) {
        super(props)

        this.height = 20 + hiddenRowCount
        this.width = 10
        this.middle = Math.floor(this.width / 2)

        this.state = {
            rows: generateRows(this.height, this.width),
            piece: null,
            score: 0,
            isGameOver: false
        }
    }

    componentWillReceiveProps({ keydown }) {
        if (!this.state.isGameOver) {
            if (keydown.event !== null) {
                const { piece, rows, score, isGameOver } = resolveGame(keydown.event.code, this.state.rows, this.state.piece, this.middle, this.state.score)

                this.setState({
                    rows: rows,
                    piece: piece,
                    score: score,
                    isGameOver: isGameOver
                })
            }
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