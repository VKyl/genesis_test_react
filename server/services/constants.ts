// import {SocketType} from "../constants";

import {body} from "express-validator";

export enum DB_COLLECTIONS{
    USERS = "users",
    CHATS = "chats"
}

export enum NOTIFICATION_TYPE {
    AUTHORIZED = "AUTHORIZED",
    GET_CHATS = "GET_CHATS",
    CREATED = "CREATED",
    CONNECTED = "CONNECTED",
    TYPING = "TYPING",
    MESSAGE = "MESSAGE",
    READ = "READ",
    DISCONNECTED = "DISCONNECTED"
}

export type NotificationMessage<T> = {
    payload: T,
    type: NOTIFICATION_TYPE
}
