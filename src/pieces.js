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
  promote(){

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
