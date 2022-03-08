import React, { useState } from "react";
import { pieces, findPiece } from "./pieces"
import GameOptionsBar from "./GameOptionsBar"
import PromotionModal from "./PromotionModal"

export default function BoardUI({board, setBoard}){

  const [pieceToMove, setPieceToMove] = useState(null)

  const [gameDisplay, setGameDisplay] = 
    useState({
      playerPerspective: "black", 
      boardPosition: board.squares})

  const [pawnPromotion, setPawnPromotion] = 
    useState({
      pawnIsPromoting: false,
      color: null,
      promotionSquare: null})

  const getCoordinates = (coordinates) => {
    const stringCoordinates = coordinates.split(",")
    return stringCoordinates.map(coordinates => parseInt(coordinates))
  }

  const getSquaresClass = (square) => {
    if (square.piece !== null) { 
      return "square contains-piece" 
      }
      return "square"
  }

  const isLightSquare = (coordinate) => {
    return ((coordinate[0] + coordinate[1]) % 2 === 0)
  }

  const move = (square) => {
    const squaresCoordinates = getCoordinates(square.currentTarget.getAttribute("coordinate"))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    if (squareHasPiece && pieceToMove === null){
      const whoseTurn = board.determineWhoseTurn()
      const piecesColor = board.getPiecesColor(squaresCoordinates)
      const correctPlayersTurn = (whoseTurn === piecesColor)
      if (!correctPlayersTurn) { return }
      board.selectPieceToMove(squaresCoordinates)
      const clickedPiecesMoves = board.selectedPiece.possibleMoves
      if (clickedPiecesMoves.length === 0) { return }
      setPieceToMove("selected")
    }
    if (pieceToMove === "selected"){
      const pawnWillPromote = board.checkForPromotion(squaresCoordinates)
      if(pawnWillPromote){
        renderPromotionModal(board.selectedPiece.piece.color, squaresCoordinates)
      } else {
      board.movePiece(squaresCoordinates)
      setBoard(board.clone())
      setPieceToMove(null)
      }
    } 
  }

  const renderPromotionModal = (color, promotionSquare) => {
    setPawnPromotion(
      {pawnIsPromoting: true,
      color: color,
      promotionSquare: promotionSquare})
  }

  const promote = (toSquare, promotionChoice) => {
    board.movePiece(toSquare, promotionChoice)
    setBoard(board.clone())
    setPieceToMove(null)
    setPawnPromotion(
      {pawnIsPromoting: false,
       color: null,
       promotionSquare: null})
  }

  const createNewGame = () => {
    board.startNewGame()
    setBoard(board.clone())
  }

  const flipBoard = () => {
    const updatedPosition = {}
    const boardToFlip = board.squares
    const flippedBoard = []
    
    if (gameDisplay.playerPerspective === "black"){
      for (let row = 7; row >= 0; row--){
        const boardRow = []
        for (let col = 7; col >= 0; col --){
          boardRow.push(boardToFlip[row][col])
        }
        flippedBoard.push(boardRow)
      }
      updatedPosition.playerPerspective = "white"
      updatedPosition.boardPosition = flippedBoard
      setGameDisplay(updatedPosition)
      return
    }

    if(gameDisplay.playerPerspective === "white"){
      for (let row = 0; row <= 7; row++){
        const boardRow = []
        for (let col = 0; col <= 7; col++){
          boardRow.push(boardToFlip[row][col])
        }
        flippedBoard.push(boardRow)
      }
      updatedPosition.playerPerspective = "black"
      updatedPosition.boardPosition = flippedBoard
      setGameDisplay(updatedPosition)
      return
    }
  }

  const takeback = () => {
    const movesToPlayBack = board.playedMoveList.slice(0, -1)
    createNewGame()
    for (let i = 0; i < movesToPlayBack.length; i++){
      board.selectPieceToMove(movesToPlayBack[i].fromSquare)
      const targetSquare = movesToPlayBack[i].toSquare
      if (movesToPlayBack[i].moveData.promotionChoice){
        const pieceType = movesToPlayBack[i].moveData.promotionChoice
        const pieceColor = movesToPlayBack[i].piece.color
        const promotionChoice = findPiece(pieceColor, pieceType)
        return board.movePiece(targetSquare, promotionChoice)
      }
      board.movePiece(targetSquare)
    }
  }

  const changeTheme = (lightSquareChoice, darkSquareChoice, highlightChoice) => {
    document.documentElement.style.setProperty("--light-square", lightSquareChoice)
    document.documentElement.style.setProperty("--dark-square", darkSquareChoice)
    document.documentElement.style.setProperty("--highlight", highlightChoice)
  }

  return (
    <>
      <GameOptionsBar 
        createNewGame={createNewGame}
        flipBoard={flipBoard} 
        takeback={takeback}
        changeTheme={changeTheme}/>

      {pawnPromotion.pawnIsPromoting && <PromotionModal
        promotionData={pawnPromotion}
        board={board}
        promote={promote}/>}
      
      <table 
        id="board"
        cellSpacing="0">
        <tbody>
        {gameDisplay.boardPosition.map((row, index) =>
          <tr 
            className="board-row"
            key={index}>
            {row.map((square) => 
              <td 
                className={getSquaresClass(square)}
                coordinate={square.coordinate}
                piece={square.piece}
                key={square.coordinate} 
                style={{
                  backgroundColor: isLightSquare(square.coordinate) ? "var(--light-square)" : "var(--dark-square)",
                  opacity: square.isLastPlayedMove ? 0.6 : 1.0
                  }}
                onClick={(e) => move(e)}>
                  {square.piece !== null && square.piece.symbol}   
                  {square.isPossibleMove && 
                    <span className="possible-move"></span>}       </td>)}
            </tr>)}
        </tbody>
      </table>
    </>
    )
}