const express = require("express")
const app = express()
const port = 3001
const socketIO = require("socket.io")
const Client = require("@replit/database")

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function initializeGame(client){
  let 
}