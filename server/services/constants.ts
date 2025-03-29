// import {SocketType} from "../constants";

export enum DB_COLLECTIONS{
    USERS = "users",
    CHATS = "chats"
}

export enum NOTIFICATION_TYPE {
    GET_CHATS = "GET_CHATS",
    CREATED = "CREATED",
    CONNECTED = "CONNECTED",
    TYPING = "TYPING",
    MESSAGE = "MESSAGE",
    READ = "READ",
    DISCONNECTED = "DISCONNECTED",
}

export type NotificationMessage<T> = {
    payload: T,
    type: NOTIFICATION_TYPE
}
