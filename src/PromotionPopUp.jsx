import React, { useState } from 'react';
import { pieceSymbols } from './pieces'

// also needs correct color to display

export default function PromotionPopUp({isPawnPromoting}){
  return (
      <div>
      {isPawnPromoting && <div
        id="promotion-popup">
        
      </div>}
    </div>)
}