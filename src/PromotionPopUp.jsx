import React, { useState } from 'react';
import { pieces } from './pieces'

export default function PromotionPopUp({promotionData, board, promote}){

  const {isPromoting, color, promotionSquare} = promotionData

  const whiteIsPromoting = (isPromoting && color === "white")

  const blackIsPromoting = (isPromoting && color === "black")

  const whitePieces = [
    pieces.whiteKnight,
    pieces.whiteBishop,
    pieces.whiteRook,
    pieces.whiteQueen
  ]

  const blackPieces = [
    pieces.blackKnight,
    pieces.blackBishop,
    pieces.blackRook,
    pieces.blackQueen
  ]

  return (
    <div>
      {whiteIsPromoting && 
        <div id="promotion-popup">{whitePieces.map((piece, index) => 
           <div
           key={index}
           onClick={(e) => {promote(promotionSquare, piece)}}>{piece.symbol}</div>)}
       </div>}

      {blackIsPromoting &&
        <div id="promotion-popup">{blackPieces.map((piece, index) =>
          <div
          key={index}
          onClick={(e) => {promote(promotionSquare, piece)}}>
          {piece.symbol}</div>)}
        </div>}
    </div>)}