import React, { useState, useEffect } from 'react';

//TODO: Fix bug with promoted pieces not showing up as captured pawns
//TODO: Sort captured pieces by value

export default function CapturedPieceContainer({capturedPieces}){
  return (
    <div
      className="captured-pieces">
      {capturedPieces.map((piece) => 
        <div key={capturedPieces.indexOf(piece)}>{piece.symbol}
        </div>)}
    </div>)
}

