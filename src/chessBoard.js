import { Pawn, Knight, Bishop, Rook, Queen, King } from './pieces.js'

export class PlayedMove {
  constructor(piece, fromSquare, toSquare, additionalMoveData) {
    this.piece = piece
    this.fromSquare = fromSquare
    this.toSquare = toSquare
    this.additionalMoveData = additionalMoveData
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
    this.squaresAttackedByWhite = []
    this.squaresAttackedByBlack = []
    this.whiteKingInCheck = false
    this.blackKingInCheck = false
    this.isPawnPromoting = false
  }
  
  setToStartPosition(){
    // for (let i = 0; i < 8; i++){
    //   this.squares[1][i].piece = new Pawn("white")
    //   this.squares[6][i].piece = new Pawn("black")
    // }
    // this.squares[0][0].piece = new Rook("white")
    // this.squares[0][1].piece = new Knight("white")
    // this.squares[0][2].piece = new Bishop("white")
    // this.squares[0][3].piece = new King("white")
    // this.squares[0][4].piece = new Queen("white")
    // this.squares[0][5].piece = new Bishop("white")
    // this.squares[0][6].piece = new Knight("white")
    // this.squares[0][7].piece = new Rook("white")

    // this.squares[7][0].piece = new Rook("black")
    // this.squares[7][1].piece = new Knight("black")
    // this.squares[7][2].piece = new Bishop("black")
    // this.squares[7][3].piece = new King("black")
    // this.squares[7][4].piece = new Queen("black")
    // this.squares[7][5].piece = new Bishop("black")
    // this.squares[7][6].piece = new Knight("black")
    // this.squares[7][7].piece = new Rook("black")

    this.squares[6][1].piece = new Pawn("white")
    // this.squares[6][2].piece = new Pawn("black")
    this.squares[3][5].piece = new Bishop("black")
    // this.squares[6][6].piece = new Rook("white")
    // this.squares[5][3].piece = new Queen("black")
    // this.squares[7][2].piece = new King("white")
    // this.squares[6][5].piece = new Rook("black")
  }

  // TODO: REFACTOR THIS GARBAGE
  findControlledSquares(color){
    const attackedSquares = []
    // pawns must run findPossibleCaptures instead
    for (let i = 0; i < 8; i++){
      for (let j = 0; j < 8; j++){
      if (this.squares[i][j].piece !== null && this.squares[i][j].piece.type !== 'pawn' && this.squares[i][j].piece.color === color){
        attackedSquares.push(...this.squares[i][j].piece.findPossibleMoves(this, this.squares[i][j].coordinate))
        }
      }
    for (let i = 0; i < 8; i++){
      for (let j = 0; j < 8; j++){
      if(this.squares[i][j].piece !== null && this.squares[i][j].piece.type === 'pawn' && this.squares[i][j].piece.color === color){
        attackedSquares.push(...this.squares[i][j].piece.findPossibleCaptures(this, this.squares[i][j].coordinate))
        }
        }
        }
        }
    return attackedSquares
  }

  determineWhichPlayersTurn(){
    if (this.playeedMoveList.length % 2 === 0) return "white"
    else { return "black" }
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

  addMoveToPlayedMoveList(fromSquare, toSquare, additionalMoveData){ 
    const movedPiece = this.selectedPiece
    this.playedMoveList.push(new PlayedMove(movedPiece, fromSquare, toSquare, additionalMoveData))
  }

  selectPieceToMove(coordinates){
    this.selectedPiecesSquare = coordinates
    const [row, col] = coordinates
    const pieceToMove = this.squares[row][col].piece
    this.selectedPiece = pieceToMove
    this.determinePiecesPossibleMoves(pieceToMove, coordinates)
  }

  determinePiecesPossibleMoves(pieceToMove, fromSquare){
    const board = this
    const lastPlayedMove = this.playedMoveList[this.playedMoveList.length-1]
    this.selectedPiecesPossibleMoves = pieceToMove.findPossibleMoves(board, fromSquare, lastPlayedMove)
    this.markPossibleMoveSquares()
  }  

  markPossibleMoveSquares(){
    const squaresToMark = this.selectedPiecesPossibleMoves
    for (let i = 0; i < squaresToMark.length; i++){
      const [col, row] = squaresToMark[i]
      this.squares[col][row].isPossibleMove = true
    }
  }

  checkIfEnPassantMove(toSquare){
    const isAPawnMove = (this.selectedPiece.type === "pawn")
    const [toRow, toCol] = toSquare
    const [fromRow, fromCol] = this.selectedPiecesSquare
    const toSquareDoesNotHavePiece = (this.squares[toRow][toCol].piece === null)
    const pawnIsMovingHorizontally = (fromCol !== toCol)
    if (isAPawnMove &&pawnIsMovingHorizontally && toSquareDoesNotHavePiece){
      console.log('en passant')
      return true
    }
  }

  captureEnPassant(toSquare){
    const [toRow, toCol] = toSquare
    const capturingPawnColor = this.selectedPiece.color
    if (capturingPawnColor === "white"){
      const capturedPawn = this.squares[toRow-1][toCol].piece
      this.capturePiece(capturedPawn)
      this.squares[toRow-1][toCol].piece = null
    }
    if (capturingPawnColor === "black"){
      const capturedPawn = this.squares[toRow+1][toCol].piece
      this.capturePiece(capturedPawn)
      this.squares[toRow+1][toCol].piece = null
    }
  }

  pawnIsBeingPromoted(toSquare){
    const [toRow, toCol] = toSquare

    let promotionRow
    if (this.selectedPiece.type === "pawn" && this.selectedPiece.color === "white"){
      promotionRow = 7
    }
    if (this.selectedPiece.type === "pawn" && this.selectedPiece.color === "black"){
      promotionRow = 0
    }
    if (promotionRow === toRow) { return true }
    else { return false }
  }

  displayPromotionChoices(){
    this.isPawnPromoting = true
  }

  movePiece(toSquare){
    const fromSquare = this.selectedPiecesSquare
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare
    const possibleSquares = this.selectedPiecesPossibleMoves
    if (this.arrayContainsSquare(possibleSquares, toSquare)){
      const startSquare = this.squares[fromRow][fromCol]
      const endSquare = this.squares[toRow][toCol]
      const additionalMoveData = {}
      if (endSquare.piece !== null){
        additionalMoveData.wasACapture = true
        const capturedPiece = endSquare.piece
        this.capturePiece(capturedPiece)
      } else {
        additionalMoveData.wasACapture = false
      }
      if (this.checkIfEnPassantMove(toSquare)){
        this.captureEnPassant(toSquare)
        additionalMoveData.wasACapture = true
      }
      if (this.pawnIsBeingPromoted(toSquare)){
        console.log('promote')
        this.displayPromotionChoices()
        //const chosenPiece = this.choosePromotionPiece()
        //additionalMoveData.pawnPromotion = chosenPiece
      }
      // if (this.isMoveACheck()){
      //   // king is in check
      //   additionalMoveData.isCheck = true
      // }
      this.updateBoard(startSquare, endSquare)
      this.addMoveToPlayedMoveList(fromSquare, toSquare, additionalMoveData)
    }
    this.deselectPiece()
    this.markControlledSquares()
  }

  // Updates board state to remember controlled squares.
  // (Controlled means the player could attack the square.)
  markControlledSquares(){
    this.squaresAttackedByWhite = this.findControlledSquares("white")
    this.squaresAttackedByBlack = this.findControlledSquares("black")

    //Reset all squares to not be controlled
    for (const row of this.squares) {
      for (const square of row) {
        square.isControlledByWhite = false
        square.isControlledByBlack = false
      }
    }

    for (const [col, row] of this.squaresAttackedByBlack) {
      this.squares[col][row].isControlledByBlack = true
    }

    for (const [col, row] of this.squaresAttackedByWhite) {
      this.squares[col][row].isControlledByWhite = true
    }
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
}