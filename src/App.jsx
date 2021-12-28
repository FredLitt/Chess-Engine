import React, { useState, useEffect } from 'react';
import { Piece, Board } from './chessBoard';
import './App.css';



function App() {

  const board = new Board()
  board.setToStartPosition()
  board.move([1, 3], [2, 3])

  const [boardPosition, setBoardPosition] = useState(board.squares)

  const [selectedMove, setSelectedMove] = useState("")

  return (
    <main>
      <div>
      <table>
        {boardPosition.map((row) => <tr className="board-row">
          {row.map((square) => <td className="square" key={square.coordinate}>{square !== null && square.symbol}</td>)}
        </tr>)}
      </table>
      <div id="current-move">Current move: {selectedMove}</div>
      </div>
    </main>
  );
}

export default App;