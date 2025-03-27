import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data)
  })
});

httpServer.listen(3000);