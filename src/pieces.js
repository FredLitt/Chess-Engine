export const pieces = {}

class Piece {
  constructor(type, color, symbol) {
    this.type = type
    this.color = color
    this.symbol = symbol
  }
}

const pieceSymbols = {
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

export class King {
  constructor(color){
    this.type = "king"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteKing
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackKing
    }
  }
  findPossibleMoves(board, fromSquare){
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
        if (!board.isSquareOnBoard(possibleSquare)) continue
        if (board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
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

export class Queen {
  constructor(color){
    this.type = "queen"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteQueen
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackQueen
    }
  }
  findPossibleMoves(board, fromSquare){
    const possibleSquares = []
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
          completedDirections.push(direction)
          continue
        }
        if (board.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
          possibleSquares.push(possibleSquare)
          completedDirections.push(direction)
          continue
        }
        possibleSquares.push(possibleSquare)
      }
    }
    return possibleSquares
  }
}

export class Bishop {
  constructor(color){
    this.type = "bishop"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteBishop
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackBishop
    }
  }
  findPossibleMoves(board, fromSquare){
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

export class Rook {
  constructor(color){
    this.type = "rook"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteRook
    } else if(color === "black"){
      this.symbol = pieceSymbols.blackRook
    }
  }
  findPossibleMoves(board, fromSquare){
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

export class Knight {
  constructor(color){
    this.type = "knight"
    this.color = color
    if(color === "white"){
      this.symbol = pieceSymbols.whiteKnight
      } else if(color === "black"){
        this.symbol = pieceSymbols.blackKnight
      }
    }
    findPossibleMoves(board, fromSquare){
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
          if (!board.isSquareOnBoard(possibleSquare)) continue
          if (board.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
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
  displayPromotablePieces(){
    
  }
  promote(promotionSquare){

  }
  checkIfEnPassantIsValid(){
     // EN PASSANT CHECK
        // if (fromRow === enPassantRow){
        //   const lastPlayedMove = board.playedMoveList[board.playedMoveList.length-1]
        //   const lastMovedPiece = board.squares[lastPlayedMove.toSquare[0]][lastPlayedMove.toSquare[1]].piece.type
        //   const distancePawnMoved = Math.abs((lastPlayedMove.toSquare[0] -  lastPlayedMove.fromSquare[0]))
        //   if (lastMovedPiece === "pawn" && distancePawnMoved === 2){
        //     const pawnIsOnSameRow = (fromRow === lastPlayedMove.toSquare[0])
        //     const pawnIsOnAdjacentColumn = (fromCol === (lastPlayedMove.toSquare[1] + 1) || fromCol === (lastPlayedMove.toSquare[1] - 1))
        //     const pawnIsOnAdjacentSquare = (pawnIsOnSameRow && pawnIsOnAdjacentColumn)
        //     if(pawnIsOnAdjacentSquare){
        //       const moveWasAcapture = true
        //       const squareOfCapturedPawn = board.squares[enPassantRow][toCol]
        //       squareOfCapturedPawn.piece = null
        //       board.updateBoard(startSquare, targetSquare, movingPiece)
        //       board.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasAcapture)
        //       return true
        //     }
        //   }
        // }
  }
  findPossibleMoves(board, fromSquare){
    let possibleMoves = []
    const [fromRow, fromCol] = fromSquare
    let pawnMoves
    let startRow
    let enPassantRow
    let promotionRow
    if (this.color === "white") {
      pawnMoves = {
        "ForwardOne": [fromRow + 1, fromCol],
        "ForwardTwo": [fromRow + 2, fromCol],
        "CaptureWest": [fromRow + 1, fromCol - 1],
        "CaptureEast": [fromRow + 1, fromCol + 1]
      }
      startRow = 1
      promotionRow = 7
      enPassantRow = 4
    } if (this.color === "black") {
      pawnMoves = {
        "ForwardOne": [fromRow - 1, fromCol],
        "ForwardTwo": [fromRow - 2, fromCol],
        "CaptureWest": [fromRow - 1, fromCol + 1],
        "CaptureEast": [fromRow - 1, fromCol - 1]
      }
      startRow = 6
      promotionRow = 0
      enPassantRow = 3
    }
    const isOnStartRow = (fromRow === startRow)
    for (const move in pawnMoves) {
      const possibleSquare = pawnMoves[move]
      if (move === "ForwardOne") {
        const invalidMove = board.isSquareOccupied(fromSquare, possibleSquare)
        if (invalidMove) {
          delete pawnMoves["ForwardTwo"]
          continue
        }
      }
      if (move === "ForwardTwo") {
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


pieces.whiteKing = new Piece("king", "white", pieceSymbols.whiteKing)

pieces.whiteQueen = new Piece("queen", "white", pieceSymbols.whiteQueen)

pieces.whiteBishop = new Piece("bishop", "white", pieceSymbols.whiteBishop)

pieces.whiteKnight = new Piece("knight", "white", pieceSymbols.whiteKnight)

pieces.whiteRook = new Piece("rook", "white", pieceSymbols.whiteRook)

pieces.whitePawn = new Piece("pawn", "white", pieceSymbols.whitePawn)

pieces.blackKing = new Piece("king", "black", pieceSymbols.blackKing)

pieces.blackQueen = new Piece("queen", "black", pieceSymbols.blackQueen)

pieces.blackBishop = new Piece("bishop", "black", pieceSymbols.blackBishop)

pieces.blackKnight = new Piece("knight", "black", pieceSymbols.blackKnight)

pieces.blackRook = new Piece("rook", "black", pieceSymbols.blackRook)

pieces.blackPawn = new Piece("pawn", "black", pieceSymbols.blackPawn)
