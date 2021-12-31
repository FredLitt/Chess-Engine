import React, { useState, useEffect } from 'react';
import { Piece, Board } from './chessBoard';
import { pieceSymbols } from './pieceSymbols.js'
import './App.css';

//TODO: Color every other square
//TODO: Only allow moves alternating turns

  const board = new Board()
  board.setToStartPosition()

function App() {
  
  const [boardPosition, setBoardPosition] = useState(board.squares)

  const [startingCoordinate, setStartingCoordinate] = useState(null)

  const convertCoordinateToArray = (coordinate) => {
    const stringArray = coordinate.split(",")
    return stringArray.map(coordinate => parseInt(coordinate))
  }

  const selectPiece = (square) => {
    const clickedCoordinate = convertCoordinateToArray(square.currentTarget.getAttribute('coordinate'))
    const squareHasPiece = (square.currentTarget.getAttribute("piece") !== null)
    console.log(`clicked on: ${clickedCoordinate}`)
    if (squareHasPiece && startingCoordinate === null){
      setStartingCoordinate(clickedCoordinate)
    }
    if (startingCoordinate !== null){
      console.log("clicking on second square")
      console.log(`first square was ${startingCoordinate}`)
      const endSquare = clickedCoordinate
      board.move(startingCoordinate, endSquare)
      setBoardPosition(board.squares)
      setStartingCoordinate(null)
    }
  }

  const isDarkSquare = (x, y) => {
    return ((x + y) % 2 === 0)
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
                  style={{
                    backgroundColor: isDarkSquare(square.coordinate[0], square.coordinate[1]) ? 'lightgrey' : 'grey',
                  }}
                  onClick={(e) => selectPiece(e)}>
                    {square.piece !== null && square.piece.symbol}
                
                </td>)}
          </tr>)}
        </table>
        <div id="current-move">Moving: {startingCoordinate}</div>
      </div>
    </main>
  );
}

export default App;