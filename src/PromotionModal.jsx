import React, { useState } from "react";
import { pieces } from "./pieces"

export default function PromotionPopUp({promotionData, board, promote}){

  const { pawnIsPromoting, color, promotionSquare } = promotionData

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
  
  if(pawnIsPromoting){
    return (
      <div id="promotion-modal">

        {color === "white" ?
          <div className="promotion-pieces">{whitePieces.map((piece, index) => 
            <div
              key={index}
              onClick={(e) => {promote(promotionSquare, piece)}}>{piece.symbol}
            </div>)}
        </div> :

            <div className="promotion-pieces">{blackPieces.map((piece, index) =>
              <div
                key={index}
                onClick={(e) => {promote(promotionSquare, piece)}}>
                {piece.symbol}
              </div>)}
            </div>}
      </div>)}
      
    else { 
      return null 
      }
  }