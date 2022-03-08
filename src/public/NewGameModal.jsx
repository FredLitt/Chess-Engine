import React, { useState } from "react";

export default function NewGameModal({gameResult, createNewGame}){


return (
  <div className="overlay">
    <div id="new-game-modal">
    <div>
      {gameResult === "white wins" &&
      <div className="game-over-message">White Wins! 1-0</div>
      }
      {gameResult === "black wins" &&
      <div className="game-over-message">Black Wins! 0-1</div>}
      {gameResult === "stalemate" &&
      <div className="game-over-message">Stalemate! 1/2-1/2</div>}
      <button
        onClick={() => {createNewGame()}}>New Game
      </button>
      </div>
    </div>
  </div>
)}
