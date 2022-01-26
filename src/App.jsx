import React, { useState, useEffect } from 'react';
import { Board } from './chessBoard';
import BoardUI from './BoardUI'
import MoveList from './MoveList'
import CapturedPieceContainer from './CapturedPieceContainer'
import './App.css';

//TODO: Fix bug with clicking on piece that can't move and then clicking piece that can
//TODO: Stalemate
//TODO: Castling!
//TODO: New game button upon checkmate
//TODO: Add skip forward and backward buttons below move list
//TODO: Better styling and responsiveness
//TODO: 2 player network chess

const newBoard = new Board()
newBoard.setToStartPosition()

function App() {
  
  const [boardState, setBoardState] = useState(newBoard)

  return (
    <main>
      <div id="game-container">
      <MoveList moveList={boardState.playedMoveList}/>
        <BoardUI boardState={boardState} setBoardState={setBoardState} board={newBoard} />
        <div id="captured-pieces-wrapper">
          <CapturedPieceContainer 
            capturedPieces={boardState.blackCapturedPieces}/>
          <CapturedPieceContainer 
            capturedPieces={boardState.whiteCapturedPieces}/>
        </div>
      </div>
    </main>
  );
}

export default App;