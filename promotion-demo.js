// Current code
movePiece(toSquare)  {
  // ... do stuff
  this.displayPromotionChoices()
  // somehow wait for promotion choice?
  // ... do more stuff
}

// Another option:
movePiece(toSquare, promotionChoice) {
  // ... do stuff
  this.promote(promotionChoice)
}