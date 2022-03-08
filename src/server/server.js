const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Client = require("@replit/database");

async function initializeGame(client) {
  let initialGame = await client.get("game");
  if (initialGame === null){
    await client.set("game", [])
  }
}

async function startGame() {
  const client = new Client();
  await initializeGame(client)

  const publicPath = path.join(__dirname, './public');
  const port = process.env.PORT || 3001;
  let app = express();
  let server = http.createServer(app);
  let io = socketIO(server);
  
  app.use(express.static(publicPath))
  
  server.listen(port, () => {
      console.log(`Server is up on port ${port}.`)
  });
  
  io.on("connection", async (socket) => {
      console.log("A user just connected.");
      socket.on("disconnect", () => {
          console.log("A user has disconnected.");
      })
      socket.on("movePawn", async () => {
          let number = await client.get("game")
          const newMove = { 
            fromSquare: [1, 3], 
            toSquare: [3, 3]
          }
          const currentGame = await client.get("game")
          const updatedGame = [...currentGame, newMove]
        
          await client.set("game", )
          io.emit("updatedNumber", newNumber)
      })
      const currentGame = await client.get("game")
      socket.emit("updatedNumber", currentNumber)
  });
}

startGame()

