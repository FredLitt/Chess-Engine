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
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >=0 && col >= 0
  }
  isSquareOccupied(square){
    const [row, col] = square
    if (this.squares[row][col] !== null) return true
  }
  isPieceFriendly(fromSquare, currentSquare){
    const [row1, col1] = fromSquare
    const [row2, col2] = currentSquare
    return (this.squares[row1][col1].color === this.squares[row2][col2].color)
  }
  // Request a move from fromSquare to toSquare
  // each square is an array of [x, y] coordinates.
  // If move is valid, updates the board and returns true
  // If not, returns false
  move(fromSquare, toSquare) {
    // TODO: Refactor queen, rook and bishop move loops
    // TODO: Add pawn moves
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare

    const pieceAtFromSquare = this.squares[fromRow][fromCol]
    const validToSquares = []

    switch(pieceAtFromSquare.type) {
      case 'rook': {    
        // const rookDirections = {
        // "Right": [fromRow, fromCol + i],
        // "Left": [fromRow, fromCol - i],
        // "Up": [fromRow - i, fromCol],
        // "Down": [fromRow + i, fromCol]
        // }
        // for (let i = 1; i < 8; i++){
        //   for (const direction in rookDirections){
        //     if (rookDirections.hasOwnProperty(direction)){
        //     const currentSquare = rookDirections[direction]
        //       if (!this.isSquareOnBoard(currentSquare)){
        //         delete rookDirections[direction]
        //         continue
        //       }
        //       if (this.isSquareOccupied(currentSquare)){
        //         console.log(fromSquare)
        //         console.log("square is occupied")
        //         if (this.isPieceFriendly(fromSquare, currentSquare)){
        //           console.log("friendly piece")
        //           console.log(direction)
        //           delete rookDirections[direction]
        //           continue
        //         } else {
        //         console.log("enemy piece")
        //         validToSquares.push(currentSquare)
        //         delete rookDirections[direction]
        //         console.log(direction)
        //         console.log(rookDirections)
        //         continue 
        //         }
        //       } else {
        //         validToSquares.push(currentSquare)
        //       }
        //       console.log(rookDirections)
        //       //else {
        //       //     validToSquares.push(currentSquare)
        //       //     break
        //       //   }
        //       // }
        //       // validToSquares.push(currentSquare)
        //     }
        //   }

        for(let i = 1; i < 8; i++) {
          const currentSquare = [fromRow, fromCol + i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        // look to the left
        for(let i = 1; i < 8; i++) {
          const currentSquare = [fromRow, fromCol - i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        //look up
        for(let i = 1; i < 8; i++) {
          const currentSquare = [fromRow + i , fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        //look down
        for(let i = 1; i < 8; i++) {
          const currentSquare = [fromRow - i, fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
    case 'bishop' : {
        // look up and left
        for (let i = 1; i < 8; i++){
          const currentSquare = [fromRow - i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
        // look up and right
        for (let i = 1; i < 8; i++){      
          const currentSquare = [fromRow - i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
        // look down and left
        for (let i = 1; i < 8; i++){      
          const currentSquare = [fromRow + i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
        // look down and right
        for (let i = 1; i < 8; i++){      
          const currentSquare = [fromRow + i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
      if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
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
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        // look to the left
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow, fromCol - i]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        //look up
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow + i , fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        //look down
        for(let i = 1; i <= 8; i++) {
          const currentSquare = [fromRow - i, fromCol ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
        }
        // look up and left
        for (let i = 1; i <= 8; i++){
          const currentSquare = [fromRow - i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
        // look up and right
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow - i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
        // look down and left
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow + i , fromCol - i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
        // look down and right
        for (let i = 1; i <= 8; i++){      
          const currentSquare = [fromRow + i , fromCol + i ]
          if (!this.isSquareOnBoard(currentSquare)) break
          if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
          validToSquares.push(currentSquare)
      }
      if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
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
           if (this.isSquareOccupied(currentSquare)){
            if (this.isPieceFriendly(fromSquare, currentSquare)){
              return false
            } else {
              validToSquares.push(currentSquare)
              break
            }
          }
           validToSquares.push(currentSquare)
          }
        }
      if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'pawn' : {
        if (pieceAtFromSquare.color === "black"){
          //attacking squares: [ fromRow - 1, fromCol - 1] and [ fromRow - 1, fromCol +1]
          const currentSquare = [ fromRow - 1, fromCol]
          if (this.isSquareOccupied(currentSquare)){
            return false
          }
          validToSquares.push(currentSquare)
          //start position
          if (fromRow === 5){
            const currentSquare = [ fromRow - 2, fromCol]
            if (this.isSquareOccupied(currentSquare)){
              return false
            }
            validToSquares.push(currentSquare)
          }
        }
        if (pieceAtFromSquare.color === "white"){
          //attacking squares: [ fromRow + 1, fromCol - 1] and [ fromRow + 1, fromCol +1]
          const currentSquare = [ fromRow + 1, fromCol]
          if (this.isSquareOccupied(currentSquare)){
            return false
          }
          validToSquares.push(currentSquare)
          if (fromRow === 2){
            const currentSquare = [ fromRow + 2, fromCol]
            if (this.isSquareOccupied(currentSquare)){
              return false
            }
            validToSquares.push(currentSquare)
          }
        }
        if(validToSquares.find(square => square[0] === toSquare[0] && square[1] === toSquare[1])) {
          this.squares[toRow][toCol] = new Piece(pieceAtFromSquare.type, pieceAtFromSquare.color)
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