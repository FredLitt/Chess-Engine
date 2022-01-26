import React, { useState } from 'react';

//TODO
// [ ] castling

export default function MoveList({moveList}){

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

  const getMoveNumber = (moveList, move) => {
    return (Math.round(moveList.indexOf(move)/2+1))
  }

  const renderMoveNotation = (move, index) => {
    if (move.moveData.kingsideCastle) {
      return '0 - 0'
    }
    if (move.moveData.queensideCastle) {
      return '0 - 0 - 0'
    }
    let moveNotation
    const pieceAbbreviation = pieceAbbreviations[move.piece.type]
    const endRow = (move.toSquare[0] + 1)
    const endColumn = (xAxis[move.toSquare[1]])
    const capture = move.moveData.wasACapture
    const promotion = move.moveData.promotionChoice
    if(move.piece.type === 'pawn'){
      const pawnsStartRow = xAxis[move.fromSquare[1]]
      moveNotation = pawnsStartRow
      if(capture){
        moveNotation += `x${endColumn}${endRow}`
      } else {
        moveNotation += `${endRow}`
      }
      if(promotion){
        moveNotation += `=${pieceAbbreviations[promotion]}`
      } 
    }
    if(move.piece.type !== 'pawn'){
      moveNotation = pieceAbbreviation
      if(capture){
        moveNotation += `x`
      }
      moveNotation += `${endColumn}${endRow}`
    }  
    if(move.moveData.winner){
      moveNotation += '#'
      return moveNotation
    }
    if(move.moveData.wasACheck){
      moveNotation += '+'
    }
    return moveNotation
  }

  return (
      <div id="move-list">
        {moveList.map((move, index) => 
          <div 
            key={index}
            className="move-notation">
            {index % 2 === 0 && 
            <span className="move-number">
            {`${getMoveNumber(moveList, move)}. `}</span>}
            {renderMoveNotation(move, index)}
            {move.moveData.winner === "white" && <div className="white-wins-result">1 - 0</div>}
            {move.moveData.winner === "black" && <div className="black-wins-result">0 - 1</div>}
          </div>)}
        </div>        
  )
}