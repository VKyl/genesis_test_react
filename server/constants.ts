import {Socket, DefaultEventsMap} from 'socket.io'
import {body} from "express-validator";

export type SessionUser = {
    u_id: string,
    is_bot: boolean
}

export const IMAGES = ['avatar1.png', 'avatar2.png', 'avatar3.png']
export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SessionUser>


export const chatCreationValidators = [
    body("u1_id").exists().isHexadecimal().isLength({min: 24, max: 24}),
    body("u2_id").exists().isHexadecimal().isLength({min: 24, max: 24})
]

export const messageSendingValidators = [
    body("sender_id").exists().isHexadecimal().isLength({min: 24, max: 24}),
    body("message").exists().isString().isLength({min: 1, max: 300}),
    body("timestamp").exists().isString().isISO8601(),
    body("receiver_id").exists().isHexadecimal().isLength({min: 24, max: 24})
]

export const DB_LINK: string = process.env.DB_LINK || ""