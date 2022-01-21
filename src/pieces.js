export const pieces = {}

class King {
  constructor(color){
    this.type = "king"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteKing
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackKing
    }
  }

  isMoveSafe(board, fromSquare, testSquare){
    let opponentsColor
    if (this.color = "white") { opponentsColor = "black" }
    if (this.color = "black") { opponentsColor = "white" }
    const [fromRow, fromCol] = fromSquare
    const [testRow, testCol] = testSquare

    board.squares[fromRow][fromCol].piece = null
    const unsafeSquares = board.findAttackedSquares(opponentsColor)
    if(board.arrayContainsSquare(unsafeSquares, testSquare)){
      board.squares[fromRow][fromCol].piece = this
      return false
    }
    board.squares[fromRow][fromCol].piece = this
    return true
  }

  findPossibleMoves(board, fromSquare, findingControlledSquares){
      const possibleMoves = []
      
      const [fromRow, fromCol] = fromSquare
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

        if(findingControlledSquares && board.isSquareOnBoard(possibleSquare)){ 
          possibleMoves.push(possibleSquare)
          continue 
        } else {
        const invalidMove = (!board.isSquareOnBoard(possibleSquare) || board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece")
        if(invalidMove) { continue }
        if(this.isMoveSafe(board, fromSquare, possibleSquare)){
          possibleMoves.push(possibleSquare)
          
          continue
        }
        
        //possibleMoves.push(possibleSquare)
        }
    }
    return possibleMoves
  }
}

class Queen {
  constructor(color){
    this.type = "queen"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteQueen
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackQueen
    }
  }
  findPossibleMoves(board, fromSquare, findingControlledSquares){
    const possibleMoves = []
    const [fromRow, fromCol] = fromSquare
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
        
        if (!board.isSquareOnBoard(possibleSquare)) continue
        if (board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
          if (findingControlledSquares){
              possibleMoves.push(possibleSquare)
            }
            completedDirections.push(direction)
            continue
          }
        if (board.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
          possibleMoves.push(possibleSquare)
          completedDirections.push(direction)
          continue
        }
        possibleMoves.push(possibleSquare)
      }
    }
    return possibleMoves
  }
}

class Bishop {
  constructor(color){
    this.type = "bishop"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteBishop
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackBishop
    }
  }
  findPossibleMoves(board, fromSquare, findingControlledSquares){
    let possibleMoves = []
    const [fromRow, fromCol] = fromSquare
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
          if (!board.isSquareOnBoard(possibleSquare)) { continue }
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            if (findingControlledSquares){
              possibleMoves.push(possibleSquare)
            }
            completedDirections.push(direction)
            continue
          }
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            possibleMoves.push(possibleSquare)
            completedDirections.push(direction)
            continue
          }
          possibleMoves.push(possibleSquare)
        }
      }
      return possibleMoves
    }
}

class Rook {
  constructor(color){
    this.type = "rook"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteRook
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackRook
    }
  }
  findPossibleMoves(board, fromSquare, findingControlledSquares){
    let possibleMoves = []
    const [fromRow, fromCol] = fromSquare
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
          if (!board.isSquareOnBoard(possibleSquare)) {
            continue
          }
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            if (findingControlledSquares === true){
              possibleMoves.push(possibleSquare)
              completedDirections.push(direction)
              continue
            } else {
            completedDirections.push(direction)
            continue
            }
          }
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            possibleMoves.push(possibleSquare)
            completedDirections.push(direction)
            continue
          }
          possibleMoves.push(possibleSquare)
        }
      }
      return possibleMoves
  }
}

class Knight {
  constructor(color){
    this.type = "knight"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteKnight
      } else if(color === "black"){
        this.symbol = pieceSymbols.blackKnight
      }
    }
    findPossibleMoves(board, fromSquare, findingControlledSquares){
      const possibleMoves = []
      const [fromRow, fromCol] = fromSquare
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
          
          if (!board.isSquareOnBoard(possibleSquare)) { continue }
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            if(findingControlledSquares){
              possibleMoves.push(possibleSquare)
              }
            continue
          }
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            possibleMoves.push(possibleSquare)
            continue
          }
          possibleMoves.push(possibleSquare)
        }
        return possibleMoves       
      }
    }

export class Pawn {
  constructor(color){
    this.type = "pawn"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whitePawn
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackPawn
    }
  }
  checkForEnPassantCapture(currentSquare, enPassantRow, lastPlayedMove){
    let enPassantCaptureSquare
    const [row, col] = currentSquare
    if (row !== enPassantRow || lastPlayedMove.piece.type !== "pawn"){
      return null 
    }
    const pawnMovedTwoSquares = (Math.abs((lastPlayedMove.toSquare[0] - lastPlayedMove.fromSquare[0])) == 2)
    const pawnIsOnSameRow = (row === lastPlayedMove.toSquare[0])
    const pawnIsOnAdjacentColumn = (col === (lastPlayedMove.toSquare[1] + 1) || col === (lastPlayedMove.toSquare[1] - 1))
    const pawnIsOnAdjacentSquare = (pawnIsOnSameRow && pawnIsOnAdjacentColumn)
    if(pawnIsOnAdjacentSquare && pawnMovedTwoSquares){
      if(this.color === "black"){
      enPassantCaptureSquare = [lastPlayedMove.toSquare[0]-1,lastPlayedMove.toSquare[1]]
      }
      if(this.color === "white"){
        enPassantCaptureSquare = [lastPlayedMove.toSquare[0]+1,lastPlayedMove.toSquare[1]]
      }
      return enPassantCaptureSquare
      }
      else { 
        return null
      }
  }

  findPossibleMoves(board, fromSquare, findingControlledSquares){
    const lastPlayedMove = board.findLastPlayedMove()
    let possibleMoves = []
    const [fromRow, fromCol] = fromSquare
    let pawnMoves
    let startRow
    let enPassantRow
    if (this.color === "white") {
      pawnMoves = {
        "ForwardOne": [fromRow + 1, fromCol],
        "ForwardTwo": [fromRow + 2, fromCol],
        "CaptureWest": [fromRow + 1, fromCol - 1],
        "CaptureEast": [fromRow + 1, fromCol + 1]
      }
      startRow = 1
      enPassantRow = 4
    } if (this.color === "black") {
      pawnMoves = {
        "ForwardOne": [fromRow - 1, fromCol],
        "ForwardTwo": [fromRow - 2, fromCol],
        "CaptureWest": [fromRow - 1, fromCol + 1],
        "CaptureEast": [fromRow - 1, fromCol - 1]
      }
      startRow = 6
      enPassantRow = 3
    }
    const isOnStartRow = (fromRow === startRow)
    let enPassantCaptureSquare = null
    if(lastPlayedMove !== null){
      enPassantCaptureSquare = this.checkForEnPassantCapture(fromSquare, enPassantRow, lastPlayedMove)
      }
    if (enPassantCaptureSquare !== null){
      possibleMoves.push(enPassantCaptureSquare)
    }
    for (const move in pawnMoves) {
      const possibleSquare = pawnMoves[move]
      if (move === "ForwardOne") {
        if(findingControlledSquares){ continue }
        const invalidMove = board.isSquareOccupied(fromSquare, possibleSquare)
        if (invalidMove) {
          delete pawnMoves["ForwardTwo"]
          continue
        }
      }
      if (move === "ForwardTwo") {
        if(findingControlledSquares){ continue }
        const invalidMove = (!isOnStartRow || board.isSquareOccupied(fromSquare, possibleSquare))
        if (invalidMove) { continue }
      }
      if (move === "CaptureWest" || move === "CaptureEast") {
        const invalidMove = (!board.isSquareOnBoard(possibleSquare) || board.isSquareOccupied(fromSquare, possibleSquare) !== "byEnemyPiece")
        if (invalidMove) { continue }
      }
      possibleMoves.push(possibleSquare)
    }
    return possibleMoves
  }
}

export const pieceSymbols = {
  whiteKing: '\u2654',
  whiteQueen: '\u2655',
  whiteRook: '\u2656',
  whiteBishop: '\u2657',
  whiteKnight: '\u2658',
  whitePawn: '\u2659',

  blackKing: '\u265A',
  blackQueen: '\u265B',
  blackRook: '\u265C',
  blackBishop: '\u265D',
  blackKnight: '\u265E',
  blackPawn: '\u265F'
} 

const whitePawn = new Pawn("white")
const whiteKnight = new Knight("white")
const whiteBishop = new Bishop("white")
const whiteRook = new Rook("white")
const whiteQueen = new Queen("white")
const whiteKing = new King("white")

const blackPawn = new Pawn("black")
const blackKnight = new Knight("black")
const blackBishop = new Bishop("black")
const blackRook = new Rook("black")
const blackQueen = new Queen("black")
const blackKing = new King("black")

pieces.whitePawn = whitePawn
pieces.whiteKnight = whiteKnight
pieces.whiteBishop = whiteBishop
pieces.whiteRook = whiteRook
pieces.whiteQueen = whiteQueen
pieces.whiteKing = whiteKing

pieces.blackPawn = blackPawn
pieces.blackKnight = blackKnight
pieces.blackBishop = blackBishop
pieces.blackRook = blackRook
pieces.blackQueen = blackQueen
pieces.blackKing = blackKing