class Piece {
  constructor(type, color, symbol) {
    this.type = type
    this.color = color
    this.symbol = symbol
  }
}
// En Passant must look at last played move
// Validate that it was a pawn move
// Validate that distance moved was 2 squares
// Validate that pawn landed on horizontally adjacent square [fromRow, fromCol+1, fromCol-1]
class PlayedMove {
  constructor(fromSquare, toSquare) {
    this.fromSquare = fromSquare
    this.toSquare = toSquare
  }
}
// Note about coordinates:
// Each square is [row, col], kind of like chess notation
class Board {
  constructor() {
    this.squares = []
    for (let x = 0; x < 8; x++) {
      const boardRow = []
      for (let y = 0; y < 8; y ++){
        const square = {
          piece: null,
          coordinate: [x, y]
          }
        boardRow.push(square)
        }
      this.squares.push(boardRow)
    }
    this.playedMoveList = []
    this.blackCapturedPieces = []
    this.whiteCapturedPieces = []
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >= 0 && col >= 0
  }
  isSquareOccupied(fromSquare, possibleSquare) {
    const [row1, col1] = fromSquare
    const [row2, col2] = possibleSquare
    //console.log(this.squares[row2][col2].piece)
    if (this.squares[row2][col2].piece === null) {
      return false
      }
    if (this.squares[row1][col1].piece.color === this.squares[row2][col2].piece.color) {return "byFriendlyPiece"}
    return "byEnemyPiece"
  }
  // given two squares, are they the same?
  // TODO: replace calls to moveIsValid with using squaresEqual?
  squaresEqual(square1, square2) {
    return square1[0] === square2[0] && square1[1] === square2[1]
  }
  moveListContainsSquare(moveList, square){
    for (let i = 0; i < moveList.length; i++){
      if (this.squaresEqual(moveList[i], square)) { return true }
    }
  }
  promotePawn(promotionSquare, promotedPiece) {
    // possible issue with captured promoted piece being incorrectly added to captured pieces array
    const [row, col] = promotionSquare
    promotedPiece.originallyPawn = true
    this.squares[row][col].piece = promotedPiece
  }
  addMoveToPlayedMoveList(fromSquare, toSquare) {
    this.playedMoveList.push(new PlayedMove(fromSquare, toSquare))
  }
  // Request a move from fromSquare to toSquare
  // each square is an array of [x, y] coordinates.
  // If move is valid, updates the board, adds to played move array and returns true
  // If not, returns false
  move(fromSquare, toSquare) {
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare

    const pieceAtFromSquare = this.squares[fromRow][fromCol].piece

    const validToSquares = []

    switch (pieceAtFromSquare.type) {
      case 'rook': {
        const completedDirections = []
        for (let i = 1; i < 8; i++) {
          const rookDirections = {
            "North": [fromRow - i, fromCol],
            "South": [fromRow + i, fromCol],
            "East": [fromRow, fromCol + i],
            "West": [fromRow, fromCol - i]
          }
          completedDirections.forEach(direction => delete rookDirections[direction])
          for (const direction in rookDirections) {
            const possibleSquare = rookDirections[direction]
            if (!this.isSquareOnBoard(possibleSquare)) {
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
              validToSquares.push(possibleSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(possibleSquare)
            //console.log(`valid squares: ${validToSquares.length}`)
          }
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          this.squares[toRow][toCol].piece = pieceAtFromSquare
          this.squares[fromRow][fromCol].piece = null
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
          return true
        } else {
          console.log("no moves found")
          return false
        }
      }
      case 'bishop': {
        const completedDirections = []
        for (let i = 1; i < 8; i++) {
          const bishopDirections = {
            "NorthWest": [fromRow - i, fromCol - i],
            "NorthEast": [fromRow - i, fromCol + i],
            "SouthWest": [fromRow + i, fromCol - i],
            "SouthEast": [fromRow + i, fromCol + i]
          }
          completedDirections.forEach(direction => delete bishopDirections[direction])
          for (const direction in bishopDirections) {
            const possibleSquare = bishopDirections[direction]
            if (!this.isSquareOnBoard(possibleSquare)) continue
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
              validToSquares.push(possibleSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(possibleSquare)
          }
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          this.squares[toRow][toCol].piece = pieceAtFromSquare
          this.squares[fromRow][fromCol].piece = null
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
          return true
        } else {
          return false
        }
      }
      case 'queen': {
        const completedDirections = []
        for (let i = 1; i < 8; i++) {
          const queenDirections = {
            "North": [fromRow - i, fromCol],
            "South": [fromRow + i, fromCol],
            "East": [fromRow, fromCol + i],
            "West": [fromRow, fromCol - i],
            "NorthWest": [fromRow - i, fromCol - i],
            "NorthEast": [fromRow - i, fromCol + i],
            "SouthWest": [fromRow + i, fromCol - i],
            "SouthEast": [fromRow + i, fromCol + i]
          }
          completedDirections.forEach(direction => delete queenDirections[direction])
          for (const direction in queenDirections) {
            const possibleSquare = queenDirections[direction]
            if (!this.isSquareOnBoard(possibleSquare)) continue
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
              validToSquares.push(possibleSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(possibleSquare)
          }
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          this.squares[toRow][toCol].piece = pieceAtFromSquare
          this.squares[fromRow][fromCol].piece = null
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
          return true
        } else {
          return false
        }
      }
      case 'king': {
        const kingDirections = {
          "North": [fromRow - 1, fromCol],
          "South": [fromRow + 1, fromCol],
          "East": [fromRow, fromCol + 1],
          "West": [fromRow, fromCol - 1],
          "NorthWest": [fromRow - 1, fromCol - 1],
          "NorthEast": [fromRow - 1, fromCol + 1],
          "SouthWest": [fromRow + 1, fromCol - 1],
          "SouthEast": [fromRow + 1, fromCol + 1]
        }
        for (const direction in kingDirections) {
          const possibleSquare = kingDirections[direction]
          if (!this.isSquareOnBoard(possibleSquare)) continue
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            validToSquares.push(possibleSquare)
            continue
          }
          validToSquares.push(possibleSquare)
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol].piece = null
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
          return true
        } else {
          return false
        }
      }
      case 'knight': {
        const knightMoves = {
          "NorthOneEastTwo": [fromRow - 1, fromCol + 2],
          "NorthTwoEastOne": [fromRow - 2, fromCol + 1],
          "SouthOneEastTwo": [fromRow + 1, fromCol + 2],
          "SouthTwoEastOne": [fromRow + 2, fromCol + 1],
          "NorthOneWestTwo": [fromRow - 1, fromCol - 2],
          "NorthTwoWestOne": [fromRow - 2, fromCol - 1],
          "SouthOneWestTwo": [fromRow + 1, fromCol - 2],
          "SouthTwoWestOne": [fromRow + 2, fromCol - 1]
        }
        for (const move in knightMoves) {
          const possibleSquare = knightMoves[move]
          if (!this.isSquareOnBoard(possibleSquare)) continue
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            validToSquares.push(possibleSquare)
            continue
          }
          validToSquares.push(possibleSquare)
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          this.squares[toRow][toCol].piece = pieceAtFromSquare
          this.squares[fromRow][fromCol].piece = null
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
          return true
        } else {
          return false
        }
      }
      case 'pawn': {
        let pawnMoves
        let startRow
        let promotionRow
        if (pieceAtFromSquare.color === "white") {
          pawnMoves = {
            "ForwardOne": [fromRow + 1, fromCol],
            "ForwardTwo": [fromRow + 2, fromCol],
            "CaptureWest": [fromRow + 1, fromCol - 1],
            "CaptureEast": [fromRow + 1, fromCol + 1]
          }
          startRow = 2
          promotionRow = 7
        } else {
          pawnMoves = {
            "ForwardOne": [fromRow - 1, fromCol],
            "ForwardTwo": [fromRow - 2, fromCol],
            "CaptureWest": [fromRow - 1, fromCol + 1],
            "CaptureEast": [fromRow - 1, fromCol - 1]
          }
          startRow = 5
          promotionRow = 0
        }
        const isOnStartRow = (fromRow === startRow)
        const isOnPromotionRow = (toRow === promotionRow)
        for (const move in pawnMoves) {
          const possibleSquare = pawnMoves[move]
          if (move === "ForwardOne") {
            const invalidMove = this.isSquareOccupied(fromSquare, possibleSquare)
            if (invalidMove) {
              delete pawnMoves["ForwardTwo"]
              continue
            }
          }
          if (move === "ForwardTwo") {
            const invalidMove = !isOnStartRow || this.isSquareOccupied(fromSquare, possibleSquare)
            if (invalidMove) { continue }
          }
          if (move === "CaptureWest" || move === "CaptureEast") {
            if (this.isSquareOccupied(fromSquare, possibleSquare) !== "byEnemyPiece") {
              continue
            }
          }
          validToSquares.push(possibleSquare)
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          if (isOnPromotionRow){
            console.log('promotion!')
            //queen by default
            this.squares[fromRow][fromCol].piece = null
            const chosenPiece = 'queen'
            pieceAtFromSquare.type = chosenPiece
            this.promotePawn(toSquare, pieceAtFromSquare)
            this.addMoveToPlayedMoveList(fromSquare, toSquare)
            return true
          }
          this.squares[toRow][toCol].piece = pieceAtFromSquare
          this.squares[fromRow][fromCol].piece = null
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
          return true
        } else {
          return false
        }
      }
      default: {
        throw new Error("unknown piece")
      }
    }
  }
}

describe('Board', () => {
  it('can create a new board', () => {
    const board = new Board()
    expect(board.squares.length).toBe(8);
  });

  describe('rook movement', () => {
    it('rook can move down', () => {
      const board = new Board()
      board.squares[2][2].piece = new Piece("rook", "black")
      expect(board.move([2, 2], [2, 5])).toBe(true)
    })

    it('rook can move up', () => {
      const board = new Board()
      board.squares[1][6].piece = new Piece("rook", "white")
      expect(board.move([1, 6], [1, 3])).toBe(true)
    })

    it('rook can move to the right', () => {
      const board = new Board()
      board.squares[0][0].piece = new Piece("rook", "white")
      expect(board.move([0, 0], [0, 2])).toBe(true)
    })

    it('rook can move to the left', () => {
      const board = new Board()
      board.squares[0][7].piece = new Piece("rook", "white")
      expect(board.move([0, 7], [0, 0])).toBe(true)
    })

    it('rook cannot move diagonally', () => {
      const board = new Board()
      board.squares[0][0].piece = new Piece("rook", "white")
      expect(board.move([0, 0], [1, 1])).toBe(false)
    })

    it('rook cannot move off the board', () => {
      const board = new Board()
      board.squares[0][7].piece = new Piece("rook", "white")
      expect(board.move([0, 7], [0, 8])).toBe(false)
    })

    it('rook can capture enemy piece', () => {
      const board = new Board()
      board.squares[0][3].piece = new Piece("rook", "white")
      board.squares[0][0].piece = new Piece("rook", "black")
      expect(board.move([0, 3], [0, 0])).toBe(true)
    })

    it('rook cannot capture friendly piece', () => {
      const board = new Board()
      board.squares[0][3].piece = new Piece("rook", "white")
      board.squares[0][0].piece = new Piece("rook", "white")
      expect(board.move([0, 3], [0, 0])).toBe(false)
    })

    it('rook cannot move through friendly piece', () => {
      const board = new Board()
      board.squares[0][0].piece = new Piece("rook", "white")
      board.squares[0][4].piece = new Piece("rook", "white")
      expect(board.move([0, 0], [0, 6])).toBe(false)
    })

    it('rook cannot move through enemy piece', () => {
      const board = new Board()
      board.squares[0][0].piece = new Piece("rook", "white")
      board.squares[0][4].piece = new Piece("rook", "black")
      expect(board.move([0, 0], [0, 6])).toBe(false)
    })
  })

  describe('bishop movement', () => {
    it('bishop can move up and left', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      expect(board.move([3, 3], [0, 0])).toBe(true)
    })

    it('bishop can move up and right', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      expect(board.move([3, 3], [1, 5])).toBe(true)
    })

    it('bishop can move down and left', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      expect(board.move([3, 3], [5, 1])).toBe(true)
    })

    it('bishop can move down and right', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      expect(board.move([3, 3], [5, 5])).toBe(true)
    })

    it('bishop cannot move off the board', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      expect(board.move([3, 3], [-1, -1])).toBe(false)
    })

    it('bishop cannot move through piece', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      board.squares[2][2].piece = { type: "pawn" }
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })

    it('bishop can capture enemy piece', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      board.squares[2][2].piece = new Piece("rook", "white")
      expect(board.move([3, 3], [2, 2])).toBe(true)
    })

    it('bishop cannot move through friendly piece', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "white")
      board.squares[2][2].piece = new Piece("rook", "white")
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })

    it('bishop cannot move through enemy piece', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("bishop", "black")
      board.squares[2][2].piece = new Piece("rook", "white")
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })
  })

describe('queen movement', () => {
  it('queen can move up and left', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("queen", "white")
    expect(board.move([3, 3], [0, 0])).toBe(true)
  })

  it('queen can move up and right', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("queen", "white")
    expect(board.move([3, 3], [1, 5])).toBe(true)
  })

  it('queen can move down and left', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("queen", "white")
    expect(board.move([3, 3], [5, 1])).toBe(true)
  })

  it('queen can move down and right', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("queen", "white")
    expect(board.move([3, 3], [5, 5])).toBe(true)
  })

  it('queen can move down', () => {
    const board = new Board()
    board.squares[0][2].piece = new Piece("queen", "white")
    expect(board.move([0, 2], [0, 0])).toBe(true)
  })

  it('queen can move to the left', () => {
    const board = new Board()
    board.squares[0][1].piece = new Piece("queen", "white")
    expect(board.move([0, 1], [0, 0])).toBe(true)
  })

  it('queen cannot move off the board', () => {
    const board = new Board()
    board.squares[0][7].piece = new Piece("queen", "white")
    expect(board.move([0, 7], [0, 8])).toBe(false)
  })

  it('queen cannot move through piece', () => {
    const board = new Board()
    board.squares[0][3].piece = new Piece("queen", "white")
    board.squares[0][0].piece = new Piece("queen", "white")
    expect(board.move([0, 0], [0, 4])).toBe(false)
  })
})

describe('knight movement', () => {
  it('knight can move 2 left, 1 up', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [1, 2])).toBe(true)
  })

  it('knight can move 2 left, 1 down', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [1, 4])).toBe(true)
  })

  it('knight can move 1 left, 2 up', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [2, 1])).toBe(true)
  })

  it('knight can move 1 left, 2 down', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [2, 5])).toBe(true)
  })

  it('knight can move 2 right, 1 up', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [5, 2])).toBe(true)
  })

  it('knight can move 2 right, 1 down', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [5, 4])).toBe(true)
  })

  it('knight can move 1 right, 2 up', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [4, 1])).toBe(true)
  })

  it('knight can move 1 right, 2 down', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [4, 5])).toBe(true)
  })

  it('knight cannot move off board', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [-1, 2])).toBe(false)
  })

  it('knight cannot move like bishop', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [5, 5])).toBe(false)
  })

  it('knight cannot move like rook', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [3, 5])).toBe(false)
  })

  it('knight can capture enemy piece', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "white")
    board.squares[4][5].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [4, 5])).toBe(true)
    expect(board.squares[4][5].color === "white" && board.squares[4][5].type === "knight")
  })

  it('knight cannot capture friendly piece', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("knight", "black")
    board.squares[3][5].piece = new Piece("knight", "black")
    expect(board.move([3, 3], [3, 5])).toBe(false)
  })
})

describe('pawn moves', () => {
  it('black pawn can move 1 square up board', () => {
    const board = new Board()
    board.squares[5][5].piece = new Piece("pawn", "black")
    expect(board.move([5, 5], [4, 5])).toBe(true)
  })

  it('black pawn can promote to queen', () => {
    const board = new Board()
    board.squares[1][5].piece = new Piece("pawn", "black")
    expect(board.move([1, 5], [0, 5])).toBe(true)
    expect(board.squares[0][5].piece.type === "queen").toBe(true)
  })

  // it('black pawn can capture en passant after enemy pawn moves 2', () => {
  //   const board = new Board()
  //   board.squares[1][3] = new Piece("pawn", "white")
  //   board.squares[3][
  //   expect(board.move([1, 3], [3, 3])).toBe(true)
  //   expect(board.move([3, 4]))
  //   ]
  // }

  it('black pawn can move 2 squares up board on first move', () => {
    const board = new Board()
    board.squares[5][5].piece = new Piece("pawn", "black")
    expect(board.move([5, 5], [3, 5])).toBe(true)
  })

  it('black pawn cannot move 2 squares up board after first move', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "black")
    expect(board.move([4, 5], [2, 5])).toBe(false)
  })

  it('black pawn cannot move into piece', () => {
    const board = new Board()
    board.squares[5][5].piece = new Piece("pawn", "black")
    board.squares[3][5].piece = new Piece("rook", "white")
    expect(board.move([5, 5], [3, 5])).toBe(false)
  })

  it('black pawn can capture enemy piece to the west', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "black")
    board.squares[3][4].piece = new Piece("knight", "white")
    expect(board.move([4, 5], [3, 4])).toBe(true)
  })

  it('black pawn can capture enemy piece to the east', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "black")
    board.squares[3][6].piece = new Piece("knight", "white")
    expect(board.move([4, 5], [3, 6])).toBe(true)
  })

  it('black pawn cannot capture friendly piece to the west', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "black")
    board.squares[3][4].piece = new Piece("knight", "black")
    expect(board.move([4, 5], [3, 4])).toBe(false)
  })

  it('black pawn cannot capture friendly piece to the east', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "black")
    board.squares[3][6].piece = new Piece("knight", "black")
    expect(board.move([4, 5], [3, 6])).toBe(false)
  })

  it('white pawn can move 1 square down board', () => {
    const board = new Board()
    board.squares[3][3].piece = new Piece("pawn", "white")
    expect(board.move([3, 3], [4, 3])).toBe(true)
  })

  it('white pawn can move 2 squares down board on first move', () => {
    const board = new Board()
    board.squares[2][5].piece = new Piece("pawn", "white")
    expect(board.move([2, 5], [4, 5])).toBe(true)
  })

  it('white pawn cannot move 2 squares down board after first move', () => {
    const board = new Board()
    board.squares[3][5].piece = new Piece("pawn", "white")
    expect(board.move([3, 5], [5, 5])).toBe(false)
  })

  it('white pawn cannot move into piece', () => {
    const board = new Board()
    board.squares[2][5].piece = new Piece("pawn", "white")
    board.squares[3][5].piece = new Piece("rook", "black")
    expect(board.move([2, 5], [4, 5])).toBe(false)
  })

  it('white pawn can capture enemy piece to the east', () => {
    const board = new Board()
    board.squares[3][4].piece = new Piece("pawn", "white")
    board.squares[4][5].piece = new Piece("knight", "black")
    expect(board.move([3, 4], [4, 5])).toBe(true)
  })

  it('white pawn can capture enemy piece to the west', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "white")
    board.squares[5][4].piece = new Piece("knight", "black")
    expect(board.move([4, 5], [5, 4])).toBe(true)
  })

  it('white pawn cannot capture friendly piece to the east', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "white")
    board.squares[5][6].piece = new Piece("knight", "white")
    expect(board.move([4, 5], [5, 6])).toBe(false)
  })

  it('white pawn cannot capture friendly piece to the west', () => {
    const board = new Board()
    board.squares[4][5].piece = new Piece("pawn", "white")
    board.squares[5][6].piece = new Piece("knight", "white")
    expect(board.move([4, 5], [5, 6])).toBe(false)
  })
})

  describe('board can update', () => {
    it('toSquare should contain piece type and color if move is valid', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("knight", "white")
      board.move([3, 3], [4, 5])
      expect(board.squares[4][5].piece.type === "knight" && board.squares[4][5].piece.color === "white").toBe(true)
    })

    it('fromSquare should become null if move is valid', () => {
      const board = new Board()
      board.squares[3][3].piece = new Piece("knight", "black")
      board.move([3, 3], [4, 5])
      expect(board.squares[3][3].piece === null).toBe(true)
    })
  })
});