let socket = io()

const testBtn = document.querySelector("#test-btn")

testBtn.addEventListener("click", () => {
  console.log("lol")
  socket.emit("movePiece")
})
