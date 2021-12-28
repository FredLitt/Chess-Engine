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

  const [selectedMove, setSelectedMove] = useState("")

  const selectPiece = (square) => {
    console.log(square.target.piece)
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
                  onClick={selectPiece}>
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