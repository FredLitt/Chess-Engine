import React, { useState, useEffect } from 'react';
import { Piece, Board } from './chessBoard';
import './App.css';

const board = new Board()

board.setToStartPosition()

function App() {
  return (
    <main>
      <table>
        {board.squares.map((row) => <tr id="board">
          {row.map((square) => <td className="square">{square !== null && `${square.symbol}`}</td>)}
        </tr>)}
      </table>
    </main>
  );
}

export default App;