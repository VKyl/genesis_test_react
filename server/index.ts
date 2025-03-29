import {createServer} from "http";
import {Server} from "socket.io";
import {DB_LINK, SocketType} from "./constants";
import {DatabaseService} from "./services/database-service";
import {SessionService} from "./services/session-service";
import {userAuthResolver} from "./resolvers/user-auth";
import {setUserInteractions} from "./resolvers/user-interaction";
import {NOTIFICATION_TYPE} from "./services/constants";

const httpServer = createServer();
const io = new Server(httpServer);
DatabaseService.instance.connect(DB_LINK);

io.on("connection", (socket: SocketType) => {
    userAuthResolver(socket.handshake.query).then(u_id => {
        if (!u_id) return socket.disconnect()
        socket.data.u_id = u_id.toHexString()
        socket.emit(NOTIFICATION_TYPE.AUTHORIZED, {id: socket.data.u_id})
        SessionService.instance.addUser(socket);
    })

    setUserInteractions(socket)

    socket.on("disconnect", () => {
        SessionService.instance.disconnectUser(socket.data.u_id)
    })
});


httpServer.listen(3000);