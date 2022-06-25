export const pieces = {}

// Function takes in directions for long range pieces (queen, rook, bishop)
// returns either all squares that are controlled by piece or all of piece"s legal moves
// TODO: Refactore into 2 methods
const findSquaresForLongRange = 
  ({piece, board, fromSquare, squaresToFind, pieceDirections}) => {
  const possibleSquares = []
  const [fromRow, fromCol] = fromSquare
  const completedDirections = []
    
    for (let i = 1; i < 8; i++) {
      const allDirections = {
        "North": [fromRow - i, fromCol],
        "South": [fromRow + i, fromCol],
        "East": [fromRow, fromCol + i],
        "West": [fromRow, fromCol - i],
        "NorthWest": [fromRow - i, fromCol - i],
        "NorthEast": [fromRow - i, fromCol + i],
        "SouthWest": [fromRow + i, fromCol - i],
        "SouthEast": [fromRow + i, fromCol + i]
      }

      for (const direction in allDirections) {
  
        if (!pieceDirections.includes(direction) || completedDirections.includes(direction)){
          continue;
        }

        const possibleSquare = allDirections[direction]

        if (squaresToFind === "controlled squares") {
          if (!board.isSquareOnBoard(possibleSquare)) {
            continue
          }
          if (board.isSquareOccupied(fromSquare, possibleSquare)) {
            possibleSquares.push(possibleSquare)
            completedDirections.push(direction)
          }
          possibleSquares.push(possibleSquare)
        }

        if (squaresToFind === "possible moves") {
          const invalidMove = !board.isSquareOnBoard(possibleSquare) || board.isSquareOccupied(fromSquare, possibleSquare) === "by Friendly Piece"
          if (invalidMove) {
            completedDirections.push(direction) 
            continue
            }

          if (board.isSquareOccupied(fromSquare, possibleSquare) === "by Enemy Piece") {
            completedDirections.push(direction)
            if (!board.moveExposesKing(piece, fromSquare, possibleSquare)) {
              possibleSquares.push(possibleSquare)
              continue
            }
          }

          if (board.moveExposesKing(piece, fromSquare, possibleSquare)) {
            continue
          }

          possibleSquares.push(possibleSquare)
        }
      }
    }
  return possibleSquares
}

class King {
  constructor(color) {
    this.type = "king"
    this.color = color
    if (color === "white") {
      this.symbol = pieceSymbols.whiteKing
    } else if (color === "black") {
      this.symbol = pieceSymbols.blackKing
    }
  }

  findSquares({board, fromSquare, squaresToFind}) {
    const [fromRow, fromCol] = fromSquare
    const kingDirections = {
      "North": [fromRow - 1, fromCol],
      "South": [fromRow + 1, fromCol],
      "East": [fromRow, fromCol + 1],
      "West": [fromRow, fromCol - 1],
      "NorthWest": [fromRow - 1, fromCol - 1],
      "NorthEast": [fromRow - 1, fromCol + 1],
      "SouthWest": [fromRow + 1, fromCol - 1],
      "SouthEast": [fromRow + 1, fromCol + 1],
      "Castle Queenside": [fromRow, fromCol + 2],
      "Castle Kingside": [fromRow, fromCol - 2]
    }    
    if (squaresToFind === "controlled squares") {
      return this.findControlledSquares(board, fromSquare, kingDirections)
    }
    if (squaresToFind === "possible moves") {
      return this.findPossibleMoves(board, fromSquare, kingDirections)
    }
  }

  findControlledSquares(board, fromSquare, kingDirections){
    const controlledSquares = []
    for (const direction in kingDirections){
      const possibleSquare = kingDirections[direction]

      if (direction.includes("Castle") || !board.isSquareOnBoard(possibleSquare)) {
        continue
        }
      controlledSquares.push(possibleSquare)
    }
    return controlledSquares
  }

  findPossibleMoves(board, fromSquare, kingDirections){
    const possibleMoves = []
    for (const direction in kingDirections){
      const possibleSquare = kingDirections[direction]

      if (direction.includes("Castle")){
        if (!board.checkIfCastlingPossible(direction)){
          continue
          }
        }
      const invalidMove = !board.isSquareOnBoard(possibleSquare) || (board.isSquareOccupied(fromSquare, possibleSquare) === "by Friendly Piece" || board.moveExposesKing(this, fromSquare, possibleSquare))
      if (invalidMove) {
        continue
        }
      possibleMoves.push(possibleSquare)
    }
    return possibleMoves
  }
}

class Queen {
  constructor(color) {
    this.type = "queen"
    this.color = color
    if (color === "white") {
      this.symbol = pieceSymbols.whiteQueen
    } else if (color === "black") {
      this.symbol = pieceSymbols.blackQueen
    }
  }
  
  findSquares({board, fromSquare, squaresToFind}) {
    return findSquaresForLongRange({
      piece: this,
      pieceDirections: ["North", "South", "West", "East", "NorthWest", "NorthEast", "SouthWest", "SouthEast"],
      board,
      fromSquare,
      squaresToFind
    })
  }
}

class Bishop {
  constructor(color) {
    this.type = "bishop"
    this.color = color
    if (color === "white") {
      this.symbol = pieceSymbols.whiteBishop
    } else if (color === "black") {
      this.symbol = pieceSymbols.blackBishop
    }
  }
  findSquares({board, fromSquare, squaresToFind}) {
    return findSquaresForLongRange({
      piece: this,
      pieceDirections: ["NorthWest", "NorthEast", "SouthWest", "SouthEast"],
      board,
      fromSquare,
      squaresToFind
    })
  }
}

class Rook {
  constructor(color) {
    this.type = "rook"
    this.color = color
    if (color === "white") {
      this.symbol = pieceSymbols.whiteRook
    } else if (color === "black") {
      this.symbol = pieceSymbols.blackRook
    }
  }
  findSquares({board, fromSquare, squaresToFind}) {
    return findSquaresForLongRange({
      piece: this,
      pieceDirections: ["North", "South", "West", "East"],
      board,
      fromSquare,
      squaresToFind
    })
  }
}

class Knight {
  constructor(color) {
    this.type = "knight"
    this.color = color
    if (color === "white") {
      this.symbol = pieceSymbols.whiteKnight
    } else if (color === "black") {
      this.symbol = pieceSymbols.blackKnight
    }
  }

  findSquares({board, fromSquare, squaresToFind}) {
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
    if (squaresToFind === "controlled squares") {
      return this.findControlledSquares(board, fromSquare, knightMoves)
    }
    if (squaresToFind === "possible moves") {
      return this.findPossibleMoves(board, fromSquare, knightMoves)
    }
  }

  findControlledSquares(board, fromSquare, knightMoves){
    const controlledSquares = []
    for (const move in knightMoves) {
      const possibleSquare = knightMoves[move]
      if (board.isSquareOnBoard(possibleSquare)) {
        controlledSquares.push(possibleSquare)
      }
    }
    return controlledSquares
  }

  findPossibleMoves(board, fromSquare, knightMoves){
    const possibleMoves = []
    for (const move in knightMoves) {
      const possibleSquare = knightMoves[move]
        const invalidMove = 
          !board.isSquareOnBoard(possibleSquare) || 
          board.isSquareOccupied(fromSquare, possibleSquare) === "by Friendly Piece" ||
          board.moveExposesKing(this, fromSquare, possibleSquare)
          if (invalidMove) {
            continue
          }
          possibleMoves.push(possibleSquare)
      }
      return possibleMoves
  }
}

export class Pawn {
  constructor(color) {
    this.type = "pawn"
    this.color = color
    if (color === "white") {
      this.symbol = pieceSymbols.whitePawn
    } else if (color === "black") {
      this.symbol = pieceSymbols.blackPawn
    }
  }
  
  findSquares({board, fromSquare, squaresToFind}) {
    const lastPlayedMove = board.findLastPlayedMove()
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
    if (lastPlayedMove !== null) {
      enPassantCaptureSquare = this.checkForEnPassantCapture(fromSquare, enPassantRow, lastPlayedMove)
    }
    if (squaresToFind === "controlled squares") {
      return this.findControlledSquares(board, fromSquare, pawnMoves)
    }

    if (squaresToFind === "possible moves") {
      const pawnOptions = {
        board: board,
        fromSquare: fromSquare,
        pawnMoves: pawnMoves,
        onStartRow: isOnStartRow,
        enPassantCaptureSquare: enPassantCaptureSquare
      }
      return this.findPossibleMoves(pawnOptions)
    }
  }

  checkForEnPassantCapture(currentSquare, enPassantRow, lastPlayedMove) {
    let enPassantCaptureSquare
    const [row, col] = currentSquare
    if (row !== enPassantRow || lastPlayedMove.piece.type !== "pawn") {
      return null
    }
    const pawnMovedTwoSquares = (Math.abs((lastPlayedMove.toSquare[0] - lastPlayedMove.fromSquare[0])) == 2)
    const pawnIsOnSameRow = (row === lastPlayedMove.toSquare[0])
    const pawnIsOnAdjacentColumn = 
      col === (lastPlayedMove.toSquare[1] + 1) || 
      col === (lastPlayedMove.toSquare[1] - 1)
    const pawnIsOnAdjacentSquare = (pawnIsOnSameRow && pawnIsOnAdjacentColumn)
    if (pawnIsOnAdjacentSquare && pawnMovedTwoSquares) {
      if (this.color === "black") {
        enPassantCaptureSquare = [lastPlayedMove.toSquare[0] - 1, lastPlayedMove.toSquare[1]]
      }
      if (this.color === "white") {
        enPassantCaptureSquare = [lastPlayedMove.toSquare[0] + 1, lastPlayedMove.toSquare[1]]
      }
      return enPassantCaptureSquare
    }
    else {
      return null
    }
  }

  findPossibleMoves({board, fromSquare, pawnMoves, onStartRow, enPassantCaptureSquare}){
    const possibleMoves = []
    if (enPassantCaptureSquare !== null){
      possibleMoves.push(enPassantCaptureSquare)
    }
    for (const move in pawnMoves){
      const possibleSquare = pawnMoves[move]
      if (move === "ForwardOne") {
        const invalidMove = board.isSquareOccupied(fromSquare, possibleSquare)
        if (invalidMove) {
          delete pawnMoves["ForwardTwo"]
          continue
        }
      }

      if (move === "ForwardTwo") {
        const invalidMove = ((!onStartRow) || board.isSquareOccupied(fromSquare, possibleSquare))
        if (invalidMove) {
          delete pawnMoves["ForwardTwo"]
          continue
        }
      }

      if (move === "CaptureWest" || move === "CaptureEast") {
        const invalidMove = (!board.isSquareOnBoard(possibleSquare) || board.isSquareOccupied(fromSquare, possibleSquare) !== "by Enemy Piece")
        if (invalidMove) {
          continue
        }
      }

      if (board.moveExposesKing(this, fromSquare, possibleSquare)) {
        continue
      }

      possibleMoves.push(possibleSquare)
    }
  return possibleMoves
}

 findControlledSquares(board, fromSquare, pawnMoves){
   const controlledSquares = []
   for (const move in pawnMoves) {
     const possibleSquare = pawnMoves[move]
     if (move === "ForwardOne" || move === "ForwardTwo" || !board.isSquareOnBoard(possibleSquare)) {
        continue
      }
    controlledSquares.push(possibleSquare)
    }
    return controlledSquares
  }
}

export const pieceSymbols = {
  whiteKing: "\u2654",
  whiteQueen: "\u2655",
  whiteRook: "\u2656",
  whiteBishop: "\u2657",
  whiteKnight: "\u2658",
  whitePawn: "\u2659",

  blackKing: "\u265A",
  blackQueen: "\u265B",
  blackRook: "\u265C",
  blackBishop: "\u265D",
  blackKnight: "\u265E",
  blackPawn: "\u265F"
}

export const findPiece = (color, type) => {
  if (color === "white"){
    if (type === "pawn") { return whitePawn }
    if (type === "knight") { return whiteKnight }
    if (type === "bishop") { return whiteBishop }
    if (type === "rook") { return whiteRook }
    if (type === "queen") { return whiteQueen }
  }
  if (color === "black"){
    if (type === "pawn") { return blackPawn }
    if (type === "knight") { return blackKnight }
    if (type === "bishop") { return blackBishop }
    if (type === "rook") { return blackRook }
    if (type === "queen") { return blackQueen }
  }
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