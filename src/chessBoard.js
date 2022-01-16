import { pieces } from './pieces.js'

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
  }
  
  setToStartPosition(){
    // for (let i = 0; i < 8; i++){
    //   this.squares[1][i].piece = pieces.whitePawn
    //   this.squares[6][i].piece = pieces.blackPawn
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

    this.squares[6][1].piece = pieces.whitePawn
    this.squares[3][3].piece = pieces.blackPawn
    this.squares[2][2].piece = pieces.whiteRook
    this.squares[4][5].piece = pieces.whiteQueen
    this.squares[3][5].piece = pieces.blackBishop
  }

  findControlledSquares(color){
    const attackedSquares = []
    for (let i = 0; i < 8; i++){
      for (let j = 0; j < 8; j++){
        const currentSquare = this.squares[i][j]
        const currentSquaresPiece = (currentSquare.piece)
        const squareIsEmpty = (currentSquaresPiece === null)
        if(squareIsEmpty || currentSquaresPiece.color !== color) {
          continue
        }
        const squareHasPiece = (currentSquaresPiece.type !== 'pawn')
        const squareHasPawn = (currentSquaresPiece.type === 'pawn')
        if(squareHasPiece){
          attackedSquares.push(...currentSquaresPiece.findPossibleMoves(this, currentSquare.coordinate))
        }
        if(squareHasPawn){
          attackedSquares.push(...currentSquaresPiece.findPossibleCaptures(this, currentSquare.coordinate))
        }
      }
    }
    return attackedSquares
  }

  determineWhoseTurn(){
    if (this.playeedMoveList.length % 2 === 0) { return "white" }
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
      capturedPiece = pieces.whitePawn
    }
    if(capturedPiece.originallyPawn && capturedPiece.color === "black"){
      capturedPiece = pieces.blackPawn
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
    const toSquareHasNoPiece = (this.squares[toRow][toCol].piece === null)
    const pawnIsCapturing = (fromCol !== toCol)
    if (isAPawnMove && pawnIsCapturing && toSquareHasNoPiece){
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

  checkForPromotion(toSquare){
    if (this.selectedPiece === null || this.selectedPiece.type !== "pawn"){
      return false 
      }
    const [toRow, toCol] = toSquare

    let promotionRow
    
    if (this.selectedPiece.color === "white"){
      promotionRow = 7
    }
    if (this.selectedPiece.color === "black"){
      promotionRow = 0
    }
    if (promotionRow === toRow) { 
      return true 
      } else {
      return false 
      }
  }

  promote(promotionChoice, promotionSquare){
    promotionSquare.piece = promotionChoice
    promotionSquare.piece.originallyPawn = true
  }

  movePiece(toSquare, promotionChoice){
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
      // if (this.isMoveACheck()){
      //   // king is in check
      //   additionalMoveData.isCheck = true
      // }
      this.updateBoard(startSquare, endSquare)
      if (promotionChoice){
        this.promote(promotionChoice, endSquare)
        additionalMoveData.promotionChoice = promotionChoice.type
      }
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