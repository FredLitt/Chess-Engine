import React, { useState } from "react";
import { pieces } from "./pieces"

export default function PromotionPopUp({promotionData, board, promote}){

  const { pawnIsPromoting, color, promotionSquare } = promotionData

  const whitePieces = [
    pieces.whiteQueen,
    pieces.whiteRook,
    pieces.whiteBishop,
    pieces.whiteKnight,  
  ]

  const blackPieces = [
    pieces.blackQueen,
    pieces.blackRook,
    pieces.blackBishop,
    pieces.blackKnight
  ]

  let piecesToRender
  color === "white" ? piecesToRender = whitePieces : piecesToRender = blackPieces
  
    return (
      <div id="promotion-modal">
          <div className="promotion-pieces">{piecesToRender.map((piece, index) => 
            <div
              key={index}
              onClick={(e) => {promote(promotionSquare, piece)}}>{piece.symbol}
            </div>)}
        </div> 
      </div>)}
      
    
  