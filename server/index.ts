import {Server} from "socket.io";
import {
    chatCreationValidators,
    DB_LINK,
    getChatsListValidators, getChatValidators,
    messageSendingValidators, SERVER_PORT,
    SocketType
} from "./constants";
import {DatabaseService} from "./services/database-service";
import {SessionService} from "./services/session-service";
import {authorize, userAuthResolver} from "./resolvers/user/user-auth";
import cors from "cors";
import express from "express";
import {userMessageHandler} from "./resolvers/user/user-interaction";
import {newChatResolver} from "./resolvers/chats/new-chat";
import {getChat, getChats} from "./resolvers/chats/get-chats";
import {setupBots} from "./spec/botsSetup";

const app = express()
app.use(cors({origin: "*"}))
const server = app.listen(SERVER_PORT)
const io = new Server(server, {cors: {origin: "*"}});

DatabaseService.instance.connect(DB_LINK).then(() =>
    setupBots()
);

io.on("connection", (socket: SocketType) => {
    userAuthResolver(socket.handshake.query)
        .then(u_id => {
            authorize(socket, u_id)
        })

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
