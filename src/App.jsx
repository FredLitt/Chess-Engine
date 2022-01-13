import React, { useState, useEffect } from 'react';
import { Board } from './chessBoard';
import PromotionPopUp from './PromotionPopUp'
import MoveList from './MoveList'
import CapturedPieceContainer from './CapturedPieceContainer'
import './App.css';

//TODO: Fix bug with clicking on piece that can't move and then clicking piece that can
//TODO: Allow select piece on pawn promotion
//TODO: Move board into own component
//TODO: Prevent king from moving into check
//TODO: Require dealing with check
//TODO: Castling!
//TODO: Add skip forward and backward buttons below move list
//TODO: Determine checkmate!

const board = new Board()
board.setToStartPosition()

function App() {
  
  const [currentBoard, setCurrentBoard] = useState(board)

  const [pieceToMove, setPieceToMove] = useState(null)

  const [pawnPromotion, setPawnPromotion] = 
    useState({isPromoting: false,
              color: null,
              promotionSquare: null})

  const getCoordinates = (coordinates) => {
    const stringCoordinates = coordinates.split(",")
    return stringCoordinates.map(coordinates => parseInt(coordinates))
  }

  const updateBoard = (board) => {
    setCurrentBoard(board)
  }

  const movePiece = (square) => {
    const clickedSquaresCoordinates = getCoordinates(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    if (squareHasPiece && pieceToMove === null){
      board.selectPieceToMove(clickedSquaresCoordinates)
      setPieceToMove("selected")
    }
    if (pieceToMove === "selected"){
      const toSquare = clickedSquaresCoordinates
      const pawnWillPromote = board.checkForPromotion(toSquare)
      if(pawnWillPromote){
        const pawnColor = board.selectedPiece.color
        setPawnPromotion(
          {isPromoting: true,
          color: pawnColor,
          promotionSquare: toSquare})
      } else {
      board.movePiece(toSquare)
      setCurrentBoard(board.squares)
      setPieceToMove(null)
      }
    }
  }

  const promote = (toSquare, promotionChoice) => {
    board.movePiece(toSquare, promotionChoice)
    setCurrentBoard(board.squares)
    setPieceToMove(null)
    setPawnPromotion(
      {isPromoting: false,
       color: null,
       promotionSquare: null})
  }

  const isLightSquare = (coordinate) => {
    return ((coordinate[0] + coordinate[1]) % 2 === 0)
  }

  const findSquaresClasses = (square) => {
    if(square.piece !== null){
      return 'square contains-piece' 
      }
      return 'square'
  }

  const borderForSquare = (square) => {
    if(square.isControlledByWhite && square.isControlledByBlack) {
      return 'solid 1px green'
    } else if (square.isControlledByWhite) {
      return 'solid 1px red'
    } else if (square.isControlledByBlack) {
      return 'solid 1px black'
    } else {
      return 'none'
    }
  }

  return (
    <main>
      <div id="game-container">
      <MoveList 
        moveList={board.playedMoveList}/>
        <PromotionPopUp 
          isPawnPromoting={pawnPromotion.isPromoting}
          pawnColor={pawnPromotion.color}
          promotionSquare={pawnPromotion.promotionSquare}
          board={board}
          promote={promote}
          />
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
                    backgroundColor: isLightSquare(square.coordinate) ? 'white' : 'lightgrey',
                  }}
                  onClick={(e) => movePiece(e)}>
                    {square.piece !== null && square.piece.symbol}   
                    {square.isPossibleMove && <span className="possible-move"></span>}       </td>)}
          </tr>)}
          </tbody>
        </table>
        <div id="captured-pieces-wrapper">
          <CapturedPieceContainer 
            capturedPieces={board.blackCapturedPieces}/>
          <CapturedPieceContainer 
            capturedPieces={board.whiteCapturedPieces}/>
        </div>
      </div>
    </main>
  );
}

export default App;