"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
const database_service_1 = require("./services/database-service");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {});
const DBService = new database_service_1.DatabaseService(constants_1.DB_LINK);
io.on("connection", (socket) => {
    socket.on("message", (data) => {
        console.log(data);
    });
});
httpServer.listen(3000);
