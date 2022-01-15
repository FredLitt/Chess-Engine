import React, { useState, useEffect } from 'react';

//TODO
// [ ] helper function for translating move into notation
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

// NESTING WILL BE USEFUL HERE
const renderMoveNotation = (move, index) => {
  const pieceAbbreviation = pieceAbbreviations[move.piece.type]
  const endRow = (move.toSquare[0] + 1)
  const endColumn = (xAxis[move.toSquare[1]])
  const capture = move.additionalMoveData.wasACapture
  const promotion = move.additionalMoveData.promotionChoice
  if(move.piece.type === 'pawn' && capture && promotion){
    const pawnsStartRow = xAxis[move.fromSquare[1]]
    const promotedPieceAbbreviation = pieceAbbreviations
    [promotion]
    return `${pawnsStartRow}x${endColumn}${endRow}=${promotedPieceAbbreviation}`
  }
  if(move.piece.type === 'pawn' && promotion){
    const pawnsStartRow = xAxis[move.fromSquare[1]]
    const promotedPieceAbbreviation = pieceAbbreviations
    [promotion]
    return `${endColumn}${endRow}=${promotedPieceAbbreviation}`
  }
  if(move.piece.type === 'pawn' && capture){
    const pawnsStartRow = xAxis[move.fromSquare[1]]
    return `${pawnsStartRow}x${endColumn}${endRow}`
  }
  if(move.piece.type === 'pawn'){
    return `${endColumn}${endRow}`
  }
  if(move.piece.type !== 'pawn' && capture){
    return `${pieceAbbreviation}x${endColumn}${endRow}`
  }
  if(move.piece.type !== 'pawn'){
    return `${pieceAbbreviation}${endColumn}${endRow}`
  }
  
}

export default function MoveList({moveList}){
  return (
    <div id="move-list">
      {moveList.map((move, index) => 
        <div 
          key={index}
          className="move-notation">
          {index % 2 === 0 && 
          <span className="move-number">
          {`${Math.round(index/2+1)}. `}</span>}
          {renderMoveNotation(move, index)}
          </div>)}
      </div>

    // <div>
    // <div id="move-list">
    //   {moveList.map((move, index) =>        
    //     <div 
    //       key={index}
    //       className="move-notation">
    //       {index % 2 === 0 && 
    //       <span className="move-number">
    //       {`${Math.round(index/2+1)}. `}</span>}
    //       {pieceAbbreviations[move.piece.type]}
    //       {(move.piece.type === 'pawn' && move.additionalMoveData.wasACapture) 
    //         && <span>{xAxis[move.fromSquare[1]]}</span>}
    //       {move.additionalMoveData.wasACapture && <span>x</span>}
    //       {xAxis[move.toSquare[1]]}
    //       {move.toSquare[0]+1}
    //     </div>)}
    // </div>
    // <div>
    //   {moveList.map((move, index) =>        
    //     <div 
    //       key={index}
    //       className="move-notation">
    //       {index % 2 === 0 && 
    //       <span className="move-number">
    //       {`${Math.round(index/2+1)}. `}</span>}
    //       {renderMoveNotation(move, index)}
    //     </div>)}
    // </div>
    //</div>
  )
}