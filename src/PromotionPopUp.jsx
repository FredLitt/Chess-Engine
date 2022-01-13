import React, { useState } from 'react';
import { pieceSymbols } from './pieces'

export default function PromotionPopUp({isPawnPromoting, pawnColor, promotionSquare, board, promote}){

  const whiteIsPromoting = (isPawnPromoting && pawnColor === "white")

  const blackIsPromoting = (isPawnPromoting && pawnColor === "black")

  return (
    <div>
      {whiteIsPromoting && 
      <div
        id="promotion-popup">
        <div 
          type="knight"
          onClick={(e) => {
            promote(promotionSquare, board)
            console.log(board.squares)
            }}
            >{pieceSymbols.whiteKnight}</div>
        <div 
          type="bishop"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.whiteBishop}</div>
        <div
          type="rook"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.whiteRook}</div>
        <div
          type="queen"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.whiteQueen}</div>
      </div>}
      
      {blackIsPromoting && 
      <div
        id="promotion-popup">
        <div 
          type="knight"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.blackKnight}</div>
        <div 
          type="bishop"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.blackBishop}</div>
        <div
          type="rook"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.blackRook}</div>
        <div
          type="queen"
          onClick={(e) => choosePromotionPiece(e.target)}>{pieceSymbols.blackQueen}</div>
      </div>}
    </div>)
}