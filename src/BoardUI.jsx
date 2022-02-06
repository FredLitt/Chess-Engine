import React, { useState } from "react";
import { pieces } from "./pieces"
import PromotionModal from "./PromotionModal"
import NewGameModal from "./NewGameModal"

export default function BoardUI({board, setBoard}){

  // TODO: Put conditional for promotionmodal outside component
  // TODO: custom board colors

  const [pieceToMove, setPieceToMove] = useState(null)

  const [pawnPromotion, setPawnPromotion] = 
    useState({pawnIsPromoting: false,
              color: null,
              promotionSquare: null})

  const [ gameResult, setGameResult ] = useState("undecided")

  const getCoordinates = (coordinates) => {
    const stringCoordinates = coordinates.split(",")
    return stringCoordinates.map(coordinates => parseInt(coordinates))
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
      const gameIsOver = (board.gameResult !== "undecided")
      if (gameIsOver){
        setGameResult(board.gameResult)
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
    setGameResult("undecided")
  }

  const isLightSquare = (coordinate) => {
    return ((coordinate[0] + coordinate[1]) % 2 === 0)
  }

  const getSquaresClass = (square) => {
    if (square.piece !== null) { 
      return "square contains-piece" 
      }
      return "square"
  }

  const lightSquareColor = getComputedStyle(document.documentElement).getPropertyValue("--light-square")

  const darkSquareColor = getComputedStyle(document.documentElement).getPropertyValue("--dark-square")

  return (
    <>
      {pawnPromotion.pawnIsPromoting && <PromotionModal
        promotionData={pawnPromotion}
        board={board}
        promote={promote}/>}
      {board.gameResult !== "undecided" && 
      <NewGameModal 
        gameResult={gameResult}
        startNewGame={createNewGame}/>}
      <table 
        id="board"
        cellSpacing="0">
        <tbody>
        {board.squares.map((row, index) =>
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
                  backgroundColor: isLightSquare(square.coordinate) ? lightSquareColor : darkSquareColor,
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