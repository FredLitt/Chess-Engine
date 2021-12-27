import React, { useState, useEffect } from 'react';
import { Piece, Board } from './chessBoard';
import './App.css';

const board = new Board()

board.setToStartPosition()

function App() {
  return (
    <main>
      <table>
        {board.squares.map((row) => <tr>
          {row.map((square) => <td>{square !== null && `${square.color} ${square.type}`}</td>)}
        </tr>)}
      </table>
    </main>
  );
}

export default App;