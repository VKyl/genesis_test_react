import {Server} from "socket.io";
import {chatCreationValidators, DB_LINK, messageSendingValidators, SocketType} from "./constants";
import {DatabaseService} from "./services/database-service";
import {SessionService} from "./services/session-service";
import {authorize, userAuthResolver} from "./resolvers/user-auth";
import express from "express";
import {userMessageHandler} from "./resolvers/user-interaction";
import {newChatResolver} from "./resolvers/new-chat";

// const httpServer = createServer(setUserMessageReceiving);
const app = express()
const server = app.listen(3000)

const io = new Server(server);
DatabaseService.instance.connect(DB_LINK);

io.on("connection", (socket: SocketType) => {
    userAuthResolver(socket.handshake.query).then(u_id => authorize(socket, u_id))

    socket.on("disconnect", () => {
        SessionService.instance.disconnectUser(socket.data.u_id)
    })
});

app.use(express.json())

app.post("/chat",
    ...chatCreationValidators,
     newChatResolver
)

app.post("/message",
    ...messageSendingValidators,
    userMessageHandler)