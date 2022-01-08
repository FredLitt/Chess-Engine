import { pieces, Pawn, Knight, Bishop, Rook, Queen, King } from './pieces.js'

export class PlayedMove {
  constructor(piece, fromSquare, toSquare, wasAcapture) {
    this.piece = piece
    this.fromSquare = fromSquare
    this.toSquare = toSquare
    this.wasAcapture = wasAcapture
  }
}
// Note about coordinates:
// Each square is [row, col], kind of like chess notation
export class Board {
  constructor() {
    this.squares = []
    for (let row = 0; row < 8; row++) {
      const boardRow = []
      for (let col = 0; col < 8; col ++){
        const square = {
          piece: null,
          coordinate: [row, col]
          }
        boardRow.push(square)
        }
      this.squares.push(boardRow)
    }
    this.playedMoveList = []
    this.blackCapturedPieces = []
    this.whiteCapturedPieces = []
    this.selectedPiece = null
    this.selectedPiecesSquare = null
    this.selectedPiecesPossibleMoves = []
  }
  setToStartPosition(){
    // for (let i = 0; i < 8; i++){
    //   this.squares[1][i].piece = new Pawn("white")
    //   this.squares[6][i].piece = new Pawn("black")
    // }
    // this.squares[0][0].piece = pieces.whiteRook
    // this.squares[0][1].piece = pieces.whiteKnight
    // this.squares[0][2].piece = pieces.whiteBishop
    // this.squares[0][3].piece = pieces.whiteKing
    // this.squares[0][4].piece = pieces.whiteQueen
    // this.squares[0][5].piece = pieces.whiteBishop
    // this.squares[0][6].piece = pieces.whiteKnight
    // this.squares[0][7].piece = pieces.whiteRook

    // this.squares[7][0].piece = pieces.blackRook
    // this.squares[7][1].piece = pieces.blackKnight
    // this.squares[7][2].piece = pieces.blackBishop
    // this.squares[7][3].piece = pieces.blackKing
    // this.squares[7][4].piece = pieces.blackQueen
    // this.squares[7][5].piece = pieces.blackBishop
    // this.squares[7][6].piece = pieces.blackKnight
    // this.squares[7][7].piece = pieces.blackRook

    this.squares[1][1].piece = new Pawn("white")
    this.squares[2][2].piece = new Pawn("black")
    this.squares[3][5].piece = new Bishop("black")
    this.squares[6][6].piece = new Rook("white")
    this.squares[5][3].piece = new Queen("black")
    this.squares[7][2].piece = new King("white")
    this.squares[0][5].piece = new Knight("white")
  }
  isSquareOnBoard(square) {
    const [row, col] = square
    return row <= 7 && col <= 7 && row >= 0 && col >= 0
  }
  isSquareOccupied(fromSquare, possibleSquare){
    const [row1, col1] = fromSquare
    const [row2, col2] = possibleSquare
    if (this.squares[row2][col2].piece === null){
      return false
      }
    if (this.squares[row1][col1].piece.color === this.squares[row2][col2].piece.color){
      return "byFriendlyPiece"
    }
    return "byEnemyPiece"
  }
  capturePiece(capturedPiece){
    if(capturedPiece.originallyPawn && capturedPiece.color === "white"){
      capturedPiece = new Pawn("white")
    }
    if(capturedPiece.originallyPawn && capturedPiece.color === "black"){
      capturedPiece = new Pawn("black")
    }
    switch(capturedPiece.color){
      case 'white':
        this.whiteCapturedPieces.push(capturedPiece)
        break
      case 'black':
        this.blackCapturedPieces.push(capturedPiece)
        break
    }
  }
  promotePawn(promotionSquare, promotedPiece) {
    const [row, col] = promotionSquare
    this.squares[row][col].piece = promotedPiece
    promotedPiece.originallyPawn = true
  }
  addMoveToPlayedMoveList(fromSquare, toSquare, moveWasACapture){ 
    const movedPiece = this.selectedPiece
    this.playedMoveList.push(new PlayedMove(movedPiece, fromSquare, toSquare, moveWasACapture))
  }
  selectPieceToMove(coordinates){
    this.selectedPiecesSquare = coordinates
    const [row, col] = coordinates
    const pieceToMove = this.squares[row][col].piece
    this.selectedPiece = pieceToMove
    this.determinePiecesMoves(pieceToMove, coordinates)
  }
  determinePiecesMoves(pieceToMove, fromSquare){  
    const board = this
    const color = pieceToMove.color
    this.selectedPiecesPossibleMoves = pieceToMove.findPossibleMoves(board, fromSquare)
    this.markPossibleMoveSquares()
  }  
  markPossibleMoveSquares(){
    const squaresToMark = this.selectedPiecesPossibleMoves
    for (let i = 0; i < squaresToMark.length; i++){
      const [col, row] = squaresToMark[i]
      this.squares[col][row].isPossibleMove = true
    }
  }
  movePiece(toSquare){
    const fromSquare = this.selectedPiecesSquare
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare
    const possibleSquares = this.selectedPiecesPossibleMoves
    if (this.arrayContainsSquare(possibleSquares, toSquare)){
      const startSquare = this.squares[fromRow][fromCol]
      const endSquare = this.squares[toRow][toCol]
      let moveWasACapture
      if (endSquare.piece !== null){
        moveWasACapture = true
        const capturedPiece = endSquare.piece
        this.capturePiece(capturedPiece)
      } else {
        moveWasACapture = false
      }
      this.updateBoard(startSquare, endSquare)
      this.addMoveToPlayedMoveList(fromSquare, toSquare, moveWasACapture)
    }
    this.deselectPiece()
  }
  updateBoard(startSquare, endSquare){
    startSquare.piece = null
    endSquare.piece = this.selectedPiece
  }
  squaresEqual(square1, square2) {
    return square1[0] === square2[0] && square1[1] === square2[1]
  }
  arrayContainsSquare(moveList, square){
    for (let i = 0; i < moveList.length; i++){
      if (this.squaresEqual(moveList[i], square)) { 
        return true 
      }
    }
  }
  deselectPiece(){
    const squaresToRemoveMarks = this.selectedPiecesPossibleMoves
    for (let i = 0; i < squaresToRemoveMarks.length; i++){
      const [col, row] = squaresToRemoveMarks[i]
      delete this.squares[col][row].isPossibleMove
    }
    this.selectedPiece = null
    this.selectedPiecesSquare = null
    this.selectedPiecesPossibleMoves = null
  }
  //we will want a function to determine all the squares that our opponent controls in order to determine illegal moves for the king
  //this could work by iterating every one of the opponent's pieces and determining all the controlled squares, which are stored in an array
  move(fromSquare, toSquare) {
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare
    const startSquare = this.squares[fromRow][fromCol]
    const targetSquare = this.squares[toRow][toCol]

    const movingPiece = startSquare.piece
    const movingPieceColor = startSquare.piece.color

    const isWhitesTurn = (this.playedMoveList.length % 2 === 0)

    if (movingPieceColor === "white" && !isWhitesTurn || movingPieceColor === "black" && isWhitesTurn){
      return 
    }

    const validToSquares = []
      
      
    
  }
}