const tPiece = {
    type: 't',
    color: 'red'
}
const tPieceStates = [
    [
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 }
    ],
    [
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 }
    ],
    [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 }
    ],
    [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 }
    ]
]

const linePiece = {
    type: 'line',
    color: 'cyan'
}
const linePieceStates = [
    [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 }
    ],
    [
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 }
    ]
]

const blockPiece = {
    type: 'block',
    color: 'blue'
}
const blockPieceStates = [
    [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 }
    ]
]

// render this one line ahead
const sPiece = {
    type: 's',
    color: 'orange'
}
const sPieceStates = [
    [
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 }
    ],
    [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: -1 }
    ]
]

// render this one line ahead
const zPiece = {
    type: 'z',
    color: 'purple'
}
const zPieceStates = [
    [
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 }
    ],
    [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 }
    ]
]

// render this two lines ahead
const lPiece = {
    type: 'l',
    color: 'yellow'
}
const lPieceStates = [
    [
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: -2, y: 0 }
    ],
    [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
    ],
    [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
    ],
    [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 }
    ]
]

// render this two lines ahead
const jPiece = {
    type: 'j',
    color: 'green'
}
const jPieceStates = [
    [
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -2, y: 0 }
    ],
    [
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2}
    ],
    [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
    ],
    [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 }
    ]
]

export const pieceStash = [ tPiece, lPiece, jPiece, zPiece, sPiece, linePiece, blockPiece ]

export const statesStash = {
    t: tPieceStates,
    line: linePieceStates,
    block: blockPieceStates,
    s: sPieceStates,
    z: zPieceStates,
    l: lPieceStates,
    j: jPieceStates
}

export const startStash = {
    t: 1,
    line: 0,
    block: 0,
    s: 1,
    z: 1,
    l: 2,
    j: 2
}