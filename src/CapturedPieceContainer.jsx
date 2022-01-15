import React, { useState } from 'react';

//TODO: Sort captured pieces by value

export default function CapturedPieceContainer({capturedPieces}){
  return (
    <div
      className="captured-pieces">
      {capturedPieces.map((piece, index) => 
        <div key={index}>{piece.symbol}
        </div>)}
    </div>)
}