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

export type User = {
    name?: string | null,
    u_id?: string | null
}

export type SessionContext = {
    user?: User | null,

}

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
export const BASE_URL = `http://localhost:${SERVER_PORT}`
