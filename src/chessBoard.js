import { pieceSymbols } from './pieceSymbols.js';

export class Piece {
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
export class PlayedMove {
  constructor(movedPiece, fromSquare, toSquare) {
    this.movedPiece = movedPiece
    this.fromSquare = fromSquare
    this.toSquare = toSquare
  }
}
// Note about coordinates:
// Each square is [row, col], kind of like chess notation
export class Board {
  constructor() {
    this.squares = []
    for (let i = 0; i < 8; i++) {
      this.squares.push([null, null, null, null, null, null, null, null])
    }
    this.playedMoveList = []
    this.blackCapturedPieces = []
    this.whiteCapturedPieces = []
  }
  setToStartPosition(){
    this.squares[0][0] = new Piece("rook", "white", pieceSymbols.whiteRook)
    this.squares[0][1] = new Piece("knight", "white", pieceSymbols.whiteKnight)
    this.squares[0][2] = new Piece("bishop", "white", pieceSymbols.whiteBishop)
    this.squares[0][3] = new Piece("king", "white", pieceSymbols.whiteKing)
    this.squares[0][4] = new Piece("queen", "white", pieceSymbols.whiteQueen)
    this.squares[0][5] = new Piece("bishop", "white", pieceSymbols.whiteBishop)
    this.squares[0][6] = new Piece("knight", "white", pieceSymbols.whiteKnight)
    this.squares[0][7] = new Piece("rook", "white", pieceSymbols.whiteRook)
    this.squares[1][0] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][1] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][2] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][3] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][4] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][5] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][6] = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][7] = new Piece("pawn", "white", pieceSymbols.whitePawn)

    this.squares[7][0] = new Piece("rook", "black", pieceSymbols.blackRook)
    this.squares[7][1] = new Piece("knight", "black", pieceSymbols.blackKnight)
    this.squares[7][2] = new Piece("bishop", "black", pieceSymbols.blackBishop)
    this.squares[7][3] = new Piece("king", "black", pieceSymbols.blackKing)
    this.squares[7][4] = new Piece("queen", "black", pieceSymbols.blackQueen)
    this.squares[7][5] = new Piece("bishop", "black", pieceSymbols.blackBishop)
    this.squares[7][6] = new Piece("knight", "black", pieceSymbols.blackKnight)
    this.squares[7][7] = new Piece("rook", "black", pieceSymbols.blackRook)
    this.squares[6][0] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][1] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][2] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][3] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][4] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][5] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][6] = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][7] = new Piece("pawn", "black", pieceSymbols.blackPawn)
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >= 0 && col >= 0
  }
  isSquareOccupied(fromSquare, targetSquare) {
    const [row1, col1] = fromSquare
    const [row2, col2] = targetSquare
    if (this.squares[row2][col2] === null) return false
    if (this.squares[row1][col1].color === this.squares[row2][col2].color) return "byFriendlyPiece"
    return "byEnemyPiece"
  }

  // given two squares, are they the same?
  // TODO: replace calls to moveIsValid with using squaresEqual?
  squaresEqual(square1, square2) {
    return square1[0] === square2[0] && square1[1] === square2[1]
  }
  moveIsValid(validMoveList, targetSquare) {
    return validMoveList.find(square => square[0] === targetSquare[0] && square[1] === targetSquare[1])
  }
  // updateBoard(movedPiece, startSquare, endSquare){
  //   endSquare = movedPiece
  //   startSquare = null
  //   return true
  // }
  promotePawn(promotionSquare, chosenPiece, pieceColor) {
    // possible issue with captured promoted piece being incorrectly added to captured pieces array
    const [row, col] = promotionSquare
    this.squares[row][col] = new Piece(chosenPiece, pieceColor)
  }
  addMoveToPlayedMoveList(movedPiece, fromSquare, toSquare) {
    this.playedMoveList.push(new PlayedMove(movedPiece, fromSquare, toSquare))
    console.log(this.playedMoveList)
  }
  
  // Request a move from fromSquare to toSquare
  // each square is an array of [x, y] coordinates.
  // If move is valid, updates the board, adds to played move array and returns true
  // If not, returns false
  move(fromSquare, toSquare) {
    // TODO: Add pawn moves
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare

    const pieceAtFromSquare = this.squares[fromRow][fromCol]
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
            const targetSquare = rookDirections[direction]
            if (!this.isSquareOnBoard(targetSquare)) {
              continue
            }
            if (this.isSquareOccupied(fromSquare, targetSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, targetSquare) === "byEnemyPiece") {
              validToSquares.push(targetSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(targetSquare)
          }
        }
        if (this.moveIsValid(validToSquares, toSquare)) {
          const movedPiece = pieceAtFromSquare
          this.squares[toRow][toCol] = movedPiece
          this.squares[fromRow][fromCol] = null
          this.addMoveToPlayedMoveList(movedPiece, fromSquare, toSquare)
          return true
        } else {
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
            const currentSquare = bishopDirections[direction]
            if (!this.isSquareOnBoard(currentSquare)) continue
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece") {
              validToSquares.push(currentSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(currentSquare)
          }
        }
        if (this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = null
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
            const currentSquare = queenDirections[direction]
            if (!this.isSquareOnBoard(currentSquare)) continue
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece") {
              validToSquares.push(currentSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(currentSquare)
          }
        }
        if (this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = null
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
          const currentSquare = knightMoves[move]
          if (!this.isSquareOnBoard(currentSquare)) continue
          if (this.isSquareOccupied(fromSquare, currentSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, currentSquare) === "byEnemyPiece") {
            validToSquares.push(currentSquare)
            continue
          }
          validToSquares.push(currentSquare)
        }
        if (this.moveIsValid(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = null
          return true
        } else {
          return false
        }
      }
      case 'pawn': {
        let pawnMoves
        let startRow
        if (pieceAtFromSquare.color === "white") {
          pawnMoves = {
            "ForwardOne": [fromRow + 1, fromCol],
            "ForwardTwo": [fromRow + 2, fromCol],
            "CaptureWest": [fromRow + 1, fromCol - 1],
            "CaptureEast": [fromRow + 1, fromCol + 1]
          }
          startRow = 2
        } else {
          pawnMoves = {
            "ForwardOne": [fromRow - 1, fromCol],
            "ForwardTwo": [fromRow - 2, fromCol],
            "CaptureWest": [fromRow - 1, fromCol + 1],
            "CaptureEast": [fromRow - 1, fromCol - 1]
          }
          startRow = 5
        }
        const isOnStartRow = (fromRow === startRow)
        for (const move in pawnMoves) {
          const targetSquare = pawnMoves[move]
          if (move === "ForwardOne") {
            const invalidMove = this.isSquareOccupied(fromSquare, targetSquare)
            if (invalidMove) {
              delete pawnMoves["ForwardTwo"]
              continue
            }
          }
          if (move === "ForwardTwo") {
            const invalidMove = !isOnStartRow || this.isSquareOccupied(fromSquare, targetSquare)
            if (invalidMove) { continue }
          }
          if (move === "CaptureWest" || move === "CaptureEast") {
            if (this.isSquareOccupied(fromSquare, targetSquare) !== "byEnemyPiece") {
              continue
            }
          }
          validToSquares.push(targetSquare)
        }
        if (this.moveIsValid(validToSquares, toSquare)) {
          // Promotion check
          if (pieceAtFromSquare.color === "black" && toRow === 0 || pieceAtFromSquare.type === "white" && toRow === 7) {
            //queen by default
            //promote pawn function will be async when piece choice is added
            this.squares[fromRow][fromCol] = null
            const chosenPiece = 'queen'
            this.promotePawn(toSquare, chosenPiece, pieceAtFromSquare.color)
            return true
          }
          this.squares[toRow][toCol] = pieceAtFromSquare
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