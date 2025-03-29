import {DatabaseService} from "../services/database-service";
import {DB_COLLECTIONS} from "../services/constants";
import {Types} from "mongoose";
import {Response, Request} from "express";
import {validationResult} from "express-validator";

const isExistingChat = async (chatUsers: Types.ObjectId[]) =>
    DatabaseService.instance.getEntityByQuery({users: {
            $all: chatUsers
        }},
        DB_COLLECTIONS.CHATS)
        .then((chat) => {
            console.log(!!chat, chat); return !!chat})

const validateRequest = (req: Request)=> {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) throw new Error();
};

export const newChatResolver = async (req: Request, res: Response) => {
    try {
        validateRequest(req)

        const chatUsers = [new Types.ObjectId(req.body.u1_id as string),
                                           new Types.ObjectId(req.body.u2_id as string)];
        const chatExists = await isExistingChat(chatUsers);

        if (chatExists) {
            res.status(200).send({ message: "Chat already exists" });
            return;
        }

        const newChat = await DatabaseService.instance.createEntity(
            { users: chatUsers, messages: [] },
            DB_COLLECTIONS.CHATS
        );

        res.status(200).send({ chat_id: newChat?.insertedId });
        return;

    } catch (error) {
        res.status(403).send({ message: "Not valid users" });
        return;
    }
};
