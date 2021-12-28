import React, { useState, useEffect } from 'react';
import { Piece, Board } from './chessBoard';
import './App.css';

//TODO: Get board.move to work
//TODO: Get coordinates on click
//TODO: Color every other square

function App() {

  const board = new Board()
  board.setToStartPosition()
  // board.move([1, 3], [2, 3])

  const [boardPosition, setBoardPosition] = useState(board.squares)

  const [selectedMove, setSelectedMove] = useState(null)

  const convertCoordinateToArray = (coordinate) => {
    const stringArray = coordinate.split(",")
    return stringArray.map(coordinate => parseInt(coordinate))
  }

  const selectPiece = (square) => {
    const clickedCoordinate = convertCoordinateToArray(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.hasAttribute('piece'))
    if (squareHasPiece && selectedMove === null){
      setSelectedMove(clickedCoordinate)
      console.log(clickedCoordinate)
    }
    if (selectedMove !== null){
      const startSquare = selectedMove
      const endSquare = clickedCoordinate
      console.log(board.move(startSquare, endSquare))
      setSelectedMove(null)
    }
  }

  return (
    <main>
      <div>
        <table id="board">
          {boardPosition.map((row) =>
            <tr className="board-row">
              {row.map((square) => 
                <td 
                  className="square" 
                  coordinate={square.coordinate}
                  piece={square.piece}
                  key={square.coordinate} 
                  onClick={(e) => selectPiece(e)}>
                    {square.piece !== null && square.piece.symbol}
                </td>)}
          </tr>)}
        </table>
        <div id="current-move">Current move: {selectedMove}</div>
      </div>
    </main>
  );
}

export default App;