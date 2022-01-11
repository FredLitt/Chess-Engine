// TODO: see how to import code into this file.
// Jest doesn't seem to support ES6 imports;
// we tried following this but it didn't work:
// https://jestjs.io/docs/ecmascript-modules

import { Board } from '../chessBoard'
// const { Board } = require('../src/chessBoard')

describe('Board', () => {
    it('can create a new board', () => {
      const board = new Board()
      expect(board.squares.length).toBe(8)
    })
})

// describe('Board', () => {
//   it('can create a new board', () => {
//     const board = new Board()
//     expect(board.squares.length).toBe(8);
//   });

//   describe('rook movement', () => {
//     it('rook can move down', () => {
//       const board = new Board()
//       board.squares[2][2].piece = new Piece("rook", "black")
//       expect(board.move([2, 2], [2, 5])).toBe(true)
//     })

//     it('rook can move up', () => {
//       const board = new Board()
//       board.squares[1][6].piece = new Piece("rook", "white")
//       expect(board.move([1, 6], [1, 3])).toBe(true)
//     })

//     it('rook can move to the right', () => {
//       const board = new Board()
//       board.squares[0][0].piece = new Piece("rook", "white")
//       expect(board.move([0, 0], [0, 2])).toBe(true)
//     })

//     it('rook can move to the left', () => {
//       const board = new Board()
//       board.squares[0][7].piece = new Piece("rook", "white")
//       expect(board.move([0, 7], [0, 0])).toBe(true)
//     })

//     it('rook cannot move diagonally', () => {
//       const board = new Board()
//       board.squares[0][0].piece = new Piece("rook", "white")
//       expect(board.move([0, 0], [1, 1])).toBe(false)
//     })

//     it('rook cannot move off the board', () => {
//       const board = new Board()
//       board.squares[0][7].piece = new Piece("rook", "white")
//       expect(board.move([0, 7], [0, 8])).toBe(false)
//     })

//     it('rook can capture enemy piece', () => {
//       const board = new Board()
//       board.squares[0][3].piece = new Piece("rook", "white")
//       board.squares[0][0].piece = new Piece("rook", "black")
//       expect(board.move([0, 3], [0, 0])).toBe(true)
//     })

//     it('rook cannot capture friendly piece', () => {
//       const board = new Board()
//       board.squares[0][3].piece = new Piece("rook", "white")
//       board.squares[0][0].piece = new Piece("rook", "white")
//       expect(board.move([0, 3], [0, 0])).toBe(false)
//     })

//     it('rook cannot move through friendly piece', () => {
//       const board = new Board()
//       board.squares[0][0].piece = new Piece("rook", "white")
//       board.squares[0][4].piece = new Piece("rook", "white")
//       expect(board.move([0, 0], [0, 6])).toBe(false)
//     })

//     it('rook cannot move through enemy piece', () => {
//       const board = new Board()
//       board.squares[0][0].piece = new Piece("rook", "white")
//       board.squares[0][4].piece = new Piece("rook", "black")
//       expect(board.move([0, 0], [0, 6])).toBe(false)
//     })
//   })

//   describe('bishop movement', () => {
//     it('bishop can move up and left', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       expect(board.move([3, 3], [0, 0])).toBe(true)
//     })

//     it('bishop can move up and right', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       expect(board.move([3, 3], [1, 5])).toBe(true)
//     })

//     it('bishop can move down and left', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       expect(board.move([3, 3], [5, 1])).toBe(true)
//     })

//     it('bishop can move down and right', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       expect(board.move([3, 3], [5, 5])).toBe(true)
//     })

//     it('bishop cannot move off the board', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       expect(board.move([3, 3], [-1, -1])).toBe(false)
//     })

//     it('bishop cannot move through piece', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       board.squares[2][2].piece = { type: "pawn" }
//       expect(board.move([3, 3], [1, 1])).toBe(false)
//     })

//     it('bishop can capture enemy piece', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       board.squares[2][2].piece = new Piece("rook", "white")
//       expect(board.move([3, 3], [2, 2])).toBe(true)
//     })

//     it('bishop cannot move through friendly piece', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "white")
//       board.squares[2][2].piece = new Piece("rook", "white")
//       expect(board.move([3, 3], [1, 1])).toBe(false)
//     })

//     it('bishop cannot move through enemy piece', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("bishop", "black")
//       board.squares[2][2].piece = new Piece("rook", "white")
//       expect(board.move([3, 3], [1, 1])).toBe(false)
//     })
//   })

// describe('queen movement', () => {
//   it('queen can move up and left', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("queen", "white")
//     expect(board.move([3, 3], [0, 0])).toBe(true)
//   })

//   it('queen can move up and right', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("queen", "white")
//     expect(board.move([3, 3], [1, 5])).toBe(true)
//   })

//   it('queen can move down and left', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("queen", "white")
//     expect(board.move([3, 3], [5, 1])).toBe(true)
//   })

//   it('queen can move down and right', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("queen", "white")
//     expect(board.move([3, 3], [5, 5])).toBe(true)
//   })

//   it('queen can move down', () => {
//     const board = new Board()
//     board.squares[0][2].piece = new Piece("queen", "white")
//     expect(board.move([0, 2], [0, 0])).toBe(true)
//   })

//   it('queen can move to the left', () => {
//     const board = new Board()
//     board.squares[0][1].piece = new Piece("queen", "white")
//     expect(board.move([0, 1], [0, 0])).toBe(true)
//   })

//   it('queen cannot move off the board', () => {
//     const board = new Board()
//     board.squares[0][7].piece = new Piece("queen", "white")
//     expect(board.move([0, 7], [0, 8])).toBe(false)
//   })

//   it('queen cannot move through piece', () => {
//     const board = new Board()
//     board.squares[0][3].piece = new Piece("queen", "white")
//     board.squares[0][0].piece = new Piece("queen", "white")
//     expect(board.move([0, 0], [0, 4])).toBe(false)
//   })
// })

// describe('knight movement', () => {
//   it('knight can move 2 left, 1 up', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [1, 2])).toBe(true)
//   })

//   it('knight can move 2 left, 1 down', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [1, 4])).toBe(true)
//   })

//   it('knight can move 1 left, 2 up', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [2, 1])).toBe(true)
//   })

//   it('knight can move 1 left, 2 down', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [2, 5])).toBe(true)
//   })

//   it('knight can move 2 right, 1 up', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [5, 2])).toBe(true)
//   })

//   it('knight can move 2 right, 1 down', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [5, 4])).toBe(true)
//   })

//   it('knight can move 1 right, 2 up', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [4, 1])).toBe(true)
//   })

//   it('knight can move 1 right, 2 down', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [4, 5])).toBe(true)
//   })

//   it('knight cannot move off board', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [-1, 2])).toBe(false)
//   })

//   it('knight cannot move like bishop', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [5, 5])).toBe(false)
//   })

//   it('knight cannot move like rook', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [3, 5])).toBe(false)
//   })

//   it('knight can capture enemy piece', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "white")
//     board.squares[4][5].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [4, 5])).toBe(true)
//     expect(board.squares[4][5].color === "white" && board.squares[4][5].type === "knight")
//   })

//   it('knight cannot capture friendly piece', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("knight", "black")
//     board.squares[3][5].piece = new Piece("knight", "black")
//     expect(board.move([3, 3], [3, 5])).toBe(false)
//   })
// })

// describe('pawn moves', () => {
//   it('black pawn can move 1 square up board', () => {
//     const board = new Board()
//     board.squares[5][5].piece = new Piece("pawn", "black")
//     expect(board.move([5, 5], [4, 5])).toBe(true)
//   })

//   it('black pawn can promote to queen', () => {
//     const board = new Board()
//     board.squares[1][5].piece = new Piece("pawn", "black")
//     expect(board.move([1, 5], [0, 5])).toBe(true)
//     expect(board.squares[0][5].piece.type === "queen").toBe(true)
//   })

//   // it('black pawn can capture en passant after enemy pawn moves 2', () => {
//   //   const board = new Board()
//   //   board.squares[1][3] = new Piece("pawn", "white")
//   //   board.squares[3][
//   //   expect(board.move([1, 3], [3, 3])).toBe(true)
//   //   expect(board.move([3, 4]))
//   //   ]
//   // }

//   it('black pawn can move 2 squares up board on first move', () => {
//     const board = new Board()
//     board.squares[5][5].piece = new Piece("pawn", "black")
//     expect(board.move([5, 5], [3, 5])).toBe(true)
//   })

//   it('black pawn cannot move 2 squares up board after first move', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "black")
//     expect(board.move([4, 5], [2, 5])).toBe(false)
//   })

//   it('black pawn cannot move into piece', () => {
//     const board = new Board()
//     board.squares[5][5].piece = new Piece("pawn", "black")
//     board.squares[3][5].piece = new Piece("rook", "white")
//     expect(board.move([5, 5], [3, 5])).toBe(false)
//   })

//   it('black pawn can capture enemy piece to the west', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "black")
//     board.squares[3][4].piece = new Piece("knight", "white")
//     expect(board.move([4, 5], [3, 4])).toBe(true)
//   })

//   it('black pawn can capture enemy piece to the east', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "black")
//     board.squares[3][6].piece = new Piece("knight", "white")
//     expect(board.move([4, 5], [3, 6])).toBe(true)
//   })

//   it('black pawn cannot capture friendly piece to the west', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "black")
//     board.squares[3][4].piece = new Piece("knight", "black")
//     expect(board.move([4, 5], [3, 4])).toBe(false)
//   })

//   it('black pawn cannot capture friendly piece to the east', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "black")
//     board.squares[3][6].piece = new Piece("knight", "black")
//     expect(board.move([4, 5], [3, 6])).toBe(false)
//   })

//   it('white pawn can move 1 square down board', () => {
//     const board = new Board()
//     board.squares[3][3].piece = new Piece("pawn", "white")
//     expect(board.move([3, 3], [4, 3])).toBe(true)
//   })

//   it('white pawn can move 2 squares down board on first move', () => {
//     const board = new Board()
//     board.squares[2][5].piece = new Piece("pawn", "white")
//     expect(board.move([2, 5], [4, 5])).toBe(true)
//   })

//   it('white pawn cannot move 2 squares down board after first move', () => {
//     const board = new Board()
//     board.squares[3][5].piece = new Piece("pawn", "white")
//     expect(board.move([3, 5], [5, 5])).toBe(false)
//   })

//   it('white pawn cannot move into piece', () => {
//     const board = new Board()
//     board.squares[2][5].piece = new Piece("pawn", "white")
//     board.squares[3][5].piece = new Piece("rook", "black")
//     expect(board.move([2, 5], [4, 5])).toBe(false)
//   })

//   it('white pawn can capture enemy piece to the east', () => {
//     const board = new Board()
//     board.squares[3][4].piece = new Piece("pawn", "white")
//     board.squares[4][5].piece = new Piece("knight", "black")
//     expect(board.move([3, 4], [4, 5])).toBe(true)
//   })

//   it('white pawn can capture enemy piece to the west', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "white")
//     board.squares[5][4].piece = new Piece("knight", "black")
//     expect(board.move([4, 5], [5, 4])).toBe(true)
//   })

//   it('white pawn cannot capture friendly piece to the east', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "white")
//     board.squares[5][6].piece = new Piece("knight", "white")
//     expect(board.move([4, 5], [5, 6])).toBe(false)
//   })

//   it('white pawn cannot capture friendly piece to the west', () => {
//     const board = new Board()
//     board.squares[4][5].piece = new Piece("pawn", "white")
//     board.squares[5][6].piece = new Piece("knight", "white")
//     expect(board.move([4, 5], [5, 6])).toBe(false)
//   })
// })

//   describe('board can update', () => {
//     it('toSquare should contain piece type and color if move is valid', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("knight", "white")
//       board.move([3, 3], [4, 5])
//       expect(board.squares[4][5].piece.type === "knight" && board.squares[4][5].piece.color === "white").toBe(true)
//     })

//     it('fromSquare should become null if move is valid', () => {
//       const board = new Board()
//       board.squares[3][3].piece = new Piece("knight", "black")
//       board.move([3, 3], [4, 5])
//       expect(board.squares[3][3].piece === null).toBe(true)
//     })
//   })
// });