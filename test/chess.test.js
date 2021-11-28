class Board {
  constructor () {
    this.squares = []
    for(let i = 0; i < 8; i++) {
      this.squares.push([null, null, null, null, null, null, null, null])
    }
    console.log("squares", this.squares)
  }
}

describe('Board', () => {
  it('can create a new board', () => {
    const board = new Board()
    
    expect(board.squares.length).toBe(8);
    expect(board.squares[0].length).toBe(8);
    expect(board.squares[0][0]).toBe(null);
  });
});
