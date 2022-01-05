import React, { useState, useEffect } from 'react';

//TODO
// [ ] promotion
// [ ] check
// [ ] checkmate
// [ ] castling
// [ ] winner

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

const pieceAbbreviations = {
  'pawn': '',
  'knight': 'N',
  'bishop': 'B',
  'rook': 'R',
  'queen': 'Q',
  'king': 'K'
}

const getMoveNumber = (moveList, moveIndex) => {
  return (Math.round(moveList.indexOf(move)/2+1))
}

export default function MoveList({moveList}){

  return (
    <div id="move-list">
      {moveList.map((move) =>        
        <div 
          key={moveList.indexOf(move)}
          className="move-notation">
          {moveList.indexOf(move) % 2 === 0 && 
          <span className="move-number">{`${Math.round(moveList.indexOf(move)/2+1)}. `}</span>}
          {pieceAbbreviations[move.piece.type]}
          {(move.piece.type === 'pawn' && move.wasAcapture) 
            && <span>{xAxis[move.fromSquare[1]]}</span>}
          {move.wasAcapture && <span>x</span>}
          {xAxis[move.toSquare[1]]}
          {move.toSquare[0]+1}
        </div>)}
        </div>
  )
}