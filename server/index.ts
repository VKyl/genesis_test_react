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
import {authorize, userAuthResolver} from "./resolvers/user/user-auth";
import express from "express";
import {userMessageHandler} from "./resolvers/user/user-interaction";
import {newChatResolver} from "./resolvers/chats/new-chat";
import {getChat, getChats} from "./resolvers/chats/get-chats";
import {setupBots} from "./spec/botsSetup";
import {createAllChats} from "./spec/createAllChats";

const app = express()
const server = app.listen(3000)

const io = new Server(server, {cors: {origin: "*"}});
DatabaseService.instance.connect(DB_LINK).then(r =>
    setupBots()
);

io.on("connection", (socket: SocketType) => {
    userAuthResolver(socket.handshake.query)
        .then(u_id => {
            authorize(socket, u_id)
            if (!socket.handshake.query.is_bot)
                // TODO MOVE to creation of user + add u_id validation
                createAllChats(socket.data.u_id);
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
