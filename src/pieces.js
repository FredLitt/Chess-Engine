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
