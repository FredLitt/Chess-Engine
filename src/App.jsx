import React, { useState, useEffect } from "react";
import { Board } from "./chessBoard";
import BoardUI from "./BoardUI"
import MoveList from "./MoveList"
import CapturedPieceContainer from "./CapturedPieceContainer"
import "./App.css";

//TODO: Custom board colors and piece designs
//TODO: Add skip forward and backward buttons on move list
//TODO: 2 player network chess

const newBoard = new Board()
newBoard.setToStartPosition()

function App() {
  
  const [boardState, setBoardState] = useState(newBoard)

  return (
    <main>
      <div id="game-container">  
      <BoardUI boardState={boardState} setBoardState={setBoardState} board={newBoard}/>
      <div id="move-list-captured-pieces-wrapper">
        <CapturedPieceContainer 
          capturedPieces={newBoard.blackCapturedPieces}/>
        <MoveList moveList={newBoard.playedMoveList}/>
        <CapturedPieceContainer 
          capturedPieces={newBoard.whiteCapturedPieces}/>
      </div>
      </div>
    </main>
  );
}

export default App;