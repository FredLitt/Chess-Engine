class Piece {
  constructor (type, color){
    this.type = type
    this.color = color
  }
}
// Note about coordinates:
// Each square is [row, col], kind of like chess notation
class Board {
  constructor () {
    this.squares = []
    for(let i = 0; i < 8; i++) {
      this.squares.push([null, null, null, null, null, null, null, null])
    }
    this.playedMoveList = []
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >=0 && col >= 0
  }
  isSquareOccupied(fromSquare, targetSquare){
    const [row1, col1] = fromSquare
    const [row2, col2] = targetSquare
    if (this.squares[row2][col2] === null) return false
    if (this.squares[row1][col1].color === this.squares[row2][col2].color){
      return "byFriendlyPiece"
    }
    return "byEnemyPiece"
  }
  isPieceFriendly(fromSquare, currentSquare){
    const [row1, col1] = fromSquare
    const [row2, col2] = currentSquare
    return (this.squares[row1][col1].color === this.squares[row2][col2].color)
  }
  moveIsValid(validMoveList, targetSquare){
    return validMoveList.find(square => square[0] === targetSquare[0] && square[1] === targetSquare[1])
  }
  // updateBoard(movedPiece, startSquare, endSquare){
  //   endSquare = movedPiece
  //   startSquare = null
  //   return true
  // }
  promotePawn(promotionSquare, chosenPiece){
    //promotionSquare = chosenPiece
  }
  // Request a move from fromSquare to toSquare
  // each square is an array of [x, y] coordinates.
  // If move is valid, updates the board and returns true
  // If not, returns false
  move(fromSquare, toSquare) {
    // TODO: Add pawn moves
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare

    const pieceAtFromSquare = this.squares[fromRow][fromCol]
    const validToSquares = []

    switch(pieceAtFromSquare.type) {
      case 'rook': {    
        const completedDirections = []
        for (let i = 1; i < 8; i++){
          const rookDirections = {
            "North": [fromRow - i, fromCol],
            "South": [fromRow + i, fromCol],
            "East": [fromRow, fromCol + i],
            "West": [fromRow, fromCol - i]
          }
          completedDirections.forEach(direction => delete rookDirections[direction])
          for (const direction in rookDirections){
            const currentSquare = rookDirections[direction]
            if (!this.isSquareOnBoard(currentSquare)) {
              continue
            }
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece"){
              completedDirections.push(direction)
              continue
              } 
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece"){
              validToSquares.push(currentSquare)
              completedDirections.push(direction)
              continue 
              }
              validToSquares.push(currentSquare)
          }
        }
        if(this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
    case 'bishop' : {
      const completedDirections = []
      for (let i = 1; i < 8; i++){
        const bishopDirections = {
          "NorthWest": [fromRow - i, fromCol - i ],
          "NorthEast": [fromRow - i, fromCol + i ],
          "SouthWest": [fromRow + i , fromCol - i],
          "SouthEast": [fromRow + i , fromCol + i]
        }
        completedDirections.forEach(direction => delete bishopDirections[direction])
        for (const direction in bishopDirections){
          const currentSquare = bishopDirections[direction]
          if (!this.isSquareOnBoard(currentSquare)) continue
          if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece"){
              completedDirections.push(direction)
              continue
              } 
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece"){
              validToSquares.push(currentSquare)
              completedDirections.push(direction)
              continue 
              }
              validToSquares.push(currentSquare)
          }
        }
      if(this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'queen' : {
        const completedDirections = []
        for (let i = 1; i < 8; i++){
        const queenDirections = {
          "North": [fromRow - i, fromCol ],
          "South": [fromRow + i, fromCol ],
          "East": [fromRow, fromCol + i ],
          "West": [fromRow, fromCol - i ],
          "NorthWest": [fromRow - i, fromCol - i ],
          "NorthEast": [fromRow - i, fromCol + i ],
          "SouthWest": [fromRow + i , fromCol - i],
          "SouthEast": [fromRow + i , fromCol + i]
        }
        completedDirections.forEach(direction => delete queenDirections[direction])
        for (const direction in queenDirections){
          const currentSquare = queenDirections[direction]
          if (!this.isSquareOnBoard(currentSquare)) continue
          if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece"){
              completedDirections.push(direction)
              continue
              } 
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece"){
              validToSquares.push(currentSquare)
              completedDirections.push(direction)
              continue 
              }
              validToSquares.push(currentSquare)
          }
        }
      if(this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'knight' : {
        const knightMoves = {
          "NorthOneEastTwo": [ fromRow - 1, fromCol + 2 ],
          "NorthTwoEastOne": [ fromRow - 2, fromCol + 1 ],
          "SouthOneEastTwo": [ fromRow + 1, fromCol + 2 ],
          "SouthTwoEastOne": [ fromRow + 2, fromCol + 1 ],
          "NorthOneWesttTwo": [ fromRow - 1, fromCol - 2 ],
          "NorthTwoWesttOne": [ fromRow - 2, fromCol - 1 ],
          "SouthOneWestTwo": [ fromRow + 1, fromCol - 2 ],
          "SouthTwoWestOne": [ fromRow + 2, fromCol - 1 ]
        }
        for (const move in knightMoves){
          const currentSquare = knightMoves[move]
          if (!this.isSquareOnBoard(currentSquare)) continue
          if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece"){
            continue
            } 
          if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece"){
            validToSquares.push(currentSquare)
            continue 
            }
            validToSquares.push(currentSquare)
        }
        if(this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'pawn' : {
        switch(pieceAtFromSquare.color) {
          case 'black' : {
          const blackPawnMoves = {
            "NorthOne": [ fromRow - 1, fromCol],
            "NorthTwo": [ fromRow - 2, fromCol],
            "CaptureWest": [ fromRow - 1, fromCol - 1], 
            "CaptureEast": [ fromRow - 1, fromCol + 1] 
          }
          for (const move in blackPawnMoves){
            const currentSquare = blackPawnMoves[move]
            if (move === "NorthOne" && !this.isSquareOccupied(fromSquare, currentSquare) === false){
              delete blackPawnMoves["NorthTwo"]
              continue
            }
            if (move === "NorthTwo" && fromRow !== 5 || move === "NorthTwo" && !this.isSquareOccupied(fromSquare, currentSquare) === false){
              continue
            }
            if (move === "CaptureWest" || move === "CaptureEast"){
              if (this.isSquareOccupied(fromSquare, currentSquare) !== "byEnemyPiece"){
                continue
              }
            }
            validToSquares.push(currentSquare)
          }
        }
        case 'white' : {
          const whitePawnMoves = {
            "SouthOne": [ fromRow + 1, fromCol ],
            "SouthTwo": [ fromRow + 2, fromCol ],
            "CaptureWest": [ fromRow + 1, fromCol - 1 ], 
            "CaptureEast": [ fromRow + 1, fromCol + 1 ] 
          }
          for (const move in whitePawnMoves){
            const currentSquare = whitePawnMoves[move]
            if (move === "SouthOne" && this.isSquareOccupied(fromSquare, currentSquare) !== false){
              delete whitePawnMoves["SouthTwo"]
              continue
            }
            if (move === "SouthTwo" && fromRow !== 2 || move === "SouthTwo" && this.isSquareOccupied(fromSquare, currentSquare) !== false){
              continue
            }
            if (move === "CaptureWest" || move === "CaptureEast")
              if(this.isSquareOccupied(fromSquare, currentSquare) !== "byEnemyPiece"){
              continue
            }
            validToSquares.push(currentSquare)
          }
        }
        if(this.moveIsValid(validToSquares, toSquare)) {
          // Promotion check
          if(pieceAtFromSquare.color === "black" && toRow === 0 || pieceAtFromSquare.type === "white" && toRow === 7)
          {
            //queen by default
            //promote pawn function will be async when piece choice is added
            const chosenPiece = 'queen'
            this.promotePawn(toSquare, pieceAtFromSquare.color, chosenPiece)
            return true
          }
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      }
      default: {
        throw new Error("unknown piece")
      }
    }
  }
}

// TODO:
// [ ] Pawn promotion when reaching opposite rank
// [ ] Add move to playedMoveList if move is true
// [ ] Add en passant captures by looking at playedMoveList

describe('Board', () => {
  it('can create a new board', () => {
    const board = new Board()
    expect(board.squares.length).toBe(8);
    expect(board.squares[0].length).toBe(8);
    expect(board.squares[0][0]).toBe(null);
  });

  describe('rook movement', () => {
    it('rook can move down', () => {
      const board = new Board()
      board.squares[2][2] = new Piece("rook", "black")
      expect(board.move([2, 2], [2, 5])).toBe(true)   
    })

    it('rook can move up', () => {
      const board = new Board()
      board.squares[1][6] = new Piece("rook", "white")
      expect(board.move([1, 6], [1, 3])).toBe(true)   
    })

    it('rook can move to the right', () => {
      const board = new Board()
      board.squares[0][0] = new Piece("rook", "white")
      expect(board.move([0, 0], [0, 2])).toBe(true)   
    })

    it('rook can move to the left', () => {
      const board = new Board()
      board.squares[0][7] = new Piece("rook", "white")
      expect(board.move([0, 7], [0, 0])).toBe(true)   
    })

    it('rook cannot move diagonally', () => {
      const board = new Board()
      board.squares[0][0] = new Piece("rook", "white")
      expect(board.move([0, 0], [1, 1])).toBe(false)   
    })

    it('rook cannot move off the board', () => {
      const board = new Board()
      board.squares[0][7] = new Piece("rook", "white")
      expect(board.move([0, 7], [0, 8])).toBe(false)   
    })

    it('rook can capture enemy piece', () => {
      const board = new Board()
      board.squares[0][3] = new Piece("rook", "white")
      board.squares[0][0] = new Piece("rook", "black")
      expect(board.move([0, 3], [0, 0])).toBe(true)
    })

    it('rook cannot capture friendly piece', () => {
      const board = new Board()
      board.squares[0][3] = new Piece("rook", "white")
      board.squares[0][0] = new Piece("rook", "white")
      expect(board.move([0, 3], [0, 0])).toBe(false)
    })

    it('rook cannot move through friendly piece', () => {
      const board = new Board()
      board.squares[0][0] = new Piece("rook", "white")
      board.squares[0][4] = new Piece("rook", "white")
      expect(board.move([0, 0], [0, 6])).toBe(false)
    })

    it('rook cannot move through enemy piece', () => {
      const board = new Board()
      board.squares[0][0] = new Piece("rook", "white")
      board.squares[0][4] = new Piece("rook", "black")
      expect(board.move([0, 0], [0, 6])).toBe(false)
    })
  })

  describe('bishop movement', () => {
    it('bishop can move up and left', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      expect(board.move([3, 3], [0, 0])).toBe(true)   
    })

    it('bishop can move up and right', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      expect(board.move([3, 3], [1, 5])).toBe(true)   
    })

    it('bishop can move down and left', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      expect(board.move([3, 3], [5, 1])).toBe(true)   
    })

    it('bishop can move down and right', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      expect(board.move([3, 3], [5, 5])).toBe(true)   
    })

    it('bishop cannot move off the board', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      expect(board.move([3, 3], [-1, -1])).toBe(false)   
    })

    it('bishop cannot move through piece', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      board.squares[2][2] = { type: "pawn" }
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })

    it('bishop can capture enemy piece', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      board.squares[2][2] = new Piece("rook", "white")
      expect(board.move([3, 3], [2, 2])).toBe(true)
    })

    it('bishop cannot move through friendly piece', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "white")
      board.squares[2][2] = new Piece("rook", "white")
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })

    it('bishop cannot move through enemy piece', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("bishop", "black")
      board.squares[2][2] = new Piece("rook", "white")
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })
  })

  })
  describe('queen movement', () => {
    it('queen can move up and left', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("queen", "white")
      expect(board.move([3, 3], [0, 0])).toBe(true)   
    })

    it('queen can move up and right', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("queen", "white")
      expect(board.move([3, 3], [1, 5])).toBe(true)   
    })

    it('queen can move down and left', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("queen", "white")
      expect(board.move([3, 3], [5, 1])).toBe(true)   
    })

    it('queen can move down and right', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("queen", "white")
      expect(board.move([3, 3], [5, 5])).toBe(true)   
    })
    it('queen can move down', () => {
      const board = new Board()
      board.squares[0][2] = new Piece("queen", "white")
      expect(board.move([0, 2], [0, 0])).toBe(true)   
    })
    it('queen can move to the left', () => {
      const board = new Board()
      board.squares[0][1] = new Piece("queen", "white")
      expect(board.move([0, 1], [0, 0])).toBe(true)   
    })

    it('queen cannot move off the board', () => {
      const board = new Board()
      board.squares[0][7] = new Piece("queen", "white")
      expect(board.move([0, 7], [0, 8])).toBe(false)   
    })

    it('queen cannot move through piece', () => {
      const board = new Board()
      board.squares[0][3] = new Piece("queen", "white")
      board.squares[0][0] = new Piece("queen", "white")
      expect(board.move([0, 0], [0, 4])).toBe(false)
    })
  })

  describe('knight movement', () => {
    it('knight can move 2 left, 1 up', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "black")
      expect(board.move([3, 3], [1, 2])).toBe(true)   
    })

    it('knight can move 2 left, 1 down', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [1, 4])).toBe(true)   
      })

    it('knight can move 1 left, 2 up', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [2, 1])).toBe(true)   
      })

    it('knight can move 1 left, 2 down', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [2, 5])).toBe(true)   
      })

    it('knight can move 2 right, 1 up', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [5, 2])).toBe(true)   
      })

    it('knight can move 2 right, 1 down', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [5, 4])).toBe(true)   
      })

    it('knight can move 1 right, 2 up', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [4, 1])).toBe(true)   
      })

    it('knight can move 1 right, 2 down', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [4, 5])).toBe(true)   
      })

    it('knight cannot move off board', () => {
        const board = new Board()
        board.squares[3][3] = new Piece("knight", "black")
        expect(board.move([3, 3], [-1, 2])).toBe(false)   
      })

    it('knight cannot move like bishop', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "black")
      expect(board.move([3, 3], [5, 5])).toBe(false)   
    })

    it('knight cannot move like rook', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "black")
      expect(board.move([3, 3], [3, 5])).toBe(false)   
    })

    it('knight can capture enemy piece', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "white")
      board.squares[4][5] = new Piece("knight", "black")
      expect(board.move([3, 3], [4, 5])).toBe(true)
      expect(board.squares[4][5].color === "white" && board.squares[4][5].type === "knight")   
    })

    it('knight cannot capture friendly piece', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "black")
      board.squares[3][5] = new Piece("knight", "black")
      expect(board.move([3, 3], [3, 5])).toBe(false)   
    })

  describe('pawn moves', () => {
    it('black pawn can move 1 square up board', () => {
      const board = new Board()
      board.squares[5][5] = new Piece("pawn", "black")
      expect(board.move([5, 5], [4, 5])).toBe(true)
    })

    it('black pawn can promote to queen', () => {
      const board = new Board()
      board.squares[1][5] = new Piece("pawn", "black")
      expect(board.move([1, 5], [0, 5])).toBe(true)
      expect(this.squares[0][5].type === "queen").toBe(true)
    })

    it('black pawn can move 2 squares up board on first move', () => {
      const board = new Board()
      board.squares[5][5] = new Piece("pawn", "black")
      expect(board.move([5, 5], [3, 5])).toBe(true)
    })

    it('black pawn cannot move 2 squares up board after first move', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "black")
      expect(board.move([4, 5], [2, 5])).toBe(false)
    })

    it('black pawn cannot move into piece', () => {
      const board = new Board()
      board.squares[5][5] = new Piece("pawn", "black")
      board.squares[3][5] = new Piece("rook", "white")
      expect(board.move([5, 5], [3, 5])).toBe(false)
    })

    it('black pawn can capture enemy piece to the west', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "black")
      board.squares[3][4] = new Piece("knight", "white")
      expect(board.move([4, 5], [3, 4])).toBe(true)
    })

    it('black pawn can capture enemy piece to the east', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "black")
      board.squares[3][6] = new Piece("knight", "white")
      expect(board.move([4, 5], [3, 6])).toBe(true)
    })

    it('black pawn cannot capture friendly piece to the west', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "black")
      board.squares[3][4] = new Piece("knight", "black")
      expect(board.move([4, 5], [3, 4])).toBe(false)
    })

    it('black pawn cannot capture friendly piece to the east', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "black")
      board.squares[3][6] = new Piece("knight", "black")
      expect(board.move([4, 5], [3, 6])).toBe(false)
    })

    it('white pawn can move 1 square down board', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("pawn", "white")
      expect(board.move([3, 3], [4, 3])).toBe(true)
    })

    it('white pawn can move 2 squares down board on first move', () => {
      const board = new Board()
      board.squares[2][5] = new Piece("pawn", "white")
      expect(board.move([2, 5], [4, 5])).toBe(true)
    })

    it('white pawn cannot move 2 squares down board after first move', () => {
      const board = new Board()
      board.squares[3][5] = new Piece("pawn", "white")
      expect(board.move([3, 5], [5, 5])).toBe(false)
    })

    it('white pawn cannot move into piece', () => {
      const board = new Board()
      board.squares[2][5] = new Piece("pawn", "white")
      board.squares[3][5] = new Piece("rook", "black")
      expect(board.move([2, 5], [4, 5])).toBe(false)
    })

    it('white pawn can capture enemy piece to the east', () => {
      const board = new Board()
      board.squares[3][4] = new Piece("pawn", "white")
      board.squares[4][5] = new Piece("knight", "black")
      expect(board.move([3, 4], [4, 5])).toBe(true)
    })

    it('white pawn can capture enemy piece to the west', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "white")
      board.squares[5][4] = new Piece("knight", "black")
      expect(board.move([4, 5], [5, 4])).toBe(true)
    })

    it('white pawn cannot capture friendly piece to the east', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "white")
      board.squares[5][6] = new Piece("knight", "white")
      expect(board.move([4, 5], [5, 6])).toBe(false)
    })

    it('white pawn cannot capture friendly piece to the west', () => {
      const board = new Board()
      board.squares[4][5] = new Piece("pawn", "white")
      board.squares[5][6] = new Piece("knight", "white")
      expect(board.move([4, 5], [5, 6])).toBe(false)
    })
  })

  describe('board can update', () => {
    it('toSquare should contain piece type and color if move is valid', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "white")
      board.move([3, 3], [4, 5])
      expect(board.squares[4][5].type === "knight" && board.squares[4][5].color === "white").toBe(true)
    })

    it('fromSquare should become null if move is valid', () => {
      const board = new Board()
      board.squares[3][3] = new Piece("knight", "black")
      board.move([3, 3], [4, 5])
      expect(board.squares[3][3] === null).toBe(true)
    })
  })
});