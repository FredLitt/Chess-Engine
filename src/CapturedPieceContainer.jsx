import React, { useState, useEffect } from 'react';

//TODO: Fix bug with promoted pieces not showing up as captured pawns

export default function CapturedPieceContainer({capturedPieces}){
  return (
    <div
      className="captured-pieces">
      {capturedPieces.map((piece) => 
        <div>{piece.symbol}
        </div>)}
    </div>)
}

