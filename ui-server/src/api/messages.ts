// import {SERVER_PORT} from "../utils/constants.ts";
import axios from "axios";
import {BASE_URL} from "../utils/constants.ts";

export type MessageRequest = {
    message: string,
    sender_id: string,
    receiver_id: string,
    timestamp?: string
}
//
// const messageRequestOptions = {
//         port: SERVER_PORT,
//         path: "/message",
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         }
// };

export const sendMessage = async ({message, sender_id, receiver_id}: MessageRequest) => {
    if (!message.trim()) return;
    const messageData: MessageRequest = {
        sender_id: sender_id,
        message: message,
        timestamp: new Date().toISOString(),
        receiver_id: receiver_id,
    }

    await axios.post(BASE_URL + '/message', messageData)
}