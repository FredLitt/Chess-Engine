import React, { useState, useEffect } from 'react';
import { Board } from './chessBoard';
import MoveList from './MoveList'
import CapturedPieceContainer from './CapturedPieceContainer'
import './App.css';

//TODO: Fix bug with clicking on piece that can't move and then clicking piece that can
//TODO: Allow select piece on pawn promotion
//TODO: Prevent king from moving into check
//TODO: Require dealing with check
//TODO: Castling!
//TODO: Add skip forward and backward buttons below move list
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
    if (squareHasPiece && pieceToMove === null){
      board.selectPieceToMove(clickedSquaresCoordinates)
      setPieceToMove("selected")
    }
    if (pieceToMove === "selected"){
      const toSquare = clickedSquaresCoordinates
      board.movePiece(toSquare)
      setBoardPosition(board.squares)
      setPieceToMove(null)
    }
  }

  const isLightSquare = (coordinate) => {
    return ((coordinate[0] + coordinate[1]) % 2 === 0)
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
                    backgroundColor: isLightSquare(square.coordinate) ? 'white' : 'lightgrey',
                  }}
                  onClick={(e) => movePiece(e)}>
                    {square.piece !== null && square.piece.symbol}   
                    {square.isPossibleMove && <span className="possible-move"></span>}       </td>)}
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