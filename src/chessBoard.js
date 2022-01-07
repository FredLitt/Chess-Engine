import { pieces, Pawn } from './pieces.js'

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
    this.selectedPiecePossibleMoves = []
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
    this.squares[2][1].piece = new Pawn("black")
  }
  movePiece(){
    //see if selected square to move piece to is in possible squares and run updateBoard if so
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
  squaresEqual(square1, square2) {
    return square1[0] === square2[0] && square1[1] === square2[1]
  }
  moveListContainsSquare(moveList, square){
    for (let i = 0; i < moveList.length; i++){
      if (this.squaresEqual(moveList[i], square)) { 
        return true 
      }
    }
  }
  updateBoard(startSquare, endSquare, movedPiece){
    startSquare.piece = null
    endSquare.piece = movedPiece
  }
  capturePiece(capturedPiece){
    capturedPiece.color
    if(capturedPiece.originallyPawn && capturedPiece.color === "white"){
      capturedPiece = pieces.whitePawn
    }
    if(capturedPiece.originallyPawn && capturedPiece.color === "black"){
      capturedPiece = pieces.blackPawn
    }
    switch(capturedPieceColor){
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
  addMoveToPlayedMoveList(piece, fromSquare, toSquare, moveWasACapture){ 
    this.playedMoveList.push(new PlayedMove(piece, fromSquare, toSquare, moveWasACapture))
  }
  // Request a move from fromSquare to toSquare
  // each square is an array of [x, y] coordinates.
  // If move is valid, updates the board, adds to played move array and returns true
  // If not, returns false
  selectPieceToMove(coordinates){
    const [row, col] = coordinates
    const pieceToMove = this.squares[row][col].piece
    this.selectedPiece = pieceToMove
    this.findPiecesPossibleMoves(pieceToMove, coordinates)
  }
  
  findPiecesPossibleMoves(pieceToMove, startSquare){  
    const board = this
    const color = pieceToMove.color

    const possibleMoves = pieceToMove.findPossibleMoves(board, startSquare)
    console.log(possibleMoves)
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

    switch (movingPiece.type) {

      case 'pawn': {
        let pawnMoves
        let startRow
        let enPassantRow
        let promotionRow
        if (movingPiece.color === "white") {
          pawnMoves = {
            "ForwardOne": [fromRow + 1, fromCol],
            "ForwardTwo": [fromRow + 2, fromCol],
            "CaptureWest": [fromRow + 1, fromCol - 1],
            "CaptureEast": [fromRow + 1, fromCol + 1]
          }
          startRow = 1
          promotionRow = 7
          enPassantRow = 4
        } else {
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
        // EN PASSANT CHECK
        if (fromRow === enPassantRow){
          const lastPlayedMove = this.playedMoveList[this.playedMoveList.length-1]
          const lastMovedPiece = this.squares[lastPlayedMove.toSquare[0]][lastPlayedMove.toSquare[1]].piece.type
          const distancePawnMoved = Math.abs((lastPlayedMove.toSquare[0] -  lastPlayedMove.fromSquare[0]))
          if (lastMovedPiece === "pawn" && distancePawnMoved === 2){
            const pawnIsOnSameRow = (fromRow === lastPlayedMove.toSquare[0])
            const pawnIsOnAdjacentColumn = (fromCol === (lastPlayedMove.toSquare[1] + 1) || fromCol === (lastPlayedMove.toSquare[1] - 1))
            const pawnIsOnAdjacentSquare = (pawnIsOnSameRow && pawnIsOnAdjacentColumn)
            if(pawnIsOnAdjacentSquare){
              const moveWasAcapture = true
              const squareOfCapturedPawn = this.squares[enPassantRow][toCol]
              squareOfCapturedPawn.piece = null
              this.updateBoard(startSquare, targetSquare, movingPiece)
              this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasAcapture)
              return true
            }
          }
        }
        const isOnStartRow = (fromRow === startRow)
        const isOnPromotionRow = (toRow === promotionRow)
        for (const move in pawnMoves) {
          const possibleSquare = pawnMoves[move]
          if (move === "ForwardOne") {
            const invalidMove = this.isSquareOccupied(fromSquare, possibleSquare)
            if (invalidMove) {
              delete pawnMoves["ForwardTwo"]
              continue
            }
          }
          if (move === "ForwardTwo") {
            const invalidMove = !isOnStartRow || this.isSquareOccupied(fromSquare, possibleSquare)
            if (invalidMove) { continue }
          }
          if (move === "CaptureWest" || move === "CaptureEast") {
            const invalidMove = (!this.isSquareOnBoard(possibleSquare) || this.isSquareOccupied(fromSquare, possibleSquare) !== "byEnemyPiece")
            if (invalidMove) { continue }
          }
          validToSquares.push(possibleSquare)
        }
        console.log(validToSquares)
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          const moveWasACapture = (targetSquare.piece !== null)
          if (isOnPromotionRow){
            //queen by default
            let chosenPiece
            if(movingPiece.color === "black"){
              chosenPiece = pieces.blackQueen
            }
            if(movingPiece.color === "white"){
              chosenPiece = pieces.whiteQueen
            }
            startSquare.piece = null
            this.promotePawn(toSquare, chosenPiece)
            this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
            return true
          }
          if(moveWasACapture){
            const capturedPiece = (targetSquare.piece)
            this.capturePiece(capturedPiece)
          }
          this.updateBoard(startSquare, targetSquare, movingPiece)
          this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
          return true
        } else {
          return false
        }
      }
      case 'rook': {
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
            if (!this.isSquareOnBoard(possibleSquare)) {
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
              validToSquares.push(possibleSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(possibleSquare)
          }
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          const moveWasACapture = (targetSquare.piece !== null)
          if(moveWasACapture){
            const capturedPiece = (targetSquare.piece)
            this.capturePiece(capturedPiece)
          }
          this.updateBoard(startSquare, targetSquare, movingPiece)
          this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
          return true
        } else {
          return false
        }
      }
      case 'bishop': {
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
            if (!this.isSquareOnBoard(possibleSquare)) continue
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
              validToSquares.push(possibleSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(possibleSquare)
          }
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          const moveWasACapture = (targetSquare.piece !== null)
          if(moveWasACapture){
            const capturedPiece = (targetSquare.piece)
            this.capturePiece(capturedPiece)
          }
          this.updateBoard(startSquare, targetSquare, movingPiece)
          this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
          return true
        } else {
          return false
        }
      }
      case 'queen': {
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
            if (!this.isSquareOnBoard(possibleSquare)) continue
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
              completedDirections.push(direction)
              continue
            }
            if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
              validToSquares.push(possibleSquare)
              completedDirections.push(direction)
              continue
            }
            validToSquares.push(possibleSquare)
          }
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          const moveWasACapture = (targetSquare.piece !== null)
          if(moveWasACapture){
            const capturedPiece = (targetSquare.piece)
            this.capturePiece(capturedPiece)
          }
          this.updateBoard(startSquare, targetSquare, movingPiece)
          this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
          return true
        } else {
          return false
        }
      }
      case 'king': {
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
          if (!this.isSquareOnBoard(possibleSquare)) continue
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            validToSquares.push(possibleSquare)
            continue
          }
          validToSquares.push(possibleSquare)
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          const moveWasACapture = (targetSquare.piece !== null)
          if(moveWasACapture){
            const capturedPiece = (targetSquare.piece)
            this.capturePiece(capturedPiece)
          }
          this.updateBoard(startSquare, targetSquare, movingPiece)
          this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
          return true
        } else {
          return false
        }
      }
      case 'knight': {
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
          if (!this.isSquareOnBoard(possibleSquare)) continue
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byFriendlyPiece") {
            continue
          }
          if (this.isSquareOccupied(fromSquare, possibleSquare) === "byEnemyPiece") {
            validToSquares.push(possibleSquare)
            continue
          }
          validToSquares.push(possibleSquare)
        }
        if (this.moveListContainsSquare(validToSquares, toSquare)) {
          const moveWasACapture = (targetSquare.piece !== null)
          if(moveWasACapture){
            const capturedPiece = (targetSquare.piece)
            this.capturePiece(capturedPiece)
          }
          this.updateBoard(startSquare, targetSquare, movingPiece)
          this.addMoveToPlayedMoveList(movingPiece, fromSquare, toSquare, moveWasACapture)
          return true
        } else {
          return false
        }
      }
      default: {
        throw new Error("unknown piece")
      }
    }
  }
}