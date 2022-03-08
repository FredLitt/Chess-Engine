let socket = io()

const testBtn = document.querySelector("#test-btn")

testBtn.addEventListener("click", () => {
  socket.emit("movePiece")
})

socket.on("updatedGame", (updatedGame) => {
  console.log(updatedGame)
})
