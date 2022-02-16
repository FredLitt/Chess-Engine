import React from "react"

export default function GameOptionsBar({flipBoard, createNewGame, takeback}){

  return (
    <div id="game-options-bar">
      <button
        onClick={() => {createNewGame()}}
        >New Game</button>
      <button 
        onClick={() => {flipBoard()}}
        >Flip Board</button>
      <button
        onClick={() => {takeback()}}
        >Takeback</button>
    </div>
  )
}