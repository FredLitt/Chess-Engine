import React, { useState, useEffect } from 'react';
import { Board } from './chessBoard';
import MoveList from './MoveList'
import CapturedPieceContainer from './CapturedPieceContainer'
import './App.css';

//TODO: Highlight possible moves
//TODO: Prevent king from moving into check
//TODO: Require dealing with check
//TODO: Castling!
//TODO: Add skip forward and backward buttons below move list
//TODO: Allow select piece on pawn promotion
//TODO: Determine checkmate!

const board = new Board()
board.setToStartPosition()

function App() {
  
  const [boardPosition, setBoardPosition] = useState(board.squares)

  const [pieceToMove, setPieceToMove] = useState(null)

  const getCoordinates = (coordinates) => {
    const stringCoordinates = coordinates.split(",")
    return stringCoordinates.map(coordinates => parseInt(coordinates))
  }

  const movePiece = (square) => {
    const clickedSquaresCoordinates = getCoordinates(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    // if (squareHasPiece && pieceToMove === null){
      board.selectPieceToMove(clickedSquaresCoordinates)
      setPieceToMove("selected")
      setBoardPosition(board.squares)
      console.log(boardPosition)
   // }
    if (pieceToMove === "selected"){
      // const endSquare = clickedSquaresCoordinates
      // board.move(movingPieceStartSquare, endSquare)
      // setBoardPosition(board.squares)
      // setMovingPieceStartSquare(null)
    }
  }

  const isLightSquare = (row, col) => {
    return ((row + col) % 2 === 0)
  }


  return (
    <main>
      <div id="game-container">
      <MoveList 
        moveList={board.playedMoveList}/>
        <table 
          id="board"
          cellSpacing="0">
          {boardPosition.map((row) =>
            <tr 
              className="board-row">
              {row.map((square) => 
                <td 
                  className="square" 
                  coordinate={square.coordinate}
                  piece={square.piece}
                  key={square.coordinate} 
                  style={{
                    backgroundColor: isLightSquare(square.coordinate[0], square.coordinate[1]) ? 'white' : 'lightgrey',
                  }}
                  onClick={(e) => movePiece(e)}>
                    {square.piece !== null && square.piece.symbol}   
                {square.isPossibleMove && <div className="possible-move"></div>}       
                </td>)}
          </tr>)}
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