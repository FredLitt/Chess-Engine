import React, { useState, useEffect } from "react";
import { Board } from "./chessBoard";
import BoardUI from "./BoardUI"
import MoveList from "./MoveList"
import CapturedPieceContainer from "./CapturedPieceContainer"
import "./App.css";

//TODO: Fix bug with clicking on piece that can"t move and then clicking piece that can
//TODO: Custom board colors and piece designs
//TODO: Stalemate
//TODO: New game button upon checkmate
//TODO: Add skip forward and backward buttons on move list
//TODO: Better styling and responsiveness
//TODO: 2 player network chess

const newBoard = new Board()
newBoard.setToStartPosition()

function App() {
  
  const [boardState, setBoardState] = useState(newBoard)

  return (
    <main>
    <h1 id="littchess">littchess.org</h1>
      <div id="game-container">
      <MoveList moveList={newBoard.playedMoveList}/>
      <BoardUI boardState={boardState} setBoardState={setBoardState} board={newBoard}/>
      <div id="captured-pieces-wrapper">
        <CapturedPieceContainer 
          capturedPieces={newBoard.blackCapturedPieces}/>
        <CapturedPieceContainer 
          capturedPieces={newBoard.whiteCapturedPieces}/>
      </div>
      </div>
    </main>
  );
}

export default App;