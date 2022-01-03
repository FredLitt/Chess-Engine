import React, { useState, useEffect } from 'react';
import { Board } from './chessBoard';
import CapturedPieceContainer from './CapturedPieceContainer'
import './App.css';

//TODO: Render captured pieces
//TODO: Move tracking interface
//TODO: Highlight possible moves
//TODO: Prevent king from moving into check
//TODO: Require dealing with check
//TODO: Castling!
//TODO: Add skip forward and backward buttons below screen
//TODO: Allow select piece on pawn promotion
//TODO: Determine checkmate!

const board = new Board()
board.setToStartPosition()

function App() {
  
  const [boardPosition, setBoardPosition] = useState(board.squares)

  const [capturedPieces, setCapturedPieces] = useState(board.blackCapturedPieces)

  const [movingPieceStartSquare, setMovingPieceStartSquare] = useState(null)

  const getCoordinates = (coordinates) => {
    const stringArray = coordinates.split(",")
    return stringArray.map(coordinates => parseInt(coordinates))
  }

  const movePiece = (square) => {
    const clickedSquaresCoordinates = getCoordinates(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    const pieceToMoveNotSelected = (movingPieceStartSquare === null)
    if (squareHasPiece && pieceToMoveNotSelected){
      setMovingPieceStartSquare(clickedSquaresCoordinates)
    }
    if (!pieceToMoveNotSelected){
      const endSquare = clickedSquaresCoordinates
      board.move(movingPieceStartSquare, endSquare)
      setBoardPosition(board.squares)
      setMovingPieceStartSquare(null)
    }
  }

  const isDarkSquare = (xCoordinate, yCoordinate) => {
    return ((xCoordinate + yCoordinate) % 2 === 0)
  }

  return (
    <main>
      <div id="game-container">
        <table 
          id="board">
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
                    backgroundColor: isDarkSquare(square.coordinate[0], square.coordinate[1]) ? 'lightgrey' : 'grey',
                  }}
                  onClick={(e) => movePiece(e)}>
                    {square.piece !== null && square.piece.symbol}         
                </td>)}
          </tr>)}
        </table>
        <CapturedPieceContainer 
          capturedPieces={board.blackCapturedPieces}/>
        <CapturedPieceContainer 
          capturedPieces={board.whiteCapturedPieces}/>
      </div>
    </main>
  );
}

export default App;