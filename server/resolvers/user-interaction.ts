import {MessageDAO} from "../entities/message";
import {SessionService} from "../services/session-service";
import {DB_COLLECTIONS, NOTIFICATION_TYPE} from "../services/constants";
import {DatabaseService} from "../services/database-service";
import {Request, Response} from "express";
import {validateRequest} from "../constants";

const updateChat = (message: MessageDAO, req: Request) => DatabaseService.instance.updateEntityByQuery({
                users: {$all: [message.sender_id, req.body.receiver_id]},
            }, {$push: {
                    messages: message,
                }}, DB_COLLECTIONS.CHATS)

export const userMessageHandler = async (req: Request, res: Response) => {
    const message: MessageDAO = {sender_id: req.body.sender_id,
                                 message: req.body.message,
                                 timestamp: req.body.timestamp};
    try {
            validateRequest(req)
            updateChat(message, req)
            .then(() => SessionService.instance.notify(
            {type: NOTIFICATION_TYPE.MESSAGE, payload: message},
            req.body.receiver_id))
            .catch(() => null)

    } catch (error) {
        res.status(403).send({error: "Bad request"});
    }
    res.status(200).send();
}
