import React, { useState, useEffect } from 'react';

//TODO: FIX COORDINATE JANKINESS

const xAxis = {
  0: 'h',
  1: 'g',
  2: 'f',
  3: 'e',
  4: 'd',
  5: 'c',
  6: 'b',
  7: 'a'
}

const pieceLetters = {
  'pawn': '',
  'knight': 'N',
  'bishop': 'B',
  'rook': 'R',
  'queen': 'Q',
  'king': 'K'
}

const getMoveNumber = (moveList, moveIndex) => {
  const moveListIndex = moveList.map(moveIndex)
  let moveNumber
  return moveNumber
}

export default function MoveList({moveList}){
  console.log(moveList)
  return(
    <div id="move-list">
      {moveList.map((move) => 
        <div>
          {moveList.indexOf(move)+1}. 
          {pieceLetters[move.piece.type]}
          {xAxis[move.toSquare[1]]}
          {move.toSquare[0]+1}
        </div>)}
        </div>
  )
}