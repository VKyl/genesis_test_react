import {createServer} from "http";
import {Server} from "socket.io";
import {DB_LINK} from "./constants";
import {DatabaseService} from "./services/database-service";
import {DB_COLLECTIONS} from "./services/constants";

const httpServer = createServer();
const io = new Server(httpServer, {});
DatabaseService.instance.connect(DB_LINK);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.emit("message", message);
    DatabaseService.instance.getEntityById("67e541f7f63bec4693f25bb5", DB_COLLECTIONS.USERS).then((entity) => {
      console.log(entity)
    })
  })
});

httpServer.listen(3000);