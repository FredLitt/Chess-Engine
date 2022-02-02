import React, { useState } from "react";

export default function NewGameModal({gameResult, startNewGame}){

if (gameResult === "undecided"){
  return null
  } 
if (gameResult === "white wins"){
  return (
    <div id="new-game-modal">
      <div className="game-over-message">White wins! 1-0 </div>
      <button 
        onClick={() => {startNewGame()}}>New Game
      </button>
    </div>)}
if (gameResult === "black wins") {   
  return (
    <div id="new-game-modal">
      <div className="game-over-message">Black wins! 0-1</div>
      <button 
        onClick={() => startNewGame()}>New Game
      </button>
    </div>)}
if (gameResult === "stalemate") {
  return (
    <div id="new-game-modal">
      <div className="game-over-message">Stalemate! 1/2-1/2</div>
      <button 
        onClick={() => startNewGame()}>New Game
      </button>
    </div>)}
}