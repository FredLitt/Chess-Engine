let socket = io()
let playerColor
const testBtn = document.querySelector("#test-btn")
const resetBtn = document.querySelector("#reset-btn")

testBtn.addEventListener("click", () => {
  socket.emit("movePiece")
})

resetBtn.addEventListener("click", () => {
  console.log("lol")
  socket.emit("resetGame")
})

socket.on("updatedGame", (updatedGame) => {
  console.log(updatedGame)
})

socket.on("joinedGame", (color) => {
  playerColor = color
  console.log(`You have been assigned the ${color} pieces, good luck!`)
})