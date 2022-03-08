const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Client = require("@replit/database");

async function initializeGame(client) {
  try {
    let initialGame = await client.get("game");
  } catch(err){
      await client.set("game", [])
  }
}

async function startGame() {
  const client = new Client();
  await initializeGame(client)

  const port = process.env.PORT || 3001;
  let app = express();
  let server = http.createServer(app);
  let io = socketIO(server);

  const testFolder = path.join(__dirname)
  app.use(express.static(testFolder))

  app.get("/", (req, res) => {
    res.sendFile(testFolder + "/test.html")
  })
  
  server.listen(port, () => {
      console.log(`Server is up on port ${port}.`)
  });
  
  io.on("connection", async (socket) => {
    
      console.log("A user just connected.");
      socket.on("disconnect", () => {
          console.log("A user has disconnected.");
      })
      socket.on("movePiece", async () => {
          const game = await client.get("game")
          const newMove = { 
            fromSquare: [1, 3], 
            toSquare: [3, 3]
          }
          const updatedGame = [...game, newMove]
        
          await client.set("game", updatedGame)
          io.emit("updatedGame", updatedGame)
          console.log(updatedGame)
      })
      const currentGame = await client.get("game")
      socket.emit("joinedGame", assignSide())
      socket.emit("updatedGame", currentGame)
  });
}

const assignSide = () => {
  const sides = ["black", "white"]
  const randomSide = sides[Math.floor(Math.random() * 2)]
  return randomSide
}

startGame()