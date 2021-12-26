import React, { useState, useEffect } from 'react';
import './App.css';

const board = []
for (let i = 0; i < 8; i++) {
  board.push([null, null, null, null, null, null, null, null])
}



function App() {
  return (
    <main>
      <table>
        {board.map((row) => <tr>
          {row.map((square) => <td>Square</td>)}
        </tr>)}
      </table>
    </main>
  );
}

export default App;