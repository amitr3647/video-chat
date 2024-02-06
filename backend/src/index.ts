 
//create a server
import { Server, Socket } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';
import { UserManager } from "./managers/UserManager";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*" 
    }
  });

  const useManager = new UserManager();
// Handle socket connections
io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    useManager.addUser('lucifer',socket);
    socket.on("disconnect",()=> {
        useManager.removeUser(socket.id);
    })
})



app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});






