import React, { useState, useEffect } from 'react';

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

