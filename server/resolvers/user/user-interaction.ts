import {MessageDAO} from "../../entities/message";
import {SessionService} from "../../services/session-service";
import {DB_COLLECTIONS, NOTIFICATION_TYPE} from "../../services/constants";
import {DatabaseService} from "../../services/database-service";
import {Request, Response} from "express";
import {validateRequest} from "../../constants";
import {Types} from "mongoose";

const updateChat = async (message: MessageDAO, receiverId: string) => {
    return DatabaseService.instance.updateEntityByQuery(
        { users: { $all: [message.sender_id, new Types.ObjectId(receiverId)] } },
        { $push: { messages: message } },
        DB_COLLECTIONS.CHATS
    );
};

export const userMessageHandler = async (req: Request, res: Response) => {
    try {
        validateRequest(req);

        const { sender_id, receiver_id, message, timestamp } = req.body;
        const messageData: MessageDAO = {
            sender_id: new Types.ObjectId(sender_id as string),
            message,
            timestamp,
        };

        await updateChat(messageData, receiver_id);

        SessionService.instance.notify(
            { type: NOTIFICATION_TYPE.MESSAGE, payload: messageData },
            receiver_id
        );

        res.status(200).send();
    } catch (error) {
        res.status(400).send({ error: "Bad request" });
    }
};