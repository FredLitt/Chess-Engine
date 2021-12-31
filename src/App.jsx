import React, { useState, useEffect } from 'react';
import { Piece, Board } from './chessBoard';
import { pieceSymbols } from './pieceSymbols.js'
import './App.css';

//TODO: Get board.move to work
//board reverts to original state on every re-render
//TODO: Get coordinates on click
//TODO: Color every other square

  const board = new Board()
  board.setToStartPosition()

function App() {
  
  const [boardPosition, setBoardPosition] = useState(board.squares)

  const [selectedMove, setSelectedMove] = useState(null)

  const convertCoordinateToArray = (coordinate) => {
    const stringArray = coordinate.split(",")
    return stringArray.map(coordinate => parseInt(coordinate))
  }

  const selectPiece = (square) => {
    const clickedCoordinate = convertCoordinateToArray(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    console.log(`clicked on: ${clickedCoordinate}`)
    if (squareHasPiece && selectedMove === null){
      console.log("square has piece")
      console.log(clickedCoordinate)
      setSelectedMove(clickedCoordinate)
 
    }
    if (selectedMove !== null){
      console.log("clicking on second square")
      console.log(`first square was ${selectedMove}`)
      const endSquare = clickedCoordinate
      board.move(selectedMove, endSquare)
      setBoardPosition(board.squares)
      setSelectedMove(null)
    }
         console.log(`starting square: ${selectedMove}`)
         console.log(board.squares[2][3])
         console.log(board.squares)
  }

  return (
    <main>
      <div>
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