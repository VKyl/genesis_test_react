import {createServer} from "http";
import {Server} from "socket.io";
import {DB_LINK} from "./constants";
import {DatabaseService} from "./services/database-service";
import {DB_COLLECTIONS} from "./services/constants";

const httpServer = createServer();
const io = new Server(httpServer, {});
const dBService: DatabaseService = new DatabaseService(DB_LINK);
io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.emit("message", message);
    dBService.getCollection(DB_COLLECTIONS.USERS).then((entity) => {
      console.log(entity)
    })
  })
});

httpServer.listen(3000);