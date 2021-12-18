// Note about coordinates:
// Each square is [row, col], kind of like chess notation
class Board {
  constructor () {
    this.squares = []
    for(let i = 0; i < 8; i++) {
      this.squares.push([null, null, null, null, null, null, null, null])
    }
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >=0 && col >= 0
  }
  isSquareOccupied(square){
    const [row, col] = square
    if (this.squares[row][col] !== null){ 
      return true
    } else {
      return false
    }
  }
  // Request a move from fromSquare to toSquare
  // each square is an array of [x, y] coordinates.
  // If move is valid, updates the board and returns true
  // If not, returns false
  move(fromSquare, toSquare) {
    // TODO: Refactor queen, rook and bishop move loops
    // TODO: validate there is a piece on the source
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare

    const pieceAtFromSquare = this.squares[fromRow][fromCol]
    const validToSquares = []

    switch(pieceAtFromSquare.type) {
      case 'rook': {
        // look to the right 
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow, fromCol + i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        // look to the left
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow, fromCol - i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.squares[fromRow][fromCol - i] !== null){
            if (this.squares[fromRow][fromCol].color === this.squares[fromRow][fromCol - i].color){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          // if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        //look up
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow + i , fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        //look down
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow - i, fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = { type: 'rook' }
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
    case 'bishop' : {
        // look up and left
        for (let i = 1; i <= 8; i++){
          const currentSquare = [fromRow - i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
        // look up and right
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow - i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
        // look down and left
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow + i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
        // look down and right
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow + i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
      if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = { type: 'bishop' }
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'queen' : {
        // look to the right 
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow, fromCol + i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        // look to the left
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow, fromCol - i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        //look up
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow + i , fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        //look down
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow - i, fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
        }
        // look up and left
        for (let i = 1; i <= 8; i++){
          const currentSquare = [fromRow - i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
        // look up and right
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow - i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
        // look down and left
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow + i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
        // look down and right
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow + i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
          validToSquares.push(currentSquare)
      }
      if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = { type: 'queen' }
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'knight' : {
        const currentSquare = []
        for (let i = -2; i <= 2; i++){
          if (i === 0){
            continue
          }
          for (let x = -2; x <= 2; x++){
           if (i === x){
             continue
           } 
           const currentSquare = [ fromRow + i, fromCol + x]
           if (!this.isSquareOnBoard(currentSquare)) continue
           if (this.isSquareOccupied(currentSquare)) return false //TODO: && piece is not opposing color
           validToSquares.push(currentSquare)
          }
        }
      if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = { type: 'knight' }
          this.squares[fromRow][fromCol] = null
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
    expect(board.squares[0].length).toBe(8);
    expect(board.squares[0][0]).toBe(null);
  });

  describe('rook movement', () => {
    it('rook can move down', () => {
      const board = new Board()
      board.squares[0][2] = { type: "rook" }
      expect(board.move([0, 2], [0, 0])).toBe(true)   
    })
    it('rook can move to the left', () => {
      const board = new Board()
      board.squares[0][3] = { type: "rook", color: "black" }
      board.squares[0][2] = { type: "rook", color: "white" }
      expect(board.move([0, 3], [0, 2])).toBe(true)   
    })

    it('rook cannot move diagonally', () => {
      const board = new Board()
      board.squares[0][0] = { type: "rook" }
      expect(board.move([0, 0], [1, 1])).toBe(false)   
    })

    it('rook cannot move off the board', () => {
      const board = new Board()
      board.squares[0][7] = { type: "rook" }
      expect(board.move([0, 7], [0, 8])).toBe(false)   
    })

    it('rook cannot move through piece', () => {
      const board = new Board()
      board.squares[0][3] = { type: "rook" }
      board.squares[0][0] = { type: "rook" }
      expect(board.move([0, 0], [0, 4])).toBe(false)
    })
  })
  describe('bishop movement', () => {
    it('bishop can move up and left', () => {
      const board = new Board()
      board.squares[3][3] = { type: "bishop" }
      expect(board.move([3, 3], [0, 0])).toBe(true)   
    })

    it('bishop can move up and right', () => {
      const board = new Board()
      board.squares[3][3] = { type: "bishop" }
      expect(board.move([3, 3], [1, 5])).toBe(true)   
    })

    it('bishop can move down and left', () => {
      const board = new Board()
      board.squares[3][3] = { type: "bishop" }
      expect(board.move([3, 3], [5, 1])).toBe(true)   
    })

    it('bishop can move down and right', () => {
      const board = new Board()
      board.squares[3][3] = { type: "bishop" }
      expect(board.move([3, 3], [5, 5])).toBe(true)   
    })

    it('bishop cannot move off the board', () => {
      const board = new Board()
      board.squares[3][3] = { type: "bishop" }
      expect(board.move([3, 3], [-1, -1])).toBe(false)   
    })

    it('bishop cannot move through piece', () => {
      const board = new Board()
      board.squares[3][3] = { type: "bishop" }
      board.squares[2][2] = { type: "pawn" }
      expect(board.move([3, 3], [1, 1])).toBe(false)
    })

  })
  describe('queen movement', () => {
    it('queen can move up and left', () => {
      const board = new Board()
      board.squares[3][3] = { type: "queen" }
      expect(board.move([3, 3], [0, 0])).toBe(true)   
    })

    it('queen can move up and right', () => {
      const board = new Board()
      board.squares[3][3] = { type: "queen" }
      expect(board.move([3, 3], [1, 5])).toBe(true)   
    })

    it('queen can move down and left', () => {
      const board = new Board()
      board.squares[3][3] = { type: "queen" }
      expect(board.move([3, 3], [5, 1])).toBe(true)   
    })

    it('queen can move down and right', () => {
      const board = new Board()
      board.squares[3][3] = { type: "queen" }
      expect(board.move([3, 3], [5, 5])).toBe(true)   
    })
    it('queen can move down', () => {
      const board = new Board()
      board.squares[0][2] = { type: "queen" }
      expect(board.move([0, 2], [0, 0])).toBe(true)   
    })
    it('queen can move to the left', () => {
      const board = new Board()
      board.squares[0][1] = { type: "queen" }
      expect(board.move([0, 1], [0, 0])).toBe(true)   
    })

    it('queen cannot move off the board', () => {
      const board = new Board()
      board.squares[0][7] = { type: "queen" }
      expect(board.move([0, 7], [0, 8])).toBe(false)   
    })

    it('queen cannot move through piece', () => {
      const board = new Board()
      board.squares[0][3] = { type: "queen" }
      board.squares[0][0] = { type: "queen" }
      expect(board.move([0, 0], [0, 4])).toBe(false)
    })
  })

  describe('knight movement', () => {
    it('knight can move 2 left, 1 up', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [1, 2])).toBe(true)   
    })

  it('knight can move 2 left, 1 down', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [1, 4])).toBe(true)   
    })

  it('knight can move 1 left, 2 up', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [2, 1])).toBe(true)   
    })

  it('knight can move 1 left, 2 down', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [2, 5])).toBe(true)   
    })

  it('knight can move 2 right, 1 up', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [5, 2])).toBe(true)   
    })

  it('knight can move 2 right, 1 down', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [5, 4])).toBe(true)   
    })

  it('knight can move 1 right, 2 up', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [4, 1])).toBe(true)   
    })

  it('knight can move 1 right, 2 down', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [4, 5])).toBe(true)   
    })

  it('knight cannot move off board', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight" }
      expect(board.move([3, 3], [-1, 2])).toBe(false)   
    })

  it('knight cannot move like bishop', () => {
    const board = new Board()
    board.squares[3][3] = { type: "knight" }
    expect(board.move([3, 3], [5, 5])).toBe(false)   
  })

  it('knight cannot move like rook', () => {
    const board = new Board()
    board.squares[3][3] = { type: "knight" }
    expect(board.move([3, 3], [3, 5])).toBe(false)   
  })

  describe('board can update', () => {
    it('toSquare should contain piece type if move is valid', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight"}
      board.move([3, 3], [4, 5])
      expect(board.squares[4][5].type === "knight").toBe(true)
    })
    it('fromSquare should become null if move is valid', () => {
      const board = new Board()
      board.squares[3][3] = { type: "knight"}
      board.move([3, 3], [4, 5])
      expect(board.squares[3][3] === null).toBe(true)
    })
  })
  })
});

