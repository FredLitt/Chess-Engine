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
  setToStartPosition(){
    this.squares[0][0].piece = new Piece("rook", "white", pieceSymbols.whiteRook)
    this.squares[0][1].piece = new Piece("knight", "white", pieceSymbols.whiteKnight)
    this.squares[0][2].piece = new Piece("bishop", "white", pieceSymbols.whiteBishop)
    this.squares[0][3].piece = new Piece("king", "white", pieceSymbols.whiteKing)
    this.squares[0][4].piece = new Piece("queen", "white", pieceSymbols.whiteQueen)
    this.squares[0][5].piece = new Piece("bishop", "white", pieceSymbols.whiteBishop)
    this.squares[0][6].piece = new Piece("knight", "white", pieceSymbols.whiteKnight)
    this.squares[0][7].piece = new Piece("rook", "white", pieceSymbols.whiteRook)
    this.squares[1][0].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][1].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][2].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][3].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][4].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][5].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][6].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)
    this.squares[1][7].piece = new Piece("pawn", "white", pieceSymbols.whitePawn)

    this.squares[7][0].piece = new Piece("rook", "black", pieceSymbols.blackRook)
    this.squares[7][1].piece = new Piece("knight", "black", pieceSymbols.blackKnight)
    this.squares[7][2].piece = new Piece("bishop", "black", pieceSymbols.blackBishop)
    this.squares[7][3].piece = new Piece("king", "black", pieceSymbols.blackKing)
    this.squares[7][4].piece = new Piece("queen", "black", pieceSymbols.blackQueen)
    this.squares[7][5].piece = new Piece("bishop", "black", pieceSymbols.blackBishop)
    this.squares[7][6].piece = new Piece("knight", "black", pieceSymbols.blackKnight)
    this.squares[7][7].piece = new Piece("rook", "black", pieceSymbols.blackRook)
    this.squares[6][0].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][1].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][2].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][3].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][4].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][5].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][6].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
    this.squares[6][7].piece = new Piece("pawn", "black", pieceSymbols.blackPawn)
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >= 0 && col >= 0
  }
  isSquareOccupied(fromSquare, targetSquare) {
    const [row1, col1] = fromSquare
    const [row2, col2] = targetSquare
    if (!this.squares[row2][col2].piece !== null) return false
    if (this.squares[row1][col1].color === this.squares[row2][col2].color) return "byFriendlyPiece"
    return "byEnemyPiece"
  }
  // given two squares, are they the same?
  // TODO: replace calls to moveIsValid with using squaresEqual?
  squaresEqual(square1, square2) {
    return square1[0] === square2[0] && square1[1] === square2[1]
  }
  promotePawn(promotionSquare, chosenPiece, pieceColor) {
    // possible issue with captured promoted piece being incorrectly added to captured pieces array
    const [row, col] = promotionSquare
    this.squares[row][col] = new Piece(chosenPiece, pieceColor)
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

    const pieceAtFromSquare = this.squares[fromRow][fromCol]

    const validToSquares = []

    const emptySquare = {
      piece: null,
    }

    switch (pieceAtFromSquare.piece.type) {
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
        if (this.squaresEqual(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = emptySquare
          this.addMoveToPlayedMoveList(fromSquare, toSquare)
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
            const targetSquare = bishopDirections[direction]
            if (!this.isSquareOnBoard(targetSquare)) continue
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
        if (this.squaresEqual(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = emptySquare
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
            const targetSquare = queenDirections[direction]
            if (!this.isSquareOnBoard(targetSquare)) continue
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
        if (this.squaresEqual(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = emptySquare
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
          const targetSquare = kingDirections[direction]
          if (!this.isSquareOnBoard(targetSquare)) continue
          if (this.isSquareOccupied(fromSquare, targetSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, targetSquare) === "byEnemyPiece") {
            validToSquares.push(targetSquare)
            continue
          }
          validToSquares.push(targetSquare)
        }
        if (this.squaresEqual(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = emptySquare
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
          const targetSquare = knightMoves[move]
          if (!this.isSquareOnBoard(targetSquare)) continue
          if (this.isSquareOccupied(fromSquare, targetSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, targetSquare) === "byEnemyPiece") {
            validToSquares.push(targetSquare)
            continue
          }
          validToSquares.push(targetSquare)
        }
        if (this.squaresEqual(validToSquares, toSquare)) {
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = emptySquare
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
        const isOnPromotionRow = (fromRow === promotionRow)
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
        if (this.squaresEqual(validToSquares, toSquare)) {
          // Promotion check
          if (pieceAtFromSquare.color === "black" && isOnPromotionRow || pieceAtFromSquare.type === "white" && isOnPromotionRow) {
            //queen by default
            //promote pawn function will be async when piece choice is added
            this.squares[fromRow][fromCol] = emptySquare
            const chosenPiece = 'queen'
            this.promotePawn(toSquare, chosenPiece, pieceAtFromSquare.color)
            this.addMoveToPlayedMoveList(fromSquare, toSquare)
            return true
          }
          this.squares[toRow][toCol] = pieceAtFromSquare
          this.squares[fromRow][fromCol] = emptySquare
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