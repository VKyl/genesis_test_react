import {Socket, DefaultEventsMap} from 'socket.io'

export type SessionUser = {
    u_id: string,
    is_bot: boolean
}

export const IMAGES = ['avatar1.png', 'avatar2.png', 'avatar3.png']
export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SessionUser>

export const DB_LINK: string = process.env.DB_LINK || ""