
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
    // todo: validate there is a piece on the source
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

        // todo: look to left, down, up 

        if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          // todo: update the board 
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
    it('rook can move to the right', () => {
      const board = new Board()
      board.squares[0][0] = { type: "rook" }
      expect(board.move([0, 0], [0, 1])).toBe(true)   
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
      expect(board.move([0, 0], [0, 7])).toBe(false)
    })
  })
});

