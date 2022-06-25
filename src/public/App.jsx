import React, { useState } from "react";
import { Board } from "./chessBoard";
import Board from "./Board"
import MoveList from "./MoveList"
import CapturedPieceContainer from "./CapturedPieceContainer"
import NewGameModal from "./NewGameModal"
import "./App.css";
//TODO: 2 player network chess

const createNewBoard = () => {
  const newBoard = new Board()
  newBoard.setToStartPosition()
  return newBoard
}

function App() {
  const [board, setBoard] = useState(createNewBoard)

  const createNewGame = () => {
    board.startNewGame()
    setBoard(board.clone())
  }

  return (
    <main>
      {board.gameResult !== "undecided" && 
      <NewGameModal 
        gameResult={board.gameResult}
        createNewGame={createNewGame}/>}
      <div id="game-container">  
      <BoardUI setBoard={setBoard} board={board}/>
      <div id="move-list-captured-pieces-wrapper">
        <CapturedPieceContainer 
          capturedPieces={board.blackCapturedPieces}/>
        <MoveList moveList={board.playedMoveList}/>
        <CapturedPieceContainer 
          capturedPieces={board.whiteCapturedPieces}/>
      </div>
      </div>
    </main>
  );
}

export default App;