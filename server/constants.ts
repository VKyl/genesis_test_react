import {Socket, DefaultEventsMap} from 'socket.io'
import {body, query, validationResult} from "express-validator";
import {Request} from "express";

export type SessionUser = {
    u_id: string,
    is_bot: boolean
}

export const IMAGES = ['avatar1.png', 'avatar2.png', 'avatar3.png']
export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SessionUser>

export const validateRequest = (req: Request)=> {
    if (!validationResult(req).isEmpty()) throw new Error();
};

export const getChatsListValidators = [
    query("u_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24})
]

export const getChatValidators = [
    query("u1_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24}),
    query("u2_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24}),
]

export const chatCreationValidators = [
    body("u1_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24}),
    body("u2_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24}),
]

export const messageSendingValidators = [
    body("sender_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24}),
    body("message").exists({values: "falsy"})
        .isString().isLength({min: 1, max: 300}),
    body("timestamp").exists({values: "falsy"})
        .isString().isISO8601(),
    body("receiver_id").exists({values: "falsy"})
        .isHexadecimal().isLength({min: 24, max: 24})
]

export const DB_LINK: string = process.env.DB_LINK || ""