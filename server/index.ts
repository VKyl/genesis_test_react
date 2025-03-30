import {Server} from "socket.io";
import {
    chatCreationValidators,
    DB_LINK,
    getChatsListValidators, getChatValidators,
    messageSendingValidators,
    SocketType
} from "./constants";
import {DatabaseService} from "./services/database-service";
import {SessionService} from "./services/session-service";
import {authorize, userAuthResolver} from "./resolvers/user-auth";
import express from "express";
import {userMessageHandler} from "./resolvers/user-interaction";
import {newChatResolver} from "./resolvers/new-chat";
import {getChat, getChats} from "./resolvers/get-chats";

const app = express()
const server = app.listen(3000)

const io = new Server(server);
DatabaseService.instance.connect(DB_LINK);

io.on("connection", (socket: SocketType) => {
    userAuthResolver(socket.handshake.query)
        .then(u_id => authorize(socket, u_id))

    socket.on("disconnect", () => {
        SessionService.instance.disconnectUser(socket.data.u_id)
    })
});

app.use(express.json())

app.get("/chat",
    ...getChatValidators,
    getChat
)

app.get("/chats",
    ...getChatsListValidators,
    getChats
)

app.post("/chats",
    ...chatCreationValidators,
     newChatResolver
)

app.post("/message",
    ...messageSendingValidators,
    userMessageHandler
)