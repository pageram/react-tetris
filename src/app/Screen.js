import React from 'react'
import Block from './screen/Block'
import './styles.css'

export default Screen = props => {
    const { screen, score } = props
    return (
        <table className={'table'}>
            <thead>
                <tr>
                    <td colSpan={screen[0].length}>{'Score: ' + score}</td>
                </tr>
            </thead>
            <tbody>
                {
                    screen.map((row, index) => {
                        if (index > 3) {
                            return (
                                <tr key={index}>
                                    {
                                        row.map((val, index) => {
                                            return <Block color={val} key={index} />
                                        })
                                    }
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </table>
    )
}