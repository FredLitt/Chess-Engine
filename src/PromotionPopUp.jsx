import React, { useState } from 'react';
import { Knight, Bishop, Rook, Queen, pieceSymbols } from './pieces'

//TODO: Refactor as 2 array maps?

export default function PromotionPopUp({isPawnPromoting, pawnColor, promotionSquare, board, promote}){

  const whiteIsPromoting = (isPawnPromoting && pawnColor === "white")

  const blackIsPromoting = (isPawnPromoting && pawnColor === "black")

  const whiteKnight = new Knight("white")
  const whiteBishop = new Bishop("white")
  const whiteRook = new Rook("white")
  const whiteQueen = new Queen("white")

  const blackKnight = new Knight("black")
  const blackBishop = new Bishop("black")
  const blackRook = new Rook("black")
  const blackQueen = new Queen("black")

const whitePieces = {
  "whiteKnight": whiteKnight,
  "whiteBishop": whiteBishop,
  "whiteRook": whiteRook,
  "whiteQueen": whiteQueen
}

const blackPieces = {
  "blackKnight": blackKnight,
  "blackBishop": blackBishop,
  "blackRook": blackRook,
  "blackQueen": blackQueen
}

  return (
    <div>
      {whiteIsPromoting && 
      <div
        id="promotion-popup">
        <div 
          type="whiteKnight"
          onClick={(e) => {promote(promotionSquare, whitePieces[e.currentTarget.getAttribute("type")])}}>
          {pieceSymbols.whiteKnight}</div>
        <div 
          type="whiteBishop"
          onClick={(e) => {promote(promotionSquare, whitePieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.whiteBishop}</div>
        <div
          type="whiteRook"
          onClick={(e) => {promote(promotionSquare, whitePieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.whiteRook}</div>
        <div
          type="whiteQueen"
          onClick={(e) => {promote(promotionSquare, whitePieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.whiteQueen}</div>
      </div>}
      
      {blackIsPromoting && 
      <div
        id="promotion-popup">
        <div 
          type="blackKnight"
          onClick={(e) => {promote(promotionSquare, blackPieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.blackKnight}</div>
        <div 
          type="blackBishop"
          onClick={(e) => {promote(promotionSquare, blackPieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.blackBishop}</div>
        <div
          type="blackRook"
          onClick={(e) => {promote(promotionSquare, blackPieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.blackRook}</div>
        <div
          type="blackQueen"
          onClick={(e) => {promote(promotionSquare, blackPieces[e.currentTarget.getAttribute("type")])}}>{pieceSymbols.blackQueen}</div>
      </div>}
    </div>)
}