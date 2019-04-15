import { pieceStash, statesStash, startStash } from './PieceStash'

export const hiddenRowCount = 4

export const generateRows = (height, width) => {
    let rows = []

    for (let x = 0; x < height; x++) {
        let row = []

        for (let y = 0; y < width; y++) {
            row[y] = EMPTY
        }

        rows[x] = row
    }

    return rows
}

export const drawScreen = (rows, piece) => {
    let newRows = copy(rows)
    
    if (piece !== null && piece !== undefined) {
        let blocks = deriveBlocks(piece)

        blocks.forEach(val => {
            newRows[val.x][val.y] = piece.color
        })
    }    

    return newRows
}

export const resolveGame = (action, rows, piece, middle, score) => {
    let origPiece = {...piece}

    let newPiece = null
    let newRows = null
    let newScore = null

    if (piece === null || piece === undefined) {
        newPiece = createPiece(middle)
    } else {
        if (action !== null || action !== undefined) {
            newPiece = resolvePiece(action, origPiece)
        }
    }

    let collisionExists = checkCollision(rows, newPiece)
    if (collisionExists) {
        if (action === DOWN) {
            newRows = lockPiece(rows, piece)
            newPiece = null
            piece = null

            let { rowCount, clearedRows } = clearFullRows(newRows)
            
            newRows = clearedRows
            newScore = score + rowCount
        } else {
            newPiece = null
        } 
    }

    let gameData = {
        piece: newPiece === null ? piece : newPiece,
        rows: newRows === null ? rows : newRows,
        score: newScore === null ? score : newScore
    }

    return {
        ...gameData, 
        isGameOver: checkIfGameOver(gameData.rows)
    }
}

const createPiece = middle => {
    const index = Math.floor(Math.random() * 10) % pieceStash.length

    let pieceInfo = pieceStash[index]
    let start = startStash[pieceInfo.type]

    return {
        type: pieceInfo.type,
        color: pieceInfo.color,
        x: start,
        y: middle,
        state: 0
    }
}

const resolvePiece = (action, piece) => {
    if (action === SPACE) {
        return transformPiece(piece)
    } else {
        return movePiece(action, piece)
    }
}

const transformPiece = piece => {
    let states = statesStash[piece.type]

    piece.state = states.length - 1 === piece.state ? 0 : piece.state + 1

    return piece
}

const movePiece = (action, piece) => {
    switch (action) {
        case DOWN: piece.x++
                   break
        case LEFT: piece.y--
                   break
        case RIGHT: piece.y++
                   break
    }

    return piece
}

const checkCollision = (rows, piece) => {
    let blocks = deriveBlocks(piece)

    const height = rows.length - 1
    const width = rows[0].length - 1

    return blocks.reduce((accum, val) => {
        if (val.x > height || val.y > width || val.x < 0 || val.y < 0) {
            return true
        } else {
            let color = rows[val.x][val.y]
            return accum || color !== EMPTY
        }
    }, false)
}

const lockPiece = (rows, piece) => {
    let newRows = copy(rows)
    let blocks = deriveBlocks(piece)

    blocks.forEach(val => {
        newRows[val.x][val.y] = piece.color
    })

    return newRows
}

const deriveBlocks = piece => {
    let states = statesStash[piece.type][piece.state]

    let blocks = states.map(val => {
        return {
            x: piece.x + val.x,
            y: piece.y + val.y
        }
    })

    blocks.push({ x: piece.x, y: piece.y })
    return blocks
}

const clearFullRows = rows => {
    let fullRowIndexes = rows.reduce((accum, row, index) => {
        const fullBlockCount = row.reduce((accum, block) => {
            return accum + ((block === EMPTY) ? 0 : 1)
        }, 0)

        return (fullBlockCount === row.length) ? [...accum, index] : accum
    }, [])

    let newRows = null
    if(fullRowIndexes.length > 0) {
        fullRowIndexes.sort((a, b) => {
            return a - b
        })
        let fullRowMax = fullRowIndexes[fullRowIndexes.length - 1]
        let fullRowMin = fullRowIndexes[0]

        newRows = copy(rows)
        let beforeRows = newRows.slice(0, fullRowMin)
        let afterRows = newRows.slice(fullRowMax + 1)
        beforeRows.splice(beforeRows.length, 0, ...afterRows)
        newRows = [...beforeRows]
    }

    let missingRowCount = 0
    if (newRows !== null) {
        missingRowCount = rows.length - newRows.length

        const rowLength = rows[0].length
        const newRow = []
        for (let x = 0; x < rowLength; x++) {
            newRow[x] = EMPTY
        }

        for (let x = 0; x < missingRowCount; x++) {
            newRows.splice(0, 0, [...newRow])
        }
    }
    
    return {
        rowCount: missingRowCount,
        clearedRows: newRows === null ? rows : newRows
    }
}

const checkIfGameOver = rows => {
    let hiddenRows = rows.slice(0, hiddenRowCount)

    return hiddenRows.some((row) => {
        return row.some((val) => {
            return val !== EMPTY
        })
    })
}

const copy = o => {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}

const DOWN = 'ArrowDown'
const LEFT = 'ArrowLeft'
const RIGHT = 'ArrowRight'
const SPACE = 'Space'

const EMPTY = 'black'