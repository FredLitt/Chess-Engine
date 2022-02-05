import { pieces } from './pieces.js'

export class PlayedMove {
  constructor(piece, fromSquare, toSquare, moveData) {
    this.piece = piece
    this.fromSquare = fromSquare
    this.toSquare = toSquare
    this.moveData = moveData
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
    this.selectedPiece = {
      piece: null,
      square: null,
      possibleMoves: []
    }
    this.squaresAttackedByWhite = []
    this.squaresAttackedByBlack = []
    this.gameResult = "undecided"
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

    // this.squares[6][2].piece = pieces.blackQueen
    // this.squares[7][7].piece = pieces.whiteKing
    // this.squares[5][5].piece = pieces.blackKing

    this.squares[1][4].piece = pieces.blackPawn
    this.squares[6][2].piece = pieces.whiteQueen
    this.squares[7][7].piece = pieces.blackKing
    this.squares[5][5].piece = pieces.whiteKing
      }

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
      return "by Friendly Piece"
      }
    return "by Enemy Piece"
    }

  squareIsEmpty(square){
    const [row, col] = square
    if(this.squares[row][col].piece === null){
      return true
    }
    return false
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
  
  addMoveToPlayedMoveList(fromSquare, toSquare, moveData){ 
    const movedPiece = this.selectedPiece.piece
    this.playedMoveList.push(new PlayedMove(movedPiece, fromSquare, toSquare, moveData))
  }

  getPiecesColor(coordinates){
    const [row, col] = coordinates
    return this.squares[row][col].piece.color
  }

  selectPieceToMove(coordinates){
    this.selectedPiece.square = coordinates
    const [row, col] = coordinates
    const pieceToMove = this.squares[row][col].piece
    this.selectedPiece.piece = pieceToMove
    this.getPossibleMoves(pieceToMove, coordinates)
  }

  getPossibleMoves(pieceToMove, fromSquare){
    const searchOptions = {
      board: this,
      fromSquare: fromSquare,
      squaresToFind: "possible moves"
    }
    this.selectedPiece.possibleMoves = pieceToMove.findSquares
    (searchOptions)
    this.markPossibleMoveSquares()
  }  

  markPossibleMoveSquares(){
    const squaresToMark = this.selectedPiece.possibleMoves
    for (let i = 0; i < squaresToMark.length; i++){
      const [col, row] = squaresToMark[i]
      this.squares[col][row].isPossibleMove = true
    }
  }

  checkIfEnPassantMove(toSquare){
    const isAPawnMove = (this.selectedPiece.piece.type === "pawn")
    const [toRow, toCol] = toSquare
    const [fromRow, fromCol] = this.selectedPiece.square
    const toSquareIsEmpty = (this.squares[toRow][toCol].piece === null)
    const pawnIsCapturing = (fromCol !== toCol)
    if (isAPawnMove && pawnIsCapturing && toSquareIsEmpty){
      return true
    }
  }

  captureEnPassant(toSquare){
    const [toRow, toCol] = toSquare
    const capturingPawnColor = this.selectedPiece.piece.color
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

  checkIfCastlingPossible(castlingDirection){
    const castlingKingColor = this.selectedPiece.piece.color
    let castlingRookSquare
    let kingStartSquare
    let castlingPathSquares
    let enemyControlledSquares

    if (castlingKingColor === "white"){
      kingStartSquare = [0, 3]
      enemyControlledSquares = this.findAttackedSquares("black")
      
      if (castlingDirection === "Castle Kingside"){
      castlingPathSquares = [[0, 1], [0, 2]]
      castlingRookSquare = [0, 0]
      }

      if (castlingDirection === "Castle Queenside"){
      castlingPathSquares = [[0, 4], [0, 5]]
      castlingRookSquare = [0, 7]
      }
    }
    if (castlingKingColor === "black"){
      kingStartSquare = [7, 3]
      enemyControlledSquares = this.findAttackedSquares("white")

      if (castlingDirection === "Castle Kingside"){
      castlingPathSquares = [[7, 1], [7, 2]]
      castlingRookSquare = [7, 0]
      }

      if (castlingDirection === "Castle Queenside"){
      castlingPathSquares = [[7, 4], [7, 5]]
      castlingRookSquare = [7, 7]
      }
    }

    const kingHasMoved = 
      (this.playedMoveList.includes(move => (move.piece.type === "king" && move.piece.color === castlingKingColor)) || !this.squaresAreEqual(this.selectedPiece.square, kingStartSquare) )
    const kingIsInCheck = 
      this.arrayContainsSquare(enemyControlledSquares, kingStartSquare)
    const kingWouldPassThroughCheck = 
      (castlingPathSquares.some(square => this.arrayContainsSquare(enemyControlledSquares, square)))
    const castlingRookHasMoved = this.playedMoveList.includes(move => board.squaresAreEqual(move.fromSquare, castlingRookSquare))
    const castlingPathIsClear = 
      castlingPathSquares.every(square => this.squareIsEmpty(square))
    if (kingHasMoved || kingIsInCheck || kingWouldPassThroughCheck ||castlingRookHasMoved || !castlingPathIsClear){
      return false
    }
    return true
  }

  castleKingside(kingColor){
    if (kingColor === "white") {
      const castlingRook = this.squares[0][0].piece
      this.squares[0][0].piece = null
      this.squares[0][2].piece = castlingRook
    }
    if (kingColor === "black"){
      const castlingRook = this.squares[7][0].piece
      this.squares[7][0].piece = null
      this.squares[7][2].piece = castlingRook
    }
  }

  castleQueenside(kingColor){
    if (kingColor === "white") {
      const castlingRook = this.squares[0][7].piece
      this.squares[0][7].piece = null
      this.squares[0][4].piece = castlingRook
    }
    if (kingColor === "black"){
      const castlingRook = this.squares[7][7].piece
      this.squares[7][7].piece = null
      this.squares[7][4].piece = castlingRook
    }
  }

  checkForPromotion(toSquare){
     if (this.selectedPiece.piece === null || this.selectedPiece.piece.type !== "pawn"){
      return false 
      }
    const pawnOptions = {
      board: this,
      fromSquare: this.selectedPiece.square,
      squaresToFind: "possible moves"
    }
    const pawnsLegalMoves = this.selectedPiece.piece.findSquares(pawnOptions)
    const notLegalMove = !this.arrayContainsSquare(pawnsLegalMoves, toSquare)
 
    const [toRow, toCol] = toSquare
    
    let promotionRow
    if (this.selectedPiece.piece.color === "white"){
      promotionRow = 7
    }
    if (this.selectedPiece.piece.color === "black"){
      promotionRow = 0
    }
    const pawnNotGoingToEndRow = (promotionRow !== toRow)
    if (pawnNotGoingToEndRow || notLegalMove) { 
      return false
      } else {
      return true 
      }
  }

  promote(promotionChoice, promotionSquare){
    promotionSquare.piece = promotionChoice
    promotionSquare.piece.originallyPawn = true
  }
  
  findKingsSquare(color){
    for (let row = 0; row < 8; row++){
      for (let col = 0; col < 8; col++){
        const squareToCheck = this.squares[row][col]
        const squareIsEmpty = (squareToCheck.piece === null)
        if(!squareIsEmpty && squareToCheck.piece.type === "king" && squareToCheck.piece.color === color){
          return [row, col]
        }
      }
    }
  }

  // method should test theoretical board position
  // see if resulting position leaves moving piece king in danger
  // (contained within the unsafeSquares)
  // TODO: mutating the board to test a move may have unpredictable results;
  // would be good to refactor to test the move on a deep-cloned board.

  moveExposesKing(movingPiece, fromSquare, testSquare){
    let opponent
    if (movingPiece.color === "white") { opponent = "black" }
    if (movingPiece.color === "black") { opponent = "white" }
    const [fromRow, fromCol] = fromSquare
    const [testRow, testCol] = testSquare
    const testSquarePiece = this.squares[testRow][testCol].piece

    this.squares[fromRow][fromCol].piece = null
    this.squares[testRow][testCol].piece = movingPiece
    const kingsSquare = this.findKingsSquare(movingPiece.color)

    let unsafeSquares = this.findAttackedSquares(opponent)

    this.squares[fromRow][fromCol].piece = movingPiece
    this.squares[testRow][testCol].piece = testSquarePiece

    if(this.arrayContainsSquare(unsafeSquares, kingsSquare)){
      return true
    }
    return false
  }

  isGameOver(){
    const lastPlayerToMove = this.selectedPiece.piece
    const everyPossibleMove = []
    let respondingPlayer
    if (lastPlayerToMove.color === "white") { respondingPlayer = "black" }
    if (lastPlayerToMove.color === "black") { respondingPlayer = "white" }

    for (let row = 0; row < 8; row++){
      for (let col = 0; col < 8; col++){
        const currentSquare = this.squares[row][col]
        const squareIsEmpty = (currentSquare.piece === null)
        if (squareIsEmpty || currentSquare.piece.color !== respondingPlayer) {
          continue
        }

        const searchOptions = {
          board: this,
          fromSquare: currentSquare.coordinate,
          squaresToFind: "possible moves"
        }

        everyPossibleMove.push(...currentSquare.piece.findSquares(searchOptions))
      }
    }
    const noPossibleMoves = (everyPossibleMove.length === 0)
    if (noPossibleMoves){
      return true
    }
    return false
  }

  wasMoveCastling(fromSquare, toSquare){
    const movingPiece = this.selectedPiece.piece
    if (movingPiece.type !== "king"){
      return false
    }
    let castlingSquares
    if (movingPiece.color === "white"){
      castlingSquares = {
        kingStartSquare: [0, 3],
        kingsideEndSquare: [0, 1],
        queensideEndSquare: [0, 5]
      }
    }
    if (movingPiece.color === "black"){
      castlingSquares = {
        kingStartSquare: [7, 3],
        kingsideEndSquare: [7, 1],
        queensideEndSquare: [7, 5]
      }
    }
    const kingIsOnStartSquare = this.squaresAreEqual(fromSquare, castlingSquares.kingStartSquare)
    const kingMovedToKingsideCastleSquare = this.squaresAreEqual(toSquare, castlingSquares.kingsideEndSquare)
    const kingMovedToQueensideCastleSquare = this.squaresAreEqual(toSquare, castlingSquares.queensideEndSquare)
    
    if (kingIsOnStartSquare && kingMovedToKingsideCastleSquare){
      return "Kingside"
    }
    if (kingIsOnStartSquare && kingMovedToQueensideCastleSquare){
      return "Queenside"
    }
  }

  movePiece(toSquare, promotionChoice){
    const fromSquare = this.selectedPiece.square
    const playersColor = this.selectedPiece.piece.color
    const [fromRow, fromCol] = fromSquare
    const [toRow, toCol] = toSquare
    const possibleSquares = this.selectedPiece.possibleMoves
    if (this.arrayContainsSquare(possibleSquares, toSquare)){
      const startSquare = this.squares[fromRow][fromCol]
      const endSquare = this.squares[toRow][toCol]
      const moveData = {}
      if (this.wasMoveCastling(fromSquare, toSquare) === "Kingside"){
        this.castleKingside(playersColor)
        moveData.kingsideCastle = true
      }
      if (this.wasMoveCastling(fromSquare, toSquare) === "Queenside"){
        this.castleQueenside(playersColor)
        moveData.queensideCastle = true
      }
      if (endSquare.piece !== null){
        moveData.wasACapture = true
        const capturedPiece = endSquare.piece
        this.capturePiece(capturedPiece)
      } else {
        moveData.wasACapture = false
      }
      if (this.checkIfEnPassantMove(toSquare)){
        this.captureEnPassant(toSquare)
        moveData.wasACapture = true
      }
      this.updateBoard(startSquare, endSquare)
      if (promotionChoice){
        this.promote(promotionChoice, endSquare)
        moveData.promotionChoice = promotionChoice.type
      }
      this.markControlledSquares()
      if(this.isKingInCheck()){
        moveData.wasACheck = true
      }
      if (this.isGameOver()){
        this.gameResult = this.getGameResult(moveData.wasACheck)
        moveData.gameResult = this.gameResult
      }
      this.addMoveToPlayedMoveList(fromSquare, toSquare, moveData)
    }
    this.highlightLastPlayedMove()
    this.deselectPiece()
  }

  getGameResult(isKingInCheck){
    const lastPlayerToMove = this.selectedPiece.piece.color
    if (isKingInCheck){
      return `${lastPlayerToMove} wins`
    }
    return "stalemate"
  }

  isKingInCheck(){
    const movedPiece = this.selectedPiece.piece
    let attackedSquares
    let enemyKingsSquare
    if(movedPiece.color === "white"){
      attackedSquares = this.squaresAttackedByWhite
      enemyKingsSquare = this.findKingsSquare("black")
    }
    if(movedPiece.color === "black"){
      attackedSquares = this.squaresAttackedByBlack
      enemyKingsSquare = this.findKingsSquare("white")
    }
    if(this.arrayContainsSquare(attackedSquares, enemyKingsSquare)){
      return true
    }
    return false
  }

  findAttackedSquares(color){
    const attackedSquares = []

    for (let row = 0; row < 8; row++){
      for (let col = 0; col < 8; col++){
        const currentSquare = this.squares[row][col]
        const squareIsEmpty = (currentSquare.piece === null)
        if(squareIsEmpty || currentSquare.piece.color !== color) {
          continue
        }

        const searchOptions = {
          board: this,
          fromSquare: currentSquare.coordinate,
          squaresToFind: "controlled squares"
        }

        attackedSquares.push(...currentSquare.piece.findSquares(searchOptions))
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
    endSquare.piece = this.selectedPiece.piece
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
    if (this.playedMoveList.length === 0) { 
      return null 
      }
    return this.playedMoveList[this.playedMoveList.length-1]
  }

  highlightLastPlayedMove(){
    const lastMove = this.findLastPlayedMove()
    const [fromRow, fromCol] = lastMove.fromSquare
    const [toRow, toCol] = lastMove.toSquare

    // First clear from previous move
    for (let row = 0; row < 8; row++){
      for (let col = 0; col < 8; col++){
        if (this.squares[row][col].hasOwnProperty("isLastPlayedMove")){
          delete this.squares[row][col].isLastPlayedMove
        }
      }
    }

    this.squares[fromRow][fromCol].isLastPlayedMove = true
    this.squares[toRow][toCol].isLastPlayedMove = true
  }

  startNewGame(){
    this.clearBoard()
    this.setToStartPosition()
    this.deselectPiece()
    this.playedMoveList = []
    this.blackCapturedPieces = []
    this.whiteCapturedPieces = []
    this.squaresAttackedByWhite = []
    this.squaresAttackedByBlack = []
    this.gameResult = "undecided"
  }

  clearBoard(){
    for (let row = 0; row < 8; row++){
      for (let col = 0; col < 8; col++){
        this.squares[row][col].piece = null
      }
    }
  }

  deselectPiece(){
    const squaresToRemoveMarks = this.selectedPiece.possibleMoves
    for (let i = 0; i < squaresToRemoveMarks.length; i++){
      const [col, row] = squaresToRemoveMarks[i]
      delete this.squares[col][row].isPossibleMove
    }
    this.selectedPiece = {
      piece: null,
      square: null,
      possibleMoves: []
    }
  }
}