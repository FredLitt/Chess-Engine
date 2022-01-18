import React, { useState } from 'react';
import { pieces } from './pieces'
import PromotionPopUp from './PromotionPopUp'

export default function BoardUI(props){

  const {board, setBoard, boardLogic} = props

  const [pieceToMove, setPieceToMove] = useState(null)

  const [pawnPromotion, setPawnPromotion] = 
    useState({pawnIsPromoting: false,
              color: null,
              promotionSquare: null})

  const getCoordinates = (coordinates) => {
    const stringCoordinates = coordinates.split(",")
    return stringCoordinates.map(coordinates => parseInt(coordinates))
  }

  const movePiece = (square) => {
    const squaresCoordinates = getCoordinates(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    if (squareHasPiece && pieceToMove === null){
      const whoseTurn = boardLogic.determineWhoseTurn()
      const piecesColor = boardLogic.getPiecesColor(squaresCoordinates)
      const correctPlayersTurn = (whoseTurn === piecesColor)
      if (!correctPlayersTurn) { return }
      boardLogic.selectPieceToMove(squaresCoordinates)
      setPieceToMove("selected")
    }
    if (pieceToMove === "selected"){
      const pawnWillPromote = boardLogic.checkForPromotion(squaresCoordinates)
      if(pawnWillPromote){
        renderPromotionPopUp(boardLogic.selectedPiece.color, squaresCoordinates)
      } else {
      boardLogic.movePiece(squaresCoordinates)
      setBoard({...board})
      setPieceToMove(null)
      }
    } 
  }

  const renderPromotionPopUp = (color, promotionSquare) => {
    setPawnPromotion(
          {pawnIsPromoting: true,
          color: color,
          promotionSquare: promotionSquare})
  }

  const promote = (toSquare, promotionChoice) => {
    boardLogic.movePiece(toSquare, promotionChoice)
    setBoard({...board})
    setPieceToMove(null)
    setPawnPromotion(
      {pawnIsPromoting: false,
       color: null,
       promotionSquare: null})
  }

  const isLightSquare = (coordinate) => {
    return ((coordinate[0] + coordinate[1]) % 2 === 0)
  }

  const findSquaresClasses = (square) => {
    if(square.piece !== null){ return 'square contains-piece' }
      return 'square'
  }

  const borderForSquare = (square) => {
    if(square.isControlledByWhite && square.isControlledByBlack) {
      return 'solid 1px green'
    } if (square.isControlledByWhite) {
      return 'solid 1px red'
    } if (square.isControlledByBlack) {
      return 'solid 1px black'
    } return 'none'
  }

  return (
    <>
      <PromotionPopUp 
        promotionData={pawnPromotion}
        board={board}
        promote={promote}/>
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
                className={findSquaresClasses(square)}
                coordinate={square.coordinate}
                piece={square.piece}
                key={square.coordinate} 
                style={{
                  border: borderForSquare(square),
                  backgroundColor: isLightSquare(square.coordinate) ? 'white' : 'lightgrey'}}
                onClick={(e) => movePiece(e)}>
                  {square.piece !== null && square.piece.symbol}   
                  {square.isPossibleMove && 
                    <span className="possible-move"></span>}       </td>)}
            </tr>)}
        </tbody>
      </table>
    </>
    )
}