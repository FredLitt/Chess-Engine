import React, { useState, useEffect } from 'react';
import { Board } from './chessBoard';
import BoardUI from './BoardUI'
import MoveList from './MoveList'
import CapturedPieceContainer from './CapturedPieceContainer'
import './App.css';

//TODO: Fix bug with clicking on piece that can't move and then clicking piece that can
//TODO: Prevent king from moving into check
//TODO: Require dealing with check
//TODO: Castling!
//TODO: Add skip forward and backward buttons below move list
//TODO: Determine checkmate!

const newBoard = new Board()
newBoard.setToStartPosition()

function App() {
  
  const [board, setBoard] = useState(newBoard)

  return (
    <main>
      <div id="game-container">
      <MoveList moveList={board.playedMoveList}/>
        <BoardUI board={board} setBoard={setBoard} boardLogic={newBoard} />
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