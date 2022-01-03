import React, { useState, useEffect } from 'react';

export default function CapturedPieceContainer({capturedPieces}){
  return (
    <div
      className="captured-pieces">
      {capturedPieces.map((piece) => 
        <div>{piece.symbol}
        </div>)}
    </div>)
}

