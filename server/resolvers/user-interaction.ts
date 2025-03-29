import {MessageDAO} from "../entities/message";
import {SessionService} from "../services/session-service";
import {DB_COLLECTIONS, NOTIFICATION_TYPE} from "../services/constants";
import {DatabaseService} from "../services/database-service";

export const userMessageHandler = async (req: any, res: any, next: any) => {
    const message: MessageDAO = {sender_id: req.body.sender_id,
                                 message: req.body.message,
                                 timestamp: req.body.timestamp};

    const updateChat = () => DatabaseService.instance.updateEntityByQuery({
            users: {$all: [message.sender_id, req.body.receiver_id]},
        }, {$push: {
                messages: message,
            }}, DB_COLLECTIONS.CHATS)

    try {
            updateChat()
            .then(() => SessionService.instance.notify(
            {type: NOTIFICATION_TYPE.MESSAGE, payload: message},
            req.body.receiver_id))
            .catch(() => null)

    } catch (error) {
        return res.status(403).send({error: "Bad request"});
    }
    return res.status(200).send();
}