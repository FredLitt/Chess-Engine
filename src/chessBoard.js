import { pieces } from './pieces.js'

// EVERY MOVE HAS TO CHECK AND MAKE SURE IT DOESN'T EXPOSE KING

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
// TODO: Selectedpiece properties stored in an object
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
    // this.selectedPiece = {
    //   piece: null,
    //   square: null,
    //   possibleMoves: []
    // }
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

    this.squares[1][6].piece = pieces.blackBishop
    this.squares[3][3].piece = pieces.whitePawn
    this.squares[4][3].piece = pieces.blackPawn
    this.squares[5][0].piece = pieces.whiteQueen
    this.squares[1][6].piece = pieces.blackKnight
    this.squares[7][1].piece = pieces.whiteRook
    this.squares[2][2].piece = pieces.blackKing
    this.squares[4][6].piece = pieces.whiteKing
    this.squares[3][5].piece = pieces.blackRook  }

  determineWhoseTurn(){
      if (this.playedMoveList.length % 2 === 0) { return "white" }
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

  getPiecesColor(coordinates){
    const [row, col] = coordinates
    return this.squares[row][col].piece.color
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
    this.selectedPiecesPossibleMoves = pieceToMove.findSquares(board, fromSquare)
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

  //THIS IS BUGGY IF THERE's A PIECE ON THE TOSQUARE
  checkForPromotion(toSquare){
    if (this.selectedPiece === null || this.selectedPiece.type !== "pawn"){
      return false 
      }
    const [fromRow, fromCol] = this.selectedPiecesSquare

    let rowBeforePromotion
    
    if (this.selectedPiece.color === "white"){
      rowBeforePromotion = 6
    }
    if (this.selectedPiece.color === "black"){
      rowBeforePromotion = 1
    }
    if (rowBeforePromotion === fromRow) { 
      return true 
      } else {
      return false 
      }
  }

  promote(promotionChoice, promotionSquare){
    promotionSquare.piece = promotionChoice
    promotionSquare.piece.originallyPawn = true
  }
  
  determineIfCheckMate(){
    // runs after a king is placed in check
    // looks at every possible move for checked king's player
    // sees if resulting position still leaves king in check
    // if so return true and run game over
    // if not then return false and play continues
  }

  //checkForMoveLegality()

  //doesMoveExposeKing

  // isMoveSafe(board, fromSquare, testSquare){
  //   let opponentsColor
  //   if (this.color === "white") { opponentsColor = "black" }
  //   if (this.color === "black") { opponentsColor = "white" }
  //   const [fromRow, fromCol] = fromSquare
  //   const [testRow, testCol] = testSquare

  //   board.squares[fromRow][fromCol].piece = null
  //   let unsafeSquares = board.findAttackedSquares(opponentsColor)
  //   board.squares[fromRow][fromCol].piece = this
  //   if(board.arrayContainsSquare(unsafeSquares, testSquare)){
  //     return false
  //   }
  //   return true
  // }

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
      this.updateBoard(startSquare, endSquare)
      if (promotionChoice){
        this.promote(promotionChoice, endSquare)
        additionalMoveData.promotionChoice = promotionChoice.type
      }
      this.markControlledSquares()
      this.seeIfKingInCheck()
      
      this.addMoveToPlayedMoveList(fromSquare, toSquare, additionalMoveData)
    }
    this.deselectPiece()
  }

  seeIfKingInCheck(){
    for(const [row, col] of this.squaresAttackedByBlack){
      const attackedSquare = this.squares[row][col]
      if(attackedSquare.piece === null) { continue }
      const attackedSquareHasWhiteKing = (attackedSquare.piece.type === 'king' && attackedSquare.piece.color === 'white')
      if(attackedSquareHasWhiteKing){
        this.whiteKingInCheck = true
        return true
      } else {
        this.whiteKingInCheck = false
        return false
      }
    }

    for(const [row, col] of this.squaresAttackedByWhite){
      const attackedSquare = this.squares[row][col]
      if(attackedSquare.piece === null) { continue }
      const attackedSquareHasBlackKing = (attackedSquare.piece.type === 'king' && attackedSquare.piece.color === 'black')
      if(attackedSquareHasBlackKing){
        this.blackKingInCheck = true
        return true
      } else {
        this.blackKingInCheck = false
        return false
      }
    }
  }

  findAttackedSquares(color){
    const attackedSquares = []
    const findAllControlledSquares = true
    for (let row = 0; row < 8; row++){
      for (let col = 0; col < 8; col++){
        const currentSquare = this.squares[row][col]
        const squareIsEmpty = (currentSquare.piece === null)
        if(squareIsEmpty || currentSquare.piece.color !== color) {
          continue
        }
        attackedSquares.push(...currentSquare.piece.findSquares(this, currentSquare.coordinate, findAllControlledSquares))
      }
    }
    return attackedSquares
  }

  // Updates board state to remember controlled squares.
  // (Controlled means the player could attack the square.)
  markControlledSquares(){
    this.squaresAttackedByWhite = this.findAttackedSquares("white")
    this.squaresAttackedByBlack = this.findAttackedSquares("black")

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

  squaresAreEqual(square1, square2) {
    return (square1[0] === square2[0] && square1[1] === square2[1])
  }

  arrayContainsSquare(listOfSquares, square){
    if(listOfSquares.length === 0) { return }
    for (let i = 0; i < listOfSquares.length; i++){
      if (this.squaresAreEqual(listOfSquares[i], square)) { 
        return true 
      }
    }
  }

  findLastPlayedMove(){
    if (this.playedMoveList.length === 0){ return null }
    else { return this.playedMoveList[this.playedMoveList.length-1] }
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